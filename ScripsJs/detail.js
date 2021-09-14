import doGet from "./request.js"
import formatNumber from "./formatNumber.js"
import { convertCode } from "./CodeCountries.js"

const url = new URLSearchParams(window.location.search)
const params = url.get('code')

doGet(`https://restcountries.eu/rest/v2/alpha/${params}`)
    .then( data => {
        const nameBorderCountries = convertCode(data.borders)
        const html = `
            <img id="flag-image" src="${data.flag}" alt="${data.name}">
                <div class="content">
                    <h1>${data.name}</h1>
                    <div class="row">
                        <div class="column">
                            <p><span>Native name:</span> ${data.nativeName}</p>
                            <p><span>Population:</span> ${formatNumber(data.population)}</p>
                            <p><span>Region:</span> ${data.region}</p>
                            <p><span>Sub Region:</span> ${data.subregion}</p>
                            <p><span>Capital:</span> ${data.capital}</p>
                        </div>
                        <div class="column">
                            <p><span>Top Level Domain:</span> ${data.topLevelDomain}</p>
                            <p><span>Currencies:</span> ${data.currencies.map(coin => coin.name)}</p>
                            <p><span>Languages:</span> ${data.languages.map(language => language.name).join(", ")}</p>
                        </div>               
                    </div>
                    <div class="border-countries">
                        <span>Border Countries: </span>
                        <div class="border-content">
                        ${nameBorderCountries.map(borderCountry => 
                            `<span class="span-tag">${borderCountry}</span>`)
                            .join(" ")}
                        </div>
                    </div> 
                </div>` 
        return document.querySelector("#app").innerHTML = html;
    })   .catch(console.error)   

