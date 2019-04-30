using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ArrowCollision : MonoBehaviour
{
	// Start is called before the first frame update
	void Start()
	{

	}

	// Update is called once per frame
	void Update()
	{

	}

	void OnCollisionEnter(Collision collision)
	{
		// Ignore player layer
		if (collision.gameObject.layer != 9)
		{
			// Destroy arrow
			Destroy(this.gameObject);
		}
		// Deal damage to enemies
		else if (collision.gameObject.layer == 10)
		{
			// Deal damage to target

			// Destroy arrow
			Destroy(this.gameObject);
		}
	}
}
