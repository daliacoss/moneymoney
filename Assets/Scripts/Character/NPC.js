@HideInInspector var sprite:tk2dSprite;
private var spriteSize:Vector3;
private var mousePos:Vector2;
private var cameraPos:Vector3;

var charName:String;
var encounterName:String;

@HideInInspector var talking = false;
// allows multiple objects to select player.clickEnabled
private var wasSelected = false;

var encounterManager:EncounterManager;
var camera2d:GameObject;
var player:PlayerMove;
private var cameraName = "Camera";
private var playerName = "Player";
private var emName = "Encounters";

function Start () {
	sprite = GetComponent(tk2dSprite);
	spriteSize = sprite.GetBounds().size;
	
	if (camera2d == null) camera2d = GameObject.Find(cameraName);
	if (encounterManager == null) encounterManager = GameObject.Find(emName).GetComponent(EncounterManager);
	if (player == null) player = GameObject.Find(playerName).GetComponent(PlayerMove);
}

function Update () {
	mousePos = Input.mousePosition;
	cameraPos = camera2d.transform.position;
	if (checkCursor(Vector2(mousePos.x + cameraPos.x, mousePos.y + cameraPos.y))){
		player.clickEnabled = false;
		wasSelected = true;
		if (Input.GetButtonDown("Fire1") && !talking) alertEM();
	}
	else{
		if (wasSelected) player.clickEnabled = true;
		wasSelected = false;
	}
}

function checkCursor(cursorPos:Vector2){
	var box = Rect(transform.position.x, transform.position.y, spriteSize.x, spriteSize.y);
	return (box.Contains(cursorPos));
}

function alertEM(){
	talking = true;
	yield encounterManager.runEncounter(encounterName, gameObject); //triple yield!!!
	talking = false;
}