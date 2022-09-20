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
      guildId: guild.id
    });
  }
}
