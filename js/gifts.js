
/* =========================================
   NASIA SURPRISE WEBSITE
   PHASE 10: INTERACTIVE GIFT SURPRISE
   IMPROVED VERSION
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    // =========================================
    // 1. SELECT GIFT SECTION ELEMENTS
    // =========================================

    const giftCards = document.querySelectorAll(".gift-card");

    const giftMessageContainer = document.getElementById(
        "gift-message-container"
    );

    const messageEmoji = document.getElementById(
        "gift-message-emoji"
    );

    const messageTitle = document.getElementById(
        "gift-message-title"
    );

    const messageText = document.getElementById(
        "gift-message-text"
    );

    const closeButton = document.getElementById(
        "close-gift-message"
    );

    const resetButton = document.getElementById(
        "gift-reset-btn"
    );

    // =========================================
    // 2. VALIDATE REQUIRED ELEMENTS
    // =========================================

    if (
        !giftCards.length ||
        !giftMessageContainer ||
        !messageEmoji ||
        !messageTitle ||
        !messageText
    ) {
        console.warn(
            "Gift section elements are missing. " +
            "Gift functionality could not be initialized."
        );

        return;
    }

    // =========================================
    // 3. GIFT MESSAGE DATA
    // =========================================

    const giftMessages = {
        bunny: {
            emoji: "🐰",
            title: "A Little Bunny Surprise!",
            message:
                "Your cheeks are like a little bunny’s softness, " +
                " so adorable that even the sweetest dreams feel jealous of them. " 
              
        },

        teddy: {
            emoji: "🧸",
            title: "A Teddy Bear Surprise!",
            message:
                "You have the warmth of a teddy bear, " +
                " making even the coldest, " +
                " loneliest days feel a little softer."
        },

        kitty: {
            emoji: "🐱",
            title: "A Cute Kitty Surprise!",
            message:
                "Your smile and lips remind me of a sleepy kitty, " +
                " quietly stealing hearts without even trying. " 
                
        },

        rainbow: {
            emoji: "🌈",
            title: "Your Little Rainbow!",
            message:
                "Your hair feels like a little rainbow in my imagination,  " +
                "carrying colors of happiness into my dullest days. " 
               
        }
    };

    // =========================================
    // 4. STATE MANAGEMENT
    // =========================================

    let activeGiftButton = null;
    let activeGiftCard = null;

    // =========================================
    // 5. RESET GIFT BUTTON STATES
    // =========================================

    function resetGiftStates() {
        giftCards.forEach(card => {
            const button = card.querySelector(".gift-box");

            if (!button) return;

            button.classList.remove("is-opened");

            button.setAttribute("aria-expanded", "false");

            card.classList.remove("is-opened");

            const openText = button.querySelector(
                ".gift-open-text"
            );

            if (openText) {
                openText.textContent = "Tap to Open";
            }
        });
    }

    // =========================================
    // 6. OPEN GIFT MESSAGE
    // =========================================

    function openGiftMessage(giftType, button, card) {
        const selectedGift = giftMessages[giftType];

        // Stop if the gift type is invalid
        if (!selectedGift) {
            console.warn("Unknown gift type:", giftType);
            return;
        }

        // Reset previously opened gift
        resetGiftStates();

        // Store the active gift
        activeGiftButton = button;
        activeGiftCard = card;

        // Update message content
        messageEmoji.textContent = selectedGift.emoji;
        messageTitle.textContent = selectedGift.title;
        messageText.textContent = selectedGift.message;

        // Show message container
        giftMessageContainer.hidden = false;

        giftMessageContainer.classList.add("is-visible");

        // Show message card animation
        const messageCard = giftMessageContainer.querySelector(
            ".gift-message-card"
        );

        if (messageCard) {
            messageCard.classList.add("is-visible");
        }

        // Update gift button state
        card.classList.add("is-opened");
        button.classList.add("is-opened");

        button.setAttribute("aria-expanded", "true");

        // Update button text
        const openText = button.querySelector(
            ".gift-open-text"
        );

        if (openText) {
            openText.textContent = "Opened ✓";
        }

        // Scroll to the gift message
        giftMessageContainer.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        // Move focus to close button
        if (closeButton) {
            closeButton.focus({
                preventScroll: true
            });
        }
    }

    // =========================================
    // 7. CLOSE GIFT MESSAGE
    // =========================================

    function closeGiftMessage(returnFocus = true) {
        // Hide animation state
        giftMessageContainer.classList.remove("is-visible");

        const messageCard = giftMessageContainer.querySelector(
            ".gift-message-card"
        );

        if (messageCard) {
            messageCard.classList.remove("is-visible");
        }

        // Hide message container
        giftMessageContainer.hidden = true;

        // Reset active button expanded state
        if (activeGiftButton) {
            activeGiftButton.setAttribute(
                "aria-expanded",
                "false"
            );
        }

        // Return focus to previously selected gift
        if (
            returnFocus &&
            activeGiftButton &&
            document.contains(activeGiftButton)
        ) {
            activeGiftButton.focus({
                preventScroll: true
            });
        }

        // Clear active references
        activeGiftButton = null;
        activeGiftCard = null;
    }

    // =========================================
    // 8. INITIALIZE ALL GIFT BUTTONS
    // =========================================

    giftCards.forEach(card => {
        const button = card.querySelector(".gift-box");

        if (!button) return;

        const giftType = button.dataset.gift;

        // Disable unknown gifts
        if (!giftMessages[giftType]) {
            button.disabled = true;

            console.warn(
                "Invalid gift type detected:",
                giftType
            );

            return;
        }

        // Initial accessibility state
        button.setAttribute("aria-expanded", "false");

        // Gift button click
        button.addEventListener("click", () => {
            openGiftMessage(
                giftType,
                button,
                card
            );
        });
    });

    // =========================================
    // 9. CLOSE BUTTON
    // =========================================

    if (closeButton) {
        closeButton.addEventListener("click", () => {
            closeGiftMessage(true);
        });
    }

    // =========================================
    // 10. RESET BUTTON
    // =========================================

    if (resetButton) {
        resetButton.addEventListener("click", () => {
            closeGiftMessage(false);

            resetGiftStates();

            const giftsSection = document.getElementById(
                "gifts-section"
            );

            if (giftsSection) {
                giftsSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    }

    // =========================================
    // 11. ESCAPE KEY SUPPORT
    // =========================================

    document.addEventListener("keydown", event => {
        if (
            event.key === "Escape" &&
            !giftMessageContainer.hidden
        ) {
            closeGiftMessage(true);
        }
    });

    // =========================================
    // 12. INITIAL CLEAN STATE
    // =========================================

    giftMessageContainer.hidden = true;

    giftMessageContainer.classList.remove("is-visible");

    const initialMessageCard = giftMessageContainer.querySelector(
        ".gift-message-card"
    );

    if (initialMessageCard) {
        initialMessageCard.classList.remove("is-visible");
    }

    resetGiftStates();

    console.log(
        "Gift Surprise System initialized successfully. 🎁"
    );
});
