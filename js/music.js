
document.addEventListener("DOMContentLoaded", () => {
    const music = document.getElementById("background-music");
    const musicToggle = document.getElementById("music-toggle");

    if (!music || !musicToggle) {
        console.warn("Music elements were not found in index.html");
        return;
    }

    let isPlaying = false;

    // Update the music button appearance and accessibility.
    function updateMusicButton() {
        musicToggle.textContent = isPlaying ? "♫ Music: On" : "♫ Music: Off";
        musicToggle.setAttribute("aria-pressed", String(isPlaying));
        musicToggle.setAttribute(
            "aria-label",
            isPlaying ? "Turn background music off" : "Turn background music on"
        );
    }

    // Play background music.
    async function playMusic() {
        try {
            await music.play();
            isPlaying = true;
            updateMusicButton();
        } catch (error) {
            isPlaying = false;
            updateMusicButton();
            console.info("Music playback needs user interaction.", error);
        }
    }

    // Pause background music.
    function pauseMusic() {
        music.pause();
        isPlaying = false;
        updateMusicButton();
    }

    // Toggle music when the button is clicked.
    musicToggle.addEventListener("click", () => {
        if (music.paused) {
            playMusic();
        } else {
            pauseMusic();
        }
    });

    // Try to start music after the vault has been unlocked.
    document.addEventListener("nasiaVaultUnlocked", () => {
        playMusic();
    });

    // Keep the button synchronized with the audio element.
    music.addEventListener("play", () => {
        isPlaying = true;
        updateMusicButton();
    });

    music.addEventListener("pause", () => {
        isPlaying = false;
        updateMusicButton();
    });

    music.addEventListener("ended", () => {
        isPlaying = false;
        updateMusicButton();
    });

    updateMusicButton();
});
