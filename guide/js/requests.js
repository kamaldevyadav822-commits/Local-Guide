// =====================================
// Banaras Buddy Guide Requests Manager
// =====================================

const requestContainer =
    document.getElementById(
        "requestContainer"
    );

// -------------------------------------
// Load Pending Requests
// -------------------------------------

function loadRequests() {

    const bookingData =
        localStorage.getItem(
            "latestBooking"
        );

    if (!bookingData) {
        showEmptyState();
        return;
    }

    const booking =
        JSON.parse(bookingData);

    if (
        booking.status ===
        "accepted"
    ) {

        showAcceptedState();
        return;
    }

    if (
        booking.status ===
        "rejected"
    ) {

        showRejectedState();
        return;
    }

    renderRequest(
        booking
    );
}

// -------------------------------------
// Empty State
// -------------------------------------

function showEmptyState() {

    requestContainer.innerHTML =

        `
        <div class="empty-state">
            No requests available
        </div>
        `;
}

// -------------------------------------
// Accepted State
// -------------------------------------

function showAcceptedState() {

    requestContainer.innerHTML =

        `
        <div class="empty-state">
            Booking already accepted
        </div>
        `;
}

// -------------------------------------
// Rejected State
// -------------------------------------

function showRejectedState() {

    requestContainer.innerHTML =

        `
        <div class="empty-state">
            Booking rejected
        </div>
        `;
}

// -------------------------------------
// Render Request Card
// -------------------------------------

function renderRequest(booking) {

    requestContainer.innerHTML =

        `
        <div class="request-card">

            <h3>
                New Booking Request
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
                <strong>Notes:</strong>
                ${booking.notes || "None"}
            </p>

            <div class="request-actions">

                <button
                    class="accept-btn"
                    onclick="acceptBooking()"
                >
                    Accept
                </button>

                <button
                    class="reject-btn"
                    onclick="rejectBooking()"
                >
                    Reject
                </button>

            </div>

        </div>
        `;
}

// -------------------------------------
// Accept Booking
// -------------------------------------

function acceptBooking() {

    const bookingData =
        localStorage.getItem(
            "latestBooking"
        );

    if (!bookingData) return;

    const booking =
        JSON.parse(bookingData);

    booking.status =
        "accepted";

    localStorage.setItem(
        "latestBooking",
        JSON.stringify(
            booking
        )
    );

    if (
        typeof renderActiveBooking
        === "function"
    ) {

        renderActiveBooking(
            booking
        );
    }

    showToast(
        "Booking accepted"
    );

    loadRequests();
}

// -------------------------------------
// Reject Booking
// -------------------------------------

function rejectBooking() {

    const bookingData =
        localStorage.getItem(
            "latestBooking"
        );

    if (!bookingData) return;

    const booking =
        JSON.parse(bookingData);

    booking.status =
        "rejected";

    localStorage.setItem(
        "latestBooking",
        JSON.stringify(
            booking
        )
    );

    clearActiveBooking();

    showToast(
        "Booking rejected"
    );

    loadRequests();
}

// -------------------------------------
// Auto Refresh
// -------------------------------------

setInterval(() => {

    loadRequests();

}, 3000);

// -------------------------------------
// Init
// -------------------------------------

window.addEventListener(
    "load",
    () => {

        loadRequests();
    }
);
