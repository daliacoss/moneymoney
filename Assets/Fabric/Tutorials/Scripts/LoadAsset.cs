using UnityEngine;
using System.Collections;

public class LoadAsset : MonoBehaviour {
	
	public string asset;
	public string targetComponent;

	public bool loadAsset=false;
	public bool unloadAsset=false;
	
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		
		if(loadAsset)
		{

			GameObject audioPrefab = Resources.Load(asset) as GameObject;
		    GameObject audioGameObject = GameObject.Instantiate(audioPrefab) as GameObject;
			Fabric.FabricManager.Instance.LoadAsset(audioGameObject, targetComponent);
			//Fabric.FabricManager.Instance.LoadAsset(asset,targetComponent);
			loadAsset=false;
		}
		
		if(unloadAsset)
		{
			Fabric.FabricManager.Instance.UnloadAsset(targetComponent + "_" + asset);
			unloadAsset=false;
		}
	}
}