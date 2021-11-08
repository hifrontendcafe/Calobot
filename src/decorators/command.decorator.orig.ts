import { DiscordConfig } from '../config/discord.config';

export function Command({ name, prefix = DiscordConfig.Bot.PREFIX }: { name: string; prefix?: string }) {
	return function(ctr) {
		ctr.prototype.name = name;
		ctr.prototype.prefix = prefix;
	};
}
