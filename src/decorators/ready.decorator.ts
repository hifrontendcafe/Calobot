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
	return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		let originalMethod = descriptor.value;

		let readyData: ReadyData = {
			name: propertyKey,
			method: originalMethod.bind(target)
		}

		// register the command data in a map structure
		ReadyExecute.push(readyData);

		// wrapping the original method
		descriptor.value = function (...args: any[]) {
			return originalMethod.apply(this, args);
		}
	};
}
