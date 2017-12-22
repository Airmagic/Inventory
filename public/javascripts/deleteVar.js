var deleteButton = document.getElementByClassName("delete_button");

for (var x=0; x < deleteButton.length; x++ ){
	deleteButton[x].addEventListener("click", function(event){
		var sure = confirm("Do you want to delete this item?");
		if (!sure){
			event.preventDefault();
		}
	});
}