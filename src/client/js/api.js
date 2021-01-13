export async function geoNames(city) {
	const apiUrl =
		"http://api.geonames.org/" + "searchJSON?q=" + city + "&maxRows=10&username=abhinav337";
	try {
		const response = await fetch(apiUrl);
		const country = {};
		const data = await response.json();
		country.countryName = data.geonames[0].countryName;
		console.log(country);
		return country;
	} catch (error) {
		console.log(error);
	}
};

export async function weatherBit(city) {
	const url = "https://api.weatherbit.io/v2.0/forecast/daily?" + `city=${city}&key=4a25b47f9393412ba2c77068bf890e21`;
	try {
		const res = await fetch(url);
        return await res.json();
	} catch (error) {
		console.log(error);
	}
}

export async function pixaBay(city) {
	const cityUrl = `https://pixabay.com/api/?key=19873002-2745dade829779eccdc1a2cfe&q=${city}&image_type=photo&pretty=true&category=places`;
	try {
		let res = await fetch(cityUrl);
		let cityData = await res.json();
		return cityData.hits[0].largeImageURL;
	} catch (error) {
		console.log(error);
	}
};