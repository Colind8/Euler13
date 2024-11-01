/*
Work out the first ten digits of the sum of the following one-hundred 50-digit numbers.

GAMEPLAN:
1. Import list of numbers as an array of strings
2. Starting with the right-most column, add each number together.
3. Remove the last digit of that sum and put it at the beginning of a string.
4. Move onto the next column of numbers and add those together along with the number from the last column.
5. Repeat 3-4 50 times
6. Add the final number to the beginning of the string.
7. Snip the first ten digits of the string, that's the answer.

*/
enable_logs = false; // set to true if you want the program to print what steps its running at any time

console.log('STARTING');

const fs = require('fs'); //fs is used to access the file system
file = fs.readFileSync('numbers.txt').toString().split("\n"); // Converts numbers.txt to a string and then to an array separated by new lines

answer = "";


for (i = file[0].length - 1; i >= 0; i--) { // repeats for the length of each number (50)
	if (i == file[0].length - 1) {
		d = 0; // d represents the saved number from step 4
		c = 0; // c represents the sum of any addition
	} else {
		d = c; // c here is the final sum of the previous column MINUS the last digit.
	}
	if (enable_logs) {
		console.log(`-- COLUMN ${i}`);
	}
	for (j = 0; j < file.length - 1; j++) { // repeats for every number (100)
		if (enable_logs) {
			console.log(`---- ROW ${j}`);
		}
		if (j == 0) {
			a = Number(file[j][i]) + d; // if this is the first number, set a to that number's last digit PLUS add d to it
		} else {
			a = c; // Otherwise, just make a the addition concluded from the previous problem.
		}
		
		b = Number(file[j + 1][i]); // make b the next digit
		c = a + b; // add the current sum + the next digit (a+b)
		
		if (enable_logs) {
			console.log(`     ${a} + ${b} = ${c}`);
		}
	}
	c = c.toString(); // convert the final sum of the column to a string
	answer = c[c.length - 1] + answer; // add the last digit of the sum to the answer
	if (enable_logs) {
		console.log(`-- CURRENT ANSWER: ${answer}`);
	}
	c = c.substr(0,c.length - 1); // Remove the last digit from the sum
	c = Number(c); // Convert c back into a number
}

// Adds the final remainer to the beginning of the string.
c = c.toString();
answer = c + answer;

console.log(`\n\nFINAL ANSWER: ${answer.substr(0,10)}`);