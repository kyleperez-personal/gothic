export class Number {
	constructor(name, val) {
		this.name = name;
		this.number = val;
	}
}

// The 5 cases in Gothic
export const Singular = new Number('Singular', 0);
export const Dual = new Number('Dual', 1);
export const Plural = new Number('Plural', 2);