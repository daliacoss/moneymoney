var truePosition:Transform;

var enableScroll = true;

var speedUnit:SpeedUnit = SpeedUnit.SPF;
var speed = .01;
var distancePerFrame = 2;

var marginSize = 20;
enum Margin{LEFT, RIGHT, TOP, BOTTOM, NONE};
var marginState:Boo.Lang.Hash = {"vertical": Margin.NONE, "horizontal": Margin.NONE};

var worldBase:GameObject;	//world graphic
private var worldBounds:Rect = Rect(0, 0, 0, 0);
private var boundState:Boo.Lang.Hash = {"vertical": Margin.NONE, "horizontal": Margin.NONE};

private var moving = false;

function Start(){
	setBounds();
	if (speedUnit == SpeedUnit.FPS) speed = 1/speed;
}

function Update () {
	checkMargins();
	checkBounds();
	if (enableScroll) scrollInit();
}

function checkMargins(){
	var mousePosition = Input.mousePosition;
	var boundH:Margin = boundState["horizontal"];
	var boundV:Margin = boundState["vertical"];
	
	if (mousePosition.x < marginSize && boundH != Margin.LEFT) marginState["horizontal"] = Margin.LEFT;
	else if (mousePosition.x > Screen.width - marginSize && boundH != Margin.RIGHT) marginState["horizontal"] = Margin.RIGHT;
	else marginState["horizontal"] = Margin.NONE;
	
	if (mousePosition.y < marginSize && boundV != Margin.BOTTOM) marginState["vertical"] = Margin.BOTTOM;
	else if (mousePosition.y > Screen.height - marginSize && boundV != Margin.TOP) marginState["vertical"] = Margin.TOP;
	else marginState["vertical"] = Margin.NONE;

}

function scrollInit(){
	//ensures scroll coroutine is not called on every update

	var vertical:Margin = marginState["vertical"];
	var horizontal:Margin = marginState["horizontal"];
	
	if ((vertical != Margin.NONE || horizontal != Margin.NONE) && moving == false){
		scroll();
		moving = true;
	}
	else if (vertical == Margin.NONE && horizontal == Margin.NONE) moving = false;

}

function scroll(){
	var vertical:Margin = marginState["vertical"];
	var horizontal:Margin = marginState["horizontal"];
	
	while (vertical != Margin.NONE || horizontal != Margin.NONE){
		switch (vertical){
			case Margin.TOP:
				rigidbody.MovePosition(rigidbody.position + Vector2(0, distancePerFrame));
				break;
			case Margin.BOTTOM:
				rigidbody.MovePosition(rigidbody.position + Vector2(0, -distancePerFrame));
				break;
		}
		switch (horizontal){
			case Margin.RIGHT:
				rigidbody.MovePosition(rigidbody.position + Vector2(distancePerFrame, 0));
				break;
			case Margin.LEFT:
				rigidbody.MovePosition(rigidbody.position + Vector2(-distancePerFrame, 0));
				break;
		}
		vertical = marginState["vertical"];
		horizontal = marginState["horizontal"];
		yield WaitForSeconds(speed);

	}
}

function setBounds(){
	var worldSprite:tk2dSprite = worldBase.GetComponent(tk2dSprite);
		
	//assumes world is anchored at top left
	worldBounds.height = worldSprite.GetBounds().size.y;
	worldBounds.width = worldSprite.GetBounds().size.x;
	
}

function checkBounds(){
	//sets boundState

	var position = truePosition.position;
	var safe = distancePerFrame * 3;	//padding to prevent overshoot
	
	if (position.x - safe <= worldBounds.x) boundState["horizontal"] = Margin.LEFT;
	else if (position.x + safe >= worldBounds.xMax - Screen.width) boundState["horizontal"] = Margin.RIGHT;
	else boundState["horizontal"] = Margin.NONE;

	if (position.y + safe >= worldBounds.y) boundState["vertical"] = Margin.TOP;
	else if (position.y - safe <= -worldBounds.yMax) boundState["vertical"] = Margin.BOTTOM;
	else boundState["vertical"] = Margin.NONE;
	
	//debug
	if (Input.GetKeyDown(KeyCode.J)) Debug.Log(boundState["vertical"].ToString() + " " + boundState["horizontal"].ToString()); //{Debug.Log(boundState["vertical"].ToString() + " " + boundState["horizontal"].ToString());}
}