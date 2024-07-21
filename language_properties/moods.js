export class Mood {
	constructor(name, val) {
		this.name = name;
		this.number = val;
	}
}

// 3 Tenses in Gothic
export const Indicative = new Mood('Indicative', 0);
export const Imperative = new Mood('Imperative', 1);
export const Subjunctive = new Mood('Subjunctive', 2);


export const MoodList = [Indicative, Imperative, Subjunctive];