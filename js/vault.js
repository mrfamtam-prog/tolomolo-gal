
/* ==========================================
   NASIA SECRET WORLD
   PHASE 01: SECRET VAULT UNLOCK SYSTEM
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    // ======================================
    // 01. GET HTML ELEMENTS
    // ======================================

    const vaultSection = document.getElementById("vault-section");

    const vaultForm = document.getElementById("vault-form");

    const vaultInput = document.getElementById("vault-pin");

    const vaultButton = document.getElementById("vault-unlock-btn");

    const vaultStatus = document.getElementById("vault-status");

    const vaultError = document.getElementById("vault-error");

    const vaultDoor = document.getElementById("vault-door");

    const siteContent = document.getElementById("site-content");


    // ======================================
    // 02. CHECK REQUIRED ELEMENTS
    // ======================================

    if (
        !vaultSection ||
        !vaultForm ||
        !vaultInput ||
        !vaultButton ||
        !vaultStatus ||
        !vaultError ||
        !siteContent
    ) {
        console.error("Vault initialization failed: HTML elements missing.");
        return;
    }


    // ======================================
    // 03. VAULT CONFIGURATION
    // ======================================

    // Demo PIN
    // This is a front-end demonstration, not
    // secure authentication.

    const CORRECT_PIN = "tolomolo gal";

    const OPENING_DURATION = 2400;

    let isUnlocking = false;

    let errorTimeout = null;


    // ======================================
    // 04. VAULT STATUS
    // ======================================

    function updateVaultStatus(message) {

        vaultStatus.textContent = message;

    }


    // ======================================
    // 05. WRONG PASSWORD FUNCTION
    // ======================================

    function showWrongPassword() {

        if (isUnlocking) return;

        clearTimeout(errorTimeout);

        vaultSection.classList.remove("wrong-password");

        // Restart animation
        void vaultSection.offsetWidth;

        vaultSection.classList.add("wrong-password");

        vaultError.textContent = "Incorrect password. Try again!";

        updateVaultStatus("ACCESS DENIED");

        errorTimeout = setTimeout(() => {

            vaultSection.classList.remove("wrong-password");

            vaultError.textContent = "";

            updateVaultStatus("ENTER ACCESS CODE");

        }, 1800);

        vaultInput.value = "";

        vaultInput.focus();

    }


    // ======================================
    // 06. CORRECT PASSWORD FUNCTION
    // ======================================

    function unlockVault() {

        if (isUnlocking) return;

        isUnlocking = true;

        clearTimeout(errorTimeout);

        // Remove previous error
        vaultSection.classList.remove("wrong-password");

        vaultError.textContent = "";

        // Update display
        updateVaultStatus("ACCESS GRANTED");

        // Disable input and button
        vaultInput.disabled = true;

        vaultButton.disabled = true;

        vaultButton.textContent = "UNLOCKING...";

        // Begin opening animation
        vaultSection.classList.add("is-unlocking");


        // Wait for vault animation
        setTimeout(() => {

            // Hide vault
            vaultSection.hidden = true;

            // Reveal main website
            siteContent.hidden = false;

            // Reset scroll position
            window.scrollTo({
                top: 0,
                behavior: "instant"
            });

            // Focus welcome section
            const welcomeSection = document.getElementById(
                "welcome-section"
            );

            if (welcomeSection) {
                welcomeSection.setAttribute("tabindex", "-1");
                welcomeSection.focus({ preventScroll: true });
            }

            // Dispatch custom event for other scripts
            document.dispatchEvent(
                new CustomEvent("nasiaVaultUnlocked")
            );

        }, OPENING_DURATION);

    }


    // ======================================
    // 07. PASSWORD FORM SUBMISSION
    // ======================================

    vaultForm.addEventListener("submit", (event) => {

        event.preventDefault();

        if (isUnlocking) return;

        const enteredPIN = vaultInput.value.trim();

        // Empty password
        if (!enteredPIN) {

            vaultError.textContent = "Please enter the password.";

            updateVaultStatus("PASSWORD REQUIRED");

            vaultInput.focus();

            return;

        }

        // Verify password
        if (enteredPIN === CORRECT_PIN) {

            unlockVault();

        } else {

            showWrongPassword();

        }

    });


    // ======================================
    // 08. CLEAR ERROR WHEN USER TYPES
    // ======================================

    vaultInput.addEventListener("input", () => {

        if (isUnlocking) return;

        clearTimeout(errorTimeout);

        vaultError.textContent = "";

        vaultSection.classList.remove("wrong-password");

        updateVaultStatus("ENTER ACCESS CODE");

    });


    // ======================================
    // 09. INITIALIZE VAULT
    // ======================================

    updateVaultStatus("ENTER ACCESS CODE");

    vaultInput.value = "";

    console.log("Nasia Secret World: Vault initialized successfully.");

});
