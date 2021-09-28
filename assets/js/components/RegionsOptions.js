const listOptions = ["Africa", "Americas", "Europe", "Asia", "Oceania"]

const RegionsOptions = listOptions.map(country => {
    return `<li>
                <div class="option">
                    <p>${country}</p>
                </div>
            </li>`
}).join("")

export default RegionsOptions