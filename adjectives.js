import * as tools from './tools.js'
import * as Cases from './cases.js'
import * as Numbers from './numbers.js'
import * as Genders from './genders.js'
import * as Declensions from './declensions.js'

// Data container for holding case endings for nouns.
class adjectivetype {
	constructor(name, endings) {
		this.name = name.substring(0, -1);
		this.endings = endings;
	}
}


// All the different types of adjectives
const no_endings = new adjectivetype('No Endings', [[[['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']]], [[['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']]], [[['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']], [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']]]]);
const indeclinable = new adjectivetype('Indeclinable', [[[['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']], [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']]], [[['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']], [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']]], [[['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']], [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']]]]);

const strong_masculine_endings = [['-s', '--', '-ai'], ['-is', '--', '-aize'], ['-amma', '--', '-aim'], ['-ana', '--', '-ans'], ['--', '--', '--']];
const weak_masculine_endings = [['-a', '--', '-ans'], ['-ins', '--', '-ane'], ['-in', '--', '-am'], ['-an', '--', '-ans'], ['--', '--', '--']];
const strong_neuter_endings = [['-', '--', '-a'], ['-is', '--', '-aize'], ['-amma', '--', '-aim'], ['-', '--', '-a'], ['--', '--', '--']];
const weak_neuter_endings = [['-o', '--', '-ona'], ['-ins', '--', '-ane'], ['-in', '--', '-am'], ['-o', '--', '-ona'], ['--', '--', '--']];
const strong_feminine_endings = [['-a', '--', '-os'], ['-aizos', '--', '-aizo'], ['-ai', '--', '-aim'], ['-a', '--', '-os'], ['--', '--', '--']];
const weak_feminine_endings = [['-o', '--', '-ons'], ['-ons', '--', '-ono'], ['-on', '--', '-om'], ['-on', '--', '-ons'], ['--', '--', '--']];
const weak_feminine_ei_endings = [['-ei', '--', '-eins'], ['-eins', '--', '-eino'], ['-ein', '--', '-eim'], ['-ein', '--', '-eins'], ['--', '--', '--']];

const standard = new adjectivetype('Standard', [[strong_masculine_endings, weak_masculine_endings], [strong_neuter_endings, weak_neuter_endings], [strong_feminine_endings, weak_feminine_endings]]);
const standard_eialt = new adjectivetype('Standard', [[strong_masculine_endings, weak_masculine_endings], [strong_neuter_endings, weak_neuter_endings], [strong_feminine_endings, weak_feminine_ei_endings]]);

const strong_masculine_shortj_endings = [['-is', '--', '-ai'], ['-is', '--', '-aize'], ['-amma', '--', '-aim'], ['-ana', '--', '-ans'], ['--', '--', '--']];
const standard_short_jending = new adjectivetype('Standard (j ending, short vowel)', [[strong_masculine_shortj_endings, weak_masculine_endings], [strong_neuter_endings, weak_neuter_endings], [strong_feminine_endings, weak_feminine_endings]]);

const strong_feminine_longj_endings = [['-', '--', '-os'], ['-aizos', '--', '-aizo'], ['-ai', '--', '-aim'], ['-a', '--', '-os'], ['--', '--', '--']];
const standard_long_jending = new adjectivetype('Standard (j ending, long vowel)', [[strong_masculine_shortj_endings, weak_masculine_endings], [strong_neuter_endings, weak_neuter_endings], [strong_feminine_longj_endings, weak_feminine_endings]]);

const strong_feminine_istem_endings = [['-s', '--', '-os'], ['-aizos', '--', '-aizo'], ['-ai', '--', '-aim'], ['-a', '--', '-os'], ['--', '--', '--']];
const istem = new adjectivetype('i-stem', [[strong_masculine_endings, weak_masculine_endings], [strong_neuter_endings, weak_neuter_endings], [strong_feminine_istem_endings, weak_feminine_endings]]);

// Wiktionary claims that singular genitive endings for this type are '-us' as in hardaus, with '-uus' --> 'aus'
// But this isn't an attested form. Lambdin claims it's just like wilþi.
// Lambdin form is simpler, so just use that!
const ustem = new adjectivetype('i-stem', [[strong_masculine_endings, weak_masculine_endings], [strong_neuter_endings, weak_neuter_endings], [strong_feminine_istem_endings, weak_feminine_endings]]);

const ain_masculine = [['-s', '--', '--'], ['-is', '--', '--'], ['-amma', '--', '--'], ['-ana', '--', '--'], ['--', '--', '--']];
const ain_neuter = [['-', '--', '--'], ['-is', '--', '--'], ['-amma', '--', '--'], ['-', '--', '--'], ['--', '--', '--']];
const ain_feminine = [['-a', '--', '--'], ['-aizos', '--', '--'], ['-ai', '--', '--'], ['-a', '--', '--'], ['--', '--', '--']];
const nodata = [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']];
const ain = new adjectivetype('ain', [[ain_masculine, nodata], [ain_neuter, nodata], [ain_feminine, nodata]]);

const tw_masculine = [['--', '-ai', '-ai'], ['--', '-addje', '-addje'], ['--', '-aim', '-aim'], ['--', '-ans', '-ans'], ['--', '--', '--']];
const tw_neuter = [['--', '-a', '-a'], ['--', '-addje', '-addje'], ['--', '-aim', '-aim'], ['--', '-a', '-a'], ['--', '--', '--']];
const tw_feminine = [['--', '-os', '-os'], ['--', '--', '--'], ['--', '-aim', '-aim'], ['--', '-os', '-os'], ['--', '--', '--']];
const tw = new adjectivetype('tw', [[tw_masculine, nodata], [tw_neuter, nodata], [tw_feminine, nodata]]);

const þr_masculine = [['--', '--', '-eis'], ['--', '--', '-ije'], ['--', '--', '-im'], ['--', '--', '-ins'], ['--', '--', '--']];
const þr_neuter = [['--', '--', '-ija'], ['--', '--', '-ije'], ['--', '--', '-im'], ['--', '--', '-ija'], ['--', '--', '--']];
const þr_feminine = [['--', '--', '-eis'], ['--', '--', '--'], ['--', '--', '--'], ['--', '--', '-ins'], ['--', '--', '--']];
const þr = new adjectivetype('þr', [[þr_masculine, nodata], [þr_neuter, nodata], [þr_feminine, nodata]]);

// Getting the root of a noun
function get_adjective_root(adjective_name, adjective_type) {
	let stem = adjective_name.slice(0, -1);
	return stem;
}


//Overriding certain endings
const NoOverrides = [[[['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']], [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']]], [[['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']], [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']]], [[['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']], [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']]]];


class adjective {

	constructor(name, adjective_type, overrides=NoOverrides, strong_only=false, weak_only=false, definition="No definition") {
		this.name = name;
		this.root = get_adjective_root(name, adjective_type);
		this.endings = adjective_type.endings;
		this.is_long_jstem = this.#is_long_jstem();
		this.is_istem = this.#is_istem();
		this.is_ustem = this.#is_ustem();
		this.definition = definition;
		this.overrides = overrides;

		this.strong_only = strong_only;
		this.weak_only = weak_only;
	}

	#is_long_jstem() {
		// First check if noun is a j stem to begin with
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

	#is_istem() { return this.root.slice(-1) == 'i'; }
	#is_ustem() { return this.root.slice(-1) == 'u'; }

	decline(adjective_gender, adjective_declension, adjective_case, adjective_number) {

		let declination = 'Unknown Declination';

		if (!Genders.GenderList.includes(adjective_gender)) {
			declination = 'Unknown Adjective Gender "' + adjective_gender.name + '"';
			return declination;
		}
		if (!Declensions.DeclensionList.includes(adjective_declension)) {
			declination = 'Unknown Adjective Declension "' + adjective_declension.name + '"';
			return declination;
		}
		if (!Cases.CaseList.includes(adjective_case)) {
			declination = 'Unknown Adjective Case "' + adjective_case.name + '"';
			return declination;
		}
		if (!Numbers.NumberList.includes(adjective_number)) {
			declination = 'Unknown Adjective Number "' + adjective_number.name + '"';
			return declination;
		}

		let ending = this.endings[adjective_gender.number][adjective_declension.number][adjective_case.number][adjective_number.number].substring(1);
		if (this.strong_only) {
			ending = this.endings[adjective_gender.number][Declensions.Strong.number][adjective_case.number][adjective_number.number].substring(1)
		}
		else if (this.weak_only) {
			ending = this.endings[adjective_gender.number][Declensions.Weak.number][adjective_case.number][adjective_number.number].substring(1)
		}

		// If no declination given, show just '-'
		if (tools.isNullEnding(ending)) {
			return ending;
		}
		// Special cases if declination is just noun root and that root ends with 'j'
		else if (this.root.slice(-1) == 'j') {
			declination = this.root + ending;
			if (declination.slice(-1) == 'j') {
				// Reduce j to i
				declination = declination.slice(0, -1) + 'i';
				// Then if previous character is a 'u' convert that to a 'w'
				if (declination.slice(-2, -1) == 'u') {
					declination = declination.slice(0, -2) + 'wi';
				}
			}
			// Otherwise if adjective is long j stem (masculine or neuter are the ones that apply), assimilate 'jis' to eis'
			else if (this.is_long_jstem && ending == 'is') {
				//declination = declination.slice(0,-3) + 'eis';
				declination = this.root.slice(0, -1) + 'eis';
			}
		}
		else if (this.is_istem) {
			declination = this.root + ending;
			if (declination.slice(-2) == 'is') {
				declination = this.root.slice(0, -1) + ending;
			}
			else if (declination == this.root) {
				declination = declination.slice(0, -1);
			}
			else {
				declination = this.root.slice(0, -1) + 'j' + ending;
			}
		}
		else if (this.is_ustem) {
			declination = this.root + ending;
			if (declination.slice(-2) != 'us' && declination != this.root) {
				declination = this.root.slice(0, -1) + 'j' + ending;
			}
		}
		else {
			declination = this.root + ending;
		}

		declination = tools.devoice(declination);
		if (!tools.isNullEnding(this.overrides[adjective_gender.number][adjective_declension.number][adjective_case.number][adjective_number.number])) {
			return this.overrides[adjective_gender.number][adjective_declension.number][adjective_case.number][adjective_number.number];
		}
		return declination;
	
	}

	// Print all of the relevant cases for a given adjective
	print_cases() {

		for (const gender of Genders.GenderList) {

			for (const declension of Declensions.DeclensionList) {
				let ns_decline = this.decline(gender, declension, Cases.Nominative, Numbers.Singular);
				//let nd_decline = this.decline(gender, declension, Cases.Nominative, Numbers.Dual);
				let np_decline = this.decline(gender, declension, Cases.Nominative, Numbers.Plural);
				let gs_decline = this.decline(gender, declension, Cases.Genitive, Numbers.Singular);
				//let gd_decline = this.decline(gender, declension, Cases.Genitive, Numbers.Dual);
				let gp_decline = this.decline(gender, declension, Cases.Genitive, Numbers.Plural);
				let ds_decline = this.decline(gender, declension, Cases.Dative, Numbers.Singular);
				//let dd_decline = this.decline(gender, declension, Cases.Dative, Numbers.Dual);
				let dp_decline = this.decline(gender, declension, Cases.Dative, Numbers.Plural);
				let as_decline = this.decline(gender, declension, Cases.Accusative, Numbers.Singular);
				//let ad_decline = this.decline(gender, declension, Cases.Accusative, Numbers.Dual);
				let ap_decline = this.decline(gender, declension, Cases.Accusative, Numbers.Plural);
				let vs_decline = this.decline(gender, declension, Cases.Vocative, Numbers.Singular);
				//let vd_decline = this.decline(gender, declension, Cases.Vocative, Numbers.Dual);
				let vp_decline = this.decline(gender, declension, Cases.Vocative, Numbers.Plural);


				let max_singular_col_len = Math.max(Numbers.Singular.name.length, ns_decline.length, gs_decline.length, ds_decline.length, as_decline.length, vs_decline.length);
				//let max_dual_col_len = Math.max(Numbers.Dual.name.length, nd_decline.length, gd_decline.length, dd_decline.length, ad_decline.length, vd_decline.length);
				let max_plural_col_len = Math.max(Numbers.Plural.name.length, np_decline.length, gp_decline.length, dp_decline.length, ap_decline.length, vp_decline.length);
				max_singular_col_len++;
				max_plural_col_len++;

				let top_header = declension.name + ' ' + gender.name + ' Inflections of ' + this.root + '-';
				let header = 'Case ' + Numbers.Singular.name + ' '.repeat(max_singular_col_len-Numbers.Singular.name.length) + Numbers.Plural.name;
				let nominative_line = 'Nom: ' + ns_decline + ' '.repeat(max_singular_col_len-ns_decline.length) + np_decline;
				let genitive_line = 'Gen: ' + gs_decline + ' '.repeat(max_singular_col_len-gs_decline.length) + gp_decline;
				let dative_line = 'Dat: ' + ds_decline + ' '.repeat(max_singular_col_len-ds_decline.length) + dp_decline;
				let accusative_line = 'Acc: ' + as_decline + ' '.repeat(max_singular_col_len-as_decline.length) + ap_decline;
				let vocative_line = 'Voc: ' + vs_decline + ' '.repeat(max_singular_col_len-vs_decline.length) + vp_decline;
				tools.print(top_header);
				tools.print(header);
				tools.print(nominative_line);
				tools.print(genitive_line);
				tools.print(dative_line);
				tools.print(accusative_line);
				tools.print(vocative_line);
			}
		}

	}

	print_definition() {
		tools.print('Definition of "' + this.name + '": ' + this.definition + '.');
	}
	
}



class demonstrative {

	constructor(name, inflections, definition="No definition") {
		this.name = name;
		this.inflections = inflections;
		this.definition = definition;
	}

	decline(adjective_gender, adjective_case, adjective_number) {

		let declination = 'Unknown Declination';

		if (!Genders.GenderList.includes(adjective_gender)) {
			declination = 'Unknown Adjective Gender "' + adjective_gender.name + '"';
			return declination;
		}
		if (!Cases.CaseList.includes(adjective_case)) {
			declination = 'Unknown Adjective Case "' + adjective_case.name + '"';
			return declination;
		}
		if (!Numbers.NumberList.includes(adjective_number)) {
			declination = 'Unknown Adjective Number "' + adjective_number.name + '"';
			return declination;
		}

		declination = this.inflections[adjective_gender.number][adjective_case.number][adjective_number.number]
		return declination;
	
	}

	// Print all of the relevant cases for a given adjective
	print_cases() {

		for (const gender of Genders.GenderList) {

			let ns_decline = this.decline(gender, Cases.Nominative, Numbers.Singular);
			//let nd_decline = this.decline(gender, Cases.Nominative, Numbers.Dual);
			let np_decline = this.decline(gender, Cases.Nominative, Numbers.Plural);
			let gs_decline = this.decline(gender, Cases.Genitive, Numbers.Singular);
			//let gd_decline = this.decline(gender, Cases.Genitive, Numbers.Dual);
			let gp_decline = this.decline(gender, Cases.Genitive, Numbers.Plural);
			let ds_decline = this.decline(gender, Cases.Dative, Numbers.Singular);
			//let dd_decline = this.decline(gender, Cases.Dative, Numbers.Dual);
			let dp_decline = this.decline(gender, Cases.Dative, Numbers.Plural);
			let as_decline = this.decline(gender, Cases.Accusative, Numbers.Singular);
			//let ad_decline = this.decline(gender, Cases.Accusative, Numbers.Dual);
			let ap_decline = this.decline(gender, Cases.Accusative, Numbers.Plural);
			let vs_decline = this.decline(gender, Cases.Vocative, Numbers.Singular);
			//let vd_decline = this.decline(gender, Cases.Vocative, Numbers.Dual);
			let vp_decline = this.decline(gender, Cases.Vocative, Numbers.Plural);


			let max_singular_col_len = Math.max(Numbers.Singular.name.length, ns_decline.length, gs_decline.length, ds_decline.length, as_decline.length, vs_decline.length);
			//let max_dual_col_len = Math.max(Numbers.Dual.name.length, nd_decline.length, gd_decline.length, dd_decline.length, ad_decline.length, vd_decline.length);
			let max_plural_col_len = Math.max(Numbers.Plural.name.length, np_decline.length, gp_decline.length, dp_decline.length, ap_decline.length, vp_decline.length);
			max_singular_col_len++;
			max_plural_col_len++;

			let top_header = gender.name + ' Inflections of ' + this.name;
			let header = 'Case ' + Numbers.Singular.name + ' '.repeat(max_singular_col_len-Numbers.Singular.name.length) + Numbers.Plural.name;
			let nominative_line = 'Nom: ' + ns_decline + ' '.repeat(max_singular_col_len-ns_decline.length) + np_decline;
			let genitive_line = 'Gen: ' + gs_decline + ' '.repeat(max_singular_col_len-gs_decline.length) + gp_decline;
			let dative_line = 'Dat: ' + ds_decline + ' '.repeat(max_singular_col_len-ds_decline.length) + dp_decline;
			let accusative_line = 'Acc: ' + as_decline + ' '.repeat(max_singular_col_len-as_decline.length) + ap_decline;
			let vocative_line = 'Voc: ' + vs_decline + ' '.repeat(max_singular_col_len-vs_decline.length) + vp_decline;
			tools.print(top_header);
			tools.print(header);
			tools.print(nominative_line);
			tools.print(genitive_line);
			tools.print(dative_line);
			tools.print(accusative_line);
			tools.print(vocative_line);
		}

	}

	print_definition() {
		tools.print('Definition of "' + this.name + '": ' + this.definition + '.');
	}
	
}


/*
// Standard Adjective
let mikil = new adjective('mikil-', standard, NoOverrides, false, false, 'Large, big, important');
mikil.print_cases();

// Standard adjectice with ending that needs to be devoiced
let frod = new adjective('frod-', standard, NoOverrides, false, false, 'Wise');
frod.print_cases();

// Short j ending
let niuj = new adjective('niuj-', standard_short_jending, NoOverrides, false, false, 'New');
niuj.print_cases();

// Short j ending
let wilþj = new adjective('wilþj-', standard_long_jending, NoOverrides, false, false, 'New');
wilþj.print_cases();

// i stem ending
let hraini = new adjective('hraini-', istem, NoOverrides, false, false, 'Pure, clean');
hraini.print_cases();

// u stem ending
let hardu = new adjective('hardu-', ustem, NoOverrides, false, false, 'Difficult, hard');
hardu.print_cases();
*/

/*
// Adjective with only strong form
let mein = new adjective('mein-', standard, NoOverrides, true, false, 'my');
mein.print_cases();

// Adjective with only weak form
let silb = new adjective('silb-', standard, NoOverrides, false, true, 'self');
silb.print_cases();
*/

/*
// Special adjective ain-
let ains = new adjective('ain-', ain, NoOverrides, true, false, 'one');
ains.print_cases();

// Special adjective ain-
let twai = new adjective('tw-', tw, NoOverrides, true, false, 'two');
twai.print_cases();

let þreis = new adjective('þr-', þr, NoOverrides, true, false, 'three');
þreis.print_cases();
*/

/*
// The Demonstrative
const demonstrative_masculine_inflections = [['sa', '--', 'þai'], ['þis', '--', 'þize'], ['þamma', '--', 'þaim'], ['þana', '--', 'þans'], ['--', '--', '--']];
const demonstrative_neuter_inflections = [['þata', '--', 'þo'], ['þis', '--', 'þize'], ['þamma', '--', 'þaim'], ['þata', '--', 'þo'], ['--', '--', '--']];
const demonstrative_feminine_inflections = [['so', '--', 'þos'], ['þizos', '--', 'þizo'], ['þizai', '--', 'þaim'], ['þo', '--', 'þos'], ['--', '--', '--']];
let sa = new demonstrative('sa', [demonstrative_masculine_inflections, demonstrative_neuter_inflections, demonstrative_feminine_inflections], 'that, these, this, these');
sa.print_cases();
*/