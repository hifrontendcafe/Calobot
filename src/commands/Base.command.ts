export class BaseCommand {
    private name: string;
    private prefix?: string;
    private description: string;

    get getName() {
    	return this.name;
    }

    set setName(name: string) {
    	this.name = name;
    }

    get getPrefix() {
    	return this.prefix;
    }

    set setPrefix(prefix: string) {
    	this.prefix = prefix;
    }

    get getDescription() {
    	return this.description;
    }

    set setDescription(description: string) {
    	this.description = description;
    }

    execute() {
    	throw new Error("Method not implemented.");
    }
}
