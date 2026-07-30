import app from "./app";
import { config } from "./config";
import { prisma } from "./lib/prisma";

const port = config.port || 3000;

async function main() {
  try {
    await prisma.$connect();
    console.log("Connected to the database successfully");
    if (config.node_env !== "production") {
      app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
      });
    }
  } catch (error) {
    console.error("Error starting server", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();
