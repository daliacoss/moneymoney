using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

public class DrawOrder : MonoBehaviour {
	int lowestZ = 1;
	[HideInInspector] List<Transform> objects = new List<Transform>();

	void Start () {
		foreach (Transform i in transform) objects.Add(i);
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
