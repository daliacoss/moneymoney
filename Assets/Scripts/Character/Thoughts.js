// FIX: only one object can control clickEnabled or the game crashes
// might be able to get away with it since it's avoided in NPC.js

//STEPS: (* means done)
// *1. entire reaction is sent here from EM
// for each line:
// 		*2. if interactive, line is assigned a number
//		*3. line is sent to Talk.talk()
// if user chooses thought:
//		4. corresponding section is called in EM - have to change EM for this
// else:
// 		4. EM calls clear() when time is up
// 		5. clear() clears the thoughtbox and chooses the next section in EM - have to change EM for this

import System.Collections.Generic;

var thoughtBox:tk2dSprite;
private var thoughtRect:Rect;
private var thoughtTalk:Talk;

private var interactives = new List.<double>();

var player:PlayerMove;
private var playerName = "Player";

function Start () {

	if (player == null) player = GameObject.Find(playerName).GetComponent(PlayerMove);
	
	var position:Vector3 = thoughtBox.transform.localPosition;
	var size:Vector2 = thoughtBox.GetBounds().size;
	//thoughtBox is anchored at lower center
	thoughtRect = Rect(position.x - size.x*.5, position.y, size.x, size.y);
	
	thoughtTalk = thoughtBox.GetComponent(Talk);
}

function Update () {
	player.clickEnabled = !(thoughtRect.Contains(Input.mousePosition));
	
	if (Input.anyKeyDown) Debug.Log(Input.inputString);
}

function process(reaction:Array) {
	//intermediary between the EM and the Talk component - makes thoughts interactive
	
	for (thought in reaction){
		//instead of relying on talk() for delay, allow interactions as soon as text is displayed
		yield thoughtTalk.talk(thought["text"], thought["lps"], 0, false);
	
		if (thought["link"] != null){
			//interactive lines are assigned an index in interactives
			interactives.Add(thought["link"]);
		}
		
		//handle delay here instead
		yield WaitForSeconds(thought["delay"]);
	}
}

function clear(){

}