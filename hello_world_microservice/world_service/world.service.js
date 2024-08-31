const express = require("express");

const app = express();

app.get("/world", (req, res) => {
	res.send("world");
});

app.listen(3002, () => {
	console.log("World service running on port 3002");
});
