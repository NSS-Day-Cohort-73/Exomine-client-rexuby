export const renderFacilityMinerals = async (value) => {
    let facilityMineralsHTML = ""

    if (!value) {
        facilityMineralsHTML += '<h2>Facility Minerals</h2>'
    } else {
        try {
            const facilityMineralsResponse = await fetch("http://localhost:8088/facilityMinerals")
            const facilityMinerals = await facilityMineralsResponse.json()



            const facilitiesResponse = await fetch("http://localhost:8088/miningFacilities")
            const facilities = await facilitiesResponse.json()

            const activeFacilities = facilities
                .filter(facility => facility.active)
                .map(facility => facility.id)

            const activeFacilityMinerals = facilityMinerals.filter(activeMinerals =>
                activeFacilities.includes(activeMinerals.facilityId)
            )

            const divStringArray = activeFacilityMinerals.map(
                (facilityMineral) => {
                    return `
                            <div>
                                <input type="radio" name="facilityMineral" value="${facilityMineral.mineralId}"/> ${facility.name}
                            </div>`
                })




            // const divStringArray = facilityMinerals.map(
            //     (facilityMineral) => {
            //         return `<div>
            //                     <input type="radio" name="facilityMineral" value="${facilityMineral.mineralId}"/> ${facilityMineral.mineralId}
            //                 </div>
            //                 `
            //     }
            // )
            facilityMineralsHTML += divStringArray.join("")
        } catch (error) {
        console.error('Error fetching facility minerals:', error)
    }
    const container = document.getElementById("facility-minerals-container")
    container.innerHTML = facilityMineralsHTML

    return facilityMineralsHTML
    }
}