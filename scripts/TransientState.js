import { renderColonyMinerals } from "./RenderColonyMinerals.js" // Importing the function to render the colony minerals view.
import { renderFacilityMinerals } from "./RenderFacilitiyMinerals.js" // Importing the function to render the facility minerals view. Note: there seems to be a typo in "Facilitiy".
import { renderSpaceCart } from "./SpaceCart.js" // Importing the function to render the space cart.

export let transientState = {
  governorId: 0, // Holds the ID of the currently selected governor.
  facilityId: 0, // Holds the ID of the currently selected facility.
  facilityMineralId: 0 // Holds the ID of the currently selected facility mineral.
}

// Function to change the transient state.
export const changeState = (type, eventValue) => {
    try {
        transientState[type] = eventValue // Dynamically updating the transientState with the type and event value.
    } catch (error) {
        console.error('Error changing state:', error) // Logging any errors that occur when trying to update the state.
    }
}

// Function to handle purchasing minerals and updating both colony and facility data.
export const purchaseMinerals = async () => {
    try {
        // Fetching facility minerals data from the API.
        const facilityMinerals = await fetch('http://localhost:8088/facilityMinerals').then(res => res.json())
        
        // Fetching colony minerals data from the API.
        const colonyMinerals = await fetch('http://localhost:8088/colonyMinerals').then(res => res.json())
        
        // Fetching governors data from the API to get colony details.
        const governors = await fetch('http://localhost:8088/governors').then(res => res.json())
        
        // Finding the selected governor using the governorId stored in transientState.
        const selectedGovernor = governors.find(item => item.id === transientState.governorId)
        
        // Finding the selected facility mineral using the facilityMineralId from transientState.
        const selectedFacilityMineral = facilityMinerals.find(item => item.id === transientState.facilityMineralId)
        
        // Finding the corresponding mineral in the colony if it exists.
        const colonyMineral = colonyMinerals.find(item => item.colonyId === selectedGovernor.colonyId && item.mineralId === selectedFacilityMineral.mineralId)
        
        if (!colonyMineral) {
            // If the mineral does not exist in the colony, create a new mineral entry with quantity 1.
            await fetch('http://localhost:8088/colonyMinerals', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  colonyId: selectedGovernor.colonyId, // Linking to the selected governor's colony.
                  mineralId: selectedFacilityMineral.mineralId, // Adding the selected mineral ID.
                  quantity: 1, // Setting initial quantity to 1.
                }),
              });
            } else {
                // If the mineral already exists, update its quantity by incrementing it by 1.
                await fetch(`http://localhost:8088/colonyMinerals/${colonyMineral.id}`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    ...colonyMineral, // Using the existing colony mineral data.
                    quantity: colonyMineral.quantity + 1, // Incrementing the mineral quantity.
                  }),
                })
              }

              // Updating the facility mineral quantity to reflect the decrease after purchase.
              await fetch(`http://localhost:8088/facilityMinerals/${selectedFacilityMineral.id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  ...selectedFacilityMineral, // Using the existing facility mineral data.
                  quantity: selectedFacilityMineral.quantity - 1, // Decrementing the facility mineral quantity.
                }),
              })

              // Re-rendering the updated data for colony minerals, facility minerals, and the space cart.
              renderColonyMinerals(transientState.governorId) // Rendering the colony minerals for the selected governor.
              renderFacilityMinerals(transientState.facilityId) // Rendering the facility minerals for the selected facility.
              renderSpaceCart() // Rendering the updated space cart.
    } catch (error) {
        console.error('Error purchasing minerals:', error) // Logging any errors that occur during the purchase process.
    }
}
