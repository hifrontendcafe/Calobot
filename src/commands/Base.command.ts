import { Message } from 'discord.js';

export class BaseCommand {
	private _name: string;
	private _prefix?: string;
	private _description?: string;
	private _options?: TCommand;

	get getName() {
		return this._name;
	}

	set setName(name: string) {
		this._name = name;
	}

	get prefix() {
		return this._prefix;
	}

	set prefix(prefix: string) {
		this._prefix = prefix;
	}

	get getDescription() {
		return this._description;
	}

	set setDescription(description: string) {
		this._description = description;
	}

	public set options(options: TCommand) {
		this._options = options;
	}

	public get options() {
		return this._options;
	}

	execute() {
		throw new Error('Method not implemented.');
	}

	validations() {
		throw new Error('Method not implemented.');
	}
}

export type TCommand = {
	message?: Message;
	args?: string[];
};
