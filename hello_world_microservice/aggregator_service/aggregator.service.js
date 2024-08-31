const express = require("express");
const axios = require("axios");

const app = express();

app.get("/helloworld", async (req, res) => {
	try {
		const helloResponse = await axios.get("http://localhost:3001/hello");
		const worldResponse = await axios.get("http://localhost:3002/world");
		const combinedMessage = `${helloResponse.data} ${worldResponse.data}`;
		res.send(combinedMessage);
	} catch (error) {
		res.status(500).send("Error combining responses");
	}
});

app.listen(3003, () => {
	console.log("Aggregator service running on port 3003");
});
