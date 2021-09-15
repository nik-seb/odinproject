const repeatString = function(string, num) {
    if (num < 0) {
        return 'ERROR';
    }
    if (num == 0) {
        return ''
    }

    if (num > 0) {
        let result = string
        const singleString = []
        singleString.push(string)

        for (i = 1; i < num; i++) {
            result = string+= singleString[0]
        }
        return result
    }
}

// Do not edit below this line
module.exports = repeatString;
