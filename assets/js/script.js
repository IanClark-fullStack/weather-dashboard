// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city



/*                      OPEN WEATHER API KEY 
__________________________|0fd53ef282c951d78c31e6297a8aa1a5|__________________________
*/

/* 
_______________________________ Notes From Class _______________________________ 
    -- Optionally use bootstrap, jQuery and moment js
    -- Start with code that remembers previously searched cities
    -- On search > fetch call to weather API
        -- Current Weather + 5 day forecast 
        -- One call and coordinates
        and 15
        -- /geo/ pssed in to One Call
        -- second endPoint to capture lat and long of the city (in open weather app docs)

        -- insomnia  
            -- Plugin root domain, add api key 
            -- modify the query section 

            -- translate it js 
                -- fetch (query from insomnia)
                    -- in the second .then, perform another fetch, this time to the URl of the object values we are looking for when the search returns


*/
// Open Weather API Key (Delete After Deployment)

const apiPlug = $('0fd53ef282c951d78c31e6297a8aa1a5');


// Global Variables 
var headerWrapper = $('header');
// Generate Nav Bar 
var navigation = $('<nav>');
// Generate Brand 
var navBrand = $('<a>');
// Generate Button 
var navBtn = $('<button>');
// Generate Toggle Icon
var navToggle = $('<span>');
// Generate navCollapse 
var navCollapse = $('<div>');
// Generate Nav UL 
var navUl = $('<ul>');
// Generate Nav Li 
var navLi = $('<li>');
// Generate Nav Links 
var navLink = $('<a>');

// Get Main 
var mainWrapper = $('main');
// Create Iconography Section 
mainWrapper.attr('style', 'font-family: var(--anthropocene);'); 
// let midContent = $('#middle-container');
var iconsWrapper = $('#icon-switch');
var currentIcon = $('<i>');
currentIcon.attr('class', 'fas fa-meteor display-4');
currentIcon.attr('id', 'weatherIcon');
iconsWrapper.append(currentIcon);


// Get footer
var footerWrapper = $('footer');

// Global Form Variables - Generate Elements
var formWrapper = $('<form>');
var formGroup = $('<div>');
var formLabel = $('<label>');
var formInput = $('<input>');
var formSubmit = $('<button>');
var autoInput = $('<div>');

// Global Form Vairables 
var cityInput;




// Click Event Handlers to Start off Everything API

//  Handling Form Submission CallBack 
$(formSubmit).on('click', function(event) {
    event.preventDefault(); // Prevent page reload 
    cityInput = formInput.val().trim(); // Capture the input Value
    // console.log(cityInput);

    // Next Step : Build an API call using that value 
    getLocationData(cityInput); // 3. 
});

// Handling Clicks on Previously Searched Cities 


