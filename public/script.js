// =======================
// MODAL COUNTRY VIEW (FIXED)
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

    const map = {
        india: "India",
        japan: "Japan",
        france: "France",
        uae: "UAE",
        switzerland: "Switzerland",
        maldives: "Maldives"
    };

    const key = country.trim().toLowerCase();
    const finalCountry = map[key];

    if (!finalCountry || !countryCities[finalCountry]) return;

    title.innerText = "Explore " + finalCountry;
    cityList.innerHTML = "";

    countryCities[finalCountry].forEach(city => {
        const li = document.createElement("li");
        li.textContent = "📍 " + city;
        cityList.appendChild(li);
    });

    modal.style.display = "flex";
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
async function saveBooking(booking) {

    const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking)
    });

    return await response.json();
}


// =======================
// BOOKING FORM HANDLER
// =======================
document.getElementById("bookingForm")?.addEventListener("submit", async function (e) {
    e.preventDefault();

    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
        document.getElementById("bookingMessage").innerText =
            "Please login before booking a trip.";

        document.getElementById("bookingMessage").style.color = "red";

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);

        return;
    }

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

    await saveBooking(booking);
    await loadBookings();

    document.getElementById("bookingMessage").innerText =
        `Thank you ${booking.name}! Your booking is saved successfully.`;

    this.reset();
});


// =======================
// LOAD BOOKINGS (FIXED)
// =======================
async function loadBookings() {

    const container = document.getElementById("bookingsContainer");
    if (!container) return;

    const res = await fetch("/api/bookings");
    const data = await res.json();

    const bookings = Array.isArray(data) ? data : [];

    container.innerHTML = "";

    if (bookings.length === 0) {
        container.innerHTML = "<p>No bookings found.</p>";
        updateStats([]);
        return;
    }

    bookings.forEach((b, i) => {
        container.innerHTML += `
            <div class="booking-card">
                <h3>Booking ${i + 1}</h3>
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

    updateStats(bookings);
}


// =======================
// DELETE BOOKING
// =======================
async function deleteBooking(id) {

    await fetch(`/api/bookings/${id}`, {
        method: "DELETE"
    });

    loadBookings();
}


// =======================
// STATS (SAFE FIXED)
// =======================
function updateStats(bookings) {

    bookings = Array.isArray(bookings) ? bookings : [];

    const total = document.getElementById("totalBookings");
    const topPackageEl = document.getElementById("topPackage");
    const topCityEl = document.getElementById("topCity");

    if (bookings.length === 0) {
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
        (packageCount[a] || 0) > (packageCount[b] || 0) ? a : b
    );

    let topCity = Object.keys(cityCount).reduce((a, b) =>
        (cityCount[a] || 0) > (cityCount[b] || 0) ? a : b
    );

    if (topPackageEl) topPackageEl.innerText = topPackage || "-";
    if (topCityEl) topCityEl.innerText = topCity || "-";
}


// =======================
// INIT
// =======================
window.addEventListener("DOMContentLoaded", () => {
    loadBookings();
    updateNavbarUser();
});


// =======================
// PACKAGE SELECT
// =======================
function selectPackage(packageName, element) {

    const packageSelect = document.getElementById("package");
    const bookingSection = document.querySelector(".booking");

    if (packageSelect) {
        packageSelect.value = packageName;
    }

    document.querySelectorAll(".package-card").forEach(card => {
        card.classList.remove("active");
    });

    if (element) {
        element.classList.add("active");
    }

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

    if (countryMap[queryCity]) {
        queryCity = countryMap[queryCity];
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(queryCity)}&appid=${apiKey}&units=metric`;

    try {

        const response = await fetch(url);
        const data = await response.json();

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
        result.innerHTML = "❌ Network error";
    }
}


// =======================
// LOGIN STATUS
// =======================
function updateNavbarUser() {

    const authBtn = document.getElementById("authBtn");
    const userDisplay = document.getElementById("userDisplay");

    if (!authBtn || !userDisplay) return;

    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const user = JSON.parse(localStorage.getItem("travelmateUser"));

    if (isLoggedIn === "true" && user) {
        userDisplay.innerText = `👋 ${user.name}`;
        authBtn.innerText = "Logout";
    } else {
        userDisplay.innerText = "";
        authBtn.innerText = "Login/sign up";
    }
}

function handleAuth() {

    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true") {
        localStorage.removeItem("isLoggedIn");
        alert("Logged out successfully");
        location.reload();
    } else {
        window.location.href = "login.html";
    }
}

window.addEventListener("DOMContentLoaded", updateNavbarUser);