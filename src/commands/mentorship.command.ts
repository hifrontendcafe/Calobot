import { Command } from '../decorators/command.decorator';
import { BaseCommand } from './Base.command';
@Command({ name:'mentee' })
class MentorshipCommand extends BaseCommand {
	execute() {
		return 'Rol Asignado';
	}
}

export default new MentorshipCommand();
