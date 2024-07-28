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
	constructor(name, infinitive_ending, ablaut, morpher, has_past_participle, conjugation_endings) {
		this.name = name;
		this.infinitive_ending = infinitive_ending.substring(1);
		this.conjugation_endings = conjugation_endings;
		this.ablaut = ablaut;
		this.morpher = morpher;// is a string for forming preterite root when ablaut is false
		// Contains an ablaut pattern of ['i', 'a' 'e', 'u'] for forming preterites for strong verbs
		this.has_past_participle = has_past_participle;
	}
}


// All the different types of verbs
// [indicative, imperative, subjunctive]
// each mood is like [present, past, present passive]
// each tense like [1st, 2nd, 3rd]
const no_verb_endings = new verbtype('No Endings', '-', false, '-id', true, [[[['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']], , [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']]], [[['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']]], [[['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']]]]);
const indeclinable = new verbtype('Indeclinable', '-', false, '-id', true, [[[['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']], [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']], [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']]], [[['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']], [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']], [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']]], [[['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']], [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']], [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']]]]);

const weak_verb_class_1 = new verbtype('Weak Class 1', '-an', false, '-id', true, [[[['-a', '-os', '-am'], ['-is', '-ats', '-iþ'], ['-iþ', '--', '-and']], [['-a', '-edu', '-edum'], ['-es', '-eduts', '-eduþ'], ['-a', '--', '-edun']], [['-ada', '--', '-anda'], ['-aza', '--', '-anda'], ['-ada', '--', '-anda']]], [[['--', '--', '--'], ['-ei', '-its', '-iþ'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']]], [[['-au', '-aiwa', '-aima'], ['-ais', '-aits', '-aiþ'], ['-ai', '--', '-aina']], [['-edjau', '-edeiwa', '-edeima'], ['-edeis', '-edeits', '-edeiþ'], ['-edi', '--', '-edeima']], [['-aidau', '--', '-aindau'], ['-aizau', '--', '-aindau'], ['-aidau', '--', '-aindau']]]]);
const weak_verb_class_2 = new verbtype('Weak Class 2', '-on', false, '-od', true, [[[['-o', '-os', '-om'], ['-os', '-ots', '-oþ'], ['-oþ', '--', '-ond']], [['-a', '-edu', '-edum'], ['-es', '-eduts', '-eduþ'], ['-a', '--', '-edun']], [['-oda', '--', '-onda'], ['-oza', '--', '-onda'], ['-oda', '--', '-onda']]], [[['--', '--', '--'], ['-o', '-ots', '-oþ'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']]], [[['-o', '-owa', '-oma'], ['-os', '-ots', '-oþ'], ['-o', '--', '-ona']], [['-edjau', '-edeiwa', '-edeima'], ['-edeis', '-edeits', '-edeiþ'], ['-edi', '--', '-edeima']], [['-odau', '--', '-ondau'], ['-ozau', '--', '-ondau'], ['-odau', '--', '-ondau']]]]);
const weak_verb_class_3 = new verbtype('Weak Class 3', '-an', false, '-aid', true, [[[['-a', '-os', '-am'], ['-ais', '-aits', '-aiþ'], ['-aiþ', '--', '-and']], [['-a', '-edu', '-edum'], ['-es', '-eduts', '-eduþ'], ['-a', '--', '-edun']], [['-ada', '--', '-anda'], ['-aza', '--', '-anda'], ['-ada', '--', '-anda']]], [[['--', '--', '--'], ['-ai', '-aits', '-aiþ'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']]], [[['-au', '-aiwa', '-aima'], ['-ais', '-aits', '-aiþ'], ['-ai', '--', '-aina']], [['-edjau', '-edeiwa', '-edeima'], ['-edeis', '-edeits', '-edeiþ'], ['-edi', '--', '-edeima']], [['-aidau', '--', '-aindau'], ['-aizau', '--', '-aindau'], ['-aidau', '--', '-aindau']]]]);
const weak_verb_class_4 = new verbtype('Weak Class 4', '-nan', false, '-nod', false, [[[['-na', '-nos', '-nam'], ['-nis', '-nats', '-niþ'], ['-niþ', '--', '-nand']], [['-a', '-edu', '-edum'], ['-es', '-eduts', '-eduþ'], ['-a', '--', '-edun']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']]], [[['--', '--', '--'], ['-n', '-nats', '-niþ'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']]], [[['-nau', '-naiwa', '-naima'], ['-nais', '-naits', '-naiþ'], ['-nai', '--', '-naina']], [['-edjau', '-edeiwa', '-edeima'], ['-edeis', '-edeits', '-edeiþ'], ['-edi', '--', '-edeima']], [['-aidau', '--', '-aindau'], ['-aizau', '--', '-aindau'], ['-aidau', '--', '-aindau']]]]);

const strong_verb_class_4 = new verbtype('Strong Class 4', '-an', true, ['i', 'a', 'e', 'u'], true, [[[['-a', '-os', '-am'], ['-is', '-ats', '-iþ'], ['-iþ', '--', '-and']], [['-', '-u', '-um'], ['-t', '-uts', '-uþ'], ['-', '--', '-un']], [['-ada', '--', '-anda'], ['-aza', '--', '-anda'], ['-ada', '--', '-anda']]], [[['--', '--', '--'], ['-', '-ats', '-iþ'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']]], [[['-au', '-aiwa', '-aima'], ['-ais', '-aits', '-aiþ'], ['-ai', '--', '-aina']], [['-jau', '-eiwa', '-eima'], ['-eis', '-eits', '-eiþ'], ['-i', '--', '-eima']], [['-aidau', '--', '-aindau'], ['-aizau', '--', '-aindau'], ['-aidau', '--', '-aindau']]]]);
const strong_verb_class_5 = new verbtype('Strong Class 5', '-an', true, ['i', 'a', 'e', 'i'], true, [[[['-a', '-os', '-am'], ['-is', '-ats', '-iþ'], ['-iþ', '--', '-and']], [['-', '-u', '-um'], ['-t', '-uts', '-uþ'], ['-', '--', '-un']], [['-ada', '--', '-anda'], ['-aza', '--', '-anda'], ['-ada', '--', '-anda']]], [[['--', '--', '--'], ['-', '-ats', '-iþ'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']]], [[['-au', '-aiwa', '-aima'], ['-ais', '-aits', '-aiþ'], ['-ai', '--', '-aina']], [['-jau', '-eiwa', '-eima'], ['-eis', '-eits', '-eiþ'], ['-i', '--', '-eima']], [['-aidau', '--', '-aindau'], ['-aizau', '--', '-aindau'], ['-aidau', '--', '-aindau']]]]);

// Getting the root of a noun
function get_verb_roots(verb_name, verb_infinitive_ending, ablaut, morpher) {
	if (!ablaut) {
		let stem = verb_name.slice(0, -1*verb_infinitive_ending.length);
		let pstem = stem + morpher.substring(1);
		if (stem.slice(-1) == 'j') {
			pstem = stem.slice(0, -1) + morpher.substring(1);
		}
		let pp_stem = pstem;
		let stems = [stem, stem, pstem, pstem, pp_stem];
		//tools.print(stems);
		//tools.print('Stem length: ' + stems.length);
		return stems
	}
	else {
		let stem = verb_name.slice(0, -1*verb_infinitive_ending.length);

		// Split verb stem into consonant ending block and rest of stem
		let consonant_ending_block_len = tools.num_consonants_at_end(stem);
		let beginning = stem.substring(0, stem.length - consonant_ending_block_len);
		let consanant_ending = stem.substring(stem.length - consonant_ending_block_len);
		tools.print('beginning: ' + beginning);
		tools.print('ending:    ' + consanant_ending);

		// Perform ablaut on beginning of stem
		let p1_stem = tools.replace_ending_vowel(beginning, morpher[0], morpher[1]) + consanant_ending; // Stem of verb, with vowel characters immediately before final consanants changed
		let p2_stem = tools.replace_ending_vowel(beginning, morpher[0], morpher[2]) + consanant_ending; // Same here
		let pp_stem = tools.replace_ending_vowel(beginning, morpher[0], morpher[3]) + consanant_ending + verb_infinitive_ending;
		// nim --> n i m
		tools.print('Sg Stem: ' + p1_stem);
		tools.print('Pl Stem: ' + p2_stem);
		tools.print('PP Stem: ' + pp_stem);
		return [stem, stem, p1_stem, p2_stem, pp_stem];
	}
}


//Overriding certain conjugations
const NoOverrides = [[[['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']], [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']], [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']]], [[['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']], [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']], [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']]], [[['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']], [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']], [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']]]];


class verb {
	constructor(name, verb_type, overrides=NoOverrides, definition='No Definition') {
		this.name = name;
		this.infinitive = name;
		this.infinitive_ending = verb_type.infinitive_ending;
		this.ablaut = verb_type.ablaut;
		this.morpher = verb_type.morpher;
		this.stems = get_verb_roots(name, this.infinitive_ending, this.ablaut, this.morpher);
		this.root = this.stems[0];
		this.is_long_jstem = this.#is_long_jstem();
		this.conjugation_endings = verb_type.conjugation_endings;

		this.active_participle = new Adjectives.adjective(this.infinitive + 'd-', Adjectives.active_participle_adjective, Adjectives.NoOverrides, false, true, 'Definition to be implemented');
		if (verb_type.has_past_participle) {
			this.past_participle = new Adjectives.adjective(this.stems[4] + '-', Adjectives.standard, NoOverrides, false, false, 'Definition to be made');
		}
		else {
			this.past_participle = new Adjectives.adjective('--', Adjectives.no_endings, NoOverrides, false, false, 'Definition to be made');
		}
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

		// Return value of stems is [present sing stem, present plural stem, past sing stem, past plural stem]
		// Singular conjugations use 0 and 2 index
		// Dual/Plural conjugations use 1 and 3 index
		// Present and Present Passive tenses use 0 and 1 index
		// Preterite tense uses 2 and 3 index
		// So need a function that accounts for this
		// Take advantage of the explicit tense and number ordering to do this
		// If number == 0 and tense == 0, 2 use 0 index
		// If number == 1,2 and tense == 0, 2 use 1 index
		// If number == 0 and tense == 1 use 2 index
		// If number == 1,2 and tense == 1  use 3 index
		// 2*x*(2-x)
		// x = 0 --> 0
		// x = 1 --> 2
		// x = 2 --> 0
		// 0.5*x*(3-x)
		// number = 0 --> 0
		// number = 1,2 --> 1
		let tense_selector = 2*verb_tense.number*(2 - verb_tense.number);
		let number_selector = 0.5*verb_number.number*(3-verb_number.number);
		let ind = tense_selector + number_selector;
		let stem = this.stems[ind];

		let ending = this.conjugation_endings[verb_mood.number][verb_tense.number][verb_person.number][verb_number.number].substring(1);
		if (tools.isNullEnding(ending)) {
			return ending;
		}
		// Weak verbs that end with j in stem
		else if (!this.ablaut && stem.slice(-1) == 'j') {
			// Need to go from sokj- to soki- for past tense, or the imperative sokei, etc
			if (verb_tense == Tenses.Past || ending.substring(0, 1) == 'e') {
				stem = stem.slice(0, -1);
			}
			// Need to handle sokj- stem but sokeis style conjugations
			else if (this.is_long_jstem && ending.substring(0, 1) == 'i') {
				stem = stem.slice(0, -1) + 'e';
			}
		}
		else if (this.ablaut && verb_tense == Tenses.Past && verb_mood == Moods.Subjunctive) {
			stem = this.stems[3]; // Strong verbs always use the plural preterite ablaut form for subjunctive, regardless of number
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

		let infinitive_line = 'Infinitive       : ' + this.infinitive;
		let ap_line         = 'Active Participle: ' + this.active_participle.name;
		let pp_line         = 'Past Participle  : ' + this.past_participle.name;
		tools.print(infinitive_line);
		tools.print(ap_line);
		tools.print(pp_line);
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

// Weak Verb Class 2
let salbon = new verb('salbon', weak_verb_class_2, NoOverrides, 'to anoint');
salbon.print_cases();

// Weak Verb Class 3
let haban = new verb('haban', weak_verb_class_3, NoOverrides, 'to have');
haban.print_cases();

// Weak Verb Class 4
let fullnan = new verb('fullnan', weak_verb_class_4, NoOverrides, 'to become full');
fullnan.print_cases();
*/


// Strong Verb Class 4 (single vowel type)
let niman = new verb('niman', strong_verb_class_4, NoOverrides, 'to take');
//niman.print_cases();

let bairan = new verb('bairan', strong_verb_class_4, NoOverrides, 'to carry');
//bairan.print_cases();