// =====================================
// Banaras Buddy Booking Manager
// Traveler Side
// =====================================

const bookingForm =
    document.getElementById("bookingForm");

const bookingStatus =
    document.getElementById("bookingStatus");

// Current booking object
let currentBooking = null;

// -------------------------------------
// Update Status UI
// -------------------------------------

function updateBookingStatus(status) {

    if (!bookingStatus) return;

    let className = "";
    let label = "";

    switch (status) {

        case "accepted":
            className = "accepted";
            label = "🟢 Accepted";
            break;

        case "rejected":
            className = "rejected";
            label = "🔴 Rejected";
            break;

        default:
            className = "pending";
            label = "🟠 Pending";
    }

    bookingStatus.innerHTML =
        `<span class="${className}">
            ${label}
        </span>`;
}

// -------------------------------------
// Create Booking Object
// -------------------------------------

function createBookingObject() {

    const travelerName =
        document.getElementById("travelerName").value;

    const meetingPoint =
        document.getElementById("meetingPoint").value;

    const bookingDate =
        document.getElementById("bookingDate").value;

    const bookingTime =
        document.getElementById("bookingTime").value;

    const duration =
        document.getElementById("duration").value;

    const notes =
        document.getElementById("notes").value;

    return {

        bookingId:
            "BK-" +
            Date.now(),

        guideName:
            getSelectedGuide(),

        travelerName,

        meetingPoint,

        bookingDate,

        bookingTime,

        duration,

        notes,

        status: "pending",

        createdAt:
            new Date().toISOString()
    };
}

// -------------------------------------
// Booking Submit
// -------------------------------------

if (bookingForm) {

    bookingForm.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();

            currentBooking =
                createBookingObject();

            console.log(
                "Booking Created:",
                currentBooking
            );

            updateBookingStatus(
                "pending"
            );

            localStorage.setItem(
                "latestBooking",
                JSON.stringify(
                    currentBooking
                )
            );

            closeBookingModal();

            showToast(
                "Booking request sent successfully!"
            );
        }
    );
}

// -------------------------------------
// Load Existing Booking
// -------------------------------------

function loadBooking() {

    const savedBooking =
        localStorage.getItem(
            "latestBooking"
        );

    if (!savedBooking) return;

    currentBooking =
        JSON.parse(savedBooking);

    updateBookingStatus(
        currentBooking.status
    );
}

loadBooking();

// -------------------------------------
// Toast Notification
// -------------------------------------

function showToast(message) {

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
// Demo Functions
// -------------------------------------
// Will be replaced later by Firebase
// -------------------------------------

function simulateAcceptBooking() {

    if (!currentBooking) return;

    currentBooking.status =
        "accepted";

    updateBookingStatus(
        "accepted"
    );

    localStorage.setItem(
        "latestBooking",
        JSON.stringify(
            currentBooking
        )
    );

    showToast(
        "Guide accepted your booking"
    );
}

function simulateRejectBooking() {

    if (!currentBooking) return;

    currentBooking.status =
        "rejected";

    updateBookingStatus(
        "rejected"
    );

    localStorage.setItem(
        "latestBooking",
        JSON.stringify(
            currentBooking
        )
    );

    showToast(
        "Guide rejected your booking"
    );
}
