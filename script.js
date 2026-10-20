function sendMail() {
    let parms = {
        name : document.getElementById("name").value,
        email : document.getElementById("email").value,
        message : document.getElementById("message").value,
    }

    const statusEl = document.getElementById("formStatus");
    statusEl.style.display = "block";
    statusEl.style.color = "rgba(255, 255, 255, 0.7)";
    statusEl.textContent = "Sending message...";

    emailjs.send("hiepdrum", "hiepdrumprod", parms)
        .then(() => {
            statusEl.style.color = "rgb(160, 230, 139)"; // Success green color
            statusEl.textContent = "Message sent successfully!";

            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("message").value = "";

            setTimeout(() => {
                statusEl.style.display = "none";
            }, 3000);

        })
        .catch((err) => {
            console.error("Failed to send message:", err);
            statusEl.style.color = "rgb(221, 147, 147)"; // Error red color
            statusEl.textContent = "Failed to send. Please try again.";

            setTimeout(() => {
                statusEl.style.display = "none";
            }, 3000);
        });
}

const aboutImg = document.querySelector('.about-img-wrapper img');
if (aboutImg) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    observer.observe(aboutImg);
}

document.addEventListener('DOMContentLoaded', async () => {
    // Only run this logic if we are on the track detail page (checking if the title element exists)
    const pageTitle = document.getElementById('pageTitle');
    if (!pageTitle) return;

    try {
        const response = await fetch('tracks.json');
        const data = await response.json();
        const tracksData = data.tracks;

        const params = new URLSearchParams(window.location.search);
        const trackKey = params.get('track') || 'i-like-it';
        const track = tracksData[trackKey];

        if (track) {
            pageTitle.textContent = `${track.title} | HIEP DRUM`;
            document.getElementById('trackTitle').textContent = track.title;
            document.getElementById('trackArtist').textContent = `${track.artist} • ${track.year}`;
            document.getElementById('trackCover').src = track.cover;
            document.getElementById('audioSource').src = track.audio;
            document.getElementById('trackAudio').load();
            document.getElementById('price320').textContent = track.file320Price;
            document.getElementById('priceProject').textContent = track.projectPrice;
            document.getElementById('soundcloudLink').href = track.soundcloud;
        }
    } catch (err) {
        console.error("Could not load track data:", err);
    }

    const audio = document.getElementById('trackAudio');
    const vinyl = document.getElementById('vinylRecord');
    const playBtn = document.getElementById('vinylPlayBtn');

    if (audio && playBtn) {
        playBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (audio.paused) {
                audio.play().catch(err => console.error("Playback error:", err));
            } else {
                audio.pause();
            }
        });

        audio.addEventListener('play', () => {
            if (vinyl) vinyl.classList.add('is-playing');
            playBtn.classList.add('is-playing');
            playBtn.innerHTML = '&#10074;&#10074;';
        });

        audio.addEventListener('pause', () => {
            if (vinyl) vinyl.classList.remove('is-playing');
            playBtn.classList.remove('is-playing');
            playBtn.innerHTML = '&#9654;';
        });

        audio.addEventListener('ended', () => {
            if (vinyl) vinyl.classList.remove('is-playing');
            playBtn.classList.remove('is-playing');
            playBtn.innerHTML = '&#9654;';
        });
    }
});
