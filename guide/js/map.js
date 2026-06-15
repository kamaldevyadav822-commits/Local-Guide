// =====================================
// Banaras Buddy Guide Map Manager
// =====================================

let guideMap;
let guideMarker;
let travelerMarker;
let routeLine;

// Default Varanasi coordinates
const GUIDE_LOCATION = {
    lat: 25.3176,
    lng: 82.9739
};

// -------------------------------------
// Initialize Map
// -------------------------------------

function initializeGuideMap() {

    const mapElement =
        document.getElementById("map");

    if (!mapElement) return;

    if (guideMap) {
        guideMap.remove();
    }

    guideMap = L.map("map").setView(
        [
            GUIDE_LOCATION.lat,
            GUIDE_LOCATION.lng
        ],
        14
    );

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution:
                "&copy; OpenStreetMap contributors"
        }
    ).addTo(guideMap);

    guideMarker = L.marker(
        [
            GUIDE_LOCATION.lat,
            GUIDE_LOCATION.lng
        ]
    )
    .addTo(guideMap)
    .bindPopup(
        "🧭 Guide Location"
    );

    loadTravelerLocation();
}

// -------------------------------------
// Load Traveler Location
// -------------------------------------

function loadTravelerLocation() {

    let travelerLat =
        GUIDE_LOCATION.lat + 0.006;

    let travelerLng =
        GUIDE_LOCATION.lng + 0.005;

    travelerMarker = L.marker(
        [
            travelerLat,
            travelerLng
        ]
    )
    .addTo(guideMap)
    .bindPopup(
        "📍 Traveler"
    );

    drawRoute(
        GUIDE_LOCATION.lat,
        GUIDE_LOCATION.lng,
        travelerLat,
        travelerLng
    );

    calculateDistance(
        GUIDE_LOCATION.lat,
        GUIDE_LOCATION.lng,
        travelerLat,
        travelerLng
    );
}

// -------------------------------------
// Draw Route Line
// -------------------------------------

function drawRoute(
    guideLat,
    guideLng,
    travelerLat,
    travelerLng
) {

    if (routeLine) {
        guideMap.removeLayer(
            routeLine
        );
    }

    routeLine = L.polyline(
        [
            [
                guideLat,
                guideLng
            ],
            [
                travelerLat,
                travelerLng
            ]
        ],
        {
            weight: 4,
            opacity: 0.8
        }
    ).addTo(guideMap);

    guideMap.fitBounds(
        routeLine.getBounds(),
        {
            padding: [40, 40]
        }
    );
}

// -------------------------------------
// Calculate Distance
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

    updateDistanceBadge(
        distance
    );
}

// -------------------------------------
// Distance Badge
// -------------------------------------

function updateDistanceBadge(
    distance
) {

    let badge =
        document.getElementById(
            "distanceBadge"
        );

    if (!badge) {

        badge =
            document.createElement(
                "div"
            );

        badge.id =
            "distanceBadge";

        badge.className =
            "distance-badge";

        const container =
            document.querySelector(
                ".map-section .glass-card"
            );

        container.prepend(
            badge
        );
    }

    badge.innerHTML =
        `📏 Distance: ${distance} km`;
}

// -------------------------------------
// Open Navigation
// -------------------------------------

function openNavigation() {

    const destinationLat =
        GUIDE_LOCATION.lat + 0.006;

    const destinationLng =
        GUIDE_LOCATION.lng + 0.005;

    const url =
        `https://www.google.com/maps/dir/?api=1&destination=${destinationLat},${destinationLng}`;

    window.open(
        url,
        "_blank"
    );
}

// -------------------------------------
// Bind Button
// -------------------------------------

function bindNavigationButton() {

    const navBtn =
        document.getElementById(
            "navigateBtn"
        );

    if (!navBtn) return;

    navBtn.addEventListener(
        "click",
        openNavigation
    );
}

// -------------------------------------
// Init
// -------------------------------------

window.addEventListener(
    "load",
    () => {

        initializeGuideMap();

        bindNavigationButton();
    }
);
