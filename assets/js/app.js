import { domainURL } from "./services/apiURL.js";
import RegionsOptions from "./components/RegionsOptions.js";
import RenderCards from "./components/RenderCards.js";

RenderCards(`${domainURL}/all`)

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".select_ul").innerHTML = RegionsOptions
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
            RenderCards(`${domainURL}/continent/${region}`)
        })
    })
})
