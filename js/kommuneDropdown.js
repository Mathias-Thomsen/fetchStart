// Variables
const urlKommune = "https://api.dataforsyningen.dk/kommuner";
const pbFetchKommuner = document.getElementById("pbFetchKommuner");
const ddKommuner = document.getElementById("ddKommuner");
const divTag = document.getElementById("atags");
const inputKommune = document.getElementById("searchKommune");

// Data Storage
const kommuneMap = new Map(); // Store kommune objects
const createdKommuneObjects = new Set(); // Keep track of already created kommune objects

// Fetch data
async function fetchKommuner(url) {
    const kommuneArr = await fetchAnyUrl(url);
    ddKommuner.innerHTML = "";
    kommuneArr.forEach(fillDropdownObj);

}

// Fetch data from a URL
function fetchAnyUrl(url) {
    return fetch(url).then(response => response.json());
}

// Fill the dropdown with kommune objects
function fillDropdownObj(item) {
    const el = document.createElement("option");
    el.textContent = item.navn;
    el.kommune = item; // item bliver til objekt
    ddKommuner.appendChild(el);

    // Store kommune object in the Map with name as key
    kommuneMap.set(item.navn, item);
}

// Handle input change event
function inputChanged() {
    const selindex = ddKommuner.selectedIndex;
    const selectedOption = ddKommuner.options[selindex];
    const kommuneName = selectedOption.textContent; // Get the selected kommune name
    // Retrieve the kommune object from the Map using the name as the key
    const kommune = kommuneMap.get(kommuneName);
    createATag(kommune);

    if (!createdKommuneObjects.has(kommune)) {

        createdKommuneObjects.add(kommune);
    }
}

// Create an <a> tag for a kommune object
function createATag(komObj) {
    const aTag = document.createElement("a");
    aTag.setAttribute('href', komObj.href);
    aTag.innerText = komObj.navn;
    aTag.target = "_blank"; // Åbner ny fane i browser.
    divTag.appendChild(aTag);

    const brTag = document.createElement('br');
    divTag.appendChild(brTag);
}

// Handle search for a kommune
function searchKommune() {
    const searchTerm = inputKommune.value.trim();

    if (kommuneMap.has(searchTerm)) {
        const kommune = kommuneMap.get(searchTerm);

        if (!createdKommuneObjects.has(searchTerm)) {
            createATag(kommune);
            createdKommuneObjects.add(searchTerm);
        }
    }
}

// Event Listeners
pbFetchKommuner.addEventListener('click', actionFetch);
ddKommuner.addEventListener('change', inputChanged);
inputKommune.addEventListener('input', searchKommune);

// Initial Data Fetch
function actionFetch() {
    fetchKommuner(urlKommune);
}




