import { messageCreate } from './messageCreate';
// import { messageCreate } from './messageCreate_mod';
import { ready } from './ready';

export const Events = [
	messageCreate(),
	ready()
];
