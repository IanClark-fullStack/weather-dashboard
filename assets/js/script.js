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
// // Generate Nav Li 
// var navLi = $('<li>');
// // Generate Nav Links 
// var navLink = $('<a>');

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

// Weather Info Section 
var weatherRow = $('#weather-info');
var cityTitle = $('<h3>');
weatherRow.append(cityTitle);
var dateToday; 

// Forecast Elements 
var forecastIcon = $('#forecast-icon');
var smallDate = $('.sm-date');
var listGroup = ('.list-group');
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
var localArray = [];

// Array of Daily Forecast Content 
var $day2 = $('#day2');
var $day3 = $('#day3');
var $day4 = $('#day4');
var $day5 = $('#day5');
var $day6 = $('#day6');
var $dailyArray = [$day2, $day3, $day4, $day5, $day6];

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

var navSubmit = function(event) {
    event.preventDefault();
    var prevInput = $(this).text();
    getLocationData(prevInput); 
}


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
    // Local storage todo
    var nameFromData = dataArray[0].name; // City Name
    cityTitle.text(nameFromData);
    var latFromData = dataArray[0].lat; 
    var lonFromData = dataArray[0].lon;
    if (localArray.indexOf(nameFromData) === -1) {
        localArray.push(nameFromData);
    }
    
    console.log(localArray);
    // Store the Value in localStorage
    localStorage.setItem('cities', JSON.stringify(localArray));
    
    // Build One Call API Link 
    var weatherFromCity = `https://api.openweathermap.org/data/2.5/onecall?lat=${latFromData}&lon=${lonFromData}&units=imperial&appid=0fd53ef282c951d78c31e6297a8aa1a5`;

    fetch(weatherFromCity)
        .then(function (response) { // When the server responds
        // Then, execute a function with the Response Data Recieved
            if (response.ok) { // Check the Status of the Response
                // If we're good, Convert the response to a JSON Array
                response.json().then(function (data) { // Data (formerly known as JSON Array) 
                    setWeatherData(data);
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
    var mostCurrent = $(dataConditions.current.weather); // main, id, icon, etc Object
    var weatherName = mostCurrent[0].main; // Clouds
    console.log(weatherName);
    // Switch Icons 
    switch (weatherName) {
        case 'Clouds':
            currentIcon.attr('class', 'fas fa-cloud');
            break;
        case 'Thunderstorm':
            currentIcon.attr('class', 'fas fa-bolt');
            break;
        case 'Drizzle':
            currentIcon.attr('class', 'fas fa-cloud-sun-rain');
            break;
        case 'Rain':
            currentIcon.attr('class', 'fas fa-cloud-rain');
            break;
        case 'Snow':
            currentIcon.attr('class', 'fas fa-snowflake');
            break;
        case 'Clear':
            currentIcon.attr('class', 'fas fa-sun');
            break;
        case 'Fog':
            currentIcon.attr('class', 'fas fa-smog');
            break;
        case 'Mist':
            currentIcon.attr('class', 'fas fa-cloud-rain');
            break;
        case 'Smoke':
            currentIcon.attr('class', 'fas fa-smog');
            break;
    }

    var dailyValues = dataConditions.daily;
    console.log(dailyValues);

    for (var i=0; i<5; i++) {
        var currentDayData = dailyValues[i+1];
        var $tempContainer = $('#tempContainer');
        var $scrollContainer = $('<a>');
        $scrollContainer.attr('class', 'list-group-item list-group-item-action flex-column align-items-start border border-dark');
        $tempContainer.append($scrollContainer);
        var $divFlex = $('<div>');
        $divFlex.attr('class', 'd-flex w-100');
        $scrollContainer.append($divFlex);
        var $h5 = $('<h5>');
        $h5.attr('class', 'mb-1');
        $h5.text(new Date(currentDayData.dt*1000).toLocaleDateString());
        $divFlex.append($h5);
        var $small = $('<small>');
        $small.attr('class', 'mx-1');
        $h5.append($small);
        var $i = $('<i>');

        var forecastIcon = $i;
        // var forecastIcon = $(currentDayId.find('i'));
        var currentDayIcon = currentDayData.weather[0].main;
        
        switch (currentDayIcon) {
            case 'Clouds':
                forecastIcon.attr('class', 'fas fa-cloud');
                break;
            case 'Thunderstorm':
                forecastIcon.attr('class', 'fas fa-bolt');
                break;
            case 'Drizzle':
                forecastIcon.attr('class', 'fas fa-cloud-sun-rain');
                break;
            case 'Rain':
                forecastIcon.attr('class', 'fas fa-cloud-rain');
                break;
            case 'Snow':
                forecastIcon.attr('class', 'fas fa-snowflake');
                break;
            case 'Clear':
                forecastIcon.attr('class', 'fas fa-sun');
                break;
            case 'Fog':
                forecastIcon.attr('class', 'fas fa-smog');
                break;
            case 'Mist':
                forecastIcon.attr('class', 'fas fa-cloud-rain');
                break;
            case 'Smoke':
                forecastIcon.attr('class', 'fas fa-smog');
                break;
        }
        
        
        $small.append($i);

        var $ul = $('<ul>');
        $ul.attr('class', 'list-unstyled');
        $divFlex.append($ul);

        var $li = $('<li>'); // Day 1
        $ul.append($li);
        var $p = $('<p>');
        $p.attr('id', 'temp'); // Set text values to Temperature
        $p.text('Temperature: ');
        $li.append($p);
        var $span = $('<span>');
        $span.text(currentDayData.temp.day);
        $p.append($span);

        var $li = $('<li>'); // Day 1
        $ul.append($li);
        var $p = $('<p>');
        $p.attr('id', 'wind'); // Set text values to Temperature
        $p.text('Wind Speed: ');
        $li.append($p);
        var $span = $('<span>');
        $span.text(currentDayData.wind_gust);
        $p.append($span);

        var $li = $('<li>'); // Day 1
        $ul.append($li);
        var $p = $('<p>');
        $p.attr('id', 'hum'); // Set text values to Temperature
        $p.text('Humidity');
        $li.append($p);
        var $span = $('<span>');
        $span.text(currentDayData.humidity);
        $p.append($span);
        
        var $li = $('<li>'); // Day 1
        $ul.append($li);
        var $p = $('<p>');
        $p.attr('id', 'uvi'); // Set text values to Temperature
        $p.text('Uvi: ');
        $li.append($p);
        var $span = $('<span>');
        $span.text(currentDayData.uvi);
        $p.append($span);
        
        




        var currentDayId = $dailyArray[i];
       
        // console.log(currentDayData.temp.day);
         // Gets weeklong weather 
        
        // var $nextTemp = $('data-temp');
        // console.log($nextTemp);
        // $nextTemp.text(currentDayData.temp.day);
        // var $nextHum = $('#nextHum'+i);
        // console.log($nextHum);
        // $nextHum.text(currentDayData.humidity);
        // var $nextWind = $('#nextWind');
        // $nextWind.text(currentDayData.wind_gust);
        // var $nextUvi = $('#nextUvi');
        // $nextUvi.text(currentDayData.uvi);
        
        
        
        
    }
    // Conditionals for Forecast Icons 

    // Current Weather Conditions from Server
    var dateToday = $('#current-date');
    // Create a new Date Instance by Converting Unix * MS, and formatting in readable terms 
    var convertUnix = new Date(dataConditions.current.dt*1000).toLocaleDateString();
    

    dateToday.text(convertUnix);
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

    var storedCities = JSON.parse(localStorage.getItem('cities'));


    if (storedCities !== null) {
        localArray = storedCities;
    console.log(localArray);
    }
    let j = 0; 
    while (j<5) {
        // Generate Nav Li 
        var navLi = $('<li>');
        // Generate Li 
        navLi.attr('class', 'nav-item');
        navUl.append(navLi);
        // Generate Nav Links
        // Generate Nav Links 
        var navLink = $('<a>');
        navLink.attr({
            class: 'nav-link',
            href: '#'
        });
        navLink.text(localArray[j]);
        navLi.append(navLink);
        navLink.on('click', navSubmit);
        j++;
    }

    
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

    // Generate Event Listeners for Nav Items 
    // generateListener();
    
    
    
}
// var generateListener = function() {
//     for (i=0; i<localArray.length; )
// }
//
// function generateWeather() {
//     // var weatherRow = $('#weather-info');
//     // cityTitle.text('Current City Title');
//     // cityWrapper.append(cityTitle);
    
//     // resultsWrapper.append(resultList);


//     // var cityWrapper = $(`<div class="p-2">`);
//     // weatherRow.append(cityWrapper);
    
    
    

// }








generateComponents(); // 1