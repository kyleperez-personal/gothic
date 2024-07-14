export class Gender {
	constructor(name, val) {
		this.name = name;
		this.number = val;
	}
}

// The 3 genders in Gothic
const Masculine = new Gender('masculine', 0);
const Neuter = new Gender('neuter', 1);
const Feminine = new Gender('feminine', 2);