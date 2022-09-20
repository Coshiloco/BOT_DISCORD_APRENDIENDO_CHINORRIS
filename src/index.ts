require("dotenv").config();
import { GatewayIntentBits } from "discord.js";
import "reflect-metadata";
import { createConnection } from "typeorm";
import config from "../slappey.json";
import DiscordClient from "./client/client";
import { registerCommands, registerEvents } from "./utils/registry";
const client = new DiscordClient({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

(async () => {
  client.prefix = config.prefix || client.prefix;
  await registerCommands(client, "../commands");
  await registerEvents(client, "../events");
  await client.login(process.env.DJS_BOT_TOKEN);
  await createConnection({
    type: "mariadb",
    host: process.env.MARIADB_DB_HOST,
    port: 3306,
    username: process.env.MARIADB_DB_USERNAME,
    password: process.env.MARIADB_DB_PASSWORD,
    database: process.env.MARIADB_DB_DATABASE
  });
})();
