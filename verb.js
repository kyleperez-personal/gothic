import * as tools from './tools.js'
//import * as Cases from './language_properties/cases.js'
import * as Numbers from './language_properties/numbers.js'
//import * as Genders from './language_properties/genders.js'
//import * as Declensions from './language_properties/declensions.js'
import * as Moods from './language_properties/moods.js'
import * as Tenses from './language_properties/tenses.js'
import * as Persons from './language_properties/persons.js'
import * as Adjectives from './adjective.js'

// Data container for verb tenses
class verbtype {
	constructor(name, infinitive_ending, ablaut, morpher, conjugation_endings) {
		this.name = name;
		this.infinitive_ending = infinitive_ending.substring(1);
		this.conjugation_endings = conjugation_endings;
		this.ablaut = ablaut;
		this.morpher = morpher;
	}
}


// All the different types of verbs
// [indicative, imperative, subjunctive]
// each mood is like [present, past, present passive]
// each tense like [1st, 2nd, 3rd]
const no_verb_endings = new verbtype('No Endings', '-', false, '0', [[[['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']], , [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']]], [[['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']]], [[['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']]]]);
const indeclinable = new verbtype('Indeclinable', '-', false, '0', [[[['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']], [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']], [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']]], [[['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']], [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']], [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']]], [[['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']], [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']], [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']]]]);

const weak_verb_class_1 = new verbtype('Weak Class 1', '-an', false, '0', [[[['-a', '-os', '-am'], ['-is', '-ats', '-iþ'], ['-iþ', '--', '-and']], [['-ida', '-idedu', '-idedum'], ['-ides', '-ideduts', '-ideduþ'], ['-ida', '--', '-idedun']], [['-ada', '--', '-anda'], ['-aza', '--', '-anda'], ['-ada', '--', '-anda']]], [[['--', '--', '--'], ['-ei', '-its', '-iþ'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']]], [[['-au', '-aiwa', '-aima'], ['-ais', '-aits', '-aiþ'], ['-ai', '--', '-aina']], [['-idedjau', '-idedeiwa', '-idedeima'], ['-idedeis', '-idedeits', '-idedeiþ'], ['-idedi', '--', '-idedeima']], [['-aidau', '--', '-aindau'], ['-aizau', '--', '-aindau'], ['-aidau', '--', '-aindau']]]]);

// Getting the root of a noun
function get_verb_root(verb_name, verb_infinitive_ending) {
	let stem = verb_name.slice(0, -1*verb_infinitive_ending.length);
	return stem;
}


//Overriding certain conjugations
const NoOverrides = [[[['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']], [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']], [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']]], [[['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']], [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']], [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']]], [[['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']], [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']], [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']]]];


class verb {
	constructor(name, verb_type, overrides=NoOverrides, definition='No Definition') {
		this.name = name;
		this.infinitive = name;
		this.infinitive_ending = verb_type.infinitive_ending;
		this.root = get_verb_root(name, this.infinitive_ending);
		this.is_long_jstem = this.#is_long_jstem();
		this.conjugation_endings = verb_type.conjugation_endings;
		this.ablaut = verb_type.ablaut;
		this.morpher = verb_type.morpher;
	}

	#is_long_jstem() {
		// First check if a verb ends with a j
		if (this.root.slice(-1) != 'j') return false;
		// Then see if stem satisfies CvCCj patern. If so, it is a long j stem for all vowels v and constanants C
		// To see if it is a short vowel j stem, has pattern of CvCj- where v is short for ending letters
		let imp_char = this.root.slice(-3, -2);
		if (tools.isConsanant(imp_char)) return true;
		// Take advantage of the fact that we have a CvC... like pattern; complete vowel is always preceeded by a consanant
		// In Gothic, the vowels can be represented by two characters though, so need to know this
		else {
			let prev_imp_char = this.root.slice(-4, -3);
			let vowel = '';
			if (tools.isConsanant(prev_imp_char)) {
				vowel = imp_char;
			}
			else {
				vowel = prev_imp_char + imp_char;
			}

			// Long Vowel values are 'e' 'o' and 'ei'
			// short vowels are 'a', 'i', and 'u', but also includes all the others for now.
			return tools.LongVowels.includes(vowel);
		}
	}

	decline(verb_mood, verb_tense, verb_person, verb_number) {
		
		let conjugation = 'Unknown Conjugation';

		if (!Moods.MoodList.includes(verb_mood)) {
			conjugation = 'Unknown Verb Mood "' + verb_mood.name + '"';
			return conjugation;
		}
		if (!Tenses.TenseList.includes(verb_tense)) {
			conjugation = 'Unknown Verb Tense "' + verb_tense.name + '"';
			return conjugation;
		}
		if (!Persons.PersonList.includes(verb_person)) {
			conjugation = 'Unknown Verb Person "' + verb_person.name + '"';
			return conjugation;
		}
		if (!Numbers.NumberList.includes(verb_number)) {
			conjugation = 'Unknown Verb Number "' + verb_number.name + '"';
			return conjugation;
		}

		let stem = this.root;
		let ending = this.conjugation_endings[verb_mood.number][verb_tense.number][verb_person.number][verb_number.number].substring(1);
		if (tools.isNullEnding(ending)) {
			return ending;
		}
		// Weak verbs that end with j in stem
		else if (!this.ablaut && stem.slice(-1) == 'j') {
			// Need to go from sokj- to soki- for past tense, or the imperative sokei, etc
			if (verb_tense == Tenses.Past || ending.substring(0, 1) == 'e') {
				stem = this.root.slice(0, -1);
			}
			// Need to handle sokj- stem but sokeis style conjugations
			else if (this.is_long_jstem && ending.substring(0, 1) == 'i') {
				stem = this.root.slice(0, -1) + 'e';
			}
		}
		conjugation = stem + ending;

		return conjugation;
	}

	print_cases() {

		for (const mood of Moods.MoodList) {
			for (const tense of Tenses.TenseList) {
				let conj_1s = this.decline(mood, tense, Persons.First, Numbers.Singular);
				let conj_1d = this.decline(mood, tense, Persons.First, Numbers.Dual);
				let conj_1p = this.decline(mood, tense, Persons.First, Numbers.Plural);
				let conj_2s = this.decline(mood, tense, Persons.Second, Numbers.Singular);
				let conj_2d = this.decline(mood, tense, Persons.Second, Numbers.Dual);
				let conj_2p = this.decline(mood, tense, Persons.Second, Numbers.Plural);
				let conj_3s = this.decline(mood, tense, Persons.Third, Numbers.Singular);
				let conj_3d = this.decline(mood, tense, Persons.Third, Numbers.Dual);
				let conj_3p = this.decline(mood, tense, Persons.Third, Numbers.Plural);

				let max_singular_col_len = Math.max(Numbers.Singular.name.length, conj_1s.length, conj_2s.length, conj_3s.length);
				let max_dual_col_len = Math.max(Numbers.Dual.name.length, conj_1d.length, conj_2d.length, conj_3d.length);
				let max_plural_col_len = Math.max(Numbers.Plural.name.length, conj_1p.length, conj_2p.length, conj_3p.length);
				max_singular_col_len++;
				max_dual_col_len++;
				max_plural_col_len++;

				let top_header = mood.name + ' ' + tense.name + ' Conjugations of ' + this.infinitive;
				let header = 'Person ' + Numbers.Singular.name + ' '.repeat(max_singular_col_len-Numbers.Singular.name.length) + Numbers.Dual.name + ' '.repeat(max_dual_col_len-Numbers.Dual.name.length) + Numbers.Plural.name;
				let line_1 = '1st:   ' + conj_1s + ' '.repeat(max_singular_col_len-conj_1s.length) + conj_1d + ' '.repeat(max_dual_col_len-conj_1d.length) + conj_1p;
				let line_2 = '2nd:   ' + conj_2s + ' '.repeat(max_singular_col_len-conj_2s.length) + conj_2d + ' '.repeat(max_dual_col_len-conj_2d.length) + conj_2p;
				let line_3 = '3rd:   ' + conj_3s + ' '.repeat(max_singular_col_len-conj_3s.length) + conj_3d + ' '.repeat(max_dual_col_len-conj_3d.length) + conj_3p;
				tools.print(top_header);
				tools.print(header);
				tools.print(line_1);
				tools.print(line_2);
				tools.print(line_3);
			}
		}

	}

	print_definition() {
		tools.print('Definition of "' + this.name + '": ' + this.definition + '.');
	}
}


/*
// Weak Verb Class 1, short vowel
let nasjan = new verb('nasjan', weak_verb_class_1, NoOverrides, 'to save');
nasjan.print_cases();

// Weak Verb Class 1, long vowel
let sokjan = new verb('sokjan', weak_verb_class_1, NoOverrides, 'to seek');
sokjan.print_cases();
*/