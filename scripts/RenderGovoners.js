export const renderGovernors = async () => {
    try {
        let governors = await fetch('https://localhost:8088/governors?_expand=colony').then(res=>res.json())
        //Only display active governors
        governors = governors.filter(item => item.active)
        let html = document.getElementById('governors-container')
        //Generate HTML String
        html.innerHTML = `<div>Choose a Governor:</div>
                    <select data-type='governor'><option value=''>Make a selection</option>` + 
                    governors.map(item => `<option value='${item.id}' 
                                                    data-colony='${item.colonyId}'>
                                                    ${item.name}
                                                    </option>`).join('') +
                                                    '</select>'
    } catch (error) {
        console.error('Error fetching governors.', error)
    }


}