var filename = "encounters.json";
var player:GameObject;
var streamOfConsciousness:Thoughts;

@HideInInspector var node:Boo.Lang.Hash;
private var playerName = "Player";

function Start () {

	var sr = System.IO.StreamReader(Application.dataPath + "/JSON/" + filename);
	var contents = sr.ReadToEnd();
	sr.Close();
	node = JSONParse.JSONParse(contents);
	
	if (player == null) player = gameObject.Find(playerName);
	
}

function runEncounter(name:String, npc:GameObject) {
	// called by npc after player interacts with them

	var currentEncounter:Boo.Lang.Hash;
	var character:GameObject;

	//find encounter
	for (var encounter in node["encounters"]){
		if (encounter["name"] == name){
			currentEncounter = encounter;
			break;
		}
	}
	if (currentEncounter == null) {
		Debug.LogError("Encounter '" + name + "' not found");
		return;
	}
	
	//default values for lps and delay - used whenever these values aren't defined
	var lpsDef:double = currentEncounter["sections"][0]["dialog"][0]["lps"];
	var delayDef:double = currentEncounter["sections"][0]["dialog"][0]["delay"];
	
	//send encounter dialog and reactions to characters 
	for (var section in currentEncounter["sections"]){
		for (var line in section["dialog"]){
			//choose json values, or default values if null
			var lps:double = (line["lps"] != null) ? line["lps"] : lpsDef; // i should switch to c#..
			var delay:double = (line["delay"] != null) ? line["delay"] : delayDef;
			
			//trigger stream of consciousness by sending entire reaction to Thoughts.js
			if (line["rlink"]){
				var reaction = section["reaction"];
				if (reaction == null) Debug.LogError("Reaction not found");
				//else streamOfConsciousness.process(reaction["text"], reaction["lps"], reaction["delay"]);
				else streamOfConsciousness.process(reaction);
			}
			
			//send line to character
			if (line["char"] == "npc") character = npc;
			else if (line["char"] == "player") character = player;
			yield character.GetComponent(Talk).talk(line["text"], lps, delay, true);
		}
	}
}

function strToFloat(val:double){
	if (val == null) return null;
	//else return float.Parse(val);
}