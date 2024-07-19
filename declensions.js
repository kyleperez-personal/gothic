export class Declension {
	constructor(name, val) {
		this.name = name;
		this.number = val;
	}
}

// The 5 cases in Gothic
export const Strong = new Declension('Strong', 0);
export const Weak = new Declension('Weak', 1);

export const DeclensionList = [Strong, Weak];