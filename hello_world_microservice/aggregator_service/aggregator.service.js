const express = require("express");
const axios = require("axios");

const app = express();

app.get("/helloworld", async (req, res) => {
	try {
		let helloResponse;
		let worldResponse;
		// for running locally
		try {
			helloResponse = await axios.get("http://localhost:3001/hello");
		} catch (err) {
			console.error(
				`Error getting data from hello server: ${err?.message}`
			);
		}
		// for running in docker container
		if (!helloResponse) {
			try {
				helloResponse = await axios.get(
					"http://hello-container:3001/hello"
				);
			} catch (err) {
				console.error(
					`Error getting data from hello container: ${err?.message}`
				);
			}
		}
		// for running in kubernetes
		if (!helloResponse) {
			try {
				helloResponse = await axios.get(
					"http://hello-service:3001/hello"
				);
			} catch (err) {
				console.error(
					`Error getting data from hello cluster: ${err?.message}`
				);
			}
		}
		// for running locally
		try {
			worldResponse = await axios.get("http://localhost:3002/world");
		} catch (err) {
			console.error(
				`Error getting data from world server: ${err?.message}`
			);
		}
		// for running in docker container
		if (!worldResponse) {
			try {
				worldResponse = await axios.get(
					"http://world-container:3002/world"
				);
			} catch (err) {
				console.error(
					`Error getting data from world container: ${err?.message}`
				);
			}
		}
		// for running in kubernetes
		if (!worldResponse) {
			try {
				worldResponse = await axios.get(
					"http://world-service:3002/world"
				);
			} catch (err) {
				console.error(
					`Error getting data from world cluster: ${err?.message}`
				);
			}
		}
		const combinedMessage = `${helloResponse?.data} ${worldResponse?.data}`;
		res.send(combinedMessage);
	} catch (error) {
		res.status(500).send("Error combining responses");
	}
});

app.listen(3003, () => {
	console.log("Aggregator service running on port 3003");
});
