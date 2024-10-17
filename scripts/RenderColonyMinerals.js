export const renderColonyMinerals = async (value) =>{
    let html = ''
    const colonyMineralsContainer = document.getElementById('colony-minerals-container')
    //If nothing is selected from the governor's dropdown
    if (!parseInt(value)){
        html+= '<h2>Colony Minerals</h2>'
        colonyMineralsContainer.innerHTML = html
        return
    }
    try {
        //get the governor selected
        const governor = await fetch(`http://localhost:8088/governors/${value}`).then(res=>res.json())
        //get the colony they run
        const colonyId = governor.colonyId
        //get the colony's minerals
        const colonyMinerals = await fetch(`http://localhost:8088/colonyMinerals?colonyId=${colonyId}&_expand=mineral&_expand=colony`).then(res=>res.json())
        html += `<h2>${colonyMinerals[0].colony.name} Minerals</h2> <ul>`
        html += colonyMinerals.map(item=> `<li>${item.mineral.name}: ${item.quantity} tons</li>`).join("")
        html += '</ul>'
        colonyMineralsContainer.innerHTML = html
    }catch (error) {
        console.error('Error initializing application:', error);
      }

}