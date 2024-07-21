export class Gender {
	constructor(name, val) {
		this.name = name;
		this.number = val;
	}
}

// The 3 genders in Gothic
export const Masculine = new Gender('Masculine', 0);
export const Neuter = new Gender('Neuter', 1);
export const Feminine = new Gender('Feminine', 2);

export const GenderList = [Masculine, Neuter, Feminine];