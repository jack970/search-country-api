import formatNumber from "../formatNumber.js";
import doGet from "../services/request.js";

const RenderCards = (url) => {
    doGet(url)
        .then( data => {
            const html = data
                .map(country => {
                    return `<a href="pages/detail.html?code=${country.alpha2Code}" class="card-wrapper">
                                <img src="${country.flag}" alt="${country.name}">
                                <h1>${country.name}</h1>
                                <p><span>Population:</span> ${formatNumber(country.population)}</p>
                                <p><span>Region:</span> ${country.region}</p>
                                <p><span>Capital:</span> ${country.capital ? country.capital : ""}</p>
                            </a>` 
                })
                .join("");
            document.querySelector("#app").innerHTML = html;
        }
    )   .catch(console.error)
}

export default RenderCards