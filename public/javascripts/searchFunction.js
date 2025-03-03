"use strict";
import { HandleFirstSpinner } from "./utils.js";

(function () {
  /**
   * Handles the search functionality.
   */
  const searchHandler = (function () {
    /**
     *  Fetches messages from the server based on the search prompt.
     * @param {*} prompt
     * @returns
     */
    const searchByPrompt = async (prompt) => {
      try {
        HandleFirstSpinner.showSpinner();
        const response = await fetch(`/api/search?query=${encodeURIComponent(prompt)}`);

        if (response.status === 403) {
          window.location.href = "/";
          return;
        }

        const messages = await response.json();
        return messages;
      } catch (error) {
        console.error("Error fetching search results:", error);
        return null;
      } finally {
        HandleFirstSpinner.hideSpinner();
      }
    };

    /**
     *  Displays the search results on the page.
     * @param {*} messages
     */
    const displaySearchResults = (messages) => {
      const msgDiv = document.getElementById("search-results");
      msgDiv.innerHTML = "";
      let domMessages = ``;
      for (const m of messages) {
        const card = buildSearchCard(m);
        domMessages += card;
      }
      msgDiv.innerHTML = domMessages;
    };

    /**
     * Builds a card for each search result.
     * @param {*} param0
     * @returns
     */
    const buildSearchCard = ({ dateAndTime, message, Contact }) => {
      const sender = Contact.firstName;
      const formattedDateTime = new Date(dateAndTime).toLocaleString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      return `
      <li class="d-flex justify-content-center mb-4">
          <div class="card bg-warning-subtle bg-gradient" style="--bs-bg-opacity: .5;">
            <div class="card-header d-flex justify-content-between p-3" style="min-width: 270px;">
                <p class="fw-bold mb-0">${sender}</p>
                <p class="text-muted small mb-0"><i class="far fa-clock"></i> ${formattedDateTime}</p>
            </div>
            <div class="card-body">
                <p class="mb-0">${message}</p>
            </div>
      </li>
      `;
    };

    /**
     * Searches for messages based on the prompt and displays them.
     * @param {*} prompt
     */
    const searchAndDisplay = async (prompt) => {
      try {
        const nothingFound = document.getElementById("nothingFound");
        const msgDiv = document.getElementById("search-results");

        msgDiv.innerHTML = "";

        const messages = await searchByPrompt(prompt);

        if (messages && messages.length > 0) {
          displaySearchResults(messages);
          nothingFound.classList.add("d-none");
        } else {
          nothingFound.classList.remove("d-none");
        }
      } catch (error) {
        console.error("Error in searchAndDisplay:", error);
        window.location.href = "/error";
      }
    };

    return { searchAndDisplay };
  })();

  /**
   * Initializes the search functionality.
   */
  document.addEventListener("DOMContentLoaded", async () => {
    const searchMsgBtn = document.getElementById("searchBtn");

    searchMsgBtn.addEventListener("click", async () => {
      try {
        const searchInput = document.getElementById("search-inp");
        const inputValue = searchInput.value.trim();
        const emptySearch = document.getElementById("emptySeach");
        const nothingFound = document.getElementById("nothingFound");
        const msgDiv = document.getElementById("search-results");

        nothingFound.classList.add("d-none");

        if (inputValue) {
          await searchHandler.searchAndDisplay(inputValue);
          emptySearch.classList.add("d-none");
        } else {
          emptySearch.classList.remove("d-none");
          msgDiv.innerHTML = "";
        }
      } catch (error) {
        console.error("Error handling search button click:", error);
      }
    });
  });
})();
