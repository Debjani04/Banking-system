const app = require("../src/app");
const connectionDB = require("./db/db")

connectionDB();

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})