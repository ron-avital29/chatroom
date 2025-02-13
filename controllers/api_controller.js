const { Contact } = require("../models/contact");
const Message = require("../models/message");
const sequelize = require("../models");
const { literal, Op, fn, col } = require("sequelize");

/**
 * Fetches all contacts from the database.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    res.status(200).send(contacts);
  } catch (error) {
    res.status(500).send({ error: "Error fetching contacts" });
  }
};

/**
 * Searches for messages based on a prompt.
 * @param {Request} req - The request object, containing the search prompt.
 * @param {Response} res - The response object.
 */
const searchMessages = async (req, res) => {
  try {
    // const prompt = req.params.prompt.toLowerCase();
    const prompt = (req.query.query || "").toLowerCase();
    const messages = await Message.findAll({
      where: {
        isDeleted: false,
      },
      include: [
        {
          model: Contact,
          attributes: ["firstName"],
          required: true,
          where: { id: sequelize.col("Message.ContactId") },
        },
      ],
    });

    const filteredMessages = messages.filter((msg) => msg.message.toLowerCase().includes(prompt));

    res.status(200).send(filteredMessages);
  } catch (error) {
    res.status(500).send({ error: "Error fetching messages" });
  }
};

/**
 * Fetches all messages excluding deleted ones.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
const getMessages = async (req, res) => {
  try {
    const messages = await Message.findAll({
      where: { isDeleted: false },
      attributes: [
        "msgId",
        "dateAndTime",
        "message",
        [
          literal(`
            CASE 
              WHEN ContactId = '${req.session.userId}' THEN true 
              ELSE false 
            END
          `),
          "isOwner",
        ],
      ],
      include: [
        {
          model: Contact,
          attributes: ["firstName"],
          required: true,
          where: { id: sequelize.col("Message.ContactId") },
        },
      ],
    });
    res.status(200).send(messages);
  } catch (error) {
    res.status(400).send({ error: "Error fetching messages" });
  }
};

/**
 * Creates a new message and stores it in the database.
 * @param {Request} req - The request object, containing the message data.
 * @param {Response} res - The response object.
 */
const createMessage = async (req, res) => {
  try {
    const { dateAndTime, message } = req.body;
    await Message.create({ dateAndTime, message, ContactId: req.session.userId });
    res.status(201).send();
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

/**
 * Deletes a message by setting its `isDeleted` flag to true.
 * @param {Request} req - The request object, containing the message ID.
 * @param {Response} res - The response object.
 */
const deleteMessage = async (req, res) => {
  try {
    const messageId = req.params.id;
    const message = await Message.findOne({ where: { msgId: messageId } });
    const contactId = message.ContactId;
    const contact = await Contact.findOne({ where: { id: contactId } });

    if (contact.email !== req.session.email) {
      throw new Error("Unauthorized");
    }

    await Message.update({ isDeleted: true }, { where: { msgId: messageId } });
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
};

/**
 * Updates an existing message's content.
 * @param {Request} req - The request object, containing the message ID and new content.
 * @param {Response} res - The response object.
 */
const updateMessage = async (req, res) => {
  try {
    const messageId = req.params.id;
    const message = await Message.findOne({ where: { msgId: messageId } });
    const contactId = message.ContactId;
    const contact = await Contact.findOne({ where: { id: contactId } });

    if (contact.email !== req.session.email) {
      res.status(403).send({ error: "Unauthorized" });
      return;
    }

    const newMessage = req.body.message;

    await Message.update({ message: newMessage }, { where: { msgId: messageId } });
    res.status(200).send({ message: "Message updated successfully" });
  } catch (error) {
    console.error("Error updating message:", error);
    res.status(500).send({ error: "Error updating message" });
  }
};

/**
 * Fetches user details based on email.
 * @param {Request} req - The request object, containing the user email.
 * @param {Response} res - The response object.
 */
const getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await Contact.findOne({ where: { email } });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
};

/**
 * Fetches the timestamp of the latest message update.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
const getLatestMessageUpdate = async (req, res) => {
  try {
    const latestMessage = await Message.findOne({
      attributes: [[fn("MAX", col("updatedAt")), "latest"]],
    });

    const latestTimestamp = latestMessage?.get("latest") || null;

    res.status(200).json({ latestTimestamp });
  } catch (error) {
    console.error("Error fetching latest update:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getContacts,
  searchMessages,
  getMessages,
  createMessage,
  deleteMessage,
  updateMessage,
  getUserByEmail,
  getLatestMessageUpdate,
};
