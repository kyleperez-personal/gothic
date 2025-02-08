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

const strong_masculine = new nountype('Strong Masculine', [['-s', '--', '-os'], ['-is', '--', '-e'], ['-a', '--', '-am'], ['-', '--', '-ans'], ['-', '--', '-os']]);
const weak_masculine = new nountype('Weak Masculine', [['-a', '--', '-ans'], ['-ins', '--', '-ane'], ['-in', '--', '-am'], ['-an', '--', '-ans'], ['-a', '--', '-ans']]);
const strong_masculine_istem = new nountype('Strong Masculine (-i stem)', [['-s', '--', '-eis'], ['-is', '--', '-e'], ['-a', '--', '-im'], ['-', '--', '-ins'], ['-', '--', '-eis']]);
const bare_masculine = new nountype('Masculine', [['-s', '--', '-s'], ['-is', '--', '-e'], ['-', '--', '-am'], ['-', '--', '-s'], ['-', '--', '-s']]);

const strong_neuter = new nountype('Strong Neuter', [['-', '--', '-a'], ['-is', '--', '-e'], ['-a', '--', '-am'], ['-', '--', '-a'], ['-', '--', '-a']]);
const weak_neuter = new nountype('Weak Neuter', [['-o', '--', '-ona'], ['-ins', '--', '-ane'], ['-in', '--', '-am'], ['-o', '--', '-ona'], ['-o', '--', '-ona']]);

const strong_feminine = new nountype('Strong Feminine', [['-a', '--', '-os'], ['-os', '--', '-o'], ['-ai', '--', '-om'], ['-a', '--', '-os'], ['-a', '--', '-os']]);
const weak_feminine = new nountype('Weak Feminine (-ei ending)', [['-', '--', '-ns'], ['-ns', '--', '-no'], ['-n', '--', '-m'], ['-n', '--', '-ns'], ['-', '--', '-ns']]);
const strong_feminine_istem = new nountype('Strong Feminine (-i stem)', [['-s', '--', '-eis'], ['-ais', '--', '-e'], ['-ai', '--', '-im'], ['-', '--', '-ins'], ['-s', '--', '-eis']]);
const bare_feminine = new nountype('Feminine', [['-s', '--', '-s'], ['-s', '--', '-e'], ['-', '--', '-im'], ['-', '--', '-s'], ['-', '--', '-s']]);

const rstem = new nountype('-r stem', [['-ar', '--', '-jus'], ['-s', '--', '-e'], ['-', '--', '-um'], ['-ar', '--', '-uns'], ['-ar', '--', '-jus']]);
const strong_ustem = new nountype('Strong (-u stem)', [['-us', '--', '-jus'], ['-aus', '--', '-iwe'], ['-au', '--', '-um'], ['-u', '--', '-uns'], ['-au', '--', '-jus']]);
const strong_neuter_ustem = new nountype('Strong Neuter (-u stem)', [['-u', '--', '--'], ['--', '--', '--'], ['-au', '--', '--'], ['-u', '--', '--'], ['--', '--', '--']]);


const special_manna = new nountype('Manna', [['-na', '--', '-nans'], ['-s', '--', '-ne'], ['-n', '--', '-nam'], ['-nan', '--', '-nans'], ['--', '--', '--']])
const special_menoþs = new nountype('Special Class (Menoþs)', [['-s', '--', '-s'], ['--', '--', '--'], ['-', '--', '-um'], ['--', '--', '-s'], ['--', '--', '--']]);
const special_weitwoþs = new nountype('Special Class (Weitwoþs)', [['-þs', '--', '-þs'], ['--', '--', '-de'], ['--', '--', '--'], ['-d', '--', '--'], ['--', '--', '--']]);
const special_fon = new nountype('Special Class (Fon)', [['-on', '--', '--'], ['-unins', '--', '--'], ['-unin', '--', '--'], ['-on', '--', '--'], ['--', '--', '--']]);

const class1weak_verbal = new nountype('Weak Verbal Noun (Class 1)', [['-s', '--', '-os'], ['-ais', '--', '-o'], ['-ai', '--', '-im'], ['-', '--', '-ins'], ['--', '--', '--']]);
const special_gairnei = weak_feminine;
const class3weak_verbal = strong_feminine_istem;


//Overriding certain endings
const NoOverrides = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']]



class noun_specialization {
	constructor(name, description='No Description') {
		this.kind = name;
		this.description = description;
	}
}

