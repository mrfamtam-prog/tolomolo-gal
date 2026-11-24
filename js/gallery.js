
/* =========================================
   NASIA SURPRISE WEBSITE
   PHASE 9: INTERACTIVE PHOTO GALLERY
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const galleryImages = Array.from(
        document.querySelectorAll(".gallery-image")
    );

    if (galleryImages.length === 0) return;

    let currentIndex = 0;
    let lightbox = null;

    // Create lightbox only once
    function createLightbox() {
        if (lightbox) return;

        lightbox = document.createElement("div");
        lightbox.className = "gallery-lightbox";
        lightbox.setAttribute("role", "dialog");
        lightbox.setAttribute("aria-modal", "true");
        lightbox.setAttribute("aria-label", "Photo viewer");
        lightbox.hidden = true;

        lightbox.innerHTML = `
            <button class="lightbox-close"
                type="button"
                aria-label="Close photo viewer">
                &times;
            </button>

            <button class="lightbox-prev"
                type="button"
                aria-label="Previous photo">
                &#10094;
            </button>

            <div class="lightbox-content">
                <img class="lightbox-image" src="" alt="">
                <p class="lightbox-caption"></p>
                <span class="lightbox-counter"></span>
            </div>

            <button class="lightbox-next"
                type="button"
                aria-label="Next photo">
                &#10095;
            </button>
        `;

        document.body.appendChild(lightbox);

        lightbox.querySelector(".lightbox-close")
            .addEventListener("click", closeLightbox);

        lightbox.querySelector(".lightbox-prev")
            .addEventListener("click", showPrevious);

        lightbox.querySelector(".lightbox-next")
            .addEventListener("click", showNext);

        lightbox.addEventListener("click", event => {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Update the displayed photo
    function updateLightbox() {
        const image = galleryImages[currentIndex];

        const preview = lightbox.querySelector(".lightbox-image");
        const caption = lightbox.querySelector(".lightbox-caption");
        const counter = lightbox.querySelector(".lightbox-counter");

        preview.src = image.currentSrc || image.src;
        preview.alt = image.alt || "Gallery photo";

        const card = image.closest(".gallery-card");
        const heading = card
            ? card.querySelector(".gallery-caption h3")
            : null;

        caption.textContent = heading
            ? heading.textContent
            : "";

        counter.textContent =
            `${currentIndex + 1} / ${galleryImages.length}`;
    }

    // Open viewer
    function openLightbox(index) {
        createLightbox();

        currentIndex = index;
        updateLightbox();

        lightbox.hidden = false;
        document.body.classList.add("lightbox-open");

        lightbox.querySelector(".lightbox-close").focus();
    }

    // Close viewer
    function closeLightbox() {
        if (!lightbox || lightbox.hidden) return;

        lightbox.hidden = true;
        document.body.classList.remove("lightbox-open");

        galleryImages[currentIndex].focus();
    }

    // Previous photo
    function showPrevious() {
        currentIndex =
            (currentIndex - 1 + galleryImages.length) %
            galleryImages.length;

        updateLightbox();
    }

    // Next photo
    function showNext() {
        currentIndex =
            (currentIndex + 1) % galleryImages.length;

        updateLightbox();
    }

    // Make images keyboard accessible
    galleryImages.forEach((image, index) => {
        image.style.cursor = "zoom-in";
        image.setAttribute("tabindex", "0");
        image.setAttribute("role", "button");
        image.setAttribute(
            "aria-label",
            `Open gallery photo ${index + 1}`
        );

        image.addEventListener("click", () => {
            openLightbox(index);
        });

        image.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openLightbox(index);
            }
        });
    });

    // Keyboard navigation
    document.addEventListener("keydown", event => {
        if (!lightbox || lightbox.hidden) return;

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowLeft") {
            showPrevious();
        }

        if (event.key === "ArrowRight") {
            showNext();
        }
    });

});
