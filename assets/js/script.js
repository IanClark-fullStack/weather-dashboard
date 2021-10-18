
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
    cityInput = formInput.val().trim(); // Capture the input Value0
    // Next Step : Build an API call using that value 
    getLocationData(cityInput); // 3. 
    var $section = $('section');
    $section.attr('class', 'd-block')
});

// Handling Clicks on Previously Searched Cities 
var navSubmit = function(event) {
    event.preventDefault();
    var prevInput = $(this).text();
    getLocationData(prevInput); 
    var $section = $('section');
    $section.attr('class', 'd-block')
}
// Building The API Call 
var getLocationData = function (byCity) { // byCity (formerly known as cityInput)
    var dataFromCity = `https://api.openweathermap.org/geo/1.0/direct?q=${byCity}&limit=5&appid=0fd53ef282c951d78c31e6297a8aa1a5`;
    fetch(dataFromCity)
        .then(function (response) { // When the server responds,
        // Then, execute a function with the Response Data Recieved
            if (response.ok) { // Check the Status of the Response
                // If we're good, Convert the response to a JSON Array
                response.json().then(function (data) { // Data (formerly known as JSON Array) 
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
    cityTitle.text(nameFromData);
    var latFromData = dataArray[0].lat; // Get coordinates
    var lonFromData = dataArray[0].lon;
    if (localArray.indexOf(nameFromData) === -1) {
        localArray.push(nameFromData); // If the new search term does not exist in Local, add it
    }
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
    var mostCurrent = $(dataConditions.current.weather); 
    var weatherName = mostCurrent[0].main; 
    console.log(weatherName);
    // Switch Icons 
    switch (weatherName) {
        case 'Clouds':
            currentIcon.attr('class', 'fas fa-cloud display-4');
            break;
        case 'Thunderstorm':
            currentIcon.attr('class', 'fas fa-bolt display-4');
            break;
        case 'Drizzle':
            currentIcon.attr('class', 'fas fa-cloud-sun-rain display-4');
            break;
        case 'Rain':
            currentIcon.attr('class', 'fas fa-cloud-rain display-4');
            break;
        case 'Snow':
            currentIcon.attr('class', 'fas fa-snowflake display-4');
            break;
        case 'Clear':
            currentIcon.attr('class', 'fas fa-sun display-4');
            break;
        case 'Fog':
            currentIcon.attr('class', 'fas fa-smog display-4');
            break;
        case 'Mist':
            currentIcon.attr('class', 'fas fa-cloud-rain display-4');
            break;
        case 'Smoke':
            currentIcon.attr('class', 'fas fa-smog display-4');
            break;
    }
    // Grab The Daily Weather Array
    var dailyValues = dataConditions.daily;
    // Iterate and create the list elements dynamically, assigning text content on each iteration. 
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
        // Reassign Icons
        var forecastIcon = $i;
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
        // Each Time we Iterate, we need to assign 4 list items to the page
        var $ul = $('<ul>');
        $ul.attr('class', 'list-unstyled');
        $divFlex.append($ul);

        var $li = $('<li>'); // Item 1
        $ul.append($li);
        var $p = $('<p>');
        $p.attr('id', 'temp'); // Set text values to 
        $p.text('Temperature: ');
        $li.append($p);
        var $span = $('<span>');
        $span.text(currentDayData.temp.day);
        $p.append($span);

        var $li = $('<li>'); // item 2
        $ul.append($li);
        var $p = $('<p>');
        $p.attr('id', 'wind'); // Set text values to 
        $p.text('Wind Speed: ');
        $li.append($p);
        var $span = $('<span>');
        $span.text(currentDayData.wind_gust);
        $p.append($span);

        var $li = $('<li>'); // Item 3 1
        $ul.append($li);
        var $p = $('<p>');
        $p.attr('id', 'hum'); // Set text values 
        $p.text('Humidity');
        $li.append($p);
        var $span = $('<span>');
        $span.text(currentDayData.humidity);
        $p.append($span);
        
        var $li = $('<li>'); // Item 4
        $ul.append($li);
        var $p = $('<p>');
        $p.attr('id', 'uvi'); // Set text values
        $p.text('Uvi: ');
        $li.append($p);
        var $span = $('<span>');
        $span.text(currentDayData.uvi);
        $p.append($span);

    }

    var dateToday = $('#current-date');
    // Create a new Date Instance by Converting Unix * MS, and formatting in readable terms 
    var convertUnix = new Date(dataConditions.current.dt*1000).toLocaleDateString();
    
    dateToday.text(convertUnix);
    var tempVal = $('#tempValue'); // span
    tempVal.text(dataConditions.current.temp);
    var windVal = $('#windValue'); // span
    windVal.text(`${dataConditions.current.wind_speed} mph`);
    var humVal = $('#humValue'); // span
    humVal.text(dataConditions.current.humidity);
    var uviVal = $('#uviValue'); // span
    uviVal.text(dataConditions.current.uvi);
}

// 1. Dynamically Apply Components and Paint them to the Page
function generateComponents() {
    
    var storedCities = JSON.parse(localStorage.getItem('cities'));

    // First thing in Function Execution is To Check Local Storage to See if we have any Values to work with, 
    if (storedCities !== null) {
        localArray = storedCities;
    }
    // If we do, use a while Loop to paint them to the page
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
}

generateComponents(); 
