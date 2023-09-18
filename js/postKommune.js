console.log("Jeg er i post Kommune")

const pbPostKommune = document.getElementById("pbPostKommune")
const pbPutKommune = document.getElementById("pbPutKommune")


const inpKode = document.getElementById("inpKode")
const inpName = document.getElementById("inpName")
const inpHref = document.getElementById("inpHref")
const inpRegionKode = document.getElementById("inpRegionKode")

const KommuneUrl = "http://localhost:8080/kommune"


function getKommune() {
    const kommune = {}
    kommune.kode = inpKode.value
    kommune.navn = inpName.value
    kommune.href = inpHref.value
    kommune.region = {}
    kommune.region.kode = inpRegionKode.value
    console.log(kommune)
    return kommune
}


async function postKommune() {
    const kommune = getKommune()
    const res = await postObjectAsJson(KommuneUrl, kommune, "POST")
    if(res.ok) {
        alert("Kommune saved")
    }

}

async function putKommune() {
    const updateKommune = getKommune()
    const putUrl = KommuneUrl + "/" + updateKommune.kode
    const res = await postObjectAsJson(putUrl, updateKommune, "PUT")


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

function actionPostKommune(){
    postKommune()
}
function actionPutKommune() {
    putKommune()
}


pbPostKommune.addEventListener('click', actionPostKommune)
pbPutKommune.addEventListener('click', actionPutKommune)

