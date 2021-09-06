import { DiscordConfig } from '../config/discord.config';

export function Command({ name, prefix = DiscordConfig.Bot.PREFIX }: { name: string, prefix?: string }) {
	return function(ctr) {
		ctr.prototype.setName = name;
		ctr.prototype.setPrefix = prefix;
	};
}
