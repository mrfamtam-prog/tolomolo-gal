
document.addEventListener("DOMContentLoaded", () => {
    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // Respect the visitor's motion preferences.
    if (reducedMotion) return;

    // Add animation styles dynamically.
    const animationStyles = document.createElement("style");

    animationStyles.textContent = `
        .js-reveal {
            opacity: 0;
            transform: translateY(28px);
            transition:
                opacity 800ms ease,
                transform 800ms cubic-bezier(0.2, 0.7, 0.2, 1);
            will-change: opacity, transform;
        }

        .js-reveal.is-visible {
            opacity: 1;
            transform: translateY(0);
        }

        .js-reveal-delay-1 {
            transition-delay: 100ms;
        }

        .js-reveal-delay-2 {
            transition-delay: 200ms;
        }

        .js-reveal-delay-3 {
            transition-delay: 300ms;
        }

        @media (max-width: 600px) {
            .js-reveal {
                transform: translateY(18px);
                transition-duration: 650ms;
            }
        }
    `;

    document.head.appendChild(animationStyles);

    // Elements that will animate when they enter the screen.
    const revealSelectors = [
        ".welcome-container",
        ".gallery-heading",
        ".gallery-card",
        ".gallery-footer",
        ".birthday-container",
        ".birthday-message-card",
        ".countdown-box",
        ".gifts-heading",
        ".gift-card",
        ".ending-container"
    ];

    const revealElements = document.querySelectorAll(
        revealSelectors.join(", ")
    );

    // Add reveal classes and small staggered delays.
    revealElements.forEach((element, index) => {
        element.classList.add("js-reveal");

        if (element.matches(".gallery-card, .gift-card, .countdown-box")) {
            const delay = (index % 4) + 1;
            element.classList.add(`js-reveal-delay-${delay}`);
        }
    });

    // Fallback for browsers without IntersectionObserver.
    if (!("IntersectionObserver" in window)) {
        revealElements.forEach(element => {
            element.classList.add("is-visible");
        });
        return;
    }

    const observer = new IntersectionObserver(
        (entries, currentObserver) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    currentObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    revealElements.forEach(element => {
        observer.observe(element);
    });

    // Re-check elements after the vault unlocks and the site appears.
    document.addEventListener("nasiaVaultUnlocked", () => {
        requestAnimationFrame(() => {
            revealElements.forEach(element => {
                if (!element.classList.contains("is-visible")) {
                    observer.unobserve(element);
                    observer.observe(element);
                }
            });
        });
    });
});
