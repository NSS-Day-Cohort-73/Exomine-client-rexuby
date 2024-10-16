export const renderFacilityMinerals = async (facilityId) => {
    let facilityMineralsHTML = ""

    if (!facilityId || facilityId === "0") {  
        facilityMineralsHTML += "<h2>Facility Minerals</h2>"
    } else {
        try {
            const facilityMineralsResponse = await fetch(`http://localhost:8088/facilityMinerals?_expand=facility&_expand=mineral`)
            const facilityMinerals = await facilityMineralsResponse.json()

            const selectedFacilityMinerals = facilityMinerals.filter(filteredMinerals => filteredMinerals.facilityId === parseInt(facilityId))

            if (selectedFacilityMinerals.length === 0) {
                facilityMineralsHTML += "<p>No minerals available for this facility.</p>"
            } else {
                const divStringArray = selectedFacilityMinerals.map(({ mineralId, quantity, facility, mineral }) => {
                    return `
                        <div>
                            <input type="radio" name="facilityMineral" value="${mineralId}"/> 
                            ${facility.name}: ${quantity} tons of ${mineral.name}
                        </div>`;
                });

                facilityMineralsHTML += divStringArray.join("")
            }
        } catch (error) {
            console.error("Error fetching facility minerals:", error)
            facilityMineralsHTML = "<p>Error loading facility minerals.</p>"
        }
    }

    const container = document.getElementById("facility-minerals-container")
    if (container) {
        container.innerHTML = facilityMineralsHTML
    }

    return facilityMineralsHTML;
}
// export const renderFacilityMinerals = async (value) => {
//     let facilityMineralsHTML = ""

//     if (!value) {
//         facilityMineralsHTML += '<h2>Facility Minerals</h2>'
//     } else {
//         try {
//             const facilityMineralsResponse = await fetch("http://localhost:8088/facilityMinerals?_expand=facility&_expand=mineral")
//             const facilityMinerals = await facilityMineralsResponse.json()

//             const activeFacilities = facilities
//                 .filter(facility => facility.active)
//                 .map(facility => facility.id)

//             const activeFacilityMinerals = facilityMinerals.filter(activeMinerals =>
//                 activeFacilities.includes(activeMinerals.facilityId)
//             )

//             const divStringArray = activeFacilityMinerals.map(
//                 (facilityMineral) => {
//                     return `
//                             <div>
//                                 <input type="radio" name="facilityMineral" value="${facilityMineral.mineralId}"/> 
//                                 "${facility.name} ${facilityMineral.quantity} tons of (${mineralName})"
//                             </div>`
//                 })




//             const divStringArray = facilityMinerals.map(
//                 (facilityMineral) => {
//                     return `<div>
//                                 <input type="radio" name="facilityMineral" value="${facilityMineral.mineralId}"/> ${facilityMineral.mineralId}
//                             </div>
//                             `
//                 }
//             )
//             facilityMineralsHTML += divStringArray.join("")
//         } catch (error) {
//         console.error('Error fetching facility minerals:', error)
//     }
//     const container = document.getElementById("facility-minerals-container")
//     container.innerHTML = facilityMineralsHTML

//     return facilityMineralsHTML
//     }
// }

// Render the minerals available in the selected facility