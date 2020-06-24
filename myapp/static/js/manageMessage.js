let placeMessage = document.getElementById('bigBoxMessage');


function createMessage(message) {
	let newBlock = document.createElement('div');
	newBlock.classList.add('row');
	newBlock.id = "boxMessage1";

	newPara = document.createElement('p');
	newPara.classList.add('col-sm-6');

	newPara1 = document.createElement('p');
	newPara1.classList.add('col-sm-5');
	newPara1.id = "message1";
	newPara1.textContent = message;

	newBlock.append(newPara);
	newBlock.append(newPara1);

	return newBlock;

}










document.querySelector('#form').addEventListener('submit', function (e){
	const message = document.querySelector('#message_text');
	
	const message_new = createMessage(message.value);
	placeMessage.append(message_new);
	placeMessage.scrollTop = placeMessage.scrollHeight;



	message.value = "";
	e.preventDefault();

})

