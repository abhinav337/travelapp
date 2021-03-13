//const weatherBit = require("./weatherapi")
import {weatherBit} from "../js/api";
const fetch = require("node-fetch");

describe("Test:object 'Weather()'", () => {
	test("Its defined", () => {
		expect(weatherBit()).toBeDefined();
	});

	test("It is a object", () => {
		expect(typeof weatherBit()).toBe("object");
	});
});