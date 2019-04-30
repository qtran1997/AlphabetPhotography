using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ChestOpening : MonoBehaviour {
    private Animator animator;
    private bool opened = false;

    // Chest Interaction
    private bool inContactToPlayer = false;
    private float chestRadius = 5f;
    private LayerMask PlayerMask;

    // Start is called before the first frame update
    void Start () {
        // Player is layer 9
        PlayerMask = 1 << 9;
        animator = GetComponent<Animator> ();
    }

    // Update is called once per frame
    void Update () {
        // Open if player comes into contact
        inContactToPlayer = (Physics.OverlapSphere (transform.position, chestRadius, PlayerMask).Length != 0);

        if (inContactToPlayer)

            if (!opened) {
                // Delete text
                Destroy (transform.Find ("FloatingText").gameObject);

                // Show animation
                animator.SetTrigger ("Activate");
                opened = true;
            }
    }
}