import { MessageUtils } from './message.utils';
type TCommandError = {
	message: string;
	delete?: boolean;
	deleteAfter?: number;
};
export class CommandError extends Error {
	/**
	 * @param {string} message - Error message to send
	 */
	message: string;
	/**
	 * @param {boolean} delete - Whether or not to delete the error message
	 */
	delete?: boolean;

	/**
	 * @param {number} deleteAfter - Time in seconds to delete the error message
	 */
	deleteAfter: number;

	constructor(options: TCommandError) {
		super(options.message);
		this.name = 'CommandError';
		this.delete = options.delete || true;
		const deleteTime = (options.deleteAfter || 5) * 1000;
		this.deleteAfter = deleteTime;
	}
}

export const ErrorMessages = {
	User: {
		NotValid: "Usuario no válido, por favor etiquetar a un usuario de discord con '@'",
	},
	Role: {
		RoleNotValid: (rol: string) => `No tienes el rol ${rol.toUpperCase()}`,
	},
	Mentorship: {
		UserNotValid: 'Por favor, etiquetar al usuario al que desea agregar/quitar el rol Mentee',
	},
	Info: {
		ArgNotValid: (arg: string) => `Argumento no válido: ${arg || ''} \nPara más información usar
		${MessageUtils.withBacktick('>info help', 3)}`,
	},
};
