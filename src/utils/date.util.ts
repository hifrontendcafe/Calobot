export function textToLeft(mins) {

	let toLeftText;
	switch (mins) {
	case 1:
		toLeftText = 'minuto';
		break;
	case mins > 1 && mins < 60:
		toLeftText = 'minutos';
		break;
	case mins > 60:
		toLeftText = 'horas';
		break;
	default:
		toLeftText = 'minutos';
		break;
	}
	if (mins > 60) {
		mins = mins / 60;
	}
	return `${Math.round(mins)} ${toLeftText}`;
}
