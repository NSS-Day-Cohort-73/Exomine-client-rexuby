import { transientState } from "./TransientState.js"

export const renderSpaceCart = async () => {
    let response = await fetch ("http://localhost:8088/facilityMinerals?_expand=mineral&_expand=facility")
    let facilityMinerals = await response.json()

    // Get selected facility and mineral from transientState or from your UI
    // const selectedFacilityId = transientState.facilityId; 
    const selectedFacilityMineralId = transientState.facilityMineralId; 

    const facilityMineral = facilityMinerals.find(item=> item.id === parseInt(selectedFacilityMineralId))

    // let spaceCartHTML = ""

    // // Filter for the selected facility and mineral
    // const filteredItems = facilityMinerals.filter(item => 
    //     item.facilityId === selectedFacilityId && item.mineralId === facilityMineral.mineralId
    // );

    // // Generate the HTML for filtered items
    // if (filteredItems.length > 0) {
    //     spaceCartHTML += filteredItems.map(item => 
    //         `1 ton of ${item.mineral.name} from ${item.facility.name}<br>`
    //     ).join("");
    // } else {
    //     spaceCartHTML += "No items found for the selected facility and mineral.";
    // }
    let html = ''
    
    html = !facilityMineral ? 'Your cart is empty' : `1 ton of ${facilityMineral.mineral.name} from ${facilityMineral.facility.name}` 

    //render spaceCartHTML to DOM
    let spaceCartDOM = document.getElementById("space-cart")
    spaceCartDOM.innerHTML = html
}

