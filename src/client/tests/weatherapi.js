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
