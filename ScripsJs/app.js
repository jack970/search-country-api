import doGet from "./request.js";
import formatNumber from "./formatNumber.js";
import { domainURL } from "./apiURL.js";

const renderData = (url) => {
    doGet(url)
        .then( data => {
            const html = data
                .map(country => {
                    return `<a href="detail.html?code=${country.alpha2Code}" class="card-wrapper">
                                <img src="${country.flags[0]}" alt="${country.name}">
                                <h1>${country.name}</h1>
                                <p><span>Population:</span> ${formatNumber(country.population)}</p>
                                <p><span>Region:</span> ${country.continent}</p>
                                <p><span>Capital:</span> ${country.capital}</p>
                            </a>` 
                })
                .join("");
            document.querySelector("#app").innerHTML = html;
        }
    )   .catch(console.error)
}

renderData(`${domainURL}/all`)

const listOptions = ["Africa", "Americas", "Europe", "Asia", "Oceania"]

const optionHTML = listOptions.map(country => {
    return `<li>
                <div class="option">
                    <p>${country}</p>
                </div>
            </li>`
}).join("")

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".select_ul").innerHTML = optionHTML
})

document.querySelector('#myInput').addEventListener('keyup', () => {
    const input = document.getElementById("myInput");
    const filter = input.value.toUpperCase().trim();
    const main = document.getElementsByTagName("main")[0].getElementsByTagName("a");
    for (var i = 0; i < main.length; i++) {
        const CountryName = main[i].getElementsByTagName("h1")[0]
        const txtValue = CountryName.textContent || CountryName.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            main[i].style.display = "";
        }
        else {
            main[i].style.display = "none";
        }
    }
})

document.querySelector('.select_wrap').addEventListener('click', () => {
    document.querySelector('.select_wrap').classList.toggle('active')
    const selected = document.querySelector(".default_option")
    const optionList = document.querySelectorAll(".option")

    optionList.forEach(o => {
        o.addEventListener("click", () => {
            const region = o.querySelector("p").innerHTML
            selected.innerHTML = region
            renderData(`${domainURL}/continent/${region}`)
        })
    })
})
