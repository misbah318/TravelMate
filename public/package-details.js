const packageName = localStorage.getItem("selectedPackage");

const packageTitle = document.getElementById("packageTitle");
const packageInfo = document.getElementById("packageInfo");
const hero = document.querySelector(".package-hero");

let images = [];

if (packageName === "Explorer") {
    images = [
        "images/explorer-banner.jpg",
        "images/explorer2-banner.jpg"
    ];

    packageInfo.textContent = "3 Days / 2 Nights • Starting ₹15,999";
}
else if (packageName === "Adventure") {
    images = [
        "images/adventure-banner.jpg",
        "images/adventure2-banner.jpg"
    ];

    packageInfo.textContent = "5 Days / 4 Nights • Starting ₹29,999";
}
else {
    images = [
        "images/luxury-banner.jpg",
        "images/luxury2-banner.jpg"
    ];

    packageInfo.textContent = "7 Days / 6 Nights • Starting ₹49,999";
}

hero.style.backgroundImage = `url('${images[0]}')`;

packageTitle.textContent = packageName + " Package";

const countrySelect = document.getElementById("countrySelect");
const citySelect = document.getElementById("citySelect");

const countryCities = {
    India: ["Hyderabad", "Mumbai", "Delhi", "Goa", "Kerala"],
    Japan: ["Tokyo", "Osaka", "Kyoto"],
    France: ["Paris", "Nice", "Lyon"],
    UAE: ["Dubai", "Abu Dhabi"],
    Switzerland: ["Zurich", "Geneva"],
    Maldives: ["Male", "Addu City"]
};
countrySelect.addEventListener("change", () => {

    const selectedCountry = countrySelect.value;

    citySelect.innerHTML =
        '<option value="">Select City</option>';

    if (countryCities[selectedCountry]) {

        countryCities[selectedCountry].forEach(city => {

            const option = document.createElement("option");

            option.value = city;
            option.textContent = city;

            citySelect.appendChild(option);

        });

    }

});
const packageDetails = {
    Explorer: {

    India: {
        base: {
            stay: 6000,
            food: 2500,
            transport: 2000,
            tickets: 3000
        },
        cities: {
            Hyderabad: {
                mod: 1.00,
                hotel: "Hotel Grand Palace",
                veg: "Paneer Butter Masala, Veg Biryani, Naan",
                nonveg: "Chicken Biryani, Butter Chicken, Fish Fry"
            },
            Mumbai: {
                mod: 1.05,
                hotel: "Sea View Residency",
                veg: "Pav Bhaji, Veg Pulao, Dal Fry",
                nonveg: "Chicken Curry, Fish Curry, Egg Masala"
            },
            Delhi: {
                mod: 1.03,
                hotel: "Capital Comfort Inn",
                veg: "Paneer Tikka, Naan, Veg Curry",
                nonveg: "Butter Chicken, Kebabs, Egg Curry"
            },
            Goa: {
                mod: 1.10,
                hotel: "Beach Breeze Resort",
                veg: "Veg Pasta, Salad, Pizza",
                nonveg: "Seafood Platter, Fish Fry, Chicken Steak"
            },
            Kerala: {
                mod: 1.04,
                hotel: "Backwater Retreat",
                veg: "Appam, Veg Stew, Kerala Meals",
                nonveg: "Fish Curry, Chicken Roast, Prawn Fry"
            }
        }
    },

    Japan: {
        base: {
            stay: 7000,
            food: 2800,
            transport: 2500,
            tickets: 3500
        },
        cities: {
            Tokyo: {
                mod: 1.15,
                hotel: "Tokyo Explorer Inn",
                veg: "Sushi Veg Roll, Tempura Vegetables",
                nonveg: "Chicken Ramen, Sushi Platter"
            },
            Osaka: {
                mod: 1.05,
                hotel: "Osaka Travel Stay",
                veg: "Veg Udon, Rice Bowl",
                nonveg: "Chicken Katsu, Seafood Bowl"
            },
            Kyoto: {
                mod: 1.00,
                hotel: "Kyoto Heritage Hotel",
                veg: "Tofu Curry, Veg Sushi",
                nonveg: "Teriyaki Chicken, Fish Bento"
            }
        }
    },

    France: {
        base: {
            stay: 6800,
            food: 2700,
            transport: 2400,
            tickets: 3400
        },
        cities: {
            Paris: {
                mod: 1.15,
                hotel: "Paris Budget Suites",
                veg: "French Salad, Pasta",
                nonveg: "Chicken Steak, Roast Duck"
            },
            Nice: {
                mod: 1.05,
                hotel: "Nice Beach Residency",
                veg: "Veg Sandwich, French Fries",
                nonveg: "Seafood Grill, Chicken Roast"
            },
            Lyon: {
                mod: 1.00,
                hotel: "Lyon Central Hotel",
                veg: "Veg Quiche, Soup",
                nonveg: "Chicken Casserole, Fish Fillet"
            }
        }
    },

    UAE: {
        base: {
            stay: 6500,
            food: 2300,
            transport: 2400,
            tickets: 3500
        },
        cities: {
            Dubai: {
                mod: 1.08,
                hotel: "Dubai Desert Adventure Camp",
                veg: "Falafel, Hummus, Veg Wrap",
                nonveg: "Shawarma, Grilled Chicken"
            },
            "Abu Dhabi": {
                mod: 1.00,
                hotel: "Abu Dhabi Explorer Resort",
                veg: "Rice Bowl, Hummus",
                nonveg: "Lamb Grill, Chicken Shawarma"
            }
        }
    },

    Switzerland: {
        base: {
            stay: 7000,
            food: 2500,
            transport: 2600,
            tickets: 3900
        },
        cities: {
            Zurich: {
                mod: 1.08,
                hotel: "Swiss Alpine Adventure Lodge",
                veg: "Cheese Fondue, Veg Pasta",
                nonveg: "Chicken Schnitzel, Trout Fish"
            },
            Geneva: {
                mod: 1.03,
                hotel: "Lake View Swiss Retreat",
                veg: "Veg Sandwich, Soup",
                nonveg: "Grilled Chicken, Fish Fillet"
            }
        }
    },

    Maldives: {
        base: {
            stay: 7600,
            food: 2400,
            transport: 2000,
            tickets: 3900
        },
        cities: {
            Male: {
                mod: 1.05,
                hotel: "Ocean Paradise Resort",
                veg: "Veg Curry, Rice, Salad",
                nonveg: "Tuna Curry, Seafood Platter"
            },
            "Addu City": {
                mod: 1.00,
                hotel: "Addu Island Resort",
                veg: "Veg Rice Bowl, Curry",
                nonveg: "Fish Curry, Grilled Seafood"
            }
        }
    }
},
Adventure: {

    India: {
        base: {
            stay: 10000,
            food: 4500,
            transport: 3500,
            tickets: 4000
        },
        cities: {
            Hyderabad: { mod: 1.0, hotel: "Adventure Inn Hyderabad" },
            Mumbai: { mod: 1.15, hotel: "Mumbai Adventure Stay" },
            Delhi: { mod: 1.1, hotel: "Delhi Explorer Camp" },
            Goa: { mod: 1.25, hotel: "Goa Adventure Resort" },
            Kerala: { mod: 1.2, hotel: "Kerala Jungle Stay" }
        }
    },

    Japan: {
        base: {
            stay: 14000,
            food: 6000,
            transport: 5000,
            tickets: 5500
        },
        cities: {
            Tokyo: { mod: 1.3, hotel: "Tokyo Adventure Base" },
            Osaka: { mod: 1.15, hotel: "Osaka Explorer Lodge" },
            Kyoto: { mod: 1.1, hotel: "Kyoto Nature Stay" }
        }
    },

    France: {
        base: {
            stay: 13000,
            food: 5500,
            transport: 4500,
            tickets: 5000
        },
        cities: {
            Paris: { mod: 1.35, hotel: "Paris Adventure Hotel" },
            Nice: { mod: 1.15, hotel: "Nice Coastal Camp" },
            Lyon: { mod: 1.1, hotel: "Lyon Explorer Inn" }
        }
    },

    UAE: {
        base: {
            stay: 12000,
            food: 5000,
            transport: 4500,
            tickets: 5500
        },
        cities: {
            Dubai: { mod: 1.3, hotel: "Dubai Desert Adventure Camp" },
            "Abu Dhabi": { mod: 1.2, hotel: "Abu Dhabi Explorer Resort" }
        }
    },

    Switzerland: {
        base: {
            stay: 15000,
            food: 6000,
            transport: 5500,
            tickets: 6500
        },
        cities: {
            Zurich: { mod: 1.25, hotel: "Swiss Alpine Adventure Lodge" },
            Geneva: { mod: 1.2, hotel: "Geneva Mountain Base" }
        }
    },

    Maldives: {
        base: {
            stay: 16000,
            food: 6000,
            transport: 5000,
            tickets: 7000
        },
        cities: {
            Male: { mod: 1.2, hotel: "Maldives Adventure Resort" },
            "Addu City": { mod: 1.15, hotel: "Addu Island Explorer Camp" }
        }
    }
}, 
Luxury: {

    India: {
        base: {
            stay: 18000,
            food: 7000,
            transport: 6000,
            tickets: 8000
        },
        cities: {
            Hyderabad: { mod: 1.2, hotel: "Luxury Taj Hyderabad" },
            Mumbai: { mod: 1.4, hotel: "Taj Sea View Mumbai" },
            Delhi: { mod: 1.3, hotel: "The Leela Palace Delhi" },
            Goa: { mod: 1.5, hotel: "Private Beach Villa Goa" },
            Kerala: { mod: 1.35, hotel: "Backwater Luxury Resort" }
        }
    },

    Japan: {
        base: {
            stay: 22000,
            food: 9000,
            transport: 8000,
            tickets: 10000
        },
        cities: {
            Tokyo: { mod: 1.5, hotel: "Tokyo Imperial Suite" },
            Osaka: { mod: 1.3, hotel: "Osaka Luxury Tower Hotel" },
            Kyoto: { mod: 1.25, hotel: "Kyoto Zen Palace" }
        }
    },

    France: {
        base: {
            stay: 20000,
            food: 8500,
            transport: 7000,
            tickets: 9000
        },
        cities: {
            Paris: { mod: 1.6, hotel: "Paris Ritz Suite" },
            Nice: { mod: 1.35, hotel: "Nice Riviera Palace" },
            Lyon: { mod: 1.25, hotel: "Lyon Grand Luxury Hotel" }
        }
    },

    UAE: {
        base: {
            stay: 21000,
            food: 8000,
            transport: 7500,
            tickets: 9500
        },
        cities: {
            Dubai: { mod: 1.6, hotel: "Burj Al Arab Suite" },
            "Abu Dhabi": { mod: 1.4, hotel: "Emirates Palace Stay" }
        }
    },

    Switzerland: {
        base: {
            stay: 24000,
            food: 9000,
            transport: 8500,
            tickets: 11000
        },
        cities: {
            Zurich: { mod: 1.5, hotel: "Zurich Grand Palace" },
            Geneva: { mod: 1.4, hotel: "Geneva Lake Luxury Hotel" }
        }
    },

    Maldives: {
        base: {
            stay: 26000,
            food: 9500,
            transport: 9000,
            tickets: 12000
        },
        cities: {
            Male: { mod: 1.5, hotel: "Overwater Villa Maldives" },
            "Addu City": { mod: 1.4, hotel: "Private Island Resort" }
        }
    }
}

};
const detailsContainer =
    document.getElementById("detailsContainer");

