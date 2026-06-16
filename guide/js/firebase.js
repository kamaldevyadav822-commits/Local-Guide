import { db } from "../../shared/firebase-config.js";

import {
    collection,
    query,
    orderBy,
    limit,
    onSnapshot,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

// =====================================
// Current Firestore Document
// =====================================

let currentDocId = null;

// =====================================
// Listen For New Bookings
// =====================================

function listenForBookings() {

    const q = query(
        collection(db, "bookings"),
        orderBy("createdAt", "desc"),
        limit(1)
    );

    onSnapshot(q, (snapshot) => {

        snapshot.forEach((document) => {

            currentDocId = document.id;

            const booking =
                document.data();

            renderFirestoreRequest(
                booking
            );

        });

    });

}

// =====================================
// Render Request
// =====================================

function renderFirestoreRequest(
    booking
) {

    const requestContainer =
        document.getElementById(
            "requestContainer"
        );

    if (!requestContainer)
        return;

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

        <div class="request-actions">

            <button
                class="accept-btn"
                onclick="acceptBookingFirestore()"
            >
                Accept
            </button>

            <button
                class="reject-btn"
                onclick="rejectBookingFirestore()"
            >
                Reject
            </button>

        </div>

    </div>
    `;
}

// =====================================
// Accept Booking
// =====================================

window.acceptBookingFirestore =
async function () {

    if (!currentDocId)
        return;

    try {

        await updateDoc(
            doc(
                db,
                "bookings",
                currentDocId
            ),
            {
                status:
                    "accepted"
            }
        );

        showToast(
            "Booking Accepted"
        );

    } catch (error) {

        console.error(error);
    }
};

// =====================================
// Reject Booking
// =====================================

window.rejectBookingFirestore =
async function () {

    if (!currentDocId)
        return;

    try {

        await updateDoc(
            doc(
                db,
                "bookings",
                currentDocId
            ),
            {
                status:
                    "rejected"
            }
        );

        showToast(
            "Booking Rejected"
        );

    } catch (error) {

        console.error(error);
    }
};

// =====================================
// Start Listener
// =====================================

window.addEventListener(
    "load",
    () => {

        listenForBookings();
    }
);
window.updateJourneyState =
async function(status){

    if(!currentDocId) return;

    try{

        await updateDoc(
            doc(
                db,
                "bookings",
                currentDocId
            ),
            {
                journeyStatus:status
            }
        );

        showToast(status);

    }catch(error){

        console.error(error);
    }
};

window.updatePaymentState =
async function(payment){

    if(!currentDocId) return;

    try{

        await updateDoc(
            doc(
                db,
                "bookings",
                currentDocId
            ),
            {
                payment:payment
            }
        );

        showToast(
            "Payment Confirmed"
        );

    }catch(error){

        console.error(error);
    }
};
