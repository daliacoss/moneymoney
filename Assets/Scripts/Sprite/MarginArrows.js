var cameraFollow:CameraFollow;
var arrows:Hashtable = new Hashtable();
var deselectColour:Color = new Color(1, 1, 1, .7);
var selectColour:Color = new Color(1, 1, 1, 1);

function Start () {

	arrows["down"] = new transform.FindChild("Down");
	arrows["downLeft"] = new transform.Find("DownLeft");
	arrows["downRight"] = new transform.Find("DownRight");
	arrows["up"] = new transform.FindChild("Up");
	arrows["upLeft"] = new transform.Find("UpLeft");
	arrows["upRight"] = new transform.Find("UpRight");
	arrows["left"] = new transform.FindChild("Left");
	arrows["right"] = new transform.Find("Right");

}

function Update () {
	var vertical:Margin = cameraFollow.marginState["vertical"];
	var horizontal:Margin = cameraFollow.marginState["horizontal"];
	
	for (var i in arrows) i.Value.GetComponent(tk2dSprite).color = deselectColour;
	
	if (horizontal == Margin.NONE){
		switch (vertical){
			case Margin.TOP: 
				arrows["up"].GetComponent(tk2dSprite).color = selectColour;
				arrows["up"].GetComponent(tk2dSprite).color = selectColour;
				break;
			case Margin.BOTTOM:
				arrows["down"].GetComponent(tk2dSprite).color = selectColour;
				break;
			default: break;
		}
	}
	
	else if (horizontal == Margin.LEFT){
		switch (vertical){
			case Margin.TOP: 
				arrows["upLeft"].GetComponent(tk2dSprite).color = selectColour;
				break;
			case Margin.BOTTOM:
				arrows["downLeft"].GetComponent(tk2dSprite).color = selectColour;
				break;
			default:
				arrows["left"].GetComponent(tk2dSprite).color = selectColour;
		}

	}
	
	else if (horizontal == Margin.RIGHT){
		switch (vertical){
			case Margin.TOP: 
				arrows["upRight"].GetComponent(tk2dSprite).color = selectColour;
				break;
			case Margin.BOTTOM:
				arrows["downRight"].GetComponent(tk2dSprite).color = selectColour;
				break;
			default:
				arrows["right"].GetComponent(tk2dSprite).color = selectColour;
		}

	}
}