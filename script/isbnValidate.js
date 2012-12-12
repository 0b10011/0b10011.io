/**
 * Formats isbn as a 13-digit ISBN
 * @todo Format values that are not 13 digits to aid in fixing if displayed to user
 * @param isbn
 * @param force 
 * @return Returns formatted ISBN, if posisble, or provided ISBN on failure.
 */
function format_isbn(isbn, force) {
	if (force == undefined) force = false;
	var unknown_isbn
		, new_isbn
		, publisher_start
		, group
		, item_start;
	
	// ISBN is not 13 digits
	// Although throwing in the hyphens would be ideal, the string concatenation would 
	// need to be rewritten entirely to avoid throwing a ton of notices and truncating
	// long strings that were provided (e.g., 97812345678971 which would come out the 
	// other end as valid due to the '1' being truncated).
	if (isbn.length != 13) {
		return isbn;
	}
	// Generally-formatted version (###-#########-#)
	unknown_isbn = isbn.charAt(0) + isbn.charAt(1) + isbn.charAt(2) + '-' + isbn.charAt(3) + isbn.charAt(4) + isbn.charAt(5) + isbn.charAt(6) + isbn.charAt(7) + isbn.charAt(8) + isbn.charAt(9) + isbn.charAt(10) + isbn.charAt(11) + '-' + isbn.charAt(12);
	// Check if ISBN is valid
	if (!force) if (check_isbn(isbn) === false) {
		return unknown_isbn; // Bad ISBN (either check-digit is wrong, or not typed in correctly)
	}
	unknown_isbn = isbn.charAt(0) + isbn.charAt(1) + isbn.charAt(2) + '-' + isbn.charAt(3) + isbn.charAt(4) + isbn.charAt(5) + isbn.charAt(6) + isbn.charAt(7) + isbn.charAt(8) + isbn.charAt(9) + isbn.charAt(10) + isbn.charAt(11) + '-' + isbn.charAt(12);
	// EAN - GS1 Prefix (012)
	new_isbn = isbn.charAt(0) + isbn.charAt(1) + isbn.charAt(2);

	// Group Identifier (3, 34, 345, 3456, 34567)
	if ((isbn.charAt(3) < 6) || (isbn.charAt(3) == 7)) { // 0-5, 7
		new_isbn += '-' + isbn.charAt(3);
		publisher_start = 4;
	} else if (isbn.charAt(3) == 6) { // 600-617
		group = parseInt(isbn.charAt(3) + isbn.charAt(4) + isbn.charAt(5));
		if ((group >= 600) && (group  <= 617)) {
			new_isbn += '-' + isbn.charAt(3) + isbn.charAt(4) + isbn.charAt(5);
			publisher_start = 6;
		} else {
			return unknown_isbn; // Invalid ISBN
		}
	} else if (isbn.charAt(3) == 8) { // 80–94
		group = parseInt(isbn.charAt(3) + isbn.charAt(4));
		if ((group >= 80) && (isbn  <= 94)) {
			new_isbn += '-' + isbn.charAt(3) + isbn.charAt(4);
			publisher_start = 5;
		} else {
			return unknown_isbn; // Invalid ISBN
		}
	} else if (isbn.charAt(3) == 9) { // 950–989, 9927–9989, 99901–99967
		group = parseInt(isbn.charAt(3) + isbn.charAt(4) + isbn.charAt(5));
		if ((group >= 950) && (group  <= 989)) {
			new_isbn += '-' + isbn.charAt(3) + isbn.charAt(4) + isbn.charAt(5);
			publisher_start = 6;
		} else {
			group = parseInt(isbn.charAt(3) + isbn.charAt(4) + isbn.charAt(5) + isbn.charAt(6));
			if ((group >= 9927) && (group  <= 9989)) {
				new_isbn += '-' + isbn.charAt(3) + isbn.charAt(4) + isbn.charAt(5) + isbn.charAt(6);
				publisher_start = 7;
			} else {
				group = parseInt(isbn.charAt(3) + isbn.charAt(4) + isbn.charAt(5) + isbn.charAt(6) + isbn.charAt(7));
				if ((group >= 99901) && (group  <= 99967)) {
					new_isbn += '-' + isbn.charAt(3) + isbn.charAt(4) + isbn.charAt(5) + isbn.charAt(6) + isbn.charAt(7);
					publisher_start = 8;
				} else {
					return unknown_isbn; // Invalid ISBN
				}
			}
		}
	} else {
		return unknown_isbn; // Invalid ISBN
	}
	item_start = false;
	// Publisher Code
	if (isbn.charAt(3) == 0) { // English-speaking countries (code 0)
		if (parseInt(isbn.charAt(4) + isbn.charAt(5)) < 20) { // 0-19
			new_isbn += '-' + isbn.charAt(4) + isbn.charAt(5);
			item_start = 6;
		} else if (parseInt(isbn.charAt(4) + isbn.charAt(5) + isbn.charAt(6)) < 700) { // 200-699
			new_isbn += '-' + isbn.charAt(4) + isbn.charAt(5) + isbn.charAt(6);
			item_start = 7;
		} else if (parseInt(isbn.charAt(4) + isbn.charAt(5) + isbn.charAt(6) + isbn.charAt(7)) < 8500) { // 7000-8499
			new_isbn += '-' + isbn.charAt(4) + isbn.charAt(5) + isbn.charAt(6) + isbn.charAt(7);
			item_start = 8;
		} else if (parseInt(isbn.charAt(4) + isbn.charAt(5) + isbn.charAt(6) + isbn.charAt(7) + isbn.charAt(8)) < 90000) { // 85000-89999
			new_isbn += '-' + isbn.charAt(4) + isbn.charAt(5) + isbn.charAt(6) + isbn.charAt(7) + isbn.charAt(8);
			item_start = 9;
		} else if (parseInt(isbn.charAt(4) + isbn.charAt(5) + isbn.charAt(6) + isbn.charAt(7) + isbn.charAt(8) + isbn.charAt(9)) < 950000) { // 900000-949999
			new_isbn += '-' + isbn.charAt(4) + isbn.charAt(5) + isbn.charAt(6) + isbn.charAt(7) + isbn.charAt(8) + isbn.charAt(9);
			item_start = 10;
		} else if (parseInt(isbn.charAt(4) + isbn.charAt(5) + isbn.charAt(6) + isbn.charAt(7) + isbn.charAt(8) + isbn.charAt(9) + isbn.charAt(10)) < 10000000) { // 9500000-9999999
			new_isbn += '-' + isbn.charAt(4) + isbn.charAt(5) + isbn.charAt(6) + isbn.charAt(7) + isbn.charAt(8) + isbn.charAt(9) + isbn.charAt(10);
			item_start = 11;
		}
	} else if (isbn.charAt(3) == 1) { // English-speaking countries (code 1)
		if (parseInt(isbn.charAt(4) + isbn.charAt(5)) < 10) { // 0-9
			new_isbn += '-' + isbn.charAt(4) + isbn.charAt(5);
			item_start = 6;
		} else if (parseInt(isbn.charAt(4) + isbn.charAt(5) + isbn.charAt(6)) < 400) { // 100-399
			new_isbn += '-' + isbn.charAt(4) + isbn.charAt(5) + isbn.charAt(6);
			item_start = 7;
		} else if (parseInt(isbn.charAt(4) + isbn.charAt(5) + isbn.charAt(6) + isbn.charAt(7)) < 5500) { // 4000-5499
			new_isbn += '-' + isbn.charAt(4) + isbn.charAt(5) + isbn.charAt(6) + isbn.charAt(7);
			item_start = 8;
		} else if (parseInt(isbn.charAt(4) + isbn.charAt(5) + isbn.charAt(6) + isbn.charAt(7) + isbn.charAt(8)) < 86980) { // 55000-86979
			new_isbn += '-' + isbn.charAt(4) + isbn.charAt(5) + isbn.charAt(6) + isbn.charAt(7) + isbn.charAt(8);
			item_start = 9;
		} else if (parseInt(isbn.charAt(4) + isbn.charAt(5) + isbn.charAt(6) + isbn.charAt(7) + isbn.charAt(8) + isbn.charAt(9)) < 999000) { // 869800-998999
			new_isbn += '-' + isbn.charAt(4) + isbn.charAt(5) + isbn.charAt(6) + isbn.charAt(7) + isbn.charAt(8) + isbn.charAt(9);
			item_start = 10;
		} else if (parseInt(isbn.charAt(4) + isbn.charAt(5) + isbn.charAt(6) + isbn.charAt(7) + isbn.charAt(8) + isbn.charAt(9) + isbn.charAt(10)) < 10000000) { // 9990000-9999999
			new_isbn += '-' + isbn.charAt(4) + isbn.charAt(5) + isbn.charAt(6) + isbn.charAt(7) + isbn.charAt(8) + isbn.charAt(9) + isbn.charAt(10);
			item_start = 11;
		}
	} else { // Other Groups
		// Do nothing--will be caught by Item Number
	}
	// Item Number
	if (item_start === 6) {
		new_isbn += '-' + isbn.charAt(6) + isbn.charAt(7) + isbn.charAt(8) + isbn.charAt(9) + isbn.charAt(10) + isbn.charAt(11);
	} else if (item_start === 7) {
		new_isbn += '-' + isbn.charAt(7) + isbn.charAt(8) + isbn.charAt(9) + isbn.charAt(10) + isbn.charAt(11);
	} else if (item_start === 8) {
		new_isbn += '-' + isbn.charAt(8) + isbn.charAt(9) + isbn.charAt(10) + isbn.charAt(11);
	} else if (item_start === 9) {
		new_isbn += '-' + isbn.charAt(9) + isbn.charAt(10) + isbn.charAt(11);
	} else if (item_start === 10) {
		new_isbn += '-' + isbn.charAt(10) + isbn.charAt(11);
	} else if (item_start === 11) {
		new_isbn += '-' + isbn.charAt(11);
	} else { // Non-english speaking group - Don't separate group/item (don't know how)
		if (publisher_start == 4) {
			new_isbn += '-' + isbn.charAt(4) + isbn.charAt(5) + isbn.charAt(6) + isbn.charAt(7) + isbn.charAt(8) + isbn.charAt(9) + isbn.charAt(10) + isbn.charAt(11);
		} else if (publisher_start == 5) {
			new_isbn += '-' + isbn.charAt(5) + isbn.charAt(6) + isbn.charAt(7) + isbn.charAt(8) + isbn.charAt(9) + isbn.charAt(10) + isbn.charAt(11);
		} else if (publisher_start == 6) {
			new_isbn += '-' + isbn.charAt(6) + isbn.charAt(7) + isbn.charAt(8) + isbn.charAt(9) + isbn.charAt(10) + isbn.charAt(11);
		} else if (publisher_start == 7) {
			new_isbn += '-' + isbn.charAt(7) + isbn.charAt(8) + isbn.charAt(9) + isbn.charAt(10) + isbn.charAt(11);
		} else if (publisher_start == 8) {
			new_isbn += '-' + isbn.charAt(8) + isbn.charAt(9) + isbn.charAt(10) + isbn.charAt(11);
		} else {
			return unknown_isbn;
		}
	}
	
	// Check Digit
	new_isbn += '-' + isbn.charAt(12);

	// Return
	return new_isbn;
}
	
