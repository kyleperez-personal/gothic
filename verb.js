import * as tools from './tools.js'
//import * as Cases from './language_properties/cases.js'
import * as Numbers from './language_properties/numbers.js'
//import * as Genders from './language_properties/genders.js'
//import * as Declensions from './language_properties/declensions.js'
import * as Moods from './language_properties/moods.js'
import * as Tenses from './language_properties/tenses.js'
import * as Persons from './language_properties/persons.js'
import * as Adjectives from './adjective.js'
import * as VerbClasses from './language_properties/verb_classes.js'

// Data container for verb tenses
class verbtype {
	constructor(name, infinitive_ending, verb_class, morpher, has_past_participle, conjugation_endings) {
		this.name = name;
		this.infinitive_ending = infinitive_ending.substring(1);
		this.conjugation_endings = conjugation_endings;
		this.verb_class = verb_class;
		this.morpher = morpher;// is a string for forming preterite root when ablaut is false
		// Contains an ablaut pattern of ['a' 'e', 'u'], etc for forming preterites for strong verbs
		this.has_past_participle = has_past_participle;
	}
}


// All the different types of verbs
// [indicative, imperative, subjunctive]
// each mood is like [present, past, present passive]
// each tense like [1st, 2nd, 3rd]
const no_verb_endings = new verbtype('No Endings', '-', VerbClasses.Weak, '-id', true, [[[['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']], , [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']]], [[['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']]], [[['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']]]]);
const indeclinable = new verbtype('Indeclinable', '-', VerbClasses.Weak, '-id', true, [[[['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']], [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']], [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']]], [[['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']], [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']], [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']]], [[['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']], [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']], [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']]]]);

// Verbs formed via prefixing to form preterite
const weak_verb_class_1 = new verbtype('Weak Class 1', '-an', VerbClasses.Weak, '-id', true, [[[['-a', '-os', '-am'], ['-is', '-ats', '-iþ'], ['-iþ', '--', '-and']], [['-a', '-edu', '-edum'], ['-es', '-eduts', '-eduþ'], ['-a', '--', '-edun']], [['-ada', '--', '-anda'], ['-aza', '--', '-anda'], ['-ada', '--', '-anda']]], [[['--', '--', '--'], ['-ei', '-its', '-iþ'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']]], [[['-au', '-aiwa', '-aima'], ['-ais', '-aits', '-aiþ'], ['-ai', '--', '-aina']], [['-edjau', '-edeiwa', '-edeima'], ['-edeis', '-edeits', '-edeiþ'], ['-edi', '--', '-edeima']], [['-aidau', '--', '-aindau'], ['-aizau', '--', '-aindau'], ['-aidau', '--', '-aindau']]]]);
const weak_verb_class_2 = new verbtype('Weak Class 2', '-on', VerbClasses.Weak, '-od', true, [[[['-o', '-os', '-om'], ['-os', '-ots', '-oþ'], ['-oþ', '--', '-ond']], [['-a', '-edu', '-edum'], ['-es', '-eduts', '-eduþ'], ['-a', '--', '-edun']], [['-oda', '--', '-onda'], ['-oza', '--', '-onda'], ['-oda', '--', '-onda']]], [[['--', '--', '--'], ['-o', '-ots', '-oþ'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']]], [[['-o', '-owa', '-oma'], ['-os', '-ots', '-oþ'], ['-o', '--', '-ona']], [['-edjau', '-edeiwa', '-edeima'], ['-edeis', '-edeits', '-edeiþ'], ['-edi', '--', '-edeima']], [['-odau', '--', '-ondau'], ['-ozau', '--', '-ondau'], ['-odau', '--', '-ondau']]]]);
const weak_verb_class_3 = new verbtype('Weak Class 3', '-an', VerbClasses.Weak, '-aid', true, [[[['-a', '-os', '-am'], ['-ais', '-aits', '-aiþ'], ['-aiþ', '--', '-and']], [['-a', '-edu', '-edum'], ['-es', '-eduts', '-eduþ'], ['-a', '--', '-edun']], [['-ada', '--', '-anda'], ['-aza', '--', '-anda'], ['-ada', '--', '-anda']]], [[['--', '--', '--'], ['-ai', '-aits', '-aiþ'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']]], [[['-au', '-aiwa', '-aima'], ['-ais', '-aits', '-aiþ'], ['-ai', '--', '-aina']], [['-edjau', '-edeiwa', '-edeima'], ['-edeis', '-edeits', '-edeiþ'], ['-edi', '--', '-edeima']], [['-aidau', '--', '-aindau'], ['-aizau', '--', '-aindau'], ['-aidau', '--', '-aindau']]]]);
const weak_verb_class_4 = new verbtype('Weak Class 4', '-nan', VerbClasses.Weak, '-nod', false, [[[['-na', '-nos', '-nam'], ['-nis', '-nats', '-niþ'], ['-niþ', '--', '-nand']], [['-a', '-edu', '-edum'], ['-es', '-eduts', '-eduþ'], ['-a', '--', '-edun']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']]], [[['--', '--', '--'], ['-n', '-nats', '-niþ'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']]], [[['-nau', '-naiwa', '-naima'], ['-nais', '-naits', '-naiþ'], ['-nai', '--', '-naina']], [['-edjau', '-edeiwa', '-edeima'], ['-edeis', '-edeits', '-edeiþ'], ['-edi', '--', '-edeima']], [['-aidau', '--', '-aindau'], ['-aizau', '--', '-aindau'], ['-aidau', '--', '-aindau']]]]);

// Verbs formed via pure ablaut to form preterite
const strong_verb_class_1 = new verbtype('Strong Class 1', '-an', VerbClasses.StrongAblaut, ['ai', 'i', 'i'], true, [[[['-a', '-os', '-am'], ['-is', '-ats', '-iþ'], ['-iþ', '--', '-and']], [['-', '-u', '-um'], ['-t', '-uts', '-uþ'], ['-', '--', '-un']], [['-ada', '--', '-anda'], ['-aza', '--', '-anda'], ['-ada', '--', '-anda']]], [[['--', '--', '--'], ['-', '-ats', '-iþ'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']]], [[['-au', '-aiwa', '-aima'], ['-ais', '-aits', '-aiþ'], ['-ai', '--', '-aina']], [['-jau', '-eiwa', '-eima'], ['-eis', '-eits', '-eiþ'], ['-i', '--', '-eina']], [['-aidau', '--', '-aindau'], ['-aizau', '--', '-aindau'], ['-aidau', '--', '-aindau']]]]);
const strong_verb_class_2 = new verbtype('Strong Class 2', '-an', VerbClasses.StrongAblaut, ['au', 'u', 'u'], true, [[[['-a', '-os', '-am'], ['-is', '-ats', '-iþ'], ['-iþ', '--', '-and']], [['-', '-u', '-um'], ['-t', '-uts', '-uþ'], ['-', '--', '-un']], [['-ada', '--', '-anda'], ['-aza', '--', '-anda'], ['-ada', '--', '-anda']]], [[['--', '--', '--'], ['-', '-ats', '-iþ'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']]], [[['-au', '-aiwa', '-aima'], ['-ais', '-aits', '-aiþ'], ['-ai', '--', '-aina']], [['-jau', '-eiwa', '-eima'], ['-eis', '-eits', '-eiþ'], ['-i', '--', '-eina']], [['-aidau', '--', '-aindau'], ['-aizau', '--', '-aindau'], ['-aidau', '--', '-aindau']]]]);
const strong_verb_class_3 = new verbtype('Strong Class 3', '-an', VerbClasses.StrongAblaut, ['a', 'u', 'u'], true, [[[['-a', '-os', '-am'], ['-is', '-ats', '-iþ'], ['-iþ', '--', '-and']], [['-', '-u', '-um'], ['-t', '-uts', '-uþ'], ['-', '--', '-un']], [['-ada', '--', '-anda'], ['-aza', '--', '-anda'], ['-ada', '--', '-anda']]], [[['--', '--', '--'], ['-', '-ats', '-iþ'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']]], [[['-au', '-aiwa', '-aima'], ['-ais', '-aits', '-aiþ'], ['-ai', '--', '-aina']], [['-jau', '-eiwa', '-eima'], ['-eis', '-eits', '-eiþ'], ['-i', '--', '-eina']], [['-aidau', '--', '-aindau'], ['-aizau', '--', '-aindau'], ['-aidau', '--', '-aindau']]]]);
const strong_verb_class_4 = new verbtype('Strong Class 4', '-an', VerbClasses.StrongAblaut, ['a', 'e', 'u'], true, [[[['-a', '-os', '-am'], ['-is', '-ats', '-iþ'], ['-iþ', '--', '-and']], [['-', '-u', '-um'], ['-t', '-uts', '-uþ'], ['-', '--', '-un']], [['-ada', '--', '-anda'], ['-aza', '--', '-anda'], ['-ada', '--', '-anda']]], [[['--', '--', '--'], ['-', '-ats', '-iþ'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']]], [[['-au', '-aiwa', '-aima'], ['-ais', '-aits', '-aiþ'], ['-ai', '--', '-aina']], [['-jau', '-eiwa', '-eima'], ['-eis', '-eits', '-eiþ'], ['-i', '--', '-eina']], [['-aidau', '--', '-aindau'], ['-aizau', '--', '-aindau'], ['-aidau', '--', '-aindau']]]]);
const strong_verb_class_5 = new verbtype('Strong Class 5', '-an', VerbClasses.StrongAblaut, ['a', 'e', 'i'], true, [[[['-a', '-os', '-am'], ['-is', '-ats', '-iþ'], ['-iþ', '--', '-and']], [['-', '-u', '-um'], ['-t', '-uts', '-uþ'], ['-', '--', '-un']], [['-ada', '--', '-anda'], ['-aza', '--', '-anda'], ['-ada', '--', '-anda']]], [[['--', '--', '--'], ['-', '-ats', '-iþ'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']]], [[['-au', '-aiwa', '-aima'], ['-ais', '-aits', '-aiþ'], ['-ai', '--', '-aina']], [['-jau', '-eiwa', '-eima'], ['-eis', '-eits', '-eiþ'], ['-i', '--', '-eina']], [['-aidau', '--', '-aindau'], ['-aizau', '--', '-aindau'], ['-aidau', '--', '-aindau']]]]);
const strong_verb_class_6 = new verbtype('Strong Class 6', '-an', VerbClasses.StrongAblaut, ['o', 'o', 'a'], true, [[[['-a', '-os', '-am'], ['-is', '-ats', '-iþ'], ['-iþ', '--', '-and']], [['-', '-u', '-um'], ['-t', '-uts', '-uþ'], ['-', '--', '-un']], [['-ada', '--', '-anda'], ['-aza', '--', '-anda'], ['-ada', '--', '-anda']]], [[['--', '--', '--'], ['-', '-ats', '-iþ'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']]], [[['-au', '-aiwa', '-aima'], ['-ais', '-aits', '-aiþ'], ['-ai', '--', '-aina']], [['-jau', '-eiwa', '-eima'], ['-eis', '-eits', '-eiþ'], ['-i', '--', '-eina']], [['-aidau', '--', '-aindau'], ['-aizau', '--', '-aindau'], ['-aidau', '--', '-aindau']]]]);

// Verbs formed via ablaut and reduplication to form preterite
const strong_verb_class_7 = new verbtype('Strong Class 7', '-an', VerbClasses.StrongReduplication, '-ai-', true, [[[['-a', '-os', '-am'], ['-is', '-ats', '-iþ'], ['-iþ', '--', '-and']], [['-', '-u', '-um'], ['-t', '-uts', '-uþ'], ['-', '--', '-un']], [['-ada', '--', '-anda'], ['-aza', '--', '-anda'], ['-ada', '--', '-anda']]], [[['--', '--', '--'], ['-', '-ats', '-iþ'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']]], [[['-au', '-aiwa', '-aima'], ['-ais', '-aits', '-aiþ'], ['-ai', '--', '-aina']], [['-jau', '-eiwa', '-eima'], ['-eis', '-eits', '-eiþ'], ['-i', '--', '-eina']], [['-aidau', '--', '-aindau'], ['-aizau', '--', '-aindau'], ['-aidau', '--', '-aindau']]]]);

// Getting the root of a noun
function get_verb_roots(verb_name, verb_infinitive_ending, verb_class, morpher) {
	if (verb_class == VerbClasses.Weak) {
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
	else if (verb_class == VerbClasses.StrongAblaut) {
		let stem = verb_name.slice(0, -1*verb_infinitive_ending.length);

		// Split verb stem into consonant ending block and rest of stem
		let consonant_ending_block_len = tools.num_consonants_at_end(stem);
		let consanant_ending = stem.substring(stem.length - consonant_ending_block_len);
		let rest_of_str = stem.substring(0, stem.length - consonant_ending_block_len);
		let vowel_str_block_len = tools.num_vowels_at_end(rest_of_str);
		let beginning = rest_of_str.substring(0, rest_of_str.length-vowel_str_block_len);

		// Lower vowels when 'u' is before 'r' or 'i' is before 'r', 'h', 'hw'
		let preterite_singular_ablaut = tools.lower_vowel(morpher[0], consanant_ending.substring(0, 1));
		let preterite_plural_ablaut = tools.lower_vowel(morpher[1], consanant_ending.substring(0, 1));
		let past_participle_ablaut = tools.lower_vowel(morpher[2], consanant_ending.substring(0, 1));
		// Perform ablaut on beginning of stem
		let p1_stem = beginning + preterite_singular_ablaut + consanant_ending;
		let p2_stem = beginning + preterite_plural_ablaut + consanant_ending;
		let pp_stem = beginning + past_participle_ablaut + consanant_ending + verb_infinitive_ending;
		
		tools.print('Sg Stem: ' + p1_stem);
		tools.print('Pl Stem: ' + p2_stem);
		tools.print('PP Stem: ' + pp_stem);
		return [stem, stem, p1_stem, p2_stem, pp_stem];
	}
	else if (verb_class == VerbClasses.StrongReduplication) {
		let stem = verb_name.slice(0, -1*verb_infinitive_ending.length);
		let reduplicating_vowel = morpher.substring(1, morpher.length-1);

		// Split verb stem into consonant ending block and rest of stem
		let consonant_ending_block_len = tools.num_consonants_at_end(stem);
		let consanant_ending = stem.substring(stem.length - consonant_ending_block_len);
		let rest_of_str = stem.substring(0, stem.length - consonant_ending_block_len);
		let vowel_str_block_len = tools.num_vowels_at_end(rest_of_str);
		let beginning = rest_of_str.substring(0, rest_of_str.length-vowel_str_block_len);

		// Get consonant to be duplicated
		// All known examples suggest that it's the consonant cluster at the start of the vowel stem
		// Unless vowel has 'f' in that cluster, in which case, it's just 'f'
		let duplicated_consonant = beginning;
		if (duplicated_consonant.slice(-2, -1) == 'f') {
			duplicated_consonant = duplicated_consonant.slice(0, -1);
		}

		// Vowel to use in non-reduplicated portion
		// If infinitive uses 'e' in stem, then it is changed to 'o' in preterite
		// Except for 'slepan' for some reason, only exception!
		// 'ai' in stem is usual standard in preterite, except for 2 exceptions!
		// 'au' behaves normally in one example, differently in another!
		let ablaut_vowel = stem.substring(rest_of_str.length-vowel_str_block_len, stem.length - consonant_ending_block_len);
		if (ablaut_vowel == 'e' && beginning != 'sl') {
			ablaut_vowel = 'o';
		}
		else if (ablaut_vowel == 'ai' && (beginning == 's' || beginning == 'w')) {
			ablaut_vowel = 'o';
		}
		else if (ablaut_vowel == 'au' && beginning == 'l') {
			ablaut_vowel = 'o';
		}
		//tools.print(ablaut_vowel);

		let p1_stem = duplicated_consonant + reduplicating_vowel + beginning + ablaut_vowel + consanant_ending;
		let p2_stem = p1_stem;
		let pp_stem = verb_name;

		//tools.print('Sg Stem: ' + p1_stem);
		//tools.print('Pl Stem: ' + p2_stem);
		//tools.print('PP Stem: ' + pp_stem);

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
		this.verb_class = verb_type.verb_class;
		this.morpher = verb_type.morpher;
		this.stems = get_verb_roots(name, this.infinitive_ending, this.verb_class, this.morpher);
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

		this.definition = definition;
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
		else if (stem.slice(-1) == 'j') {
			// Need to go from sokj- to soki- for past tense, or the imperative sokei, etc
			if (verb_tense == Tenses.Past || ending.substring(0, 1) == 'e') {
				stem = stem.slice(0, -1);
			}
			// Need to handle sokj- stem but sokeis style conjugations
			else if (this.is_long_jstem && ending.substring(0, 1) == 'i') {
				stem = stem.slice(0, -1) + 'e';
			}
		}
		else if (this.verb_class != VerbClasses.Weak && verb_tense == Tenses.Past && verb_mood == Moods.Subjunctive) {
			stem = this.stems[3]; // Strong verbs always use the plural preterite ablaut form for subjunctive, regardless of number
		}
		conjugation = stem + ending;
		conjugation = tools.devoice(conjugation);

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

/*
// Strong Verb Class 1
let beidan = new verb('beidan', strong_verb_class_1, NoOverrides, 'to wait');
beidan.print_cases();

// Strong Verb Class 1 (with vowel reducing)
let teihan = new verb('teihan', strong_verb_class_1, NoOverrides, 'to tell');
teihan.print_cases();

// Strong Verb Class 2
let driusan = new verb('driusan', strong_verb_class_2, NoOverrides, 'to fall');
driusan.print_cases();

// Strong Verb Class 2 (with vowel reducing)
let tiuhan = new verb('tiuhan', strong_verb_class_2, NoOverrides, 'to order');
tiuhan.print_cases();

// Strong Verb Class 3
let bindan = new verb('bindan', strong_verb_class_3, NoOverrides, 'to bind');
bindan.print_cases();

// Strong Verb Class 3 (with 3 consonant cluster)
let siggwan = new verb('siggwan', strong_verb_class_3, NoOverrides, 'to sing');
siggwan.print_cases();

// Strong Verb Class 3 (with 2 consonant cluster with h)
let filhan = new verb('filhan', strong_verb_class_3, NoOverrides, 'to conceal');
filhan.print_cases();

// Strong Verb Class 3 (compositive vowel with reducing)
let wairþan = new verb('wairþan', strong_verb_class_3, NoOverrides, 'to become');
wairþan.print_cases();

// Strong Verb Class 4 (single vowel type)
let niman = new verb('niman', strong_verb_class_4, NoOverrides, 'to take');
niman.print_cases();

// Strong Verb Class 4 (dual vowel type, with vowel reducing)
let bairan = new verb('bairan', strong_verb_class_4, NoOverrides, 'to carry');
bairan.print_cases();

// Strong Verb Class 5 (with devoicing)
let giban = new verb('giban', strong_verb_class_5, NoOverrides, 'to give');
giban.print_cases();

// Strong Verb Class 5 (alternate devoicing type)
let qiþan = new verb('qiþan', strong_verb_class_5, NoOverrides, 'to say');
qiþan.print_cases();

// Strong Verb Class 5 (alternate devoicing type)
let saiƕan = new verb('saiƕan', strong_verb_class_5, NoOverrides, 'to see');
saiƕan.print_cases();

// Strong Verb Class 6
let faran = new verb('faran', strong_verb_class_6, NoOverrides, 'to travel');
//faran.print_cases();

// Strong Verb Class 7 that is unusual for lack of ablaut to 'o'
let slepan = new verb('slepan', strong_verb_class_7, NoOverrides, 'to sleep');
slepan.print_cases();

// Other weird Strong Verb Class 7
let lauan = new verb('lauan', strong_verb_class_7, NoOverrides, 'to revile');
lauan.print_cases();

// Yet another one of them
let fraisan = new verb('fraisan', strong_verb_class_7, NoOverrides, 'to tempt');
fraisan.print_cases();

// Pretty standard, just weird for not having a consonant at its start
let aukan = new verb('aukan', strong_verb_class_7, NoOverrides, 'to increase');
aukan.print_cases();

// Strong Verb Class 7 that sees ablaut in stem vowel
let tekan = new verb('tekan', strong_verb_class_7, NoOverrides, 'to touch');
tekan.print_cases();
*/

// Strong Verb Class 5 that uses a different infinitive for present versus preterite
let bidjan = new verb('bidjan', strong_verb_class_5, NoOverrides, 'to pray');
bidjan.print_cases();
// For some reason is getting the preterite indicative exactly right
// But not preterite subjunctive
// Also imperative needs to be fixed
// And Past Participle