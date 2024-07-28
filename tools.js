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

export function replace_ending_vowel(str, base_vowel, ablaut_vowel) {
	//print('arg: ' + str);
	//print('base vowel: ' + base_vowel);
	//print('ablaut vowel: ' + ablaut_vowel);
	let novowel_str = str.slice(0, -1*base_vowel.length);
	//let removed_vowel = str.slice(-1*base_vowel.length);
	//print('removed vowel: ' + removed_vowel);
	let ablauted_str = novowel_str + ablaut_vowel;
	return ablauted_str;
	
	
	
	/*if (ablauted_str.slice(-1*base_vowel.length) == base_vowel) {
		let retrimmed_str = novowel_str.slice(0, -1*base_vowel.length);
		print('Going recursive');
		return replace_ending_vowel(retrimmed_str, base_vowel, ablaut_vowel);
	}
	else {
		return ablauted_str;
	}*/
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