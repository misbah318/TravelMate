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


// ----------------------
// COUNTRY → CITY DROPDOWN
// ----------------------

const countrySelect = document.getElementById("country");
const citySelect = document.getElementById("city");

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


// ----------------------
// BOOKING FORM HANDLER
// ----------------------
document.getElementById("bookingForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const booking = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        country: document.getElementById("country").value,
        city: document.getElementById("city").value,
        date: document.getElementById("travelDate").value,
        travelers: document.getElementById("travelers").value,
        package: document.getElementById("package").value
    };

    // get existing bookings
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    // add new booking
    bookings.push(booking);

    // save back
    localStorage.setItem("bookings", JSON.stringify(bookings));

    document.getElementById("bookingMessage").innerText =
        `Thank you ${booking.name}! Your booking is saved successfully.`;

    this.reset();
});

function selectPackage(packageName) {

    const packageSelect = document.getElementById("package");
    const bookingSection = document.querySelector(".booking");

    // set package automatically
    packageSelect.value = packageName;

    // scroll to booking form
    bookingSection.scrollIntoView({ behavior: "smooth" });

}