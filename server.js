const express = require("express");
const app = express();
const PORT = process.eventNames.PORT || 3000;

app.use(express.static("build"));
app.listen(PORT, () => console.log(`Listing on port ${PORT}`));