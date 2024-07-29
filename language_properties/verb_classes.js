export class VerbClass {
	constructor(name, val) {
		this.name = name;
		this.number = val;
	}
}

// Verb Classes in Gothic
// Weak (preterite formed via adding stuff onto end)
// Strong (preterite formed via ablaut or reduplication)
// Strong distinction isn't too useful.
// So add in StrongAblaut and StrongReduplication type
// Also Present-Preterite, since that behaves like its own
export const Weak = new VerbClass('Weak', 0);
export const StrongAblaut = new VerbClass('StrongAblaut', 1);
export const StrongReduplication = new VerbClass('StrongReduplication', 2);
export const PresentPreterite = new VerbClass('Present-Preterite', 3);

export const VerbClassList = [Weak, StrongAblaut, StrongReduplication, PresentPreterite];