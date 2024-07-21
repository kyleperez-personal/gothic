export class Number {
	constructor(name, val) {
		this.name = name;
		this.number = val;
	}
}

// The 3 Numbers in Gothic
// Dual is only really used for personal pronouns and verbs
export const Singular = new Number('Singular', 0);
export const Dual = new Number('Dual', 1);
export const Plural = new Number('Plural', 2);

export const NumberList = [Singular, Dual, Plural];