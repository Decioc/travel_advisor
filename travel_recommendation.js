function book() {
    alert("Congrats!! You booked your travel!!")
}

    function showConsole() {

        const input = document.getElementById('conditionInput').value.toLowerCase();
        const myDiv = document.getElementById('result');
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = '';
    
        const inputBeach = ["beach", "beaches"]
        const inputTemple = ["temple", "temples"] 
        const inputCountry = ["country", "countries"]
        var typesearch = 0
    
        console.log("input = ", input)

        if (inputCountry.includes(input)) {
            typesearch = 1;
        } else {
            if (inputBeach.includes(input)) {
                typesearch = 2;
            } else {
                if (inputTemple.includes(input)) {
                    typesearch = 3;
                } else {
                    typesarch = 0
                }
            }
        }
        
        console.log("typesearch = ", typesearch)

        fetch('travel_recommendation_api.json')
          .then(response => response.json())
          .then(data => {
            const countries = data.countries;
            const temples = data.temples;
            const beaches = data.beaches;

            console.log ("typesearch = ", typesearch)

            switch (typesearch) {
                case 1:
                    countries.forEach(element => {
                        const cities = element.cities;
                        cities.forEach(city => {
                            resultDiv.innerHTML += `<img src="${city.imageUrl}" alt="${city.name}">`;
                            resultDiv.innerHTML += `<h2>${city.name}</h2><br>`;
                            resultDiv.innerHTML += `<p><strong>${city.description}</strong></p><br>`;
                            resultDiv.innerHTML += `<button>Visit</button>`;
                            resultDiv.innerHTML += `<br>`;
                            myDiv.style.backgroundColor = 'white';

                        })  
                    })
                default:
                    break;   
            }     
        })
          .catch(error => {
            console.error('Error:', error);
            /* resultDiv.innerHTML = 'An error occurred while fetching data.'; */
          });
    }