// Building The API Call 
var getLocationData = function (byCity) { // byCity (formerly known as cityInput)
    var dataFromCity = `http://api.openweathermap.org/geo/1.0/direct?q=${byCity}&limit=5&appid=0fd53ef282c951d78c31e6297a8aa1a5`;

    fetch(dataFromCity)
        .then(function (response) { // When the server responds

        // Then, execute a function with the Response Data Recieved
            if (response.ok) { // Check the Status of the Response
                // If we're good, Convert the response to a JSON Array
                response.json().then(function (data) { // Data (formerly known as JSON Array) 
                // Data = returned Json array // user = the name typed in
                // displayRepos(data, user); // Step 3 
                    console.log(data);
                    /* Results from Data Response 
                        0 index
                            country: Us
                            lat: num
                            name: 'Chicago'
                            lon: num 
                            state: 'IL'
                    */
                    passLocationData(data);

                    
                });
            } else { // to status not 200
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
        alert('Unable to connect');
        });
};

// Formerly known as data
var passLocationData = function (dataArray) {
    
    var nameFromData = dataArray[0].name; // City Name
    var latFromData = dataArray[0].lat; 
    var lonFromData = dataArray[0].lon;
    // Store the Value in localStorage
    var coordObject = {'latitude': latFromData, 'longitude': lonFromData}; 
    localStorage.setItem(nameFromData, JSON.stringify(coordObject));

    // Build One Call API Link 
    var weatherFromCity = `https://api.openweathermap.org/data/2.5/onecall?lat=${latFromData}&lon=${lonFromData}&units=imperial&appid=0fd53ef282c951d78c31e6297a8aa1a5`;

    fetch(weatherFromCity)
        .then(function (response) { // When the server responds

        // Then, execute a function with the Response Data Recieved
            if (response.ok) { // Check the Status of the Response
                // If we're good, Convert the response to a JSON Array
                response.json().then(function (data) { // Data (formerly known as JSON Array) 
                // Data = returned Json array // user = the name typed in
                // displayRepos(data, user); // Step 3 
                    setWeatherData(data);
                    // var nameFromData = $(data[0].name);
                    // var lonFromData = $(data[0].lon);
                    // var latFromData = $(data[0].lat);

                    // passLocationData(nameFromData, lonFromData, latFromData); // 4.
                });
            } else { // to status not 200
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
        alert('Unable to connect');
        });

}

var setWeatherData = function (dataConditions) {
    var tempVal = $('#tempValue'); // span
    tempVal.text(dataConditions.current.temp);
    var windVal = $('#windValue'); // span
    windVal.text(`${dataConditions.current.wind_speed} mph`);
    var rainVal = $('#rainValue'); // span
    rainVal.text(dataConditions.current.rain);
    var humVal = $('#humValue'); // span
    humVal.text(dataConditions.current.humidity);
    var uviVal = $('#uviValue'); // span
    uviVal.text(dataConditions.current.uvi);
}

// 1. Dynamically Apply Components and Paint them to the Page
function generateComponents() {
    // Generate Nav Bar 
    navigation.attr('class', 'navbar navbar-expand-md navbar-light bg-light');
    headerWrapper.append(navigation);
    // Generate Brand
    navBrand.attr('class', 'navbar-brand');
    navBrand.attr('style', 'font-family: var(--anthropocene);'); 
    navBrand.attr('href', '#'); // main page
    navBrand.text('Weather App');
    navigation.append(navBrand);
    // Generate Button
    $(navBtn).attr({
        class: 'navbar-toggler',
        type: 'button',
        'data-toggle': 'collapse',
        'data-target': '#navbarNav',
        'aria-controls': 'navbarNav',
        'aria-expanded': 'false',
        'aria-label': 'Toggle navigation'
    });
    navigation.append(navBtn);
    // Generate Toggle Icon
    navToggle.attr('class', 'navbar-toggler-icon');
    navBtn.append(navToggle);
    // Generate Collapse 
    $(navCollapse).attr({
        class: 'collapse navbar-collapse',
        id: 'navbarNav'
    });
    navigation.append(navCollapse);
    // Generate Ul 
    navUl.attr('class', 'navbar-nav');
    navCollapse.append(navUl);
    // Generate Li 
    navLi.attr('class', 'nav-item');
    navUl.append(navLi);
    // Generate Nav Links
    navLink.attr({
        class: 'nav-link',
        href: '#'
    });
    navLink.text('getFromLocal');
    navLi.append(navLink);


    // Generate Form Styles 
    // formWrapper.attr('class', 'form-inline'); 
    headerWrapper.append(formWrapper);
    formGroup.attr('class', 'form-row align-items-center justify-content-center');
    formWrapper.append(formGroup);
    formInput.attr({
        type: 'text',
        class: 'mb-2',
        id: 'inlineFormInput',
        placeholder: 'mostRecenSearch'
    });
    autoInput.attr('class', 'col-auto');
    formGroup.append(autoInput);
    autoInput.append(formInput);
    formGroup.append(autoInput);
    formSubmit.attr('class', 'btn mb-2');
    formSubmit.text('Search'); 
    formSubmit.attr('id', 'citySubmit');
    autoInput.append(formSubmit);

    // Generate Section Components
    // If Local Stoarage Values Are NULL, display none to list items 

    generateWeather(); // 2. 
    
    
    
    
}

//
function generateWeather() {
    var weatherRow = $('#weather-info');
   
    var resultsWrapper = $(`<div class="mb-auto p-2">`);
    weatherRow.append(resultsWrapper);
    var resultList = $('<ul>'); 
    resultsWrapper.append(resultList);


    var cityWrapper = $(`<div class="p-2">`);
    weatherRow.append(cityWrapper);
    var cityTitle = $('<h3>');
    cityTitle.text('Current City Title');
    cityWrapper.append(cityTitle);
    

}








generateComponents(); // 1