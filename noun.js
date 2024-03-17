//import * as StartScreen from './start_screen/start_screen.js';

// Just override console.log for print
// Too used to Python + friends
function print(arg) { console.log(arg); }

// Data container for holding case endings for nouns.
class nountype {
	constructor(name, case_endings) {
		this.name = name;

		this.nominative_singular = case_endings[0][0].substring(1);
		this.nominative_dual = case_endings[0][1].substring(1);
		this.nominative_plural = case_endings[0][2].substring(1);

		this.genitive_singular = case_endings[1][0].substring(1);
		this.genitive_dual = case_endings[1][1].substring(1);
		this.genitive_plural = case_endings[1][2].substring(1);

		this.dative_singular = case_endings[2][0].substring(1);
		this.dative_dual = case_endings[2][1].substring(1);
		this.dative_plural = case_endings[2][2].substring(1);

		this.accusative_singular = case_endings[3][0].substring(1);
		this.accusative_dual = case_endings[3][1].substring(1);
		this.accusative_plural = case_endings[3][2].substring(1);

		this.vocative_singular = case_endings[4][0].substring(1);
		this.vocative_dual = case_endings[4][1].substring(1);
		this.vocative_plural = case_endings[4][2].substring(1);
	}
}

// All the different types of nouns so far.
const strong_masculine = new nountype('Strong Masculine', [['-s', '--', '-os'], ['-is', '--', '-e'], ['-a', '--', '-am'], ['-', '--', '-ans'], ['--', '--', '--']]);
const strong_neuter = new nountype('Strong Neuter', [['-', '--', '-a'], ['-is', '--', '-e'], ['-a', '--', '-am'], ['-', '--', '-a'], ['--', '--', '--']]);
const strong_feminine = new nountype('Strong Feminine', [['-a', '--', '-os'], ['-os', '--', '-o'], ['-ai', '--', '-om'], ['-a', '--', '-os'], ['--', '--', '--']]);
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

const special_menoþs = new nountype('Special Class (Menoþs)', [['-s', '--', '-s'], ['--', '--', '--'], ['-', '--', '-um'], ['--', '--', '-s'], ['--', '--', '--']]);
const special_weitwoþs = new nountype('Special Class (Weitwoþs)', [['-þs', '--', '-þs'], ['--', '--', '-de'], ['--', '--', '--'], ['-d', '--', '--'], ['--', '--', '--']]);
const special_fon = new nountype('Special Class (Fon)', [['-on', '--', '--'], ['-unins', '--', '--'], ['-unin', '--', '--'], ['-on', '--', '--'], ['--', '--', '--']]);

const class1weak_verbal = new nountype('Weak Verbal Noun (Class 1)', [['-s', '--', '-os'], ['-ais', '--', '-o'], ['-ai', '--', '-im'], ['-', '--', '-ins'], ['--', '--', '--']]);
const special_gairnei = weak_feminine_eiending;
const class3weak_verbal = strong_feminine_istem;

// The 5 cases in Gothic
const Nominative = 'Nominative';
const Genitive = 'Genitive';
const Dative = 'Dative';
const Accusative = 'Accusative';
const Vocative = 'Vocative';

// The 3 numbers in Gothic
const Singular = 'Singular';
const Dual = 'Dual';
const Plural = 'Plural';

// The 3 genders in Gothic
const Masculine = 'masculine';
const Neuter = 'neuter';
const Feminine = 'feminine';


// Getting the root of a noun
function get_noun_root(noun, noun_type) {

	switch(noun_type) {
		// Nouns whose NS is the stem
		case strong_neuter:
			return noun;
		// Nouns whose NS has 1 more character than the stem
		case strong_masculine:
		case strong_feminine:
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
			return noun.slice(0, -1);
		// Nouns whose NS has 2 more characters than the stem
		case weak_feminine_eiending:
		case rstem:
		case strong_ustem:
		case special_weitwoþs:
		case special_fon:
		case special_gairnei:
			return noun.slice(0, -2);
		default:
			print('Unexpected noun type of "' + noun_type.name + '".');
			return '--';
	}

}

// Container for holding a noun
class noun {

	constructor(name, gender, noun_type) {
		this.name = name;
		this.gender = gender;
		this.root = get_noun_root(name, noun_type);
		this.case_endings = noun_type;
	}

	// Given a specific case + number, decline a general noun
	decline(noun_case, number) {

		let declination = 'Unknown Declanation';
		let ending = 'null';

		if (number != Singular && number != Dual && number != Plural) {
			declination = 'Unknown Noun Number "' + number + '"';
		}

		if (noun_case == Nominative) {
			if (number == Singular) { ending = this.case_endings.nominative_singular; }
			//else if (number == Dual) { ending = this.case_endings.nominative_dual; }
			else if (number == Plural) { ending = this.case_endings.nominative_plural; }
		}
		else if (noun_case == Genitive) {
			if (number == Singular) { ending = this.case_endings.genitive_singular; }
			//else if (number == Dual) { ending = this.case_endings.genitive_dual; }
			else if (number == Plural) { ending = this.case_endings.genitive_plural; }
		}
		else if (noun_case == Dative) {
			if (number == Singular) { ending = this.case_endings.dative_singular; }
			//else if (number == Dual) { ending = this.case_endings.dative_dual; }
			else if (number == Plural) { ending = this.case_endings.dative_plural; }
		}
		else if (noun_case == Accusative) {
			if (number == Singular) { ending = this.case_endings.accusative_singular; }
			//else if (number == Dual) { ending = this.case_endings.accusative_dual; }
			else if (number == Plural) { ending = this.case_endings.accusative_plural; }
		}
		else if (noun_case == Vocative) {
			if (number == Singular) { ending = this.case_endings.vocative_singular; }
			//else if (number == Dual) { ending = this.case_endings.vocative_dual; }
			else if (number == Plural) { ending = this.case_endings.vocative_plural; }
		}
		else {
			declination = 'Unknown Noun Case "' + noun_case + '"';
		}

		if (ending == 'null') {
			return declination;
		}
		else if (ending == '-') {
			return ending;
		}
		else {
			return this.root + ending;
		}

	}

