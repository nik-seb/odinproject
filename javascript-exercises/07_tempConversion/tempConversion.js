const ftoc = function(fahr) {
	let celsius = (fahr-32)*5/9
	celsius = Math.round(celsius*10)/10
	return celsius
};

const ctof = function(cel) {
	let fahren = cel*9/5+32
	fahren = Math.round(fahren*10)/10
	return fahren 
};

// Do not edit below this line
module.exports = {
  ftoc,
  ctof
};
