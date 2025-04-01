function book() {
    alert("Congrats!! You booked your travel!!")
}

    function showConsole() {

        fetch('travel_recommendation_api.json')
          .then(response => response.json())
          .then(data => {
            const countries = data.countries;
            const temples = data.temples;
            const beaches = data.beaches;

            countries.forEach(element => {
                console.log(element.name);
                const cities = element.cities;
                cities.forEach(element => {
                    console.log(element.name);
                    console.log(element.imageUrl);
                    console.log(element.description);
                } )
                
            });

            temples.forEach(element => {
                console.log(element.name);
                console.log(element.imageUrl);
                console.log(element.description);
            })


            beaches.forEach(element => {
                console.log(element.name);
                console.log(element.imageUrl);
                console.log(element.description);
            })
            
          })
          .catch(error => {
            console.error('Error:', error);
            /* resultDiv.innerHTML = 'An error occurred while fetching data.'; */
          });
    }