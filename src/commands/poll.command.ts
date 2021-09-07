import { Command } from '../decorators/command.decorator';
import { BaseCommand } from './Base.command';


@Command({ name:'poll' })
class PollCommand extends BaseCommand {
    simple_poll = (msg) => {
        return `**${msg[0]}** \n🟢 ${msg[1]} \n🔵 ${msg[2]}`
    }

    multiple_poll = (msg) => {
        let question = msg[0];
        let options = msg.slice(1, msg.length)
        let msg_options = options.map((opt, n) => {
            return `${n + 1}: ${opt}`
        }).join('\n')
        return `**${question}**\n${msg_options}`
    }

	async execute() {
        let poll_args = this.options.args;
        let qa_poll = poll_args.join(' ').split(' | ')
        
        if (qa_poll.length === 3){ 
            return this.simple_poll(qa_poll)
        } else
        if (qa_poll.length > 3 && qa_poll.length <= 10) {
            return this.multiple_poll(qa_poll)
        } else {
            return `Tas loco vo'?`
        }
	}
}

export default new PollCommand();
