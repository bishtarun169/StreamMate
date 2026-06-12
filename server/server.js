require("dotenv").config();

// env file check
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is missing in .env');
}

const app = require("./src/app");

// Connect through Mongodb
const connectDB = require("./src/config/db");
connectDB();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

