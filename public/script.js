// =======================
// MODAL COUNTRY VIEW
// =======================
function showCountry(country) {

    const modal = document.getElementById("countryModal");
    const title = document.getElementById("countryTitle");
    const cityList = document.getElementById("cityList");

    const countryCities = {
        India: ["Hyderabad", "Mumbai", "Delhi", "Goa", "Jaipur", "Agra", "Kerala"],
        Japan: ["Tokyo", "Kyoto", "Osaka", "Hiroshima", "Nara"],
        France: ["Paris", "Nice", "Lyon", "Marseille"],
        UAE: ["Dubai", "Abu Dhabi", "Sharjah", "Fujairah"],
        Switzerland: ["Zurich", "Geneva", "Lucerne", "Interlaken"],
        Maldives: ["Male", "Maafushi", "Hulhumale", "Vaadhoo"]
    };

    const formattedCountry =
        country.charAt(0).toUpperCase() + country.slice(1).toLowerCase();

    title.innerText = "Explore " + formattedCountry;
    cityList.innerHTML = "";

    if (countryCities[formattedCountry]) {
        countryCities[formattedCountry].forEach(city => {
            cityList.innerHTML += `<li>📍 ${city}</li>`;
        });
    }

    modal.style.display = "block";
}

function closeModal() {
    document.getElementById("countryModal").style.display = "none";
}


// =======================
// COUNTRY → CITY DROPDOWN
// =======================

const countrySelect = document.getElementById("country");
const citySelect = document.getElementById("city");

if (countrySelect && citySelect) {

    const countryCities = {
        India: ["Hyderabad", "Mumbai", "Delhi", "Goa", "Jaipur", "Agra", "Kerala"],
        Japan: ["Tokyo", "Kyoto", "Osaka", "Hiroshima", "Nara"],
        France: ["Paris", "Nice", "Lyon", "Marseille"],
        UAE: ["Dubai", "Abu Dhabi", "Sharjah", "Fujairah"],
        Switzerland: ["Zurich", "Geneva", "Lucerne", "Interlaken"],
        Maldives: ["Male", "Maafushi", "Hulhumale", "Vaadhoo"]
    };

    countrySelect.addEventListener("change", function () {

        const selectedCountry = this.value;

        citySelect.innerHTML = '<option value="">Select City</option>';

        if (countryCities[selectedCountry]) {
            countryCities[selectedCountry].forEach(city => {
                citySelect.innerHTML += `<option value="${city}">${city}</option>`;
            });
        }
    });
}

// =======================
// SAVE BOOKING
// =======================
function saveBooking(booking) {
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    bookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(bookings));
}


// =======================
// BOOKING FORM HANDLER
// =======================
document.getElementById("bookingForm")?.addEventListener("submit", function (e) {
    e.preventDefault();

    const booking = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        country: document.getElementById("country").value,
        city: document.getElementById("city").value,
        date: document.getElementById("travelDate").value,
        travelers: document.getElementById("travelers").value,
        package: document.getElementById("package").value,
        id: Date.now()
    };

    saveBooking(booking);
    loadBookings();

    document.getElementById("bookingMessage").innerText =
        `Thank you ${booking.name}! Your booking is saved successfully.`;

    this.reset();
});


// =======================
// LOAD BOOKINGS
// =======================
function loadBookings() {

    const container = document.getElementById("bookingsContainer");
    if (!container) return;

    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    container.innerHTML = "";

    if (bookings.length === 0) {
        container.innerHTML = "<p>No bookings found.</p>";
    } else {

        bookings.forEach((b, index) => {

            container.innerHTML += `
                <div class="booking-card">
                    <h3>Booking ${index + 1}</h3>

                    <p><b>Name:</b> ${b.name}</p>
                    <p><b>Email:</b> ${b.email}</p>
                    <p><b>Country:</b> ${b.country}</p>
                    <p><b>City:</b> ${b.city}</p>
                    <p><b>Date:</b> ${b.date}</p>
                    <p><b>Travelers:</b> ${b.travelers}</p>
                    <p><b>Package:</b> ${b.package}</p>

                    <button onclick="deleteBooking(${b.id})">Delete</button>
                </div>
            `;
        });
    }

    updateStats(bookings);
}


