var cardItem = document.getElementsByClassName('cardItem'),
	leftColumn = document.getElementsByClassName('columnLeft')[0],
	middleColumn = document.getElementsByClassName('columnMiddle')[0],
	rightColumn = document.getElementsByClassName('columnRight')[0],
	ITEM_LIMIT = 13000;

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}



for (var i = 0; i < cardItem.length; i++) {
	random = getRndInteger(220, 350);
	cardItem[i].style.height = random  + 'px';
}



var currentItem = 1;
var shortest;

function fadeIn(item){
			setTimeout(function() {
	    		item.style.opacity = '1';
			}, 100);
}

function distributingItens(item){


if (document.getElementsByTagName('body')[0].offsetWidth > 766) {
		if (currentItem == 1){
			leftColumn.appendChild(item) 	
		} else if (currentItem == 2){
			middleColumn.appendChild(item) 	
		} else if (currentItem == 3) {
			rightColumn.appendChild(item) 	
		} else {
			shortest = columnHeightChecker();
			shortest.appendChild(item)
			fadeIn(item);
			
		}
		currentItem++;
	} else {
		rightColumn.style.width = '49%';
		leftColumn.style.width = '50%';
		middleColumn.style.display = 'none';
		if (currentItem == 1){
			leftColumn.appendChild(item) 	
		} else if (currentItem == 2) {
			rightColumn.appendChild(item) 	
		} else {
			shortest = columnHeightChecker();
			shortest.appendChild(item)
			fadeIn(item);
		}
		currentItem++;
	}

}

for (item of cardItem) {

	distributingItens(item);

	
}

function addNewItem(){
	var item = cardItem[1].cloneNode(true),
		random = getRndInteger(220, 350);
		item.style.height = random  + 'px';
		item.style.opacity = '0';
		console.log()
		random = getRndInteger(1, 99);
		item.childNodes[1].style.backgroundImage = 'url(./img/'+ random +'.jpeg)'
			distributingItens(item);
}


function columnHeightChecker(){
	if (document.getElementsByTagName('body')[0].offsetWidth > 766) {
		if (leftColumn.offsetHeight < (middleColumn.offsetHeight && rightColumn.offsetHeight) ){
			return leftColumn;
		} else if (middleColumn.offsetHeight < (leftColumn.offsetHeight && rightColumn.offsetHeight) ){
			return middleColumn;
		} else if (rightColumn.offsetHeight < (leftColumn.offsetHeight && middleColumn.offsetHeight) ){
			return rightColumn;
		} else {
			return middleColumn;
		}
	} else {
		if (leftColumn.offsetHeight < rightColumn.offsetHeight) {
			return leftColumn;
		} else {
			return rightColumn;
		}
	}
}


function columnHeightCheckerLonger(){
	if (document.getElementsByTagName('body')[0].offsetWidth > 766) {
		if (leftColumn.offsetHeight > (middleColumn.offsetHeight && rightColumn.offsetHeight) ){
			return leftColumn;
		} else if (middleColumn.offsetHeight > (leftColumn.offsetHeight && rightColumn.offsetHeight) ){
			return middleColumn;
		} else if (rightColumn.offsetHeight > (leftColumn.offsetHeight && middleColumn.offsetHeight) ){
			return rightColumn;
		} else {
			return middleColumn;
		}
	} else {
		if (leftColumn.offsetHeight > rightColumn.offsetHeight) {
			return leftColumn;
		} else {
			return rightColumn;
		}
	}
}





window.addEventListener("scroll", function(){
	var longest = columnHeightCheckerLonger();
	if (cardItem.length > ITEM_LIMIT) {
		console.log('Item limit reached');
	} else {
		if (longest.lastElementChild.getBoundingClientRect().bottom < (window.innerHeight + 100)) {
        		addNewItem();
        }
	}
});