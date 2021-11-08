/* eslint-disable @typescript-eslint/ban-types */
export interface ReadyData {
	name: string;
	method: Function;
}

export const ReadyExecute = [];

export function Ready() {
	/**
	 * @param {Object} target - The class Object
	 * @param {string} propertyKey - The name method
	 * @param {PropertyDescriptor} - Defined the function method
	 */
	return function(target: unknown, propertyKey: string, descriptor: PropertyDescriptor) {
		const originalMethod = descriptor.value;

		const readyData: ReadyData = {
			name: propertyKey,
			method: originalMethod.bind(target),
		};

		// register the command data in a map structure
		ReadyExecute.push(readyData);

		// wrapping the original method
		descriptor.value = function(...args: unknown[]) {
			return originalMethod.apply(this, args);
		};
	};
}
