/*
AUTOMATICALLY LINEBREAK AND DISPLAY GUITEXT
*/

var lineWidth = 5;

function display (text:String) {
	guiText.text = linebreaks(text);
}

function linebreaks(currentText:String){
	//why didnt i comment this...
	
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

