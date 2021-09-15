const sumAll = function(num1, num2) {
	let added = 0
	if (typeof num1 != 'number' || typeof num2 != 'number' ||
    num1 < 0 || num2 < 0) {
        return 'ERROR'
    } else if (num1 < num2 && num1 >= 0) {
			for (let i = num1; i <= num2; i++) {
				added = added + i
			}
	} else if (num1 > num2 && num2 >= 0) {
		for (let i = num1; i>= num2; i--) {
			added = added + i
		}
	} else if (num1 === num2) {
			added = num1
	}
	return added
}
// Do not edit below this line
module.exports = sumAll;
