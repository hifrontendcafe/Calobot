import { readdir } from 'fs/promises';
const exceptions = ['index.ts', 'Base.command.ts'];
export const CommandsExecute = [];
// Load all commands in the commands folder and exclude files in the exceptions array
readdir('./src/commands').then((files) => {
	files.forEach(async (file) => {
		if (file.endsWith('.command.ts') && !exceptions.includes(file)) {
			const command = await import(`./${file}`);
			CommandsExecute.push(command.default);
		}
	});
});
