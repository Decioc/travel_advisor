const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');
const btnBook = document.getElementById('btnBook');

function book() {
    alert("Congrats!! You booked your travel!!")
}

function visit() {
    alert("Have a nice Trip!!")
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

        var results = []

        fetch('travel_recommendation_api.json')
          .then(response => response.json())
          .then(data => {
            const countries = data.countries;
            const temples = data.temples;
            const beaches = data.beaches;

            switch (typesearch) {
                case 1:
                    results = getRandomCities(countries);
                    showResults(resultDiv, myDiv, results);
                    displayTime(results);
                    break;
                case 2:
                    results = getRandomBeaches(beaches);
                    showResults(resultDiv, myDiv, results);
                    displayTime(results);
                    break;
                case 3:
                    results = getRandomTemples(temples);
                    showResults(resultDiv, myDiv, results);
                    displayTime(results);
                    break;          
                default:
                    clear();
                    break;   
            }     
        })
          .catch(error => {
            console.error('Error:', error);
            /* resultDiv.innerHTML = 'An error occurred while fetching data.'; */
          });
    }

function getRandomCities(data, numCities = 2) {
    const allCities = [];
      
    // Collect all cities from the JSON data
    data.forEach(country => {
        country.cities.forEach(city => {
            allCities.push(city);
        });
    });
      
    // Shuffle the array and select the first numCities elements
    const shuffledCities = allCities.sort(() => 0.5 - Math.random());
    return shuffledCities.slice(0, numCities);
}

function getRandomBeaches(data, numBeaches = 2) {
    const allBeaches = [];
    // Collect all beaches from the JSON data
    data.forEach(beach => {
            allBeaches.push(beach);
    });
      
    // Shuffle the array and select the first numCities elements
    const shuffledBeaches = allBeaches.sort(() => 0.5 - Math.random());
    return shuffledBeaches.slice(0, numBeaches);
}

function getRandomTemples(data, numTemples = 2) {
    const allTemples = [];
    // Collect all beaches from the JSON data
    data.forEach(temple => {
            allTemples.push(temple);
    });
      
    // Shuffle the array and select the first numCities elements
    const shuffledTemples = allTemples.sort(() => 0.5 - Math.random());
    return shuffledTemples.slice(0, numTemples);
}


function showResults(resultDiv, myDiv, results) {

    results.forEach(element => {
        resultDiv.innerHTML += `<img src="${element.imageUrl}" alt="${element.name}">`;
        resultDiv.innerHTML += `<h2>${element.name}</h2><br>`;
        resultDiv.innerHTML += `<p><strong>${element.description}</strong></p><br>`;
        resultDiv.innerHTML += `<button class="btnVisit">Visit</button>`;
        resultDiv.innerHTML += `<br>`;
        myDiv.style.backgroundColor = 'white';
        document.addEventListener('DOMContentLoaded', () => {
            const btnVisitElements = document.querySelectorAll('.btnVisit');
            btnVisitElements.forEach(btnVisit => {
              btnVisit.addEventListener('click', visit);
            });
        });  
    })  
}

function clear() {
    const input = document.getElementById('conditionInput');
    const myDiv = document.getElementById('result');
    const resultDiv = document.getElementById('result');
    
    input.value = ""
    resultDiv.innerHTML = ""
    myDiv.style.backgroundColor = ""

}

function displayTime(results) {
    const timeZones = {
        Australia: 'Australia/Sydney',
        Brazil: 'America/Sao_Paulo',
        Japan: 'Asia/Tokyo',
        India: 'Asia/Kolkata',
        Cambodia: 'Asia/Phnom_Penh'
      };      
    results.forEach (element => {    
        var parts = element.name.split(',').map(part => part.trim());
        country = parts[parts.length - 1];
        timezone = timeZones[country];
        options = { timeZone: timezone, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
        placeTime = new Date().toLocaleTimeString('en-US', options);
        console.log("Current time in ", country, " ", placeTime);
    })
} 

btnClear.addEventListener('click', clear);
btnBook.addEventListener('click', book);
      
      
