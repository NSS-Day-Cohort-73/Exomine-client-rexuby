
// fetches facility info from API
// export const RenderFacilities = async () => {
//     const response = await fetch("http://localhost:8088/miningfacilities")
//     const facilities = await response.json()
// generate a string of HTML code using fetched data

export async function renderFacilities() {
    try {
        // Fetch data from the API
        const response = await fetch("http://localhost:8088/miningfacilities");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let facilities = await response.json();
            facilities = facilities.filter(item=> item.active)
        // Determine if any facility is active
        //const isAnyActive = facilities.some(facility => facility.active);
          const facilitiesContainer = document.getElementById("facilities-container")
        // Generate HTML string
        let html = `
            
                <div id="facilities-dropdown">Select Facility</div>
                <select data-type="facility">
                    <option value="0"> Make a selection </option> 
        `;

        // Generate options from the fetched data
        facilities.forEach(item => {
            html += `
                <option value="${item.id}">${item.name}</option>
                
            `;
        });

        // Close the select tag and container div
        html += `
            </select>
        `;

        facilitiesContainer.innerHTML = html;}
     
        catch (error) {
            console.error("Error fetching data or generating HTML:", error);
                facilitiesContainer.innerHTML = '<p>Error loading facilities. Please try again later.</p>';
    }
}




 
    
  
    
    
    
    
    
    
    
    //let optionsHTML = "<h2></h2>"

    // Use map() to generate new array of strings
    //const divStringArray = facilities.map(
//         (facility) => {
//           return `<div>
//               <input type='radio' name='metal' value='${metal.id}' /> ${metal.metal}
//           </div>`
//         }
//     )

//     // This function needs to return a single string, not an array of strings
//     const optionsHTML += divStringArray.join("")

//     return optionsHTML
// }