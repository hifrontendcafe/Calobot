import { MessageUtils } from './message.utils';

export class CommandError extends Error {
	time: number;
	/**
	 * @param {string} message The error message
	 * @param {number} time Time in seconds to delete the error message
	 */
	constructor({ message, time = 3 }: { message: string; time?: number }) {
		super(message);
		this.name = 'CommandError';
		this.time = time * 1000;
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
		ArgNotValid: (arg: string) => `Argumento no válido: ${arg} \nPara más información usar
		${MessageUtils.withBacktick('>info help', 3)}`,
	},
};
