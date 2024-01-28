var inputvalue = document.querySelector('#cityinput');
    var btn = document.querySelector('#add');
    var city = document.querySelector('#cityoutput');
    var descriptionElement = document.querySelector('#description');
    var temp = document.querySelector('#temp');
    var wind = document.querySelector('#wind');
    var apik = "d3120438339380e5da52f474bba9f11f";

    function convertion(val) {
        return (val - 273).toFixed(3);
    }

    btn.addEventListener('click', function () {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputvalue.value + '&appid=' + apik)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                if (data && data.name && data.weather && data.weather[0] && data.weather[0].description && data.main && data.main.temp && data.wind && data.wind.speed) {
                    var nameval = data.name;
                    var descrip = data.weather[0].description;
                    var tempature = data.main.temp;
                    var wndspeed = data.wind.speed;

                    city.innerHTML = `Weather of <span>${nameval}<span>`;
                    temp.innerHTML = `Temperature: <span>${convertion(tempature)} °C</span>`;
                    descriptionElement.innerHTML = `Sky Conditions: <span>${descrip}<span>`;
                    wind.innerHTML = `Wind Speed: <span>${wndspeed} km/h<span>`;
                } else {
                    alert('Unexpected response format');
                }
            })
            .catch(err => alert('There was an issue with the request: ' + err.message));
    });
