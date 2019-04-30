using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ChestOpening : MonoBehaviour
{
	private Animator animator;
	private bool opened = false;

	// Chest Interaction
	private bool inContactToPlayer = false;
	private float chestRadius = 5f;

	private int price = 100;
	private LayerMask PlayerMask;

	// Start is called before the first frame update
	void Start()
	{
		// Player is layer 9
		PlayerMask = 1 << 9;
		animator = GetComponent<Animator>();
	}

	// Update is called once per frame
	void Update()
	{
		if (!opened)
		{
			// Open if player comes into contact
			Collider[] Objects = Physics.OverlapSphere(transform.position, chestRadius, PlayerMask);
			inContactToPlayer = Objects.Length != 0;

			if (inContactToPlayer)
				if (Input.GetKeyDown(KeyCode.E))
				{
					if (Objects[0].GetComponent<PlayerStats>().GetMoney() >= price)
					{
						// Delete text
						Destroy(transform.Find("FloatingText").gameObject);

						// Show animation
						animator.SetTrigger("Activate");
						opened = true;

						// Subtract money from account
						Objects[0].GetComponent<PlayerStats>().DecreaseMoney(price);
					}
				}
		}
	}

	void SetPrice(int amount)
	{
		price = amount;
	}
}