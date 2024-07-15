export class Case {
	constructor(name, val) {
		this.name = name;
		this.number = val;
	}
}

// The 5 cases in Gothic
export const Nominative = new Case('Nominative', 0);
export const Genitive = new Case('Genitive', 1);
export const Dative = new Case('Dative', 2);
export const Accusative = new Case('Accusative', 3);
export const Vocative = new Case('Vocative', 4);

export const CaseList = [Nominative, Genitive, Dative, Accusative, Vocative];