function showCountry(country){

    const modal =
    document.getElementById("countryModal");

    const title =
    document.getElementById("countryTitle");

    const cityList =
    document.getElementById("cityList");

    const countries = {

        india: [
            "Hyderabad",
            "Mumbai",
            "Delhi",
            "Goa",
            "Jaipur",
            "Agra",
            "Kerala"
        ],

        japan: [
            "Tokyo",
            "Kyoto",
            "Osaka",
            "Hiroshima",
            "Nara"
        ],

        france: [
            "Paris",
            "Nice",
            "Lyon",
            "Marseille"
        ],

        uae: [
            "Dubai",
            "Abu Dhabi",
            "Sharjah",
            "Fujairah"
        ],

        switzerland: [
            "Zurich",
            "Geneva",
            "Lucerne",
            "Interlaken"
        ],

        maldives: [
            "Male",
            "Maafushi",
            "Hulhumale",
            "Vaadhoo"
        ]
    };
    title.innerText =
    "Explore " +
    country.charAt(0).toUpperCase() +
    country.slice(1);
        

    cityList.innerHTML = "";

    countries[country].forEach(city => {

        cityList.innerHTML +=
        `<li>📍 ${city}</li>`;

    });

    modal.style.display = "block";
}

function closeModal(){
    document.getElementById("countryModal").style.display = "none";
}