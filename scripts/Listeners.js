import { renderColonyMinerals } from './RenderColonyMinerals.js'
import { renderFacilityMinerals } from './RenderFacilityMinerals.js'
import { renderSpaceCart } from './SpaceCart.js'
import { changeState, purchaseMinerals, transientState } from './TransientState.js'

export const addListeners = () => {
    document.addEventListener('change', async (event) => {
        const eventValue = event.target.value
        const type = event.target.dataset.type
        const name = event.target.name

        if (type === 'governor') {
            await changeState('governorId', eventValue)
            await renderColonyMinerals(eventValue)
        } else if (type === 'facility') {
            await changeState('facilityMineralId', 0)
            await changeState('facilityId', eventValue)
            await renderFacilityMinerals(eventValue)
            await renderSpaceCart()
        }else if (name === 'facilityMineral') {
            await changeState('facilityMineralId', eventValue)
            await renderSpaceCart()
        }
    })

    document.addEventListener('click', async (event) => {
        if (event.target.id === 'purchase-mineral-button') {
            if (Object.values(transientState).some(value => !value)) {
                window.alert("Check your selections!")
            } else {
                await purchaseMinerals()
                await changeState('facilityMineralId', 0)
                await renderSpaceCart() // Rendering the updated space cart
            }
        }
    })
}