	// Print all of the relevant cases for a given noun
	print_cases() {

		let ns_decline = this.decline(Nominative, Singular);
		//let nd_decline = this.decline(Nominative, Dual);
		let np_decline = this.decline(Nominative, Plural);
		let gs_decline = this.decline(Genitive, Singular);
		//let gd_decline = this.decline(Genitive, Dual);
		let gp_decline = this.decline(Genitive, Plural);
		let ds_decline = this.decline(Dative, Singular);
		//let dd_decline = this.decline(Dative, Dual);
		let dp_decline = this.decline(Dative, Plural);
		let as_decline = this.decline(Accusative, Singular);
		//let ad_decline = this.decline(Accusative, Dual);
		let ap_decline = this.decline(Accusative, Plural);
		let vs_decline = this.decline(Vocative, Singular);
		//let vd_decline = this.decline(Vocative, Dual);
		let vp_decline = this.decline(Vocative, Plural);

		let max_singular_col_len = Math.max(Singular.length, ns_decline.length, gs_decline.length, ds_decline.length, as_decline.length, vs_decline.length);
		let max_plural_col_len = Math.max(Plural.length, np_decline.length, gp_decline.length, dp_decline.length, ap_decline.length, vp_decline.length);

		max_singular_col_len++;
		max_plural_col_len++;

		let header = 'Case ' + Singular + ' '.repeat(max_singular_col_len-Singular.length) + Plural;
		let nominative_line = 'Nom: ' + ns_decline + ' '.repeat(max_singular_col_len-ns_decline.length)  + np_decline;
		let genitive_line = 'Gen: ' + gs_decline + ' '.repeat(max_singular_col_len-gs_decline.length) + gp_decline;
		let dative_line = 'Dat: ' + ds_decline + ' '.repeat(max_singular_col_len-ds_decline.length) + dp_decline;
		let accusative_line = 'Acc: ' + as_decline + ' '.repeat(max_singular_col_len-as_decline.length) + ap_decline;
		let vocative_line = 'Voc: ' + vs_decline + ' '.repeat(max_singular_col_len-vs_decline.length) + vp_decline;
		print(header);
		print(nominative_line);
		print(genitive_line);
		print(dative_line);
		print(accusative_line);
		print(vocative_line);


	}

}

// Strong Masculine Noun
let dags = new noun('dags', Masculine, strong_masculine);
dags.print_cases();

// Strong Neuter Noun
let waurd = new noun('waurd', Neuter, strong_neuter);
waurd.print_cases();

// Strong Feminine Noun
let giba = new noun('giba', Feminine, strong_feminine);
giba.print_cases();

// Weak Masculine Noun
let atta = new noun('atta', Masculine, weak_masculine);
atta.print_cases();

// Weak Neuter Noun
let hairto = new noun('hairto', Neuter, weak_neuter);
hairto.print_cases();

// Weak Feminine Noun (-o type)
let qino = new noun('qino', Feminine, weak_feminine_oending);
qino.print_cases();

// Weak Feminine Noun (-ei type)
let managei = new noun('managei', Feminine, weak_feminine_eiending);
managei.print_cases();

// Strong Masculine Noun (-i type)
let gasts = new noun('gasts', Masculine, strong_masculine_istem);
gasts.print_cases();

// Strong Feminine Noun (-i type)
let taikns = new noun('taikns', Feminine, strong_feminine_istem);
taikns.print_cases();

// R Stem Noun (-i type)
let broþar = new noun('broþar', Masculine, rstem);
broþar.print_cases();

// U Stem Masculine Noun
let sunus = new noun('sunus', Masculine, strong_ustem);
sunus.print_cases();

// U Stem Feminine Noun
let handus = new noun('handus', Feminine, strong_ustem);
handus.print_cases();

// U Stem Neuter Noun
let faihu = new noun('faihu', Neuter, strong_neuter_ustem);
faihu.print_cases();

// Bare Masculine Noun
let frijonds = new noun('frijonds', Masculine, masculine);
frijonds.print_cases();

// Bare Feminine Noun
let baurgs = new noun('baurgs', Feminine, feminine);
baurgs.print_cases();

// Special Noun: menoþs
let menoþs = new noun('menoþs', Masculine, special_menoþs);
menoþs.print_cases();

// Special Noun: weitwoþs
let weitwoþs = new noun('weitwoþs', Masculine, special_weitwoþs);
weitwoþs.print_cases();

// Special Noun: fon
let fon = new noun('fon', Neuter, special_fon);
fon.print_cases();

// Class 1 Weak Verbal Noun
let hauseins = new noun('hauseins', Feminine, class1weak_verbal);
hauseins.print_cases();

// Special Verbal Noun: gairnei
let gairnei = new noun('gairnei', Feminine, special_gairnei);
gairnei.print_cases();

// Class 3 Weak Verbal Noun:
let libains = new noun('libains', Feminine, class3weak_verbal);
libains.print_cases();

//print("hiþar");
//print("𐌷𐌰𐌻𐌻𐍉");