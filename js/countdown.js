
/* =========================================
   NASIA SURPRISE WEBSITE
   PHASE 8: LIVE BIRTHDAY COUNTDOWN
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const countdownContainer =
        document.getElementById("birthday-countdown");

    if (!countdownContainer) return;

    // Target birthday: October 25, 2027
    const targetDate = new Date(
        countdownContainer.dataset.target ||
        "2027-10-25T00:00:00+06:00"
    ).getTime();

    // Create countdown display elements
    function createCountdownElements() {
        const units = [
            { id: "days", label: "Days" },
            { id: "hours", label: "Hours" },
            { id: "minutes", label: "Minutes" },
            { id: "seconds", label: "Seconds" }
        ];

        countdownContainer.innerHTML = "";

        units.forEach(unit => {
            const box = document.createElement("div");
            box.className = "countdown-box";

            const value = document.createElement("span");
            value.className = "countdown-value";
            value.id = `countdown-${unit.id}`;
            value.textContent = "00";

            const label = document.createElement("span");
            label.className = "countdown-unit";
            label.textContent = unit.label;

            box.append(value, label);
            countdownContainer.appendChild(box);
        });
    }

    // Format numbers with two digits
    function formatNumber(number) {
        return String(number).padStart(2, "0");
    }

    // Update countdown
    function updateCountdown() {
        const now = Date.now();
        const difference = targetDate - now;

        if (difference <= 0) {
            countdownContainer.innerHTML = `
                <div class="birthday-message-card">
                    <h2>Happy Birthday, Nasia! 🎂</h2>
                    <p>
                        Wishing you a wonderful year filled
                        with happiness, success and beautiful memories.
                    </p>
                </div>
            `;

            clearInterval(countdownInterval);
            return;
        }

        const days = Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        );

        const minutes = Math.floor(
            (difference / (1000 * 60)) % 60
        );

        const seconds = Math.floor(
            (difference / 1000) % 60
        );

        const values = {
            days,
            hours,
            minutes,
            seconds
        };

        Object.entries(values).forEach(([unit, value]) => {
            const element = document.getElementById(
                `countdown-${unit}`
            );

            if (element) {
                element.textContent =
                    unit === "days"
                        ? String(value)
                        : formatNumber(value);
            }
        });
    }

    // Initialize countdown
    createCountdownElements();
    updateCountdown();

    // Update every second
    const countdownInterval = setInterval(
        updateCountdown,
        1000
    );

    // Clean up if the page is unloaded
    window.addEventListener("pagehide", () => {
        clearInterval(countdownInterval);
    }, { once: true });

});