const Indeclinable = new noun_specialization('Indeclinable', 'Noun is not declined for cases.');
const Devoices = new noun_specialization('Devoices', 'Last sound in the noun root changes depending on the noun ending applied.');
const Pronoun = new noun_specialization('Pronoun', 'Is a pronoun.');
const GenderSwaps = new noun_specialization('Gender Swaps', 'Gender of the noun changes on its case.');
const IStem = new noun_specialization('I-Stem Noun', 'Noun uses I-stem declension.');
const RStem = new noun_specialization('R-Stem Noun', 'Noun uses R-stem declension.');
const Bare = new noun_specialization('Bare Noun', 'Noun uses bare declension.')
const ForcedLongVowel = new noun_specialization('Forced Long Vowel', 'This noun has an abnormal long vowel in the syllable preceeding the root ending.')

const NoSpecializations = [];


// Container for holding a noun
class noun {

	constructor(name, noun_gender, definition="No definition", specializations=NoSpecializations, overrides=NoOverrides) {
		this.name = name;
		this.gender = noun_gender;
		this.definition = definition;
		this.specializations = specializations;
		this.is_long_jstem = false;
		this.endings = no_endings;
		this.root = this.#determine_noun();
		//tools.print('Root: ' + this.root);
		//tools.print('Is ' + name + ' a long j stem? ' + this.is_long_jstem);
		this.overrides = overrides;
	}

	// Getting the root of a noun
	#determine_noun() {

		let stem = '';
		let ending = this.name.slice(-1);
		let twoending = this.name.slice(-2);
		this.is_long_jstem = false;

		let isIndeclinable = this.specializations.includes(Indeclinable);
		let getsDevoiced = this.specializations.includes(Devoices);
		let isPronoun = this.specializations.includes(Pronoun);
		let isRStem = this.specializations.includes(RStem);
		let isIStem = this.specializations.includes(IStem);
		let isBare = this.specializations.includes(Bare);
		let SwapsGender = this.specializations.includes(GenderSwaps);
		let hasForcedLongVowel = this.specializations.includes(ForcedLongVowel);

		if (isIndeclinable) {
			this.endings = indeclinable;
			return this.name;
		}
		else if (isPronoun) return "No Root";

		// Logic if swapping gender!

		// First determine root
		switch(this.gender) {
			case Genders.Masculine:
				// R ending strong-masculine case or r-stem nouns:
				if (ending == 'r') {
					if (isRStem) {
						stem = this.name.slice(0, -2) + 'r';
						this.endings = rstem;
					}
					else {
						stem = this.name;
						this.endings = strong_masculine;
					}
				}
				// A ending weak-masculine case:
				else if (ending == 'a') {
					stem = this.name.slice(0, -1);
					this.endings = weak_masculine;
				}
				// us ending masculine case:
				else if (twoending == 'us') {
					stem = this.name.slice(0, -2);
					this.endings = strong_ustem;
				}
				// S ending case, strong masculine:
				else if (ending == 's') {
					let threeending = this.name.slice(-3);
					if (threeending == 'eis' || threeending == 'jis') {
						stem = this.name.slice(0, -3) + 'j';
					}
					else {
						stem = this.name.slice(0, -1);
					}

					if (isIStem) this.endings = strong_masculine_istem;
					else if (isBare) this.endings = bare_masculine;
					else this.endings = strong_masculine;
				}
				break;
			case Genders.Neuter:
				// Reduced j-stem endings
				if (ending == 'i') {
					if (twoending == 'wi') {
						stem = this.name.slice(0, -2) + 'uj';
					}
					else {
						stem = this.name.slice(0, -1) + 'j';
					}
					this.endings = strong_neuter;
				}
				// o-ending weak neuter nouns or u-ending nouns (equivalent of -us ending nouns)
				else if (ending == 'o') {
					stem = this.name.slice(0, -1);
					this.endings = weak_neuter;
				}
				else if (ending == 'u') {
					stem = this.name.slice(0, -1);
					this.endings = strong_neuter_ustem;
				}
				// Noun that ends with a consanant
				else if (tools.isConsanant(ending)) {
					stem = this.name;
					this.endings = strong_neuter;
				}
				break;
			case Genders.Feminine:
				// Weak feminine noun endings
				if (ending == 'o' || twoending == 'ei') {
					stem = this.name;
					this.endings = weak_feminine;
				}
				// Strong feminine j stem types
				else if (ending == 'i') {
					if (twoending == 'wi') stem = this.name.slice(0, -2) + 'uj';
					else stem = this.name.slice(0, -1) + 'j';
					this.endings = strong_feminine;
				}
				// us stem feminine ending
				else if (twoending == 'us') {
					stem = this.name.slice(0, -2);
					this.endings = strong_ustem;
				}
				// I stem feminine ending
				else if (ending == 's') {
					stem = this.name.slice(0, -1);
					if (isBare) this.endings = bare_feminine;
					else this.endings = strong_feminine_istem;
				}
				// Standard strong feminine ending
				else if (ending == 'a') {
					stem = this.name.slice(0, -1);
					this.endings = strong_feminine;
				}
				break;
			default:
				throw new Error("Unrecognized gender '" + this.gender.name + "' used to build noun '" + this.name + "'.");
		}

