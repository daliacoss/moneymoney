//contains methods for displaying encounter text
//should be called by encounter manager
//SHOULD CONTAIN: child with tk2dTextMesh

//TODO: prevent linebreaks occuring in the middle of a word
//kind of nervous about depending on exceptions to break the loop...

enum Hierarchy{Self, Child};
var textMeshLocation:Hierarchy = Hierarchy.Child;

var lettersPerLine:int = 30;
//these values are only used when no default value is specified in encounter node
var lettersPerSecond:float = 4;
var delayBetweenLines:float = 1;

@HideInInspector var textSprite:tk2dTextMesh;
@HideInInspector var talking:boolean;

function Start () {
	if (textMeshLocation == Hierarchy.Child) textSprite = gameObject.GetComponentInChildren(tk2dTextMesh);
	else if (textMeshLocation == Hierarchy.Self) textSprite = gameObject.GetComponent(tk2dTextMesh);
	
	if (textSprite == null) Debug.LogError("tk2dTextMesh not found in " + transform.name);
	
}

function talk(text:String, lps:float, delay:float, eraseWhenDone:boolean){

	//if (talking) return;
	//talking = true;
	
	text = linebreak(text, lettersPerLine);

	if (lps == null) lps = Mathf.Abs(lettersPerSecond);
	else var interval:float = 1.0 / lps;
	
	if (delay == null) delay = delayBetweenLines;
	
	for (var chr:char in text){
		textSprite.text += chr;
		textSprite.Commit();
		yield WaitForSeconds(interval);
	}
	
	yield WaitForSeconds(delay);
	if (eraseWhenDone){
		textSprite.text = '';
		textSprite.Commit();
	}
	
	//talking = false;
}

function linebreak(text:String, lineWidth:int){

	//equivalent to the number of linebreaks
	var offset:int = 0;
	
	for (i = lineWidth; i < text.Length; i += lineWidth){
		//detects if current character is a space, ignores range error
		try var isSpace:boolean = (text[i+offset] == " ");
		catch(ArgumentOutOfRangeException) continue;
		
		//add offset (number of linebreaks) to the position
		//this prevents the offset error that happens when inserting a linebreak character
		try {
			if (!isSpace) text = text.Insert(i + offset, "\n");
			//if previous character isn't a space either, insert hyphen
			else text = replaceAt(text, "\n", i+offset);
		}
		//if i+offset is out of range, we've reached the end of the text file - break the loop
		catch(ArgumentOutOfRangeException) break;
		
		//increment offset - can't just use i because i is in multiples of lineWidth
		offset++;
	}
	
	return text;

}

function replaceAt(text:String, replacement:String, index:int){
	
	var start:String = text.Substring(0, index);	//everything before the index
	var end:String = text.Substring(index+1, text.Length - (index+1));		//everything after the index

	return start + replacement + end;
}