countrySelect.addEventListener("change", () => {

    const selectedCountry = countrySelect.value;

    citySelect.innerHTML =
        '<option value="">Select City</option>';

    if (countryCities[selectedCountry]) {

        countryCities[selectedCountry].forEach(city => {

            const option = document.createElement("option");

            option.value = city;
            option.textContent = city;

            citySelect.appendChild(option);

        });

    }

});
citySelect.addEventListener("change", () => {

    const country = countrySelect.value;
    const city = citySelect.value;

    // Explorer
    if (packageName === "Explorer") {

        const countryData = packageDetails?.Explorer?.[country];
const cityData = countryData?.cities?.[city];

if (!countryData || !cityData) return;

const base = countryData.base;
const mod = cityData.mod;

const data = {
    hotel: cityData.hotel,
    veg: cityData.veg,
    nonveg: cityData.nonveg,
    stay: `₹${Math.round(base.stay * mod)}`,
    food: `₹${Math.round(base.food * mod)}`,
    transport: `₹${Math.round(base.transport * mod)}`,
    tickets: `₹${Math.round(base.tickets * mod)}`
};

data.total =
    `₹${Math.round(base.stay * mod) +
         Math.round(base.food * mod) +
         Math.round(base.transport * mod) +
         Math.round(base.tickets * mod)}`;

        if (!data) return;

        detailsContainer.innerHTML = `
        <div class="details-grid">

            <div class="info-card">
                <img src="images/hotel.jpg">
                <h3>Hotel Stay</h3>
                <p><strong>${data.hotel}</strong></p>
                <p>Stay Cost: ${data.stay}</p>
            </div>

            <div class="info-card">
                <img src="images/food.jpg">
                <h3>Food Package</h3>
                <p><strong>Veg:</strong> ${data.veg}</p>
                <p><strong>Non-Veg:</strong> ${data.nonveg}</p>
                <p>Food Cost: ${data.food}</p>
            </div>

            <div class="info-card">
                <img src="images/transport.jpeg">
                <h3>Transportation</h3>
                <p>Transport Cost: ${data.transport}</p>
                <p>Tickets: ${data.tickets}</p>
            </div>

            <div class="info-card total-card">
                <img src="images/package.jpg">
                <h3>Total Package</h3>
                <p>${city}, ${country}</p>
                <h2>${data.total}</h2>

                <button id="bookPackageBtn" class="book-btn">
                    Book This Package
                </button>
            </div>

        </div>
        `;
    }

    // Adventure + Luxury
    else {

        const countryData = packageDetails[packageName]?.[country];
        const cityData = countryData?.cities?.[city];

        if (!countryData || !cityData) return;

        const base = countryData.base;
        const mod = cityData.mod;

        const data = {
            hotel: cityData.hotel,
            stay: Math.round(base.stay * mod),
            food: Math.round(base.food * mod),
            transport: Math.round(base.transport * mod),
            tickets: Math.round(base.tickets * mod)
        };

        data.total =
            data.stay + data.food + data.transport + data.tickets;

        detailsContainer.innerHTML = `
        <div class="details-grid">

            <div class="info-card">
                <img src="images/hotel.jpg">
                <h3>Hotel Stay</h3>
                <p><strong>${data.hotel}</strong></p>
                <p>Stay Cost: ₹${data.stay}</p>
            </div>

            <div class="info-card">
                <img src="images/food.jpg">
                <h3>Food Package</h3>
                <p>Food Cost: ₹${data.food}</p>
            </div>

            <div class="info-card">
                <img src="images/transport.jpeg">
                <h3>Transportation</h3>
                <p>Transport Cost: ₹${data.transport}</p>
                <p>Tickets: ₹${data.tickets}</p>
            </div>

            <div class="info-card total-card">
                <img src="images/package.jpg">
                <h3>Total Package</h3>
                <p>${city}, ${country}</p>
                <h2>₹${data.total}</h2>

                <button id="bookPackageBtn" class="book-btn">
                    Book This Package
                </button>
            </div>

        </div>
        `;
    }

    document.getElementById("bookPackageBtn").addEventListener("click", () => {

        localStorage.setItem("selectedCountry", country);
        localStorage.setItem("selectedCity", city);
        localStorage.setItem("selectedPackage", packageName);

        window.location.href = "index.html#booking";
    });

});
   