		if (getsDevoiced) {
			stem = tools.revoice(stem);
		}

		// Then determine j-stem status
		// First check if noun is a j stem to begin with
		if (stem.slice(-1) != 'j') this.is_long_jstem = false;
		// Then see if stem satisfies CvCCj patern. If so, it is a long j stem for all vowels v and constanants C
		// To see if it is a short vowel j stem, has pattern of CvCj- where v is short for ending letters
		let imp_char = stem.slice(-3, -2);
		if (tools.isConsanant(imp_char) || hasForcedLongVowel) this.is_long_jstem = true;
		// Take advantage of the fact that we have a CvC... like pattern; complete vowel is always preceeded by a consanant
		// In Gothic, the vowels can be represented by two characters though, so need to know this
		else {
			let prev_imp_char = stem.slice(-4, -3);
			let vowel = '';
			if (tools.isConsanant(prev_imp_char)) {
				vowel = imp_char;
			}
			else {
				vowel = prev_imp_char + imp_char;
			}

			// Long Vowel values are 'e' 'o' and 'ei'
			// short vowels are 'a', 'i', and 'u', but also includes all the others for now.
			this.is_long_jstem = tools.LongVowels.includes(vowel);
		}

		return stem;

	}

	decline(noun_case, noun_number) {

		if (!Cases.CaseList.includes(noun_case)) {
			throw new Error('Unknown Noun Case "' + noun_case.name + '" being used to decline noun "' + this.name + '".');
		}
		if (!Numbers.NumberList.includes(noun_number)) {
			throw new Error('Unknown Noun Number "' + noun_number.name + '" being used to decline noun "' + this.name + '".');
		}

		let isIndeclinable = this.specializations.includes(Indeclinable);
		let getsDevoiced = this.specializations.includes(Devoices);
		let isPronoun = this.specializations.includes(Pronoun);
		let isRStem = this.specializations.includes(RStem);
		let SwapsGender = this.specializations.includes(GenderSwaps);

		let declination = '???';
		let ending = this.endings.endings[noun_case.number][noun_number.number].substring(1);
		let root_ending = this.root.slice(-1);
		let root_twoending = this.root.slice(-2);

		// Handle indeclinable nouns
		if (isIndeclinable) {
			declination = this.root;
			return declination;
		}


		let start = this.root;

		// Return placeholder for nonexistent declinations
		if (ending == '-') return '--';

		switch (this.gender) {
			case Genders.Masculine:
				if (isRStem && ending == 'ar') {
					start = start.slice(0, -1);
				}
				else if (root_ending == 'r' && ending == 's') {
					ending = '';
				}
				break;
			case Genders.Neuter:
				break;
			case Genders.Feminine:
				
		}

		// Need to handle j-stems specially
		if (root_ending == 'j') {
			if (ending == '') {
				if (start.slice(-2) == 'uj') start = start.slice(0, -2) + 'wi';
				else start = start.slice(0, -1) + 'i';
			}
			else if (ending == 's') {
				ending = 'i' + ending;
			}
			else if (this.is_long_jstem) {
				if (start.slice(-1) + ending == 'jis') start = start.slice(0, -1) + 'e';
				if (ending == 'a' && noun_case != Cases.Accusative) {
					if (start.slice(-2) == 'uj') start = start.slice(0, -2) + 'wi';
					else start = start.slice(0, -1) + 'i';
					ending = '';
				}
			}
			
		}

		declination = start + ending;

		if (getsDevoiced) {
			declination = tools.devoice(declination);
		}

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





// Strong Masculine Nouns
// Default type
/*
let dags = new noun('dags', Genders.Masculine, NoSpecializations, NoOverrides, 'day');
dags.print_cases();

// Strong Masculine Noun that ends in 'r'
let wair = new noun('wair', Genders.Masculine, 'person, man', NoSpecializations, NoOverrides);
wair.print_cases();

// Devoiced stem
let hlaifs = new noun('hlaifs', Genders.Masculine, 'bread', [Devoices], NoOverrides);
hlaifs.print_cases();

// Strong Masculine Noun with j ending stem with short vowels
// Short vowels: a i u
let harjis = new noun('harjis', Genders.Masculine, 'army', NoSpecializations, NoOverrides);
harjis.print_cases();

// Long vowels: e o ei
let siponeis = new noun('siponeis', Genders.Masculine, 'disciple', NoSpecializations, NoOverrides);
siponeis.print_cases();

// Weak Masculine Noun
let atta = new noun('atta', Genders.Masculine, 'father', NoSpecializations, NoOverrides);
atta.print_cases();

// Strong Masculine Noun (-i type)
let gasts = new noun('gasts', Genders.Masculine, 'guest', [IStem], NoOverrides);
gasts.print_cases();

// R Stem Noun (-i type)
let broþar = new noun('broþar', Genders.Masculine, 'brother', [RStem], NoOverrides);
broþar.print_cases();

// U Stem Masculine Noun
let sunus = new noun('sunus', Genders.Masculine, 'son', NoOverrides, NoOverrides);
sunus.print_cases();

// Bare Masculine Noun
let frijonds = new noun('frijonds', Genders.Masculine, 'friend', [Bare], NoOverrides);
frijonds.print_cases();
*/

/*
// Strong Neuter Noun
let waurd = new noun('waurd', Genders.Neuter, 'word', NoSpecializations, NoOverrides);
waurd.print_cases();

// Strong Neuter Noun with devoiced stem
let witoþ = new noun('witoþ', Genders.Neuter, 'law', [Devoices], NoOverrides);
witoþ.print_cases();

// Alternate devoiced stem
let dius = new noun('dius', Genders.Neuter, 'wild animal', [Devoices], NoOverrides);
dius.print_cases();

// Short j stem
let fairguni = new noun('fairguni', Genders.Neuter, 'mountain', NoSpecializations, NoOverrides);
fairguni.print_cases();

// Long j stem
let gawi = new noun('gawi', Genders.Neuter, 'district, region', NoSpecializations, NoOverrides);
gawi.print_cases();

// Weak Neuter Noun
let hairto = new noun('hairto', Genders.Neuter, 'heart', NoSpecializations, NoOverrides);
hairto.print_cases();

// U Stem Neuter Noun
let faihu = new noun('faihu', Genders.Neuter, 'property, wealth', NoSpecializations, NoOverrides);
faihu.print_cases();
*/

/*
// Strong Feminine Noun
let giba = new noun('giba', Genders.Feminine, 'gift', NoSpecializations, NoOverrides);
giba.print_cases();

// Short j stem
let sunja = new noun('sunja', Genders.Feminine, 'truth', NoSpecializations, NoOverrides);
sunja.print_cases();

// Long j stem
let wasti = new noun('wasti', Genders.Feminine, 'clothes', NoSpecializations, NoOverrides);
wasti.print_cases();

// Long j stem with 'auj' --> 'awi' assimilation
let mawi = new noun('mawi', Genders.Feminine, 'young woman, girl', [ForcedLongVowel], NoOverrides);
mawi.print_cases(); // Fix nominative and vocative

// Weak Feminine Noun (-o type)
let qino = new noun('qino', Genders.Feminine, 'wife, woman', NoSpecializations, NoOverrides);
qino.print_cases();

// Weak Feminine Noun (-ei type)
let managei = new noun('managei', Genders.Feminine, 'crowd', NoSpecializations, NoOverrides);
managei.print_cases();

// Strong Feminine Noun (-i type)
let taikns = new noun('taikns', Genders.Feminine, 'sign, omen', NoSpecializations, NoOverrides);
taikns.print_cases();

// U Stem Feminine Noun
let handus = new noun('handus', Genders.Feminine, 'hand', NoSpecializations, NoOverrides);
handus.print_cases();

// Bare Feminine Noun
let baurgs = new noun('baurgs', Genders.Feminine, 'city', [Bare], NoOverrides);
baurgs.print_cases();
*/

/*
// Strong masculine noun with long j stem and irregular accusative ending
const andeis_overrides = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-'], ['-', '-', 'andins'], ['-', '-', '-']]
let andeis = new noun('andeis', Genders.Masculine, strong_masculine_jstem_longvowel, false, andeis_overrides, 'end');
andeis.print_cases();

// Special Noun: menoþs
let menoþs = new noun('menoþs', Genders.Masculine, special_menoþs, false, NoOverrides, 'month');
menoþs.print_cases();

// Special Noun: weitwoþs
let weitwoþs = new noun('weitwoþs', Genders.Masculine, special_weitwoþs, false, NoOverrides, 'witness');
weitwoþs.print_cases();

// Special Noun: fon
let fon = new noun('fon', Genders.Neuter, special_fon, false, NoOverrides, 'fire');
fon.print_cases();

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