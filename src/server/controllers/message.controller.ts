import { Request, Response } from 'express';
import { MessageEmbedCustom, MessageEmbedUser } from '../../@types';
import { MessageUtils } from '../../utils/message.utils';

class MessageController {
	async sendEmbed(req: Request, res: Response) {
		const data = req.body as MessageEmbedCustom;
		const messageUtils = new MessageUtils();

		const embed = messageUtils.buildEmbed(data);
		messageUtils.sendMessageToChannel(embed, data.channel);
		res.json({
			success: true,
			message: 'Message sent',
		});
	}

	async sendMessage(req: Request, res: Response) {
		try {
			const data = req.body as MessageEmbedUser;
			const { user } = req.params;

			const messageUtils = new MessageUtils();

			const embed = messageUtils.buildEmbed(data);
			if (data.isEmbed) {
				await messageUtils.sendMessageToUser(embed, user);
			} else {
				await messageUtils.sendMessageToUser(data.message, user);
			}
			return res.json({
				success: true,
				message: 'Message sent',
			});
		} catch (error) {
			return res.json({
				success: false,
				message: error.message,
			});
		}
	}
}
export default new MessageController();
