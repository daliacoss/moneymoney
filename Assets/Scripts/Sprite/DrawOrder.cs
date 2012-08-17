//assigns a z-index to all objects with a DrawOrder tag

//NOTE: this will not work with objects created at run-time

using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

public class DrawOrder : MonoBehaviour {
	public int lowestZ = 1;
	public string tag = "DrawOrder";
	[HideInInspector] List<Transform> objects = new List<Transform>();

	void Start () {
		foreach (GameObject j in GameObject.FindGameObjectsWithTag(tag)) {
			objects.Add(j.transform);
		};
	}
	
	void Update () {
		int index = lowestZ;
		//the lower the y, the lower (closer) the z-index - lowest y are called first
		foreach (Transform i in objects.OrderBy(key => key.position.y)){
			Transform theobject = objects[objects.FindIndex(e => {return (e == i);})];
			//this line slows everything down, possibly because it fucks with the transform of an already moving object
			theobject.position = new Vector3(theobject.position.x, theobject.position.y, index);
			index++;
		}
	}
}
