import { transientState } from "TransientState.js"

export const renderSpaceCart = async () => {
    let response = await fetch ("https://localhost:8088/facilityMinerals?_expand=mineral&_expand=facility")
    let facilityMinerals = await response.json()



    let spaceCartHTML = ""

    spaceCartHTML += `<div id = "space-cart">
        <h1>Space Cart</h1>`
        
        html += facilityMinerals.map(item=> `${transientState.quantity} tons  of ${facilityMinerals.mineral.name} from ${facilityMinerals.facility.name}`)



    spaceCartHTML += `</div>`
    let spaceCartDOM = document.getElementById("space-cart")





    spaceCartDOM.innerHTML = spaceCartHTML}