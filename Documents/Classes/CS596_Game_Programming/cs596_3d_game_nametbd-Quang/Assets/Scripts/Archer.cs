using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Archer : MonoBehaviour {
    public float speed = 5;
    public GameObject Bullet;
    public Transform bulletSpawnPoint;

    private Rigidbody rb;
    private Animator animator;

    public float thrust = 5;

    // Timed space between shots
    public float timeBetweenShots = 1f;
    private float timestamp;

    // Grounded?
    public bool isGrounded = false;
    public Transform groundCheck;
    private float groundRadius = .5f;
    public LayerMask whatIsGround;

    void Start () {
        rb = GetComponent<Rigidbody> ();
        animator = GetComponent<Animator> ();
    }

    void Update () {
        bool jump = Input.GetKeyDown (KeyCode.Space);
        bool leftClick = Input.GetKeyDown (KeyCode.Mouse0);
        bool running = Input.GetKey (KeyCode.LeftShift);

        // Running
        if (running) {
            // Running
            speed = 10;

            // Animation
            animator.SetBool ("Run", true);
        } else {
            // Running speed back to normal
            speed = 5;

            // Animation back to normal
            animator.SetBool ("Run", false);
        }

        // Check if on ground
        isGrounded = (Physics.OverlapSphere (groundCheck.position, groundRadius, whatIsGround).Length != 0);
        animator.SetBool ("Grounded", isGrounded);

        // Jumping
        if (jump) {
            rb.AddForce (transform.up * thrust);
            animator.SetTrigger ("Jump");
        }

        // Shooting
        if (leftClick) {
            Fire ();
            animator.SetTrigger ("Fire");
        } else
            animator.ResetTrigger ("Fire");

        // Time in between shots
        timestamp = Time.time + timeBetweenShots;
    }

    void FixedUpdate () {
        float moveHorizontal = Input.GetAxis ("Horizontal");
        float moveVertical = Input.GetAxis ("Vertical");

        // Moving
        if (Mathf.Abs (moveVertical) > 0.1f || Mathf.Abs (moveHorizontal) > 0.1f) {
            animator.SetBool ("Walk", true);
        } else {
            animator.SetBool ("Walk", false);
        }

        Vector3 movement = new Vector3 (moveHorizontal * speed, rb.velocity.y, moveVertical * speed);

        // Move toward direction of camera
        movement = transform.TransformDirection (movement);

        rb.velocity = movement;
    }

    void Fire () {
        // Point bow towards target
        bulletSpawnPoint.LookAt (Camera.main.transform.Find ("Target").transform);

        // Create bullet
        GameObject arrow;
        arrow = Instantiate (Bullet, bulletSpawnPoint.position, bulletSpawnPoint.transform.rotation) as GameObject;

        // Give velocity on bullet
        var bulletRigidBody = arrow.GetComponent<Rigidbody> ();
        bulletRigidBody.velocity = bulletSpawnPoint.transform.forward * 50;

        Destroy (arrow, 4f);
    }

    void TakeDamage () {

    }

}