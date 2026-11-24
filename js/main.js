
/* =========================================
   NASIA SURPRISE WEBSITE
   PHASE 7: MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const siteContent = document.getElementById("site-content");
    const welcomeSection = document.getElementById("welcome-section");
    const exploreButton = document.getElementById("explore-btn");
    const gallerySection = document.getElementById("gallery-section");

    /*
     * 1. INITIAL WEBSITE STATE
     *
     * The website content stays hidden until
     * the vault is successfully unlocked.
     */

    function initializeWebsite() {
        if (!siteContent) return;

        // Check whether the vault has been unlocked.
        const isUnlocked = siteContent.hidden === false;

        if (isUnlocked) {
            siteContent.classList.add("website-ready");
        }
    }

    /*
     * 2. VAULT UNLOCK EVENT
     *
     * vault.js dispatches this event after
     * successfully opening the vault.
     */

    document.addEventListener("nasiaVaultUnlocked", () => {
        if (!siteContent) return;

        siteContent.classList.add("website-ready");

        // Focus welcome section for accessibility.
        if (welcomeSection) {
            welcomeSection.setAttribute("tabindex", "-1");
            welcomeSection.focus({ preventScroll: true });
        }
    });

    /*
     * 3. EXPLORE BUTTON
     *
     * Clicking Explore smoothly moves the
     * visitor to the photo gallery.
     */

    if (exploreButton && gallerySection) {
        exploreButton.addEventListener("click", () => {
            gallerySection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    }

    /*
     * 4. GENERAL SECTION REVEAL
     *
     * Add a ready class when the website
     * becomes visible.
     */

    initializeWebsite();

    /*
     * 5. SMOOTH INTERNAL LINKS
     *
     * Handles links pointing to sections
     * within the same page.
     */

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });

    /*
     * 6. PREVENT EMPTY BUTTON ACTIONS
     *
     * Keep the page stable if a button
     * has no action assigned yet.
     */

    document.querySelectorAll("button").forEach(button => {
        if (button.type === "submit") return;

        button.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                button.blur();
            }
        });
    });

    /*
     * 7. PAGE VISIBILITY
     *
     * Avoid unnecessary animation work
     * while the browser tab is inactive.
     */

    document.addEventListener("visibilitychange", () => {
        document.documentElement.classList.toggle(
            "page-inactive",
            document.hidden
        );
    });

});
