console.log("Jeg er i post region")

const pbPostRegion = document.getElementById("pbPostRegion")
const pbPutRegion = document.getElementById("pbPutRegion")


const inpKode = document.getElementById("inpKode")
const inpName = document.getElementById("inpName")
const inpHref = document.getElementById("inpHref")

const regionUrl = "http://localhost:8080/region"


function getRegion() {
    const region = {}
    region.kode = inpKode.value
    region.navn = inpName.value
    region.href = inpHref.value
    console.log(region)
    return region
}


async function postRegion() {
    const region = getRegion()
    const res = await postObjectAsJson(regionUrl, region, "POST")
    if(res.ok) {
        alert("Region saved")
    }

}

async function putRegion() {
    const updateRegion = getRegion()
    const putUrl = regionUrl + "/" + updateRegion.kode
    const res = await postObjectAsJson(putUrl, updateRegion, "PUT")


}


async function postObjectAsJson(url, object, httpVerbum){
    const objectAsJsonString = JSON.stringify(object)
    console.log(objectAsJsonString)
    const fetchOptions = {
        method: httpVerbum,
        headers: {
            "Content-Type": "application/json"

        },
        body: objectAsJsonString
    }

    const response = await fetch(url, fetchOptions)
    return response
}

function actionPostRegion(){
    postRegion()
}
function actionPutRegion() {
    putRegion()
}


pbPostRegion.addEventListener('click', actionPostRegion)
pbPutRegion.addEventListener('click', actionPutRegion)

