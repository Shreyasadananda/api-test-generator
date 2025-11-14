const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "captures/raw/" });
const app = express();


app.post("/upload", upload.single("file"), (req, res) => {
res.json({ message: "Uploaded", file: req.file.path });
});


app.listen(3001, () => console.log("QA Console backend running"));
