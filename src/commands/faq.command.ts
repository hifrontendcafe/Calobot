import { Command } from '../decorators/command.decorator';
import { BaseCommand } from './Base.command';

@Command({ name: 'faq' })
class FaqCommand extends BaseCommand {

	execute() {
		return `Podes ver las preguntas frecuentes en: \n https://frontend.cafe/faqs`;
	}
}

export default new FaqCommand();
