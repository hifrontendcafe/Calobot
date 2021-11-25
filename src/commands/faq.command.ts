import { Command } from '../decorators/command.decorator';
import { CommandResponse } from '../utils/command.utils';
import { BaseCommand } from './Base.command';

// @Command({ name: 'faq' })
class FaqCommand extends BaseCommand {
	execute(): CommandResponse {
		return new CommandResponse({
			message: `Podes ver las preguntas frecuentes en: \n https://frontend.cafe/faqs`,
		});
	}
}

export default new FaqCommand();
