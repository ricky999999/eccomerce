const app = require("./app");

const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
// Handlling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the Server due to uncaught exception`);
  process.exit(1);
});

// config

dotenv.config({ path: "backend/config/config.env" });

// connecting to database

connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise REjection

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  Server.close(() => {
    process.exit(1);
  });
});
