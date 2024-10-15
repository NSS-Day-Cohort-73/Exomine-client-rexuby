import { addListeners }  from "Listeners.js"
import { renderGovernors } from "RenderGovoners.js"
import { renderFacilities } from "RenderFacilities.js"
import { renderColonyMinerals } from "RenderColonyMinerals.js"
import { renderFacilityMinerals } from "renderFacilityMinerals.js"

const render = () => {
    
    addListeners()
    renderGovernors()
    renderFacilities()
    renderColonyMinerals(0)
    renderFacilityMinerals(0)
}
render()