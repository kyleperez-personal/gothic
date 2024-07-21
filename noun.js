import * as tools from './tools.js'
import * as Cases from './language_properties/cases.js'
import * as Numbers from './language_properties/numbers.js'
import * as Genders from './language_properties/genders.js'

// Data container for holding case endings for nouns.
class nountype {
	constructor(name, case_endings) {
		this.name = name;
		this.endings = case_endings;
	}
}

// All the different types of nouns.
const no_endings = new nountype('No Endings', [['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--'], ['--', '--', '--']]);
const indeclinable = new nountype('Indeclinable', [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']]);
const strong_masculine = new nountype('Strong Masculine', [['-s', '--', '-os'], ['-is', '--', '-e'], ['-a', '--', '-am'], ['-', '--', '-ans'], ['--', '--', '--']]);
const strong_masculine_rending = new nountype('Strong Masculine (r ending)', [['-', '--', '-os'], ['-is', '--', '-e'], ['-a', '--', '-am'], ['-', '--', '-ans'], ['--', '--', '--']]);
const strong_masculine_jstem_shortvowel = new nountype('Strong Masculine (j stem, w/ short vowel)', [['-is', '--', '-os'], ['-is', '--', '-e'], ['-a', '--', '-am'], ['-', '--', '-ans'], ['--', '--', '--']]);
const strong_masculine_jstem_longvowel = new nountype('Strong Masculine (j stem, w/ long vowel)', [['-is', '--', '-os'], ['-is', '--', '-e'], ['-a', '--', '-am'], ['-', '--', '-ans'], ['--', '--', '--']]);
const strong_neuter = new nountype('Strong Neuter', [['-', '--', '-a'], ['-is', '--', '-e'], ['-a', '--', '-am'], ['-', '--', '-a'], ['--', '--', '--']]);
const strong_neuter_jstem_shortvowel = new nountype('Strong Neuter', [['-', '--', '-a'], ['-is', '--', '-e'], ['-a', '--', '-am'], ['-', '--', '-a'], ['--', '--', '--']]);
const strong_neuter_jstem_longvowel = new nountype('Strong Neuter', [['-', '--', '-a'], ['-is', '--', '-e'], ['-a', '--', '-am'], ['-', '--', '-a'], ['--', '--', '--']]);
const strong_feminine = new nountype('Strong Feminine', [['-a', '--', '-os'], ['-os', '--', '-o'], ['-ai', '--', '-om'], ['-a', '--', '-os'], ['--', '--', '--']]);
const strong_feminine_jstem_shortvowel = new nountype('Strong Feminine', [['-a', '--', '-os'], ['-os', '--', '-o'], ['-ai', '--', '-om'], ['-a', '--', '-os'], ['--', '--', '--']]);
const strong_feminine_jstem_longvowel = new nountype('Strong Feminine', [['-', '--', '-os'], ['-os', '--', '-o'], ['-ai', '--', '-om'], ['-a', '--', '-os'], ['--', '--', '--']]);
const weak_masculine = new nountype('Weak Masculine', [['-a', '--', '-ans'], ['-ins', '--', '-ane'], ['-in', '--', '-am'], ['-an', '--', '-ans'], ['--', '--', '--']]);
const weak_neuter = new nountype('Weak Neuter', [['-o', '--', '-ona'], ['-ins', '--', '-ane'], ['-in', '--', '-am'], ['-o', '--', '-ona'], ['--', '--', '--']]);
const weak_feminine_oending = new nountype('Weak Feminine (-o ending)', [['-o', '--', '-ons'], ['-ons', '--', '-ono'], ['-on', '--', '-om'], ['-on', '--', '-ons'], ['--', '--', '--']]);
const weak_feminine_eiending = new nountype('Weak Feminine (-ei ending)', [['-ei', '--', '-eins'], ['-eins', '--', '-eino'], ['-ein', '--', '-eim'], ['-ein', '--', '-eins'], ['--', '--', '--']]);
const strong_masculine_istem = new nountype('Strong Masculine (-i stem)', [['-s', '--', '-eis'], ['-is', '--', '-e'], ['-a', '--', '-im'], ['-', '--', '-ins'], ['--', '--', '--']]);
const strong_feminine_istem = new nountype('Strong Feminine (-i stem)', [['-s', '--', '-eis'], ['-ais', '--', '-e'], ['-ai', '--', '-im'], ['-', '--', '-ins'], ['--', '--', '--']]);
const rstem = new nountype('-r stem', [['-ar', '--', '-rjus'], ['-rs', '--', '-re'], ['-r', '--', '-rum'], ['-ar', '--', '-runs'], ['--', '--', '--']]);
const strong_ustem = new nountype('Strong (-u stem)', [['-us', '--', '-jus'], ['-aus', '--', '-iwe'], ['-au', '--', '-um'], ['-u', '--', '-uns'], ['--', '--', '--']]);
const strong_neuter_ustem = new nountype('Strong Neuter (-u stem)', [['-u', '--', '--'], ['--', '--', '--'], ['-au', '--', '--'], ['-u', '--', '--'], ['--', '--', '--']]);
const masculine = new nountype('Masculine', [['-s', '--', '-s'], ['-is', '--', '-e'], ['-', '--', '-am'], ['-', '--', '-s'], ['--', '--', '--']]);
const feminine = new nountype('Feminine', [['-s', '--', '-s'], ['-s', '--', '-e'], ['-', '--', '-im'], ['-', '--', '-s'], ['--', '--', '--']]);

const special_manna = new nountype('Manna', [['-na', '--', '-nans'], ['-s', '--', '-ne'], ['-n', '--', '-nam'], ['-nan', '--', '-nans'], ['--', '--', '--']])
const special_menoþs = new nountype('Special Class (Menoþs)', [['-s', '--', '-s'], ['--', '--', '--'], ['-', '--', '-um'], ['--', '--', '-s'], ['--', '--', '--']]);
const special_weitwoþs = new nountype('Special Class (Weitwoþs)', [['-þs', '--', '-þs'], ['--', '--', '-de'], ['--', '--', '--'], ['-d', '--', '--'], ['--', '--', '--']]);
const special_fon = new nountype('Special Class (Fon)', [['-on', '--', '--'], ['-unins', '--', '--'], ['-unin', '--', '--'], ['-on', '--', '--'], ['--', '--', '--']]);

const class1weak_verbal = new nountype('Weak Verbal Noun (Class 1)', [['-s', '--', '-os'], ['-ais', '--', '-o'], ['-ai', '--', '-im'], ['-', '--', '-ins'], ['--', '--', '--']]);
const special_gairnei = weak_feminine_eiending;
const class3weak_verbal = strong_feminine_istem;


//Overriding certain endings
const NoOverrides = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']]


// Getting the root of a noun
function get_noun_root(noun, noun_type, revoicing) {

	let stem = '';

	switch(noun_type) {
		// Nouns whose NS is the stem
		case indeclinable:
		case strong_neuter:
		case strong_masculine_rending:
			stem = noun;
			break;
		// Special cases for short and long vowel assimilation with j stem nouns
		// 'auj' root ending goes to 'awi'
		// while bare 'j' ending goes to 'i' 
		case strong_neuter_jstem_shortvowel:
		case strong_feminine_jstem_longvowel:
		case strong_neuter_jstem_longvowel:
			if (noun.slice(-2, -1) == 'w') {
				stem = noun.slice(0, -2) + 'uj';
				break;
			}
			stem = noun.slice(0, -1) + 'j';
			break;
		// Nouns whose NS just has 1 extra letter on the stem
		case strong_masculine:	
		case strong_feminine:
		case strong_feminine_jstem_shortvowel:
		case weak_masculine:
		case weak_neuter:
		case weak_feminine_oending:
		case strong_masculine_istem:
		case strong_feminine_istem:
		case strong_neuter_ustem:
		case masculine:
		case feminine:
		case special_menoþs:
		case class1weak_verbal:
		case class3weak_verbal:
			stem = noun.slice(0, -1);
			break;
		// Nouns whose NS has 2 more characters than the stem
		case strong_masculine_jstem_shortvowel:
		case weak_feminine_eiending:
		case rstem:
		case strong_ustem:
		case special_manna:
		case special_weitwoþs:
		case special_fon:
		case special_gairnei:
			stem = noun.slice(0, -2);
			break;
		// Extra special case for long vowel j stem
		case strong_masculine_jstem_longvowel:
			stem = noun.slice(0, -3) + 'j';
			break;
		default:
			tools.print('Unexpected noun type of "' + noun_type.name + '".');
			stem = '--';
	}

	if (revoicing) stem = tools.revoice(stem);
	return stem;

}


// Container for holding a noun
class noun {

	constructor(name, noun_gender, noun_type, revoicing=false, overrides=NoOverrides, definition="No definition") {
		this.name = name;
		this.gender = noun_gender;
		this.revoicing = revoicing;
		this.root = get_noun_root(name, noun_type, revoicing);
		this.endings = noun_type.endings;
		this.is_long_jstem = this.#is_long_jstem();
		this.definition = definition;
		this.overrides = overrides;
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

	// Given a specific case + number, decline a general noun
	decline(noun_case, noun_number) {

		let declination = 'Unknown Declination';

		if (!Cases.CaseList.includes(noun_case)) {
			declination = 'Unknown Noun Case "' + noun_case.name + '"';
			return declination;
		}
		if (!Numbers.NumberList.includes(noun_number)) {
			declination = 'Unknown Noun Number "' + noun_number.name + '"';
			return declination;
		}

		let ending = this.endings[noun_case.number][noun_number.number].substring(1);
		
		// If no declination given, show just '-'
		if (tools.isNullEnding(ending)) {
			return ending;
		}
		// Otherwise, need to construct some special cases related to j stem nouns
		else if (this.root.slice(-1) == 'j') {
			declination = this.root + ending;
			// If declined version ends in bare 'j'
			if (declination.slice(-1) == 'j') {
				// Reduce 'j' to 'i' unless have 'auj' cluster, then go to 'awi'.
				declination = declination.slice(0, -1) + 'i';
				if (declination.slice(-2, -1) == 'u') {
					declination = declination.slice(0, -2) + 'wi';
				}
			}
			// Otherwise if noun is long j stem (masculine or neuter are the ones that apply), assimilate 'jis' to eis'
			else if (this.is_long_jstem && ending == 'is') {
				//declination = declination.slice(0,-3) + 'eis';
				declination = this.root.slice(0, -1) + 'eis';
			}
			// If the ending is pure 'ns' (like andins) with j ending stem, ending is 'ins'.
			else if (this.is_long_jstem && ending == 'ns') {
				//declination = declination.slice(0,-3) + 'ins';
				declination = this.root.slice(0, -1) + 'ins';
			}
			//return declination;
		}
		else {
			declination = this.root + ending;
		}

		if (this.revoicing) declination = tools.devoice(declination);
		if (!tools.isNullEnding(this.overrides[noun_case.number][noun_number.number])) {
			return this.overrides[noun_case.number][noun_number.number];
		}
		//tools.print('Got here')
		return declination;

	}

	// Print all of the relevant cases for a given noun
	print_cases() {

		let ns_decline = this.decline(Cases.Nominative, Numbers.Singular);
		//let nd_decline = this.decline(Cases.Nominative, Numbers.Dual);
		let np_decline = this.decline(Cases.Nominative, Numbers.Plural);
		let gs_decline = this.decline(Cases.Genitive, Numbers.Singular);
		//let gd_decline = this.decline(Cases.Genitive, Numbers.Dual);
		let gp_decline = this.decline(Cases.Genitive, Numbers.Plural);
		let ds_decline = this.decline(Cases.Dative, Numbers.Singular);
		//let dd_decline = this.decline(Cases.Dative, Numbers.Dual);
		let dp_decline = this.decline(Cases.Dative, Numbers.Plural);
		let as_decline = this.decline(Cases.Accusative, Numbers.Singular);
		//let ad_decline = this.decline(Cases.Accusative, Numbers.Dual);
		let ap_decline = this.decline(Cases.Accusative, Numbers.Plural);
		let vs_decline = this.decline(Cases.Vocative, Numbers.Singular);
		//let vd_decline = this.decline(Cases.Vocative, Numbers.Dual);
		let vp_decline = this.decline(Cases.Vocative, Numbers.Plural);

		let max_singular_col_len = Math.max(Numbers.Singular.name.length, ns_decline.length, gs_decline.length, ds_decline.length, as_decline.length, vs_decline.length);
		let max_plural_col_len = Math.max(Numbers.Plural.name.length, np_decline.length, gp_decline.length, dp_decline.length, ap_decline.length, vp_decline.length);

		max_singular_col_len++;
		max_plural_col_len++;

		let top_header = 'Inflections of ' + this.name;
		let header = 'Case ' + Numbers.Singular.name + ' '.repeat(max_singular_col_len-Numbers.Singular.name.length) + Numbers.Plural.name;
		let nominative_line = 'Nom: ' + ns_decline + ' '.repeat(max_singular_col_len-ns_decline.length)  + np_decline;
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

	print_definition() {
		tools.print('Definition of "' + this.name + '": ' + this.definition + '.');
	}

}



// Container for holding a noun
class pronoun {

	constructor(name, inflections, reflexive, definition="No definition") {
		this.name = name;
		this.inflections = inflections;
		this.reflexive = reflexive;
		this.definition = definition;
	}


	// Given a specific case + number, decline a general noun
	decline(noun_case, noun_number, noun_gender, reflexivity) {

		let declination = 'Unknown Declination';

		if (!Cases.CaseList.includes(noun_case)) {
			declination = 'Unknown Noun Case: "' + noun_case.name + '"';
			return declination;
		}
		else if (!Numbers.NumberList.includes(noun_number)) {
			declination = 'Unknown Noun Number "' + noun_number.name + '"';
			return declination;
		}
		else if (!Genders.GenderList.includes(noun_gender)) {
			declination = 'Unknown Noun Gender "' + noun_gender.name + '"';
			return declination;
		}

		if (reflexivity == false) {
			declination = this.inflections[noun_gender.number][noun_case.number][noun_number.number];
		}
		else {
			if (noun_case == Cases.Nominative || noun_case == Cases.Vocative) {
				declination = '-';
			}
			else {
				declination = this.reflexive[noun_case.number-1];
			}
		}

		return declination;

	}

	// Print all of the relevant cases for a given noun
	print_cases() {

		for (const gender of Genders.GenderList) {
			let ns_decline = this.decline(Cases.Nominative, Numbers.Singular, gender, false);
			let nd_decline = this.decline(Cases.Nominative, Numbers.Dual, gender, false);
			let np_decline = this.decline(Cases.Nominative, Numbers.Plural, gender, false);
			let gs_decline = this.decline(Cases.Genitive, Numbers.Singular, gender, false);
			let gd_decline = this.decline(Cases.Genitive, Numbers.Dual, gender, false);
			let gp_decline = this.decline(Cases.Genitive, Numbers.Plural, gender, false);
			let ds_decline = this.decline(Cases.Dative, Numbers.Singular, gender, false);
			let dd_decline = this.decline(Cases.Dative, Numbers.Dual, gender, false);
			let dp_decline = this.decline(Cases.Dative, Numbers.Plural, gender, false);
			let as_decline = this.decline(Cases.Accusative, Numbers.Singular, gender, false);
			let ad_decline = this.decline(Cases.Accusative, Numbers.Dual, gender, false);
			let ap_decline = this.decline(Cases.Accusative, Numbers.Plural, gender, false);
			let vs_decline = this.decline(Cases.Vocative, Numbers.Singular, gender, false);
			let vd_decline = this.decline(Cases.Vocative, Numbers.Dual, gender, false);
			let vp_decline = this.decline(Cases.Vocative, Numbers.Plural, gender, false);

			let reflex_n = this.decline(Cases.Nominative, Numbers.Singular, gender, true);
			let reflex_g = this.decline(Cases.Genitive, Numbers.Singular, gender, true);
			let reflex_d = this.decline(Cases.Dative, Numbers.Singular, gender, true);
			let reflex_a = this.decline(Cases.Accusative, Numbers.Singular, gender, true);
			let reflex_v = this.decline(Cases.Vocative, Numbers.Singular, gender, true);

			let max_singular_col_len = Math.max(Numbers.Singular.name.length, ns_decline.length, gs_decline.length, ds_decline.length, as_decline.length, vs_decline.length);
			let max_dual_col_len = Math.max(Numbers.Dual.name.length, nd_decline.length, gd_decline.length, dd_decline.length, ad_decline.length, vd_decline.length);
			let max_plural_col_len = Math.max(Numbers.Plural.name.length, np_decline.length, gp_decline.length, dp_decline.length, ap_decline.length, vp_decline.length);
			let max_reflex_col_len = Math.max('Reflexive'.length, reflex_n.length, reflex_g.length, reflex_d.length, reflex_a.length, reflex_v.length);

			max_singular_col_len++;
			max_plural_col_len++;

			let gender_header = gender.name + ' Inflections of ' + this.name;
			let header = 'Case ' + Numbers.Singular.name + ' '.repeat(max_singular_col_len-Numbers.Singular.name.length) + Numbers.Dual.name + ' '.repeat(max_dual_col_len-Numbers.Dual.name.length+1) + Numbers.Plural.name + ' '.repeat(max_plural_col_len-Numbers.Plural.name.length) + 'Reflexive';
			let nominative_line = 'Nom: ' + ns_decline + ' '.repeat(max_singular_col_len-ns_decline.length) + nd_decline + ' '.repeat(max_dual_col_len-nd_decline.length+1) + np_decline + ' '.repeat(max_plural_col_len-np_decline.length) + reflex_n;
			let genitive_line = 'Gen: ' + gs_decline + ' '.repeat(max_singular_col_len-gs_decline.length) + gd_decline + ' '.repeat(max_dual_col_len-gd_decline.length+1) + gp_decline + ' '.repeat(max_plural_col_len-gp_decline.length) + reflex_g;
			let dative_line = 'Dat: ' + ds_decline + ' '.repeat(max_singular_col_len-ds_decline.length) + dd_decline + ' '.repeat(max_dual_col_len-dd_decline.length+1) + dp_decline + ' '.repeat(max_plural_col_len-dp_decline.length) + reflex_d;
			let accusative_line = 'Acc: ' + as_decline + ' '.repeat(max_singular_col_len-as_decline.length) + ad_decline + ' '.repeat(max_dual_col_len-ad_decline.length+1) + ap_decline + ' '.repeat(max_plural_col_len-ap_decline.length) + reflex_a;
			let vocative_line = 'Voc: ' + vs_decline + ' '.repeat(max_singular_col_len-vs_decline.length) + vd_decline + ' '.repeat(max_dual_col_len-vd_decline.length+1) + vp_decline + ' '.repeat(max_plural_col_len-vp_decline.length) + reflex_v;
			tools.print(gender_header);
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
// Strong Masculine Nouns
// Default type
let dags = new noun('dags', Genders.Masculine, strong_masculine, false, NoOverrides, 'day');
dags.print_cases();
dags.print_definition();

// Devoiced stem
let hlaifs = new noun('hlaifs', Genders.Masculine, strong_masculine, true, NoOverrides, 'bread');
hlaifs.print_cases();

// Strong Masculine Noun that ends in 'r'
let wair = new noun('wair', Genders.Masculine, strong_masculine_rending, false, NoOverrides, 'person, man');
wair.print_cases();

// Strong Masculine Noun with j ending stem with short vowels
// Short vowels: a i u
let harjis = new noun('harjis', Genders.Masculine, strong_masculine_jstem_shortvowel, false, NoOverrides, 'army');
harjis.print_cases();

// Long vowels: e o ei
let siponeis = new noun('siponeis', Genders.Masculine, strong_masculine_jstem_longvowel, false, NoOverrides, 'disciple');
siponeis.print_cases();

// Strong masculine noun with long j stem and irregular accusative ending
const andeis_overrides = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-'], ['-', '-', 'andins'], ['-', '-', '-']]
let andeis = new noun('andeis', Genders.Masculine, strong_masculine_jstem_longvowel, false, andeis_overrides, 'end');
andeis.print_cases();
*/




/*
// Strong Neuter Noun
let waurd = new noun('waurd', Genders.Neuter, strong_neuter, false, NoOverrides, 'word');
waurd.print_cases();

// Strong Neuter Noun with devoiced stem
let witoþ = new noun('witoþ', Genders.Neuter, strong_neuter, true, NoOverrides, 'law');
witoþ.print_cases();

// Alternate devoiced stem
let dius = new noun('dius', Genders.Neuter, strong_neuter, true, NoOverrides, 'wild animal');
dius.print_cases();

// Short j stem
let fairguni = new noun('fairguni', Genders.Neuter, strong_neuter_jstem_shortvowel, false, NoOverrides, 'mountain');
fairguni.print_cases();

// Long j stem
let gawi = new noun('gawi', Genders.Neuter, strong_neuter_jstem_longvowel, false, NoOverrides, 'district, region');
gawi.print_cases();
*/


/*
// Strong Feminine Noun
let giba = new noun('giba', Genders.Feminine, strong_feminine, false, NoOverrides, 'gift');
giba.print_cases();

// Short j stem
let sunja = new noun('sunja', Genders.Feminine, strong_feminine_jstem_shortvowel, false, NoOverrides, 'truth');
sunja.print_cases();

// Long j stem
let wasti = new noun('wasti', Genders.Feminine, strong_feminine_jstem_longvowel, false, NoOverrides, 'clothes');
wasti.print_cases();

// Long j stem with 'auj' --> 'awi' assimilation
let mawi = new noun('mawi', Genders.Feminine, strong_feminine_jstem_longvowel, false, NoOverrides, 'young woman, girl');
mawi.print_cases();
*/


/*
// Weak Masculine Noun
let atta = new noun('atta', Genders.Masculine, weak_masculine, false, NoOverrides, 'father');
atta.print_cases();

// Weak Neuter Noun
let hairto = new noun('hairto', Genders.Neuter, weak_neuter, false, NoOverrides, 'heart');
hairto.print_cases();

// Weak Feminine Noun (-o type)
let qino = new noun('qino', Genders.Feminine, weak_feminine_oending, false, NoOverrides, 'wife, woman');
qino.print_cases();

// Weak Feminine Noun (-ei type)
let managei = new noun('managei', Genders.Feminine, weak_feminine_eiending, false, NoOverrides, 'crowd');
managei.print_cases();
*/

/*
// Strong Masculine Noun (-i type)
let gasts = new noun('gasts', Genders.Masculine, strong_masculine_istem, false, NoOverrides, 'guest');
gasts.print_cases();

// Strong Feminine Noun (-i type)
let taikns = new noun('taikns', Genders.Feminine, strong_feminine_istem, false, NoOverrides, 'sign, omen');
taikns.print_cases();

// R Stem Noun (-i type)
let broþar = new noun('broþar', Genders.Masculine, rstem, false, NoOverrides, 'brother');
broþar.print_cases();
*/

/*
// U Stem Masculine Noun
let sunus = new noun('sunus', Genders.Masculine, strong_ustem, false, NoOverrides, 'son');
sunus.print_cases();

// U Stem Feminine Noun
let handus = new noun('handus', Genders.Feminine, strong_ustem, false, NoOverrides, 'hand');
handus.print_cases();

// U Stem Neuter Noun
let faihu = new noun('faihu', Genders.Neuter, strong_neuter_ustem, false, NoOverrides, 'property, wealth');
faihu.print_cases();
*/

/*
// Bare Masculine Noun
let frijonds = new noun('frijonds', Genders.Masculine, masculine, false, NoOverrides, 'friend');
frijonds.print_cases();

// Bare Feminine Noun
let baurgs = new noun('baurgs', Genders.Feminine, feminine, false, NoOverrides, 'city');
baurgs.print_cases();

// Special Noun: menoþs
let menoþs = new noun('menoþs', Genders.Masculine, special_menoþs, false, NoOverrides, 'month');
menoþs.print_cases();

// Special Noun: weitwoþs
let weitwoþs = new noun('weitwoþs', Genders.Masculine, special_weitwoþs, false, NoOverrides, 'witness');
weitwoþs.print_cases();

// Special Noun: fon
let fon = new noun('fon', Genders.Neuter, special_fon, false, NoOverrides, 'fire');
fon.print_cases();
*/

/*
// Class 1 Weak Verbal Noun
let hauseins = new noun('hauseins', Genders.Feminine, class1weak_verbal, false, NoOverrides, 'hearing');
hauseins.print_cases();

// Special Verbal Noun: gairnei
let gairnei = new noun('gairnei', Genders.Feminine, special_gairnei, false, NoOverrides, 'desire');
gairnei.print_cases();

// Class 3 Weak Verbal Noun:
let libains = new noun('libains', Genders.Feminine, class3weak_verbal, false, NoOverrides, 'life');
libains.print_cases();
*/

/*
// Special Noun: manna
let manna = new noun('manna', Genders.Masculine, special_manna, false, NoOverrides, 'person, man');
manna.print_cases();
*/


/*
// Pronouns
const first_person_pronoun_inflections = [['ik', 'wit', 'weis'], ['meina', '-', 'unsis'], ['mis', 'ugkis', 'uns'], ['mik', 'ugkis', 'uns'], ['-', '-', '-']];
let ik = new pronoun('ik', [first_person_pronoun_inflections, first_person_pronoun_inflections, first_person_pronoun_inflections], ['-', '-', '-'], 'I, me, mine');
ik.print_cases();

const second_person_pronoun_inflections = [['þu', 'jut', 'jus'], ['þeina', 'igqara', 'izwara'], ['þus', 'igqis', 'izwis'], ['þuk', 'igqis', 'izwis'], ['-', '-', '-']];
let þu = new pronoun('þu', [second_person_pronoun_inflections, second_person_pronoun_inflections, second_person_pronoun_inflections], ['-', '-', '-'], 'You, you two, yours');
þu.print_cases();

const third_person_pronoun_masculine_inflections = [['is', '-', 'eis'], ['is', '-', 'ize'], ['imma', '-', 'im'], ['ina', '-', 'ins'], ['-', '-', '-']];
const third_person_pronoun_neuter_inflections = [['ita', '-', 'ija'], ['is', '-', 'ize'], ['imma', '-', 'im'], ['ita', '-', 'ija'], ['-', '-', '-']];
const third_person_pronoun_feminine_inflections = [['si', '-', 'ijos'], ['izos', '-', 'izo'], ['izai', '-', 'im'], ['ija', '-', 'ijos'], ['-', '-', '-']];
const third_person_pronoun_reflexives = ['seina', 'sis', 'sik'];
let is = new pronoun('is', [third_person_pronoun_masculine_inflections, third_person_pronoun_neuter_inflections, third_person_pronoun_feminine_inflections], third_person_pronoun_reflexives, 'He, it, her, they, etc');
is.print_cases();

const interrogative_pronoun_masculine_inflections = [['ƕas', '-', '-'], ['ƕis', '-', '-'], ['ƕamma', '-', '-'], ['ƕana', '-', '-'], ['-', '-', '-']];
const interrogative_pronoun_neuter_inflections = [['ƕa', '-', '-'], ['ƕis', '-', '-'], ['ƕamma', '-', '-'], ['ƕa', '-', '-'], ['-', '-', '-']];
const interrogative_pronoun_feminine_inflections = [['ƕos', '-', '-'], ['ƕizos', '-', '-'], ['ƕizai', '-', '-'], ['ƕo', '-', '-'], ['-', '-', '-']];
let ƕas = new pronoun('ƕas', [interrogative_pronoun_masculine_inflections, interrogative_pronoun_neuter_inflections, interrogative_pronoun_feminine_inflections], ['-', '-', '-'], 'Who, whose, whom (interrogative)');
ƕas.print_cases();

const relative_pronoun_masculine_inflections = [['saei', '-', 'þaiei'], ['þizei', '-', 'þizeei'], ['þammei', '-', 'þaimei'], ['þanei', '-', 'þanzei'], ['-', '-', '-']];
const relative_pronoun_neuter_inflections = [['þatei', '-', 'þoei'], ['þizei', '-', 'þizeei'], ['þammei', '-', 'þaimei'], ['þatei', '-', 'þoei'], ['-', '-', '-']];
const relative_pronoun_feminine_inflections = [['soei', '-', 'þozei'], ['þizozei', '-', 'þizoei'], ['þizaiei', '-', 'þaimei'], ['þoei', '-', 'þozei'], ['-', '-', '-']];
let saei = new pronoun('saei', [relative_pronoun_masculine_inflections, relative_pronoun_neuter_inflections, relative_pronoun_feminine_inflections], ['-', '-', '-'], 'Who, whose, whom (relative)');
saei.print_cases();

const demonstrative_pronoun_masculine_inflections = [['sah', '-', '-'], ['þizuh', '-', '-'], ['þammeuh', '-', '-'], ['þanuh', '-', '-'], ['-', '-', '-']];
const demonstrative_pronoun_neuter_inflections = [['þatuh', '-', '-'], ['þizuh', '-', '-'], ['þammuh', '-', '-'], ['þatuh', '-', '-'], ['-', '-', '-']];
const demonstrative_pronoun_feminine_inflections = [['soh', '-', '-'], ['--', '-', '-'], ['--', '-', '-'], ['--', '-', '-'], ['-', '-', '-']];
let sah = new pronoun('sah', [demonstrative_pronoun_masculine_inflections, demonstrative_pronoun_neuter_inflections, demonstrative_pronoun_feminine_inflections], ['-', '-', '-'], 'That');
sah.print_cases();

const indefinite_pronoun_masculine_inflections = [['ƕazuh', '-', 'ƕarjizuh'], ['ƕizuh', '-', 'ƕarjizuh'], ['ƕammeh', '-', 'ƕarjammeh'], ['ƕanoh', '-', 'ƕwarjanoh'], ['-', '-', '-']];
const indefinite_pronoun_neuter_inflections = [['ƕah', '-', 'ƕwarjatoh'], ['ƕizuh', '-', '--'], ['ƕammeh', '-', '--'], ['ƕah', '-', '--'], ['-', '-', '-']];
const indefinite_pronoun_feminine_inflections = [['ƕoh', '-', '--'], ['--', '-', '--'], ['--', '-', '--'], ['--', '-', 'ƕarjoh'], ['-', '-', '-']];
let ƕazuh = new pronoun('ƕazuh', [indefinite_pronoun_masculine_inflections, indefinite_pronoun_neuter_inflections, indefinite_pronoun_feminine_inflections], ['-', '-', '-'], 'Who, which, which of the two');
ƕazuh.print_cases();

const no_who_pronoun_masculine_inflections = [['ni ƕashun', '-', '-'], ['--', '-', '-'], ['--', '-', '-'], ['--', '-', '-'], ['-', '-', '-']];
let ni_ƕashun = new pronoun('ni ƕashun', [no_who_pronoun_masculine_inflections, [['--', '-', '-'], ['--', '-', '-'], ['--', '-', '-'], ['--', '-', '-'], ['-', '-', '-']], [['--', '-', '-'], ['--', '-', '-'], ['--', '-', '-'], ['--', '-', '-'], ['-', '-', '-']]], ['-', '-', '-'], 'No one');
ni_ƕashun.print_cases();

const no_man_pronoun_masculine_inflections = [['ni mannahun', '-', '-'], ['ni manshun', '-', '-'], ['ni mannhun', '-', '-'], ['ni mannanhun', '-', '-'], ['-', '-', '-']];
let ni_mannahun = new pronoun('ni mannahun', [no_man_pronoun_masculine_inflections, [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']], [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']]], ['-', '-', '-'], 'No one (literally, no man)');
ni_mannahun.print_cases();
*/

const no_one_pronoun_masculine_inflections = [['ni ainshun', '-', '-'], ['ni ainishun', '-', '-'], ['ni ainummehun', '-', '-'], ['ni ainohun', '-', '-'], ['-', '-', '-']];
const no_one_pronoun_neuter_inflections = [['ni ainhun', '-', '-'], ['ni ainishun', '-', '-'], ['ni ainummehun', '-', '-'], ['ni ainhun', '-', '-'], ['-', '-', '-']];
const no_one_pronoun_feminine_inflections = [['ni ainohun', '-', '-'], ['ni ainaizoshun', '-', '-'], ['ni ainaihun', '-', '-'], ['ni ainohun', '-', '-'], ['-', '-', '-']];
let ni_ainshun = new pronoun('ni ainshun', [no_one_pronoun_masculine_inflections, no_one_pronoun_neuter_inflections, no_one_pronoun_feminine_inflections], ['-', '-', '-'], 'No one, nothing (neuter)');
ni_ainshun.print_cases();
/**/





/*
tools.print(tools.Gothicize('ik im gredags'));
tools.print(tools.Romanize('𐌹𐌺 𐌹𐌼 𐌲𐍂𐌴𐌳𐌰𐌲𐍃'));
*/