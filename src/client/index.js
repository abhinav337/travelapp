import "./styles/main.scss";

import { geoNames, pixaBay, weatherBit } from "./js/app";

const moment = require("moment");


document.getElementById("SUMBIT").addEventListener("click", 
	addTravel
);

const data = {};

//assemble data from apis
const addTravel = async (e) => {
  e.preventDefault();
  console.log('Triggered');
  data.city = getCity();
  const travelcity = await geoNames(data.city);
  data.country = travelcity.countryName;
  data.image = await pixaBay(data.city);
  data.start = getstartDate();
  data.end = getendDate();
  console.log(data);
  recentTrip(data);
};

//add div to the UI with data
const recentTrip = (travelData) => {
  const tripDeparture = dateFormat(travelData.start);
  const tripReturn = dateFormat(travelData.end);

  const div = document.createElement("div");
  div.classList.add("backdrop");
  document.querySelector(".display").appendChild(div);

  div.innerHTML = `
  <h2>Weather Info</h2>
      <div class="results">
        <div class="content">
            <img src="${travelData.image}">
        </div>
        <div class="content">
            <div id=>Start Date is:   </div>
            <div id="start"> ${tripDeparture} </div>
        </div>
        <div class="content">
            <div id=>End Date is:   </div>
            <div id="end"> ${tripReturn} </div>
        </div>
        <div class="content">
            <div id=>Your trip to:   </div>
            <div id="traveldestination"> ${travelData.city}, ${travelData.country}</div>
        </div>
      </div>`;
};


//delete the added divs
const deleteTrips = (event) => {
  event.preventDefault();
  const removeElements = (elms) => elms.forEach((el) => el.remove());
  removeElements(document.querySelectorAll(".backdrop"));
};
document.querySelectorAll("#DELETE").forEach((element) => {
  element.addEventListener("click", deleteTrips);
});


//get data functions
const getCity = () => {
  let city = document.getElementById("inputcity").value;
  if (typeof city !== "string") return "";
  return city[0].toUpperCase() + city.slice(1);
};

const getstartDate = () => {
  const date = document.getElementById("startdate").value;
  return date;
};

const getendDate = () => {
  const date = document.getElementById("enddate").value;
  return date;
};

const dateFormat = (date) => {
  const dateFormat = moment(date).format("LL");
  return dateFormat;
};
