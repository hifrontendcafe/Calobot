import { DiscordConfig } from './../config/discord.config';
import { MessageUtils } from './message.utils';
import { MessageEmbed, User } from 'discord.js';
import { textToLeft } from './date.util';

export class MentorshipUtil {
	private messageUtils: MessageUtils;
	private channelNotification: string;
	constructor() {
		this.messageUtils = new MessageUtils();
		this.channelNotification = DiscordConfig.Channels.Mentorships.notifications;
	}

	async mentorshipReminder(mentor: User, mentee: User, hourMentorship: string) {
		const now = Date.now();
		const minutesLeft = (new Date(hourMentorship).getTime() - now) / 60000;
		const textHour = textToLeft(minutesLeft);
		const embed = new MessageEmbed()
			.setTitle(':alarm_clock:  Recordatorio')
			.setAuthor('Calomentor BOT', 'https://frontend.cafe/logo-square.png')
			.setDescription(`Hola ${mentee}, ${mentor} te espera en ${textHour} para la mentoria`)
			.setColor('#00ff00')
			.setTimestamp()
			.setFooter(`ID del usuario: ${mentee.id}`, 'https://frontend.cafe/logo-square.png');

		this.messageUtils.sendMessageToChannel(`${mentee} ${mentor}`, this.channelNotification)
			.then(msg => msg.delete());
		this.messageUtils.sendMessageToChannel(embed, this.channelNotification);
	}

	async successMentorshipAssignment(mentee: User, mentor:User) {
		try {
			const embed = new MessageEmbed();
			embed.setTitle(':white_check_mark:  Solicitud de mentoría exitosa')
				.setDescription(`¡Hola! La mentoría de ${mentee} con ${mentor} ha sido registrada satisfactoriamente.`)
				.setAuthor('Calomentor BOT', 'https://frontend.cafe/logo-square.png')
				.setColor('#00ff00')
				.setFooter(`ID del usuario: ${mentee.id}`, 'https://frontend.cafe/logo-square.png');

			this.messageUtils.sendMessageToChannel(`${mentee} ${mentor}`, this.channelNotification)
				.then((msg) => msg.delete());
			this.messageUtils.sendMessageToChannel(embed, this.channelNotification);
		} catch (error) {
			console.log(error);
		}
	}
}
