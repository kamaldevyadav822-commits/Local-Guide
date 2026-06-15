import { db } from "../../shared/firebase-config.js";

import {
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    limit
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

// ======================================
// Create Booking
// ======================================

async function saveBookingToFirestore(booking) {

    try {

        await addDoc(
            collection(db, "bookings"),
            booking
        );

        console.log(
            "Booking saved successfully"
        );

    } catch (error) {

        console.error(
            "Firestore Error:",
            error
        );
    }
}

// ======================================
// Listen For Status Updates
// ======================================

function listenForBookingUpdates() {

    const bookingStatus =
        document.getElementById(
            "bookingStatus"
        );

    const q = query(
        collection(db, "bookings"),
        orderBy(
            "createdAt",
            "desc"
        ),
        limit(1)
    );

    onSnapshot(q, (snapshot) => {

        snapshot.forEach((doc) => {

            const booking =
                doc.data();

            if (!bookingStatus)
                return;

            switch (
                booking.status
            ) {

                case "accepted":

                    bookingStatus.innerHTML =
                        `
                        <span class="accepted">
                            🟢 Accepted
                        </span>
                        `;

                    break;

                case "rejected":

                    bookingStatus.innerHTML =
                        `
                        <span class="rejected">
                            🔴 Rejected
                        </span>
                        `;

                    break;

                default:

                    bookingStatus.innerHTML =
                        `
                        <span class="pending">
                            🟠 Pending
                        </span>
                        `;
            }
        });

    });

}

// ======================================
// Hook Existing Form
// ======================================

window.addEventListener(
    "load",
    () => {

        listenForBookingUpdates();

        const bookingForm =
            document.getElementById(
                "bookingForm"
            );

        if (!bookingForm)
            return;

        bookingForm.addEventListener(
            "submit",
            async function () {

                setTimeout(
                    async () => {

                        const latest =
                            JSON.parse(
                                localStorage.getItem(
                                    "latestBooking"
                                )
                            );

                        if (
                            latest
                        ) {

                            await saveBookingToFirestore(
                                latest
                            );
                        }

                    },
                    200
                );

            }
        );

    }
);
