//import * as StartScreen from './start_screen/start_screen.js';

// Just override console.log for print
// Too used to Python + friends
function print(arg) { console.log(arg); }

function isVowel(x) { 
	return ("aeiouAEIOU".indexOf(x) != -1); 
}

function isConsanant(x) {
	return !isVowel(x);
}

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

// Allowed consanants, vowels, and Long and short vowels
const Consanants = ['b', 'g', 'd', 'q', 'z', 'h', 'þ', 'k', 'l', 'm', 'n', 'j', 'p', 'r', 's', 't', 'w', 'f', 'x', 'ƕ'];
const Vowels = ['a', 'ai', 'e', 'i', 'ei', 'o', 'au', 'u', 'iu'];
const ShortVowels = ['a', 'i', 'u'];
const LongVowels = ['e', 'o', 'ei'];

const Alphabet       = ['a', 'b', 'd', 'e', 'f', 'g', 'h', 'ƕ', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'þ', 'u', 'w', 'x', 'z'];
const GothicAlphabet = ['𐌰', '𐌱', '𐌳', '𐌴', '𐍆', '𐌲', '𐌷', '𐍈', '𐌹', '𐌾', '𐌺', '𐌻', '𐌼', '𐌽', '𐍉', '𐍀', '𐌵', '𐍂', '𐍃', '𐍄', '𐍈', '𐌿', '𐍅', '𐍇', '𐌶'];

function Gothicize(words) {
	let gothic_words = '';
	for (let char of words) {
		let ind = Alphabet.indexOf(char);
		if (ind < 0) gothic_words += char;
		else gothic_words += GothicAlphabet[ind];
	}
	return gothic_words;
}

function Romanize(words) {
	let roman_words = '';
	for (let char of words) {
		let ind = GothicAlphabet.indexOf(char);
		if (ind < 0) roman_words += char;
		else roman_words += Alphabet[ind];
	}
	return roman_words;
}

function devoice(raw_word) {
	// Devoicing:
	// A word ending in 'z' is devoiced to 's'
	// A word ending in 'd' is devoiced to 'þ'
	// A word ending in 'b' is devoiced to 'f'
	let lastchar = raw_word.slice(-1);
	
	if (lastchar == 'z') return raw_word.slice(0, -1) + 's';
	if (lastchar == 'd') return raw_word.slice(0, -1) + 'þ';
	if (lastchar == 'b') return raw_word.slice(0, -1) + 'f';

	let scnd_lastchar = raw_word.slice(-2, -1);
	// If second to last character is 'd' and last is 's', devoice 'd' to 'þ'
	// Same idea with 'b'; devoice to 'f'
	if (scnd_lastchar == 'd' && lastchar == 's') return raw_word.slice(0, -2) + 'þs';
	if (scnd_lastchar == 'b' && lastchar == 's') return raw_word.slice(0, -2) + 'fs';

	return raw_word;
}

function revoice(raw_stem) {
	// Revoicing:
	// Stem ends in 's' revoice to 'z'
	// Stem ends in 'þ' revoice to 'd'
	// Stem ends in 'f' revoice to 'b'
	let lastchar = raw_stem.slice(-1);
	if (lastchar == 's') return raw_stem.slice(0, -1) + 'z';
	if (lastchar == 'þ') return raw_stem.slice(0, -1) + 'd';
	if (lastchar == 'f') return raw_stem.slice(0, -1) + 'b';

	return raw_stem;

}

// Getting the root of a noun
function get_noun_root(noun, noun_type, revoicing) {

	let stem = '';

	switch(noun_type) {
		// Nouns whose NS is the stem
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
			print('Unexpected noun type of "' + noun_type.name + '".');
			stem = '--';
	}

	if (revoicing) stem = revoice(stem);
	return stem;

}


// Container for holding a noun
class noun {

	constructor(name, gender, noun_type, revoicing=false) {
		this.name = name;
		this.gender = gender;
		this.revoicing = revoicing;
		this.root = get_noun_root(name, noun_type, revoicing);
		this.case_endings = noun_type;
		this.is_long_jstem = this.#is_long_jstem();
	}

