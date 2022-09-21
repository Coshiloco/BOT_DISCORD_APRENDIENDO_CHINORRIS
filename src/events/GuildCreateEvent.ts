// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildCreate
import { Guild } from "discord.js";
import { getRepository } from "typeorm";
import DiscordClient from "../client/client";
import { GuildConfiguration } from "../typeorm/entities/GuildConfiguration";
import BaseEvent from "../utils/structures/BaseEvent";

export default class GuildCreateEvent extends BaseEvent {
  constructor(
    private readonly guildConfigRepository = getRepository(GuildConfiguration)
  ) {
    super("guildCreate");
  }

  async run(client: DiscordClient, guild: Guild) {
    console.log("Hello World");
    console.log(`Joined ${guild.name}`);

    const config = await this.guildConfigRepository.findOne({
      where: {
        guildId: guild.id,
      },
    });

    if (config) {
      console.log("A configurition was found");
    } else {
      console.log("A configuartion was not found. Creating One.");
      const newConfig = this.guildConfigRepository.create({
        guildId: guild.id,
      });
      return this.guildConfigRepository.save(newConfig);
    }
  }
}