/**
 * Convert a 10-digit ISBN to a 13-digit ISBN
 * @param isbn 10-digit ISBN (with or without dashes)
 * @return Returns 13-digit ISBN if valid 10-digit ISBN provided, else original
 */
function convert_isbn(isbn){
	var check = check_isbn(isbn, true);
	if(!check){
	 return isbn; // Invalid 10-Digit ISBN
	}
	isbn = '978' + isbn;
	var check_digit = check_isbn(isbn, false, true);
	isbn = " " + isbn.substr(0, isbn.length - 1) + check_digit;
	return isbn;
}
	
/**
 *
 * @param isbn
 * @param allow_10
 * @param return_check_digit
 * @return Returns TRUE if $isbn is a valid $isbn, else FALSE
 */
function check_isbn(isbn, allow_10, return_check_digit){
	if (allow_10 == undefined) allow_10 = false;
	if (return_check_digit == undefined) return_check_digit = false;
	/**
	 * The calculation of an ISBN-13 check digit begins with the first 12 digits of the
	 * thirteen-digit ISBN (thus excluding the check digit itself). Each digit, from left
	 * to right, is alternately multiplied by 1 or 3, then those products are summed
	 * modulo 10 to give a value ranging from 0 to 9. Subtracted from 10, that leaves a
	 * result from 1 to 10. A zero (0) replaces a ten (10), so, in all cases, a single
	 * check digit results.
	 * ~ http://en.wikipedia.org/wiki/International_Standard_Book_Number#ISBN-13 2010-02
	 */
	if(allow_10&&return_check_digit){
		return "Cannot return check digit when allow_10 is TRUE";
	}
	if((allow_10)&&(isbn.length==10)){
		var total = 0;
		var m = 11;
		for(var i=0;i<10;i++){
			m--;
			if((i===9)&&(isbn.charAt(i)=='X')){
				total = total + (m*10);
			} else if(valid_integer(isbn.charAt(i))){
				total = total + (m*isbn.charAt(i));
			} else {
				return "A non-integer character `" + isbn.charAt(i) + "` was found";
			}
		}
		total = total % 11;
		if(total==0){
			return true;
		} else {
			return "Did you type it wrong?";
		}
	}
	if(isbn.length!=13){
		if((isbn.length!=12)||(!return_check_digit)){
			var difference;
			if (isbn.length > 13) {
				difference = (isbn.length - 13);
				return difference + " character" + (difference === 1 ? "" : "s") + " too long";
			} else {
				difference = (13 - isbn.length);
				return difference + " character" + (difference === 1 ? "" : "s") + " too short";
			}
		}
	}
	m = 1;
	total = 0;
	for(i=0;i<12;i++){
		if(!valid_integer(isbn.charAt(i))){
			return "A non-integer character `" + isbn.charAt(i) + "` was found";
		}
		total = total + (m*isbn.charAt(i));
		m==1 ? m=3 : m=1;
	}
	var check = (10-(total%10))%10;
	if(return_check_digit){
		return check;
	}
	if(check===parseInt(isbn.charAt(12))){
		return true;
	} else {
		return "Did you type it wrong?";
	}
}
/**
 *
 * @param number
 * @return Returns boolean TRUE if string is a valid integer, or FALSE if it is not 
 */
