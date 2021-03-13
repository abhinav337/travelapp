//import apis
import { geoNames, pixaBay, weatherBit } from "./api";

//variables
const form = document.querySelector("#form");
const print = document.querySelector("#print");
let pixaBayJson = "";
let daysLeft = "";


document.querySelector('.form').addEventListener('submit',submitInputs);

print.addEventListener('click', function (e) {
    window.print();
    location.reload();
});


//calc days to trip
export async function daysTogo(startDate) {
    const toCity = document.querySelector("#tocity").value;
    const cityUrl = `https://pixabay.com/api/?key=19873002-2745dade829779eccdc1a2cfe&q=${toCity}&image_type=photo&pretty=true&category=places`;
    const res = await fetch(cityUrl);
    try {
        pixaBayJson = await res.json();
        const currDate = Date.now();
        const startDateTime = (new Date(startDate).getTime());
        const diff = (startDateTime - currDate) / (60 * 60 * 24 * 1000);
        daysLeft = Math.ceil(diff);
        return Math.ceil(diff);
    }
    catch (error) {
        console.log("error", error);
    }
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
    const daysToTrip = daysTogo(startDate);
    console.log(daysLeft);

    geoNames(toCity)
      .then((cityInfo) => {
        const country = cityInfo.geonames[0].countryName;
        const weatherInfo = weatherBit(toCity, daysLeft);
        return weatherInfo;
      })
      .then((weatherInfo) => {
        const completeInfo = sendServer('http://localhost:8000/travel', {
              toCity, 
              startDate, 
              endDate, 
              maxTemp: daysLeft <16 ? weatherInfo.max_temp : "N/A", 
              minTemp: daysLeft< 16 ? weatherInfo.min_temp : "N/A", 
              summary: daysLeft < 16 ? weatherInfo.weather.description : null
        });
        return completeInfo;
      }).then((completeInfo) => {
          modifyUI(completeInfo);
      })
}

//change the UI
export const modifyUI = async (completeInfo) => {
    document.querySelector('#result').classList.remove("hidden");
    const toCity = document.querySelector("#tocity").value;
    const startDate = document.querySelector("#startdate").value;
    try {
        const imageURL = pixaBayJson.hits[0].webformatURL;
        document.querySelector("#cityimage").setAttribute('src', imageURL);
        document.querySelector("#travelcity").innerHTML = completeInfo.city;
        document.querySelector("#start").innerHTML = completeInfo.from;
        document.querySelector("#end").innerHTML = completeInfo.to;
        document.querySelector("#daystogo").innerHTML = daysLeft + " days";
        document.querySelector("#maxtemp").innerHTML = completeInfo.maxTemp;
        document.querySelector("#mintemp").innerHTML = completeInfo.minTemp;
        document.querySelector("#summary").innerHTML = completeInfo.summary;
    }
    catch (error) {
        console.log("error", error);
    }
        document.querySelector('#bgwhole').classList.add("htmlRedefined");
}

