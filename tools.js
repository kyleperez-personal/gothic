// Just override console.log for print
// Too used to Python + friends
export function print(arg) { console.log(arg); }

export function reverse(str) { return [...str].reverse().join(""); }

export function isVowel(x) { 
	return ("aeiouAEIOU".indexOf(x) != -1); 
}

export function isConsanant(x) {
	return !isVowel(x);
}

export function num_consonants_at_end(str) {
	let rev_str = reverse(str);
	let consonant_str_ending_len = 0;
	for (let char of rev_str) {
		if (isConsanant(char)) consonant_str_ending_len++;
		else break;
	}
	return consonant_str_ending_len;
}

export function num_vowels_at_end(str) {
	let rev_str = reverse(str);
	let vowel_str_ending_len = 0;
	for (let char of rev_str) {
		if (isVowel(char)) vowel_str_ending_len++;
		else break;
	}
	return vowel_str_ending_len;
}

// Allowed consanants, vowels, and Long and short vowels
export const Consanants = ['b', 'g', 'd', 'q', 'z', 'h', 'þ', 'k', 'l', 'm', 'n', 'j', 'p', 'r', 's', 't', 'w', 'f', 'x', 'ƕ'];
export const Vowels = ['a', 'ai', 'e', 'i', 'ei', 'o', 'au', 'u', 'iu'];
export const ShortVowels = ['a', 'i', 'u'];
export const LongVowels = ['e', 'o', 'ei'];

export const Alphabet       = ['a', 'b', 'd', 'e', 'f', 'g', 'h', 'ƕ', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'þ', 'u', 'w', 'x', 'z'];
export const GothicAlphabet = ['𐌰', '𐌱', '𐌳', '𐌴', '𐍆', '𐌲', '𐌷', '𐍈', '𐌹', '𐌾', '𐌺', '𐌻', '𐌼', '𐌽', '𐍉', '𐍀', '𐌵', '𐍂', '𐍃', '𐍄', '𐍈', '𐌿', '𐍅', '𐍇', '𐌶'];


export function Gothicize(words) {
	let gothic_words = '';
	for (let char of words) {
		let ind = Alphabet.indexOf(char);
		if (ind < 0) gothic_words += char;
		else gothic_words += GothicAlphabet[ind];
	}
	return gothic_words;
}

export function Romanize(words) {
	let roman_words = '';
	for (let char of words) {
		let ind = GothicAlphabet.indexOf(char);
		if (ind < 0) roman_words += char;
		else roman_words += Alphabet[ind];
	}
	return roman_words;
}


export function isNullEnding(ending) {
	return ending == '-';
}


export function devoice(raw_word) {
	// Devoicing:
	// A word ending in 'z' is devoiced to 's'
	// A word ending in 'd' is devoiced to 'þ'
	// A word ending in 'b' is devoiced to 'f'
	let lastchar = raw_word.slice(-1);
	let scnd_lastchar = raw_word.slice(-2, -1);
	if (isVowel(scnd_lastchar) && lastchar == 'z') return raw_word.slice(0, -1) + 's';
	if (isVowel(scnd_lastchar) && lastchar == 'b') return raw_word.slice(0, -1) + 'f';
	if (isVowel(scnd_lastchar) && lastchar == 'd') return raw_word.slice(0, -1) + 'þ';

	// If second to last character is 'd' and last is 's', devoice 'd' to 'þ'
	// Same idea with 'b'; devoice to 'f'
	
	if (scnd_lastchar == 'd' && lastchar == 's') return raw_word.slice(0, -2) + 'þ' + lastchar;
	if (scnd_lastchar == 'b' && lastchar == 's') return raw_word.slice(0, -2) + 'f' + lastchar;

	if (scnd_lastchar == 't' && lastchar == 't') return raw_word.slice(0, -2) + 's' + lastchar;
	if (scnd_lastchar == 'þ' && lastchar == 't') return raw_word.slice(0, -2) + 's' + lastchar;
	if (scnd_lastchar == 'd' && lastchar == 't') return raw_word.slice(0, -2) + 's' + lastchar;
	if (scnd_lastchar == 'b' && lastchar == 't') return raw_word.slice(0, -2) + 'f' + lastchar;

	return raw_word;
}

export function revoice(raw_stem) {
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

export function lower_vowel(vowel, consonant) {
	let lowered_vowel = vowel;
	if (vowel == 'u' && (consonant == 'r' || consonant == 'h')) {
		lowered_vowel = 'au';
	}
	else if (vowel == 'i' && (consonant == 'r' || consonant == 'h' || consonant == 'ƕ')) {
		lowered_vowel = 'ai';
	}
	return lowered_vowel;
}