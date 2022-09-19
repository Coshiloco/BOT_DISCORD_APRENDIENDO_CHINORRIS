import { GatewayIntentBits } from "discord.js";
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
  await client.login(config.token);
})();
