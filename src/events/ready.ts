import { client } from '../client/client.instance';
import { ReadyExecute } from '../decorators/ready.decorator';

export function ready(): void {
	client.on('ready', async (client) => {
		for (const execute of ReadyExecute) {
			try {
				// Ejecute the method
				await execute.method(client);
			} catch (err) {
				console.error(err);
			}
		}
	});
}

