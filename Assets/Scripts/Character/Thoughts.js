// FIX: only one object can control clickEnabled or the game crashes

#pragma strict

var thoughtBox:tk2dSprite;
private var thoughtRect:Rect;

var player:PlayerMove;
private var playerName = "Player";

function Start () {

	if (player == null) player = GameObject.Find(playerName).GetComponent(PlayerMove);

	var position:Vector3 = thoughtBox.transform.localPosition;
	var size:Vector2 = thoughtBox.GetBounds().size;
	//thoughtBox is anchored at lower center
	thoughtRect = Rect(position.x - size.x*.5, position.y, size.x, size.y);
}

function Update () {
	player.clickEnabled = !(thoughtRect.Contains(Input.mousePosition));
}