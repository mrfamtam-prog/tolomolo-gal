
/* =========================================
   NASIA SURPRISE WEBSITE
   PHASE 10: INTERACTIVE GIFT SURPRISE
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const giftCards = document.querySelectorAll(".gift-card");
    const giftMessageContainer = document.getElementById(
        "gift-message-container"
    );

    const messageEmoji = document.getElementById("gift-message-emoji");
    const messageTitle = document.getElementById("gift-message-title");
    const messageText = document.getElementById("gift-message-text");

    const closeButton = document.getElementById("close-gift-message");
    const resetButton = document.getElementById("gift-reset-btn");

    if (
        !giftCards.length ||
        !giftMessageContainer ||
        !messageEmoji ||
        !messageTitle ||
        !messageText
    ) {
        console.warn("Gift section elements are missing.");
        return;
    }

    const giftMessages = {
        bunny: {
            emoji: "🐰",
            title: "A Little Bunny Surprise!",
            message:
                "Just like this cute bunny, may your days always be filled with joy, kindness and little moments that make you smile."
        },

        teddy: {
            emoji: "🧸",
            title: "A Teddy Bear Surprise!",
            message:
                "A little reminder that good friends make ordinary days special. Wishing you lots of happiness and wonderful memories."
        },

        kitty: {
            emoji: "🐱",
            title: "A Cute Kitty Surprise!",
            message:
                "May your curiosity always lead you to exciting adventures, new discoveries and plenty of reasons to smile."
        },

        rainbow: {
            emoji: "🌈",
            title: "Your Little Rainbow!",
            message:
                "Just like a rainbow after the rain, may every new day bring fresh hope, happiness and beautiful opportunities."
        }
    };

    function openGiftMessage(giftType) {
        const selectedGift = giftMessages[giftType];

        if (!selectedGift) return;

        messageEmoji.textContent = selectedGift.emoji;
        messageTitle.textContent = selectedGift.title;
        messageText.textContent = selectedGift.message;

        giftMessageContainer.hidden = false;
        giftMessageContainer.classList.add("is-visible");

        const messageCard =
            giftMessageContainer.querySelector(".gift-message-card");

        if (messageCard) {
            messageCard.classList.add("is-visible");
        }

        giftMessageContainer.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        if (closeButton) {
            closeButton.focus({ preventScroll: true });
        }
    }

    function closeGiftMessage() {
        giftMessageContainer.classList.remove("is-visible");

        const messageCard =
            giftMessageContainer.querySelector(".gift-message-card");

        if (messageCard) {
            messageCard.classList.remove("is-visible");
        }

        giftMessageContainer.hidden = true;
    }

    giftCards.forEach(card => {
        const button = card.querySelector(".gift-box");

        if (!button) return;

        const giftType = button.dataset.gift;

        if (!giftMessages[giftType]) {
            button.disabled = true;
            return;
        }

        button.setAttribute("aria-expanded", "false");

        button.addEventListener("click", () => {
            openGiftMessage(giftType);

            card.classList.add("is-opened");
            button.classList.add("is-opened");
            button.setAttribute("aria-expanded", "true");

            const openText = button.querySelector(".gift-open-text");

            if (openText) {
                openText.textContent = "Opened ✓";
            }
        });
    });

    if (closeButton) {
        closeButton.addEventListener("click", closeGiftMessage);
    }

    if (resetButton) {
        resetButton.addEventListener("click", () => {
            closeGiftMessage();

            document.getElementById("gifts-section").scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    }
});
