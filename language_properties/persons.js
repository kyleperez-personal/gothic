export class Person {
	constructor(name, val) {
		this.name = name;
		this.number = val;
	}
}

// The 3 Verb Persons in Gothic
export const First = new Person('First Person', 0);
export const Second = new Person('Second Person', 1);
export const Third = new Person('Third Person', 2);

export const PersonList = [First, Second, Third];