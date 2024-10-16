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

                const facilityName = selectedFacilityMinerals[0].facility.name
                
                facilityMineralsHTML +=`<h2>Facility Minerals for ${facilityName}</h2>`
                
                const divStringArray = selectedFacilityMinerals.map(({ mineralId, quantity, mineral }) => {
                    return `
                        <div>
                            <input type="radio" name="facilityMineral" value="${mineralId}"/> 
                             ${quantity} tons of ${mineral.name}
                        </div>
                        `
                })

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
