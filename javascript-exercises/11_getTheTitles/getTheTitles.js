const getTheTitles = function(books) {
	let bookArray = []
	for (let i = 0; i < books.length; i++) {
		bookArray.push(books[i].title)
	}
	return bookArray
};

// Do not edit below this line
module.exports = getTheTitles;
