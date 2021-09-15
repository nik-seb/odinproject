const add = function(num1, num2) {
	return num1+num2
};

const subtract = function(num1, num2) {
	return num1-num2
};

const sum = function(num) {
	let sum = 0
	for (let i = 0; i < num.length; i++) {
	sum = sum + num[i]
	}
	return sum
};

const multiply = function(num) {
let sum = 1
	for (let i = 0; i < num.length; i++) {
	sum = sum * num[i]
	}
	return sum
};

const power = function(num1, num2) {
	return num1 ** num2
};

const factorial = function(num) {
	let sum = 1
	if (num <= 1) {
	return sum
	} else {
		for (let i = num; i > 0; i--) {
	sum = sum * i
	}
  return sum
	}
};

// Do not edit below this line
module.exports = {
  add,
  subtract,
  sum,
  multiply,
  power,
  factorial
};
