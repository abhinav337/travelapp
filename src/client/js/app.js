//import apis
import { geoNames, pixaBay, weatherBit } from "./api";

//variables
const form = document.querySelector("#form");
const print = document.querySelector("#print");


//eventListeners
//if(form){
//form.addEventListener('submit', submitInputs);
//}

document.querySelector('.form').addEventListener('submit',submitInputs);

print.addEventListener('click', function (e) {
    window.print();
    location.reload();
});


//calc days to trip
export function daysTogo(startDate) {
    const currDate = Date.now();
    const startDateTime = (new Date(startDate).getTime());
    const diff = (startDateTime - currDate) / (60 * 60 * 24 * 1000);
    return Math.ceil(diff);
}

//post function
export const sendServer = async (url = '', data = {}) => {
    const req = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({
            city: data.toCity,
            from: data.startDate,
            to: data.endDate,
            maxTemp: data.maxTemp,
            minTemp: data.minTemp,
            summary: data.summary
        })
    })
    try {
        const completeInfo = await req.json();
        //console.log("completeInfo: ", completeInfo);
        return completeInfo;
    } catch (error) {
        console.log("error", error);
    }
}


// get data from the api submit
export function submitInputs(e) {
    e.preventDefault();

    const toCity = document.querySelector("#tocity").value;
    const startDate = document.querySelector("#startdate").value;
    const endDate = document.querySelector("#enddate").value;
    const daysLeft = daysTogo(startDate);
    console.log(daysLeft);


    geoNames(toCity)
      .then((cityInfo) => {
        const country = cityInfo.geoNames[0].countryName;
        const weatherInfo = weatherBit(toCity, daysLeft);
        return weatherInfo;
      })
      .then((weatherInfo) => {
        const completeInfo = sendServer('http://localhost:8000/travel', {
              toCity, startDate, endDate, maxTemp: weatherInfo.max_temp, minTemp: weatherInfo.min_temp, 
              summary: daysLeft < 16 ? weatherInfo.weather.description : null
        });
        return completeInfo;
      }).then((completeInfo) => {
          modifyUI(completeInfo);
      })
}

//change the UI
export const modifyUI = async (completeInfo) => {
    result.classList.remove("hidden");
    const startDate = document.querySelector("#startdate").value;
    const daysLeft = daysTogo(startDate);
    try {
        const image = pixaBay(toCity);
        document.querySelector("#cityimage").setAttribute('src', image);
        document.querySelector("#travelcity").innerHTML = completeInfo.city;
        document.querySelector("#start").innerHTML = completeInfo.from;
        document.querySelector("#end").innerHTML = completeInfo.to;
        document.querySelector("#daystogo").innerHTML = daysLeft;
        document.querySelector("#maxtemp").innerHTML = completeInfo.maxTemp;
        document.querySelector("#mintemp").innerHTML = completeInfo.minTemp;
        document.querySelector("#summary").innerHTML = completeInfo.summary;
    }
    catch (error) {
        console.log("error", error);
    }
}


