// =========================
// Banaras Buddy Traveler UI
// =========================

const bookingModal = document.getElementById("bookingModal");
const findGuideBtn = document.getElementById("findGuideBtn");

// Selected guide
let selectedGuide = null;

// -------------------------
// Open Booking Modal
// -------------------------
function openBookingModal(guideName) {

    selectedGuide = guideName;

    bookingModal.classList.add("active");

    document.body.style.overflow = "hidden";

    console.log("Selected Guide:", guideName);
}

// -------------------------
// Close Booking Modal
// -------------------------
function closeBookingModal() {

    bookingModal.classList.remove("active");

    document.body.style.overflow = "auto";
}

// -------------------------
// Close on outside click
// -------------------------
bookingModal.addEventListener("click", (e) => {

    if (e.target === bookingModal) {
        closeBookingModal();
    }
});

// -------------------------
// Find Guide Button
// -------------------------
if (findGuideBtn) {

    findGuideBtn.addEventListener("click", () => {

        const guideSection =
            document.querySelector(".guide-section");

        if (guideSection) {

            guideSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
}

// -------------------------
// Escape Key Support
// -------------------------
document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {
        closeBookingModal();
    }
});

// -------------------------
// Card Entrance Animation
// -------------------------
window.addEventListener("load", () => {

    const cards =
        document.querySelectorAll(".guide-card");

    cards.forEach((card, index) => {

        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";

        setTimeout(() => {

            card.style.transition =
                "all 0.5s ease";

            card.style.opacity = "1";
            card.style.transform =
                "translateY(0)";

        }, index * 150);

    });

});

// -------------------------
// Button Ripple Effect
// -------------------------
document.addEventListener("click", (e) => {

    const btn =
        e.target.closest(
            ".book-btn, .primary-btn, .submit-booking, .navigate-btn"
        );

    if (!btn) return;

    const ripple =
        document.createElement("span");

    const rect =
        btn.getBoundingClientRect();

    const size =
        Math.max(rect.width, rect.height);

    ripple.style.width =
        ripple.style.height =
        size + "px";

    ripple.style.left =
        e.clientX - rect.left - size / 2 + "px";

    ripple.style.top =
        e.clientY - rect.top - size / 2 + "px";

    ripple.classList.add("ripple");

    btn.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
});

// -------------------------
// Export Guide Name
// -------------------------
function getSelectedGuide() {
    return selectedGuide;
}
