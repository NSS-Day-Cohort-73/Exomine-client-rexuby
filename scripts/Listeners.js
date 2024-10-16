import { renderColonyMinerals } from './RenderColonyMinerals.js'
import { renderFacilityMinerals } from './RenderFacilityMinerals.js'
import { renderSpaceCart } from './SpaceCart.js'
import { changeState, purchaseMinerals, transientState } from './TransientState.js'

export const addListeners = () => {
    document.addEventListener('change', async (event) => {
        const eventValue = event.target.value
        const type = event.target.dataset.type

        if (type === 'governor') {
            await changeState('governorId', eventValue)
            await renderColonyMinerals(eventValue)
        } else if (type === 'facility') {
            await changeState('facilityMineralsId', 0)
            await changeState('facilityId', eventValue)
            await renderFacilityMinerals(eventValue)
            await renderSpaceCart()
        }
    })

    document.addEventListener('click', async (event) => {
        if (event.target.id === 'purchase-mineral-button') {
            if (Object.values(transientState).some(value => !value)) {
                window.alert("You don't have any items in your cart!")
            } else {
                await purchaseMinerals()
            }
        }
    })
}
