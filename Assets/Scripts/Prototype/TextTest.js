var lineWidth = 5;

// useless shit:
private var textModWidth;
private var guiTextNoBreak:String; 

function display(text:String) {
	guiText.text = linebreaks(text);
}

function linebreaks(currentText:String){
	
	var offset = 0;
	var finalLength = currentText.Length + currentText.Length / lineWidth;
	for (var i = lineWidth; i < finalLength; i += lineWidth){
		currentText = currentText.Insert(i + offset, "\n");
		offset++;
	}
	
	Debug.Log(currentText.Length);
	Debug.Log(finalLength);
	
	return currentText;
}

function linebreaksTest() {
	
	if (Input.anyKeyDown){
		guiText.text += Input.inputString;
		guiTextNoBreak = guiText.text.Replace("\n", "");
		//Debug.Log(guiTextNoBreak.Replace("a", "4"));
		textModWidth = guiTextNoBreak.length % lineWidth;
		
		if (textModWidth == 0){
		
			guiText.text += "\n";
		}
	}
}