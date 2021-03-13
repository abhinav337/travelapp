export async function geoNames(city) {
	const apiUrl =
		"http://api.geonames.org/" + "searchJSON?q=" + city + "&maxRows=10&username=abhinav337";
	try {
		const response = await fetch(apiUrl);
		const cityInfo = await response.json();
		console.log(cityInfo);
		return cityInfo;
	} catch (error) {
		console.log(error);
	}
};

export async function weatherBit(city, diffDays) {
	const url = "https://api.weatherbit.io/v2.0/forecast/daily?" + `city=${city}&key=4a25b47f9393412ba2c77068bf890e21`;
	try {
		const res = await fetch(url);
        const weatherInfo = await res.json();
        return weatherInfo.data[diffDays];
	} catch (error) {
		console.log(error);
	}
}

export async function pixaBay(city) {
	const cityUrl = `https://pixabay.com/api/?key=19873002-2745dade829779eccdc1a2cfe&q=${city}&image_type=photo&pretty=true&category=places`;
	try {
		const res = await fetch(cityUrl);
		const cityData = await res.json();
		return cityData;
	} catch (error) {
		console.log(error);
	}
};