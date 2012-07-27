using UnityEngine;
using System.Collections;

public class Test : MonoBehaviour {
	
	public bool fadein = false;
	public bool fadeout = false;
	public string componentName ="";
	public Fabric.Component component = null;
	
	// Use this for initialization
	void Start () {
		
		//Fabric.FabricManager.Instance.SetAudioComponentClip("Test","Audio/Alert");
		//component = Fabric.FabricManager.Instance.GetComponentByName(componentName);
	
	}
	
	// Update is called once per frame
	void Update () {
	
		if(fadein)
		{
			component = Fabric.FabricManager.Instance.GetComponentByName(componentName);
			
			//Fabric.FabricManager.Instance.SetAudioComponentClip("Test","Audio/Alert");
			Fabric.FabricManager.Instance.FadeInComponent(componentName, 10);
			fadein=false;
		}
		
		if(fadeout)
		{
			
			//Fabric.FabricManager.Instance.SetAudioComponentClip("Test","Audio/Alert");
			Fabric.FabricManager.Instance.FadeOutComponent(componentName, 10);
			fadeout=false;
		}
	}
}
