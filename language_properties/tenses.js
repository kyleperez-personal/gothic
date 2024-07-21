export class Tense {
	constructor(name, val) {
		this.name = name;
		this.number = val;
	}
}

// 3 Tenses in Gothic
export const Present = new Tense('Present', 0);
export const Past = new Tense('Past', 1);
export const PresentPassive = new Tense('Present Passive', 2);

export const TenseList = [Present, Past, PresentPassive];