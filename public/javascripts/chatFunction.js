"use strict";
import { HandleFirstSpinner } from "./utils.js";

/**
 * Handles the chat functionality.
 */
(function () {
  const POLLING = 100;
  let editingMode = false;
  let lastTimeStampUpdate = new Date(0);

  /**
   * Handles the chat functionality.
   */
  const MessagesLoader = (() => {
    /**
     * Adds a new message to the chat.
     * @param {*} messege
     * @returns
     */
    const addNewMessege = async (messege) => {
      try {
        const messegeObj = {
          dateAndTime: new Date().toISOString(),
          message: messege.trim(),
        };

        const response = await fetch("/api/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(messegeObj),
        });

        if (response.status === 403) {
          window.location.href = "/";
          return;
        }
        await displayMessages();
        setLatestDeleteBtn();
        setLatestEditBtn();
      } catch (error) {
        console.error("Error adding new message:", error);
        window.location.href = "/error";
      }
    };

    /**
     * Sets the latest delete button.
     * @returns
     */
    const setLatestDeleteBtn = () => {
      const deleteBtns = document.querySelectorAll(".delete-btn");
      if (deleteBtns.length === 0) return;
      const lastDeleteBtn = deleteBtns[deleteBtns.length - 1];
      lastDeleteBtn.addEventListener("click", deleteMessage);
    };

    /**
     * Sets the latest edit button.
     * @returns
     */
    const setLatestEditBtn = () => {
      const editBtns = document.querySelectorAll(".edit-btn");
      if (editBtns.length === 0) return;
      const lastEditBtn = editBtns[editBtns.length - 1];
      lastEditBtn.addEventListener("click", editMessage);
    };

    /**
     * Displays the messages in the chat.
     * @returns
     */
    const displayMessages = async () => {
      try {
        const msgDiv = document.getElementById("msg-placeholder");
        let domMessages = ``;
        if (!editingMode) {
          const response = await fetch("/api/messages");
          if (response.status === 403) {
            window.location.href = "/";
            return;
          }

          const messages = await response.json();
          for (const m of messages) {
            const card = buildMsgCard(m);
            domMessages += card;
          }
          msgDiv.innerHTML = domMessages;
        }
      } catch (error) {
        console.error("Error loading messages:", error);
        window.location.href = "/error";
      }
    };

    /**
     * Builds a message card.
     * @param {*} param0
     * @returns
     */
    const buildMsgCard = ({ msgId, dateAndTime, message, isOwner, Contact }) => {
      const senderIsUser = isOwner;
      const picSrc = senderIsUser ? "/images/bearer.png" : "/images/bear.png";
      const sender = Contact.firstName;

      const formattedDateTime = new Date(dateAndTime).toLocaleString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      const imageTag = `<img src="${picSrc}" alt="avatar" class="rounded-circle d-flex align-self-start ${senderIsUser ? "ms-3" : "me-3"} shadow-1-strong" width="60" />`;
      const editAndDeleteBtnsTag = `
                  <div class="d-flex justify-content-end p-1">
                    <button type="button" data-id="${msgId}" class="btn bg-warning-subtle me-2 edit-btn">Edit✍️</button>
                    <button type="button" data-id="${msgId}" class="btn bg-danger-subtle delete-btn">X</button>
                  </div>`;
      const editInputTag = `<input type="text" class="d-none form-control edit-input" value="${message}" />`;

      return `
            <li class="d-flex ${senderIsUser ? "justify-content-end" : "justify-content-start"} mb-4">
                ${senderIsUser ? "" : imageTag}
                <div class="card ${senderIsUser ? "bg-success bg-gradient" : "bg-info text-dark "}" style="--bs-bg-opacity: .5;">
                  <div class="card-header d-flex justify-content-between p-3" style="min-width: 270px;">
                      <p class="fw-bold mb-0 me-3">${sender} ${senderIsUser ? "(You)" : ""}</p>
                      <p class="text-muted small mb-0"><i class="far fa-clock"></i> ${formattedDateTime}</p>
                  </div>
                  <div class="card-body">
                      <p class="mb-0">${message}</p>
                  </div>
                  ${senderIsUser ? editInputTag : ""}
                  ${senderIsUser ? editAndDeleteBtnsTag : ""}
                </div>
                ${senderIsUser ? imageTag : ""}
            </li>
            `;
    };

    /**
     * Sets the delete buttons.
     */
    const setDeleteBtns = () => {
      const deleteBtns = document.querySelectorAll(".delete-btn");
      deleteBtns.forEach((btn) => {
        btn.addEventListener("click", deleteMessage);
      });
    };

    /**
     * Deletes a message.
     * @param {*} e
     */
    const deleteMessage = async (e) => {
      try {
        const emptySend = document.getElementById("emptySend");
        emptySend.classList.add("d-none");
        HandleFirstSpinner.showSpinner();
        const messageId = e.target.dataset.id;
        editingMode = false;
        await eraseMessage(messageId);
        await displayMessages();
      } catch (error) {
        console.error("Error deleting message:", error);
      } finally {
        HandleFirstSpinner.hideSpinner();
      }
    };

    /**
     * Erases a message.
     * @param {*} messageId
     * @returns
     */
    const eraseMessage = async (messageId) => {
      try {
        const response = await fetch(`/api/messages/${messageId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 403) {
          window.location.href = "/";
          return;
        }
        if (!response.ok) {
          throw new Error("Failed to delete message");
        }
      } catch (error) {
        console.error("Error deleting message:", error);
        window.location.href = "/error";
      }
    };

    /**
     * Sets the edit buttons.
     */
    const setEditBtns = () => {
      const editBtns = document.querySelectorAll(".edit-btn");

      editBtns.forEach((btn) => {
        btn.addEventListener("click", editMessage);
      });
    };

    /**
     * Edits a message.
     * @param {*} e
     * @returns
     */
    const editMessage = async (e) => {
      try {
        const messageCard = e.target.closest("li");
        const editInput = messageCard.querySelector(".edit-input");
        const messageBody = messageCard.querySelector(".card-body");
        const messageText = messageBody.querySelector("p");
        const msgId = e.target.dataset.id;
        const emptySend = document.getElementById("emptySend");
        emptySend.classList.add("d-none");

        if (editInput.classList.contains("d-none")) {
          editInput.classList.remove("d-none");
          messageText.classList.add("d-none");
          editInput.value = messageText.textContent;
          editingMode = true;
        } else if (!editInput.value.trim()) {
          editingMode = false;
          editInput.classList.add("d-none");
          messageText.classList.remove("d-none");
        } else {
          messageText.textContent = editInput.value;
          HandleFirstSpinner.showSpinner();

          const response = await fetch(`/api/messages/${msgId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: editInput.value }),
          });

          if (response.status === 403) {
            window.location.href = "/";
            return;
          }

          if (!response.ok) {
            throw new Error("Failed to delete message");
          }

          editInput.classList.add("d-none");
          messageText.classList.remove("d-none");
        }
      } catch (error) {
        console.error("Error editing message:", error);
        window.location.href = "/error";
      } finally {
        HandleFirstSpinner.hideSpinner();
      }
    };

    return {
      addNewMessege,
      displayMessages,
      setDeleteBtns,
      setEditBtns,
    };
  })();

  /**
   * Initializes the chat functionality.
   */
  document.addEventListener("DOMContentLoaded", async () => {
    const sendBtn = document.getElementById("send");
    const textarea = document.getElementById("mesInp");

    await MessagesLoader.displayMessages();
    MessagesLoader.setDeleteBtns();
    MessagesLoader.setEditBtns();

    setInterval(async () => {
      try {
        const response = await fetch("/api/messages/latest-update");

        if (response.status === 403) {
          window.location.href = "/";
          return;
        }

        const data = await response.json();
        const latestTimestamp = new Date(data.latestTimestamp);

        if (latestTimestamp > lastTimeStampUpdate) {
          lastTimeStampUpdate = latestTimestamp;
          await MessagesLoader.displayMessages();
          MessagesLoader.setDeleteBtns();
          MessagesLoader.setEditBtns();
        }
      } catch (error) {
        console.error("Error checking for updates:", error);
      }
    }, POLLING * 1000);

    sendBtn.addEventListener("click", async () => {
      editingMode = false;
      const messageInput = document.getElementById("mesInp");
      const inputValue = messageInput.value.trim();
      const emptySend = document.getElementById("emptySend");

      if (inputValue) {
        emptySend.classList.add("d-none");

        try {
          await MessagesLoader.addNewMessege(inputValue);

          textarea.rows = 1;
        } catch (error) {
          console.error("Error adding new message:", error);
        }

        messageInput.value = "";
      } else {
        emptySend.classList.remove("d-none");
      }
    });

    textarea.addEventListener("input", async () => {
      const lines = textarea.value.split("\n").length;
      textarea.rows = lines;
    });
  });
})();
