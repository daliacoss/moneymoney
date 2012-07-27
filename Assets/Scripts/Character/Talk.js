//contains methods for displaying encounter text
//should be called by encounter manager
//SHOULD CONTAIN: child with tk2dTextMesh

enum Hierarchy{Self, Child};
var textMeshLocation:Hierarchy = Hierarchy.Child;

var lineWidth:int = 30;
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

function talk(text:String, lps:float, delay:float){

	//if (talking) return;
	//talking = true;

	if (lps == null) lps = Mathf.Abs(lettersPerSecond);
	else var interval:float = 1.0 / lps;
	
	if (delay == null) delay = delayBetweenLines;
	
	for (var chr:char in text){
		textSprite.text += chr;
		textSprite.Commit();
		yield WaitForSeconds(interval);
	}
	
	yield WaitForSeconds(delay);
	textSprite.text = '';
	textSprite.Commit();
	
	//talking = false;
}