	#is_long_jstem() {
		// First check if noun is a j stem to begin with
		if (this.root.slice(-1) != 'j') return false;
		// Then see if stem satisfies CvCCj patern. If so, it is a long j stem for all vowels v and constanants C
		// To see if it is a short vowel j stem, has pattern of CvCj- where v is short for ending letters
		let imp_char = this.root.slice(-3, -2);
		if (isConsanant(imp_char)) return true;
		// Take advantage of the fact that we have a CvC... like pattern; complete vowel is always preceeded by a consanant
		// In Gothic, the vowels can be represented by two characters though, so need to know this
		else {
			let prev_imp_char = this.root.slice(-4, -3);
			let vowel = '';
			if (isConsanant(prev_imp_char)) {
				vowel = imp_char;
			}
			else {
				vowel = prev_imp_char + imp_char;
			}

			// Long Vowel values are 'e' 'o' and 'ei'
			// short vowels are 'a', 'i', and 'u', but also includes all the others for now.
			return LongVowels.includes(vowel);
		}
	}

	// Given a specific case + number, decline a general noun
	decline(noun_case, number) {

		let declination = 'Unknown Declination';
		let ending = 'null';

		if (number != Singular && number != Dual && number != Plural) {
			declination = 'Unknown Noun Number "' + number + '"';
		}

		// Standard declination from table
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

		// If no declination found, show error
		if (ending == 'null') {
			return declination;
		}
		// If no declination given, show just '-'
		else if (ending == '-') {
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
				declination = declination.slice(0,-3) + 'eis';
			}
			return declination;
		}
		else {
			declination = this.root + ending;
		}

		if (this.revoicing) declination = devoice(declination);
		return declination;

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



/*
// Strong Masculine Nouns
// Default type
let dags = new noun('dags', Masculine, strong_masculine);
dags.print_cases();

// Devoiced stem
let hlaifs = new noun('hlaifs', Masculine, strong_masculine, true);
hlaifs.print_cases();

// Strong Masculine Noun that ends in 'r'
let wair = new noun('wair', Masculine, strong_masculine_rending);
wair.print_cases();

// Strong Masculine Noun with j ending stem with short vowels
// Short vowels: a i u
let harjis = new noun('harjis', Masculine, strong_masculine_jstem_shortvowel);
harjis.print_cases();

// Long vowels: e o ei
let siponeis = new noun('siponeis', Masculine, strong_masculine_jstem_longvowel);
siponeis.print_cases();
*/





/*
// Strong Neuter Noun
let waurd = new noun('waurd', Neuter, strong_neuter);
waurd.print_cases();

// Strong Neuter Noun with devoiced stem
let witoþ = new noun('witoþ', Neuter, strong_neuter, true);
witoþ.print_cases();

// Alternate devoiced stem
let dius = new noun('dius', Neuter, strong_neuter, true);
dius.print_cases();

// Short j stem
let fairguni = new noun('fairguni', Neuter, strong_neuter_jstem_shortvowel);
fairguni.print_cases();

// Long j stem
let gawi = new noun('gawi', Neuter, strong_neuter_jstem_longvowel);
gawi.print_cases();
*/


/*
// Strong Feminine Noun
let giba = new noun('giba', Feminine, strong_feminine);
giba.print_cases();

// Short j stem
let sunja = new noun('sunja', Feminine, strong_feminine_jstem_shortvowel);
sunja.print_cases();

// Long j stem
let wasti = new noun('wasti', Feminine, strong_feminine_jstem_longvowel);
wasti.print_cases();

// Long j stem with 'auj' --> 'awi' assimilation
let mawi = new noun('mawi', Feminine, strong_feminine_jstem_longvowel);
mawi.print_cases();
*/


/*
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
*/

/*
// Strong Masculine Noun (-i type)
let gasts = new noun('gasts', Masculine, strong_masculine_istem);
gasts.print_cases();

// Strong Feminine Noun (-i type)
let taikns = new noun('taikns', Feminine, strong_feminine_istem);
taikns.print_cases();

// R Stem Noun (-i type)
let broþar = new noun('broþar', Masculine, rstem);
broþar.print_cases();
*/

/*
// U Stem Masculine Noun
let sunus = new noun('sunus', Masculine, strong_ustem);
sunus.print_cases();

// U Stem Feminine Noun
let handus = new noun('handus', Feminine, strong_ustem);
handus.print_cases();

// U Stem Neuter Noun
let faihu = new noun('faihu', Neuter, strong_neuter_ustem);
faihu.print_cases();
*/

/*
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
*/

/*
// Class 1 Weak Verbal Noun
let hauseins = new noun('hauseins', Feminine, class1weak_verbal);
hauseins.print_cases();

// Special Verbal Noun: gairnei
let gairnei = new noun('gairnei', Feminine, special_gairnei);
gairnei.print_cases();

// Class 3 Weak Verbal Noun:
let libains = new noun('libains', Feminine, class3weak_verbal);
libains.print_cases();
*/

/*
print(Gothicize('ik im gredags'));
print(Romanize('𐌹𐌺 𐌹𐌼 𐌲𐍂𐌴𐌳𐌰𐌲𐍃'));
*/