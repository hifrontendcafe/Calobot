/* eslint-disable @typescript-eslint/no-var-requires */
const { readFile, writeFile } = require('fs/promises');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;
const templates = {
	commandName: 'command_name',
	className: 'class_name',
};

// capitalize
const capitalize = (s) => {
	if (typeof s !== 'string') return '';
	return s.charAt(0).toUpperCase() + s.slice(1);
};

const args = {
	class: capitalize(argv['class']),
	cmd: argv['cmd'],
};

const outDir = 'src/commands/';

async function generate() {
	try {
		if (!args.class) {
			console.log('Please provide a class name');
			throw new Error("Class name not provided");
		}

		if (!args.cmd) {
			console.log('Please provide a command name');
			throw new Error("Command name not provided");
		}

		const baseFile = await readFile('src/lib/command/template.command.example', 'utf-8');
		const cmdReg = new RegExp(templates.commandName, 'g');
		const classReg = new RegExp(templates.className, 'g');
		const newFile = baseFile
			.replaceAll(cmdReg, args.cmd)
			.replaceAll(classReg, args.class);

		console.log(`Generating ${outDir}${args.cmd}.command.ts`);
		await writeFile(`${outDir}${args.class.toLowerCase()}.command.ts`, newFile, 'utf-8');
		console.log('Done');
		console.log(`New command generated: ${outDir}${args.class.toLowerCase()}.command.ts`);
	} catch (error) {
		console.error(error);
	}
}

if (args.class && args.cmd) {
	generate();
}

console.log(args);
