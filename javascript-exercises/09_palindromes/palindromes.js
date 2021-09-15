const palindromes = function (string) {
	const punctuation = ' !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
	let newString = ''
	let reverseString = '' 
	for (let i = 0; i < string.length; i++) {
		if (punctuation.indexOf(string[i]) === -1 || string[i] === '') {
			newString = newString.concat(string[i])
		}
	}
	for (let i = newString.length-1; i >= 0; i--) {
			reverseString = reverseString.concat(newString[i])
	}
    newString = newString.toLowerCase()
    reverseString = reverseString.toLowerCase()
	if (newString === reverseString) {
		return true
	} else {
	    return false
	}
};

// Do not edit below this line
module.exports = palindromes;
