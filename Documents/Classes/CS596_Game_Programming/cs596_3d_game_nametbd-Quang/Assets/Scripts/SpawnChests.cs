using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SpawnChests : MonoBehaviour {
    public GameObject ParentChest;
    public GameObject Chest;
    public Terrain Terrain;

    public static float TerrainLeft;
    public static float TerrainRight;
    public static float TerrainTop;
    public static float TerrainBottom;
    public static float TerrainWidth;
    public static float TerrainLength;
    public static float TerrainHeight;

    void Awake () {
        TerrainLeft = Terrain.transform.position.x;
        TerrainBottom = Terrain.transform.position.z;
        TerrainWidth = Terrain.terrainData.size.x;
        TerrainLength = Terrain.terrainData.size.z;
        TerrainHeight = Terrain.terrainData.size.y;
        TerrainRight = TerrainLeft + TerrainWidth;
        TerrainTop = TerrainBottom + TerrainLength;
    }
    void Start () {
        for (int i = 0; i < 10; i++) {
            RandomPoint ();
        }
    }

    // Update is called once per frame
    void Update () {

    }

    public void RandomPoint () {
        LayerMask terrainMask = LayerMask.GetMask ("Terrain");

        // Create random location
        float randomPositionX = Random.Range (TerrainLeft, TerrainRight);
        float randomPositionZ = Random.Range (TerrainBottom, TerrainTop);

        RaycastHit hit;

        if (Physics.Raycast (new Vector3 (randomPositionX, 9999f, randomPositionZ), Vector3.down, out hit, Mathf.Infinity, terrainMask)) {
            TerrainHeight = hit.point.y;
        }

        // Pin point location to get height
        float randomPositionY = TerrainHeight;

        Vector3 randomPosition = new Vector3 (randomPositionX, randomPositionY, randomPositionZ);

        // Create chest
        GameObject chest;
        chest = Instantiate (Chest, randomPosition, Chest.transform.rotation) as GameObject;
        chest.transform.SetParent (ParentChest.transform);
    }
}