const reverseString = function(str) {
    let sliced = []
for (i = str.length-1; i >= 0; i--) {
    sliced.push(str.slice(i, i+1))
}
let newString = ''
for (i = 0; i < sliced.length; i++) {
    newString = newString.concat(sliced[i])
}
return newString
};

// Do not edit below this line
module.exports = reverseString;
