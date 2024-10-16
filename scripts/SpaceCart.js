

export const renderSpaceCart = async () => {
    let response = await fetch ("http://localhost:8088/facilityMinerals?_expand=mineral&_expand=facility")
    let facilityMinerals = await response.json()



    let spaceCartHTML = ""

    spaceCartHTML += `<div id = "space-cart">
        <h2>Space Cart</h2>`
        
        html += facilityMinerals.map(item=> `1 tons  of ${item.mineral.name} from ${item.facility.name}`)



    spaceCartHTML += `</div>`
    let spaceCartDOM = document.getElementById("space-cart")





    spaceCartDOM.innerHTML = spaceCartHTML}