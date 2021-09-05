import { config } from 'dotenv';
config();
export const DiscordConfig = {
	Bot: {
		TOKEN: process.env.DISCORD_BOT_TOKEN,
		PREFIX: process.env.DISCORD_BOT_PREFIX,
	},
	Client: {
		APP_ID: process.env.DISCORD_APP_ID,
		PUBLIC_KEY: process.env.DISCORD_PUBLIC_KEY,
		GUILD_ID: process.env.DISCORD_GUILD_ID,
	},
	OAuth: {
		CLIENT_SECRET: process.env.DISCORD_OAUTH_CLIENT_SECRET,
	},
};