function valid_integer(number){
	return /^\d+$/.test(number);
}

function validateISBN(){
	var isbn = document.getElementById("isbnInput").value.replace(/\-/g, "")
		, resultDiv = document.getElementById("isbnResult")
		, message = "Valid ISBN!"
		,	valid = true
		, warning = false;
	if (isbn === "") {
		valid = null;
		message = "Please enter an ISBN.";
	} else if (check_isbn(isbn) !== true){
		var check = check_isbn(isbn, true);
		if (check === true) {
			warning = true;
			message = "Valid, but should use " + convert_isbn(isbn);
		} else {
			valid = false;
			message = "Invalid ISBN: " + check;
		}
	}
	resultDiv.innerHTML = "";
	resultDiv.appendChild(document.createTextNode(message));
	if (valid) {
		document.getElementById("isbnInput").value = format_isbn(isbn);
	}
	if (warning) {
		resultDiv.className = "warning";
	} else {
		resultDiv.className = (valid===true ? "valid" : (valid===false ? "invalid" : ""));
	}
}

function loadISBNValidator(){
	document.getElementById("isbnResultContainer").innerHTML = '<p><label>ISBN <input id="isbnInput" onchange="validateISBN();" oninput="validateISBN();"></label> <small id="isbnResult"></small></p><style type="text/css">#isbnResult.valid {color:#080;}#isbnResult.invalid {color:#c00;}</style>';
	validateISBN();
}

loadISBNValidator();