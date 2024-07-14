// Just override console.log for print
// Too used to Python + friends
export function print(arg) { console.log(arg); }

export function isVowel(x) { 
	return ("aeiouAEIOU".indexOf(x) != -1); 
}

export function isConsanant(x) {
	return !isVowel(x);
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