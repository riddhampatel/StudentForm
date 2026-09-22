const express = require("express");
const cors = require("cors");

const studentRoutes = require("./routes/studentRoutes");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

app.use("/students", studentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
