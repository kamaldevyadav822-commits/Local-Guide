// =====================================
// Banaras Buddy Map Manager
// Traveler Side
// =====================================

let map;
let travelerMarker;
let guideMarker;

const DEFAULT_GUIDE_LOCATION = {
    lat: 25.3176,
    lng: 82.9739,
    name: "Guide Location"
};

// -------------------------------------
// Initialize Map
// -------------------------------------

function initMap(lat, lng) {

    if (map) {
        map.remove();
    }

    map = L.map("map").setView(
        [lat, lng],
        15
    );

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution:
                "&copy; OpenStreetMap contributors"
        }
    ).addTo(map);

    travelerMarker = L.marker(
        [lat, lng]
    )
    .addTo(map)
    .bindPopup(
        "📍 You are here"
    );

    guideMarker = L.marker(
        [
            DEFAULT_GUIDE_LOCATION.lat,
            DEFAULT_GUIDE_LOCATION.lng
        ]
    )
    .addTo(map)
    .bindPopup(
        "🧭 Guide"
    );

    drawConnectionLine(
        lat,
        lng,
        DEFAULT_GUIDE_LOCATION.lat,
        DEFAULT_GUIDE_LOCATION.lng
    );

    calculateDistance(
        lat,
        lng,
        DEFAULT_GUIDE_LOCATION.lat,
        DEFAULT_GUIDE_LOCATION.lng
    );
}

// -------------------------------------
// Draw Route Line
// -------------------------------------

function drawConnectionLine(
    travelerLat,
    travelerLng,
    guideLat,
    guideLng
) {

    L.polyline(
        [
            [travelerLat, travelerLng],
            [guideLat, guideLng]
        ],
        {
            weight: 4,
            opacity: 0.8
        }
    ).addTo(map);
}

// -------------------------------------
// Distance Calculator
// -------------------------------------

function calculateDistance(
    lat1,
    lon1,
    lat2,
    lon2
) {

    const R = 6371;

    const dLat =
        (lat2 - lat1) *
        Math.PI / 180;

    const dLon =
        (lon2 - lon1) *
        Math.PI / 180;

    const a =
        Math.sin(dLat / 2) *
        Math.sin(dLat / 2) +

        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *

        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c =
        2 *
        Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );

    const distance =
        (R * c).toFixed(2);

    console.log(
        `Distance: ${distance} km`
    );

    addDistanceBadge(distance);
}

// -------------------------------------
// Distance Badge
// -------------------------------------

function addDistanceBadge(distance) {

    let badge =
        document.getElementById(
            "distanceBadge"
        );

    if (!badge) {

        badge =
            document.createElement("div");

        badge.id =
            "distanceBadge";

        badge.className =
            "distance-badge";

        const mapSection =
            document.querySelector(
                ".map-section .glass-card"
            );

        mapSection.prepend(
            badge
        );
    }

    badge.innerHTML =
        `📏 Distance: ${distance} km`;
}

// -------------------------------------
// GPS Location
// -------------------------------------

function getTravelerLocation() {

    if (
        !navigator.geolocation
    ) {

        console.warn(
            "Geolocation not supported"
        );

        initMap(
            25.3176,
            82.9739
        );

        return;
    }

    navigator.geolocation.getCurrentPosition(

        (position) => {

            const lat =
                position.coords.latitude;

            const lng =
                position.coords.longitude;

            initMap(
                lat,
                lng
            );
        },

        (error) => {

            console.error(error);

            initMap(
                25.3176,
                82.9739
            );
        }

    );
}

// -------------------------------------
// Navigation Button
// -------------------------------------

function openNavigation() {

    const lat =
        DEFAULT_GUIDE_LOCATION.lat;

    const lng =
        DEFAULT_GUIDE_LOCATION.lng;

    window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
        "_blank"
    );
}

// -------------------------------------
// Attach Button
// -------------------------------------

window.addEventListener(
    "load",
    () => {

        getTravelerLocation();

        const navBtn =
            document.querySelector(
                ".navigate-btn"
            );

        if (navBtn) {

            navBtn.addEventListener(
                "click",
                openNavigation
            );
        }
    }
);
