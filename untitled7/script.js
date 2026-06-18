let html = ``;
let container = document.getElementById("countries");

async function loadCountries() {
    const url = "countries.json";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const countries = await response.json();

        countries.forEach(country => {
            const languages = country.languages
                ? Object.values(country.languages).join(", ")
                : "N/A";
            const currencies = country.currencies
                ? Object.values(country.currencies)
                    .map(c => c.name)
                    .join(", ")
                : "N/A";

            const timezones = country.timezones
                ? country.timezones.join(", ")
                : "N/A";

            html += `
<div class="country-card">

    <img
        src="${country.flags.png}"
        alt="${country.name.common}"
        class="flag"
    >

    <div class="card-body">
        <h2>${country.name.common}</h2>
        <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Area:</strong> ${country.area.toLocaleString()} km²</p>
        <p><strong>Languages:</strong> ${languages}</p>
        <p><strong>Currencies:</strong> ${currencies}</p>
        <p><strong>Timezones:</strong> ${timezones}</p>
    </div>
</div>
`;
        });

        container.innerHTML = html;
        console.log(countries);
    } catch (error) {
        console.error(error.message);
    }
}

loadCountries();