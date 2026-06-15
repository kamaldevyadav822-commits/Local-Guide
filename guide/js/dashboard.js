// =====================================
// Banaras Buddy Guide Dashboard
// =====================================

const guideStatus =
    document.getElementById("guideStatus");

const activeBookingContainer =
    document.getElementById("activeBooking");

// Guide state
let isAvailable = true;

// Current active booking
let activeBooking = null;

// -------------------------------------
// Toggle Guide Status
// -------------------------------------

function toggleGuideStatus() {

    isAvailable = !isAvailable;

    if (isAvailable) {

        guideStatus.innerHTML =
            "🟢 Available";

        showToast(
            "You are now available"
        );

    } else {

        guideStatus.innerHTML =
            "🔴 Busy";

        showToast(
            "You are now busy"
        );
    }
}

// -------------------------------------
// Status Click Event
// -------------------------------------

if (guideStatus) {

    guideStatus.addEventListener(
        "click",
        toggleGuideStatus
    );
}

// -------------------------------------
// Render Active Booking
// -------------------------------------

function renderActiveBooking(booking) {

    activeBooking = booking;

    if (!activeBookingContainer)
        return;

    activeBookingContainer.innerHTML =

        `
        <div class="request-card">

            <h3>
                Active Booking
            </h3>

            <p>
                <strong>Traveler:</strong>
                ${booking.travelerName}
            </p>

            <p>
                <strong>Guide:</strong>
                ${booking.guideName}
            </p>

            <p>
                <strong>Meeting Point:</strong>
                ${booking.meetingPoint}
            </p>

            <p>
                <strong>Date:</strong>
                ${booking.bookingDate}
            </p>

            <p>
                <strong>Time:</strong>
                ${booking.bookingTime}
            </p>

            <p>
                <strong>Duration:</strong>
                ${booking.duration}
            </p>

            <p>
                <strong>Status:</strong>
                🟢 Accepted
            </p>

        </div>
        `;
}

// -------------------------------------
// Clear Active Booking
// -------------------------------------

function clearActiveBooking() {

    activeBooking = null;

    activeBookingContainer.innerHTML =

        `
        <p>
            No active booking
        </p>
        `;
}

// -------------------------------------
// Toast Notification
// -------------------------------------

function showToast(message) {

    const existing =
        document.querySelector(
            ".booking-toast"
        );

    if (existing) {
        existing.remove();
    }

    const toast =
        document.createElement("div");

    toast.className =
        "booking-toast";

    toast.innerText =
        message;

    document.body.appendChild(
        toast
    );

    setTimeout(() => {

        toast.classList.add(
            "show"
        );

    }, 100);

    setTimeout(() => {

        toast.classList.remove(
            "show"
        );

        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 3000);
}

// -------------------------------------
// Load Existing Accepted Booking
// -------------------------------------

function loadAcceptedBooking() {

    const booking =
        localStorage.getItem(
            "latestBooking"
        );

    if (!booking) return;

    const parsed =
        JSON.parse(booking);

    if (
        parsed.status ===
        "accepted"
    ) {

        renderActiveBooking(
            parsed
        );
    }
}

// -------------------------------------
// Dashboard Init
// -------------------------------------

window.addEventListener(
    "load",
    () => {

        loadAcceptedBooking();
    }
);
