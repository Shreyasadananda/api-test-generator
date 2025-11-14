const express = require("express");
const app = express();
app.use(express.json());


app.all("/*", (req, res) => {
res.json({ stub: true, path: req.path, method: req.method });
});


app.listen(3000, () => console.log("Stub running"));
