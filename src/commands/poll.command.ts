import { Command } from '../decorators/command.decorator';
import { BaseCommand } from './Base.command';

// @Command({ name: 'poll' })
class PollCommand extends BaseCommand {
	async execute() {
		const pollArgs = this.options.args;
		const qaPoll = pollArgs.join(' ').split(' | ');

		if (qaPoll.length === 3) {
			return this.simplePoll(qaPoll);
		} else if (qaPoll.length > 3 && qaPoll.length <= 10) {
			return this.multiplePoll(qaPoll);
		} else {
			return `Tas loco vo'?`;
		}
	}

	simplePoll(msg: string[]) {
		return `**${msg[0]}** \n🟢 ${msg[1]} \n🔵 ${msg[2]}`;
	}

	multiplePoll(msg: string[]) {
		const question = msg[0];
		const options = msg.slice(1, msg.length);
		const msgOptions = options
			.map((opt, n) => {
				return `${n + 1}: ${opt}`;
			})
			.join('\n');
		return `**${question}**\n${msgOptions}`;
	}
}

export default new PollCommand();
