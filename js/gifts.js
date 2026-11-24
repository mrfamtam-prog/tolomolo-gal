
/* =========================================
   NASIA SURPRISE WEBSITE
   PHASE 10: INTERACTIVE GIFT SURPRISE
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const giftCards = document.querySelectorAll(".gift-card");
    const giftMessage = document.getElementById("gift-message");

    if (!giftCards.length || !giftMessage) return;

    // Individual messages for each gift
    const giftMessages = {
        bunny: {
            title: "A Little Bunny Surprise! 🐰",
            message:
                "Just like this cute bunny, may your days always be filled with joy, kindness and little moments that make you smile."
        },

        teddy: {
            title: "A Teddy Bear Hug! 🧸",
            message:
                "A little reminder that good friends make ordinary days special. Wishing you lots of happiness and wonderful memories."
        },

        kitty: {
            title: "A Cute Kitty Surprise! 🐱",
            message:
                "May your curiosity always lead you to exciting adventures, new discoveries and plenty of reasons to smile."
        },

        rainbow: {
            title: "Your Little Rainbow! 🌈",
            message:
                "Just like a rainbow after the rain, may every new day bring fresh hope, happiness and beautiful opportunities."
        }
    };

    // Display a gift message
    function showGiftMessage(giftType) {
        const selectedGift = giftMessages[giftType];

        if (!selectedGift) return;

        giftMessage.replaceChildren();

        const heading = document.createElement("h3");
        heading.textContent = selectedGift.title;

        const paragraph = document.createElement("p");
        paragraph.textContent = selectedGift.message;

        giftMessage.append(heading, paragraph);

        giftMessage.classList.add("is-visible");

        giftMessage.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    }

    // Handle each gift button
    giftCards.forEach(card => {
        const button = card.querySelector(".gift-open-btn");

        if (!button) return;

        const giftType = card.dataset.gift;

        if (!giftMessages[giftType]) {
            button.disabled = true;
            return;
        }

        button.setAttribute("aria-expanded", "false");

        button.addEventListener("click", () => {
            const isAlreadyOpened =
                card.classList.contains("is-opened");

            if (isAlreadyOpened) {
                card.classList.remove("is-opened");

                button.textContent = "Tap to Open";
                button.setAttribute("aria-expanded", "false");

                return;
            }

            // Open selected gift
            card.classList.add("is-opened");

            button.textContent = "Opened ✓";
            button.setAttribute("aria-expanded", "true");

            // Show its corresponding message
            showGiftMessage(giftType);
        });
    });

});
