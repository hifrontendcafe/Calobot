import { Request, Response } from 'express';
import { MessageEmbedCustom } from '../../@types';
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
}
export default new MessageController();
