enum SpeedUnit {SPF, FPS};
var speedUnit:SpeedUnit = SpeedUnit.SPF;
var speed = .04;

private var sprite:tk2dAnimatedSprite;

//get rid of the smurf names
enum PlayerState {IDLE, WALKING};
enum FaceV {FRONT, BACK};
enum FaceH {LEFT, RIGHT};
@HideInInspector var state:PlayerState;
var faceV:FaceV;
var faceH:FaceH;
private var faceHPrev:FaceH;

@HideInInspector var clickPosition:Vector2;
private var moveX:Vector3 = new Vector3(2, 0, 0);
private var moveY:Vector3 = new Vector3(0, 1, 0);
private var animating = false;
var clickEnabled = true;

var camera2d:GameObject;
private var cameraName = "Camera";

function Start () {
	camera2d = GameObject.Find(cameraName);
	if (speedUnit == SpeedUnit.FPS) speed = 1/speed;
	sprite = GetComponent(tk2dAnimatedSprite);
	//sprite.Play("bobbyIdleFront");
	
	state = PlayerState.IDLE;
}

function Update () {
	getFace();
	animate();
	if (Input.GetButtonDown("Fire1") && clickEnabled) setClick(Input.mousePosition);
	
	//stick this in a new file sometime
	//if (Input.GetKeyDown(KeyCode.Escape)) paused = !paused;
	//Time.timeScale = (paused) ? 0 : 1;
}

function movetest(){
	//transform.Translate(Vector3.up * 40 * Time.deltaTime);
	rigidbody.MovePosition(rigidbody.position + moveX*20);
	Debug.Log((rigidbody.position + Vector3(10.0, 0.0, 0.0)) * Time.deltaTime);
}

function setClick(target:Vector2){
	clickPosition = target;
	clickPosition.x = Mathf.Floor(clickPosition.x + camera2d.transform.position.x);
	clickPosition.y = Mathf.Floor(clickPosition.y + camera2d.transform.position.y);
	move();
}

function stop(){
	clickPosition = transform.position;
}

function move(){
	//this is so bad
	
	faceH = faceHPrev;
	
	//this is a vector2 because the z axis fucks everything up
	while (Vector2(rigidbody.position.x, rigidbody.position.y) != clickPosition){
		state = PlayerState.WALKING;
		var directionX:float = Mathf.Sign(clickPosition.x - rigidbody.position.x);
		var directionY:float = Mathf.Sign(clickPosition.y - rigidbody.position.y);
		
		if (rigidbody.position.x != clickPosition.x) {
			if (rigidbody.position.y == clickPosition.y) {
				rigidbody.MovePosition(rigidbody.position + moveX * directionX);
				yield WaitForSeconds(speed);
			}

			else {
				rigidbody.MovePosition(rigidbody.position + (moveY * directionY) + (moveX * directionX));
				yield WaitForSeconds(speed);
			}
		}
		else{
			if (rigidbody.position.y != clickPosition.y) {
				rigidbody.MovePosition(rigidbody.position + moveY * directionY);
				yield WaitForSeconds(speed);
			}
		}

		// snap to correct position when within range of 1 pixel
		if (Mathf.Abs(rigidbody.position.x - clickPosition.x) < moveX.x && rigidbody.position.x != clickPosition.x) rigidbody.position.x = clickPosition.x;
	}
	
	state = PlayerState.IDLE;
}

function getFace(){
	

	var c:Vector2 = clickPosition;
	var r:Vector2 = rigidbody.position;
	faceH = faceH;//(c.x > r.x) ? FaceH.RIGHT : (c.x < r.x) ? FaceH.LEFT : faceH;
	faceV = (c.y > r.y) ? FaceV.BACK : (c.y < r.y) ? FaceV.FRONT : faceV;
}

function animate(){
	
	if (faceH != faceHPrev) sprite.FlipX();
	
	if (state == PlayerState.IDLE){ 
		if (faceV == FaceV.FRONT) playOnce("bobbyIdleFront");
		else playOnce("bobbyIdleBack");
	}
	else if (state == PlayerState.WALKING){
		if (faceV == FaceV.FRONT) playOnce("bobbyWalkFront");
		else playOnce("bobbyWalkBack");
	}
	
}

function playOnce(clip:String){
	if (sprite.clipId != sprite.GetClipIdByName(clip)) sprite.Play(clip);
}

