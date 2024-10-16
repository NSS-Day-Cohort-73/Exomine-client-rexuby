import { renderColonyMinerals } from './RenderColonyMinerals.js'
import { renderFacilityMinerals } from './RenderFacilityMinerals.js'
import { renderSpaceCart } from './RenderSpaceCart.js'
import { changeState, purchaseMinerals } from './TransientState.js'

export const addListeners =() => {
 document.addEventListener('change', (event) =>{
    const eventValue = event.target.eventValue
    const type = event.target.dataset.type

    if (type === 'governor'){
        changeState('governorId', eventValue)
        renderColonyMinerals(eventValue)
    }else if (type === 'facility'){
        changeState('facilityMineralsId', 0)
        changeState('facilityId', eventValue)
        renderFacilityMinerals(eventValue)
        renderSpaceCart()
    }
 })

 document.addEventListener('click', (event)=>{
    if (event.target.id ==='purchase-mineral-button'){
        if(Object.values(transientState).some(value => !value)){
            window.alert("You don't have any items in your cart!")
        } else{
            purchaseMinerals()
        }
    }

 })


}