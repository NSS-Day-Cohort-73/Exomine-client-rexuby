import { addListeners }  from "./Listeners.js"
import { renderGovernors } from "./RenderGovernors.js"
import { renderFacilities } from "./RenderFacilities.js"
import { renderColonyMinerals } from "./RenderColonyMinerals.js"
import { renderFacilityMinerals } from "./RenderFacilityMinerals.js"

const render = async () => {
    
    await addListeners()
    await renderGovernors()
    await renderFacilities()
    await renderColonyMinerals(0)
    await renderFacilityMinerals(0)
}
render()