// =======================
// DELETE BOOKING (ID BASED - FIXED)
// =======================
function deleteBooking(id) {

    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    bookings = bookings.filter(b => b.id !== id);

    localStorage.setItem("bookings", JSON.stringify(bookings));

    loadBookings();
}


// =======================
// STATS
// =======================
function updateStats(bookings) {

    const total = document.getElementById("totalBookings");
    const topPackageEl = document.getElementById("topPackage");
    const topCityEl = document.getElementById("topCity");

    if (!bookings || bookings.length === 0) {
        if (total) total.innerText = 0;
        if (topPackageEl) topPackageEl.innerText = "-";
        if (topCityEl) topCityEl.innerText = "-";
        return;
    }

    if (total) total.innerText = bookings.length;

    let packageCount = {};
    let cityCount = {};

    bookings.forEach(b => {

        packageCount[b.package] = (packageCount[b.package] || 0) + 1;
        cityCount[b.city] = (cityCount[b.city] || 0) + 1;

    });

    let topPackage = Object.keys(packageCount).reduce((a, b) =>
        packageCount[a] > packageCount[b] ? a : b
    );

    let topCity = Object.keys(cityCount).reduce((a, b) =>
        cityCount[a] > cityCount[b] ? a : b
    );

    if (topPackageEl) topPackageEl.innerText = topPackage;
    if (topCityEl) topCityEl.innerText = topCity;
}

// =======================
// INIT
// =======================
window.addEventListener("DOMContentLoaded", loadBookings);


// =======================
// PACKAGE SELECT
// =======================
function selectPackage(packageName, element) {

    const packageSelect = document.getElementById("package");
    const bookingSection = document.querySelector(".booking");

    // set value
    if (packageSelect) {
        packageSelect.value = packageName;
    }

    // remove active class from all cards
    document.querySelectorAll(".package-card").forEach(card => {
        card.classList.remove("active");
    });

    // highlight selected card
    if (element) {
        element.classList.add("active");
    }

    // scroll to booking form
    if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: "smooth" });
    }
}
// =======================
// WEATHER FEATURE
// =======================

async function getWeather() {

    const input = document.getElementById("weatherCity").value.trim();
    const result = document.getElementById("weatherResult");

    if (!input) {
        result.innerHTML = "Please enter a city or country";
        return;
    }

    const apiKey = "90a67cd15fde12d269e724ef652a4e11";

    const countryMap = {
        india: "Hyderabad",
        japan: "Tokyo",
        france: "Paris",
        uae: "Dubai",
        switzerland: "Zurich",
        maldives: "Male"
    };

    let queryCity = input.toLowerCase();

    // If it's a country → convert
    if (countryMap[queryCity]) {
        queryCity = countryMap[queryCity];
    }

    console.log("FINAL CITY SENT:", queryCity); // DEBUG

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(queryCity)}&appid=${apiKey}&units=metric`;

    try {

        const response = await fetch(url);
        const data = await response.json();

        console.log("API RESPONSE:", data); // DEBUG

        // IMPORTANT FIX: cod is string
        if (data.cod !== 200 && data.cod !== "200") {
            result.innerHTML = `❌ City not found: ${queryCity}`;
            return;
        }

        result.innerHTML = `
            <div class="weather-card">
                <h3>${data.name}</h3>
                <p>🌡 Temperature: ${data.main.temp}°C</p>
                <p>🌥 Weather: ${data.weather[0].main}</p>
                <p>💧 Humidity: ${data.main.humidity}%</p>
            </div>
        `;

    } catch (error) {
        console.error(error);
        result.innerHTML = "❌ Network error";
    }
}