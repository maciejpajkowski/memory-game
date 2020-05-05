$(function() {
	let tiles_flipped = 0;
	let matched_pairs = 0;
	let dataArray = [];
	let thisArray = [];
	let finished = false;

	const $cardContainers = $('.card-container');
	const $windows = $('.window');
	const $startGame = $('#startGame');
	const $cards = $('.card');
	const images = [
		['img/title_1.png', 1],
		['img/title_1.png', 1],
		['img/title_2.png', 2],
		['img/title_2.png', 2],
		['img/title_3.png', 3],
		['img/title_3.png', 3],
		['img/title_4.png', 4],
		['img/title_4.png', 4],
		['img/title_5.png', 5],
		['img/title_5.png', 5],
		['img/title_6.png', 6],
		['img/title_6.png', 6],
		['img/title_7.png', 7],
		['img/title_7.png', 7],
		['img/title_8.png', 8],
		['img/title_8.png', 8]];
	const scramble = (inputArray) => {
		const length = inputArray.length;
		let newArray = [];
		let oldArray = inputArray.slice(0);
		for (let i = 0; i < length; i++) {
			const random = Math.floor(Math.random() * oldArray.length);
			let x = oldArray[random];
			newArray.push(x);
			oldArray.splice(random, 1);
		}
		return newArray;
	}

	$startGame.on('click', () => {
		beginGame();
	});

	const beginGame = () => {
		tiles_flipped = 0;
		matched_pairs = 0;
		dataArray = [];
		thisArray = [];
		finished = false;
		$('#youwin').css('display', 'none');
		$('#tilesflipped').text(tiles_flipped);
		$('#pairsfound').text(matched_pairs);
		$windows.css('transform', 'translateY(0%)');
		const imagesArray = scramble(images);
		// console.log(imagesArray);
		for (let i = 0; i < $cards.length; i++) {
			$cards.eq(i).css('backgroundImage', 'url(' + imagesArray[i][0] + ')');
			$cards.eq(i).data('index', imagesArray[i][1]);
		}
	};
	for (let i = 0; i < $cardContainers.length; i++) {
		$cardContainers.eq(i).on('click', function() {
			// console.log($(this).children('.card').data());
			if (thisArray.length < 2 && dataArray.length < 2) {
				$(this).children('div:first').css('transform', 'translateY(-100%');
			}
			const add = () => {
				if (thisArray.length < 2 && dataArray.length < 2 && !finished) {
					tiles_flipped++;
					// console.log(tiles_flipped);
					dataArray.push($(this).children('.card').data('index'));
					thisArray.push($(this).children('.window'));
					// console.log(dataArray, thisArray);
					$('#tilesflipped').text(tiles_flipped);
				}
			}
			const check = () => {
				if (thisArray.length == 2 && dataArray.length == 2) {
					if (dataArray[0] == dataArray[1] && thisArray[0] != thisArray[1] && !finished) {
						matched_pairs++;
						dataArray = [];
						thisArray = [];
						$('#pairsfound').text(matched_pairs);
						if (matched_pairs == $cards.length/2) {
							$('#youwin').css('display', 'inline-block');
							finished = true;
						}
					} else {
						dataArray = [];
						setTimeout(() => {
							thisArray.forEach(function(currVal, index) {
								currVal.css('transform', 'translateY(0%)');
							})
							// thisArray[0].css('transform', 'translateY(0%)');
							// thisArray[1].css('transform', 'translateY(0%)');
							thisArray = [];
						}, 1000);
					}
				}
			}
			add();
			check();
		});
	}
	beginGame();
});