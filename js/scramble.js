let testArray = [1, 18, 32, 222, 12, 2312];


const scramble = (inputArray) => {
	const length = inputArray.length;
	let newArray = [];
	let oldArray = inputArray;
	for (let i = 0; i < length; i++) {
		const random = Math.floor(Math.random() * oldArray.length);
		let x = oldArray[random];
		newArray.push(x);
		oldArray.splice(random, 1);
	}
	return newArray;
}
console.log(testArray);
console.log(scramble(testArray));

