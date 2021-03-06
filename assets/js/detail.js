import doGet from "./services/request.js"
import formatNumber from "./formatNumber.js"
import { countryListAlpha3 } from "./json/CodeCountries.js"
import { domainURL } from "./services/apiURL.js"

const url = new URLSearchParams(window.location.search)
const params = url.get('code')

const convertCode = (borderCountries) => {
    return Array.from(borderCountries, country => {
        return countryListAlpha3[country]
    })
}

doGet(`${domainURL}/alpha/${params}`)
    .then( data => {
        console.log(data)
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
                            <p><span>Capital:</span> ${data.capital ? data.capital : "Empty"}</p>
                        </div>
                        <div class="column">
                            <p><span>Top Level Domain:</span> ${data.topLevelDomain}</p>
                            <p><span>Currencies:</span> ${data.currencies ? data.currencies.map(coin => coin.name) : "Empty"}</p>
                            <p><span>Languages:</span> ${data.languages ? data.languages.map(language => language.name).join(", ") : "Empty"}</p>
                        </div>               
                    </div>
                    <div class="border-countries">
                        <span>Border Countries: </span>
                        <div class="border-content">
                        ${ data.borders ? convertCode(data.borders).map(borderCountry => 
                            `<span class="span-tag">${borderCountry}</span>`)
                            .join(" ") : "Empty"}
                        </div>
                    </div> 
                </div>` 
        return document.querySelector("#app").innerHTML = html;
    })   .catch(console.error)   

