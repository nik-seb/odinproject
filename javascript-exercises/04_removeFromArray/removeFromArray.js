const removeFromArray = function(array, num) {
for (i = 1; i < arguments.length; i++) {
		let numtoRemove = array.indexOf(arguments[i])
		if (numtoRemove != -1) {
				array.splice(numtoRemove, 1)
		}
	}
	return array
};

// Do not edit below this line
module.exports = removeFromArray;
