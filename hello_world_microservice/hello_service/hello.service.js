const express = require("express");

const app = express();

app.get("/hello", (req, res) => {
	res.send("hello");
});

app.listen(3001, () => {
	console.log("Hello service running on port 3001");
});
