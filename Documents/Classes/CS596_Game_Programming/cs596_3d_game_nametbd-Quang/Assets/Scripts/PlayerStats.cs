using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerStats : MonoBehaviour
{
	int health;
	int maxhealth;
	int money = 0;

	Animator animator;

	// Start is called before the first frame update
	void Start()
	{
		animator = GetComponent<Animator>();
	}

	// Update is called once per frame
	void Update()
	{
		if (health <= 0)
			Death();
	}

	public void SetInitialHealth(int amount)
	{
		health = amount;
		maxhealth = amount;
	}

	public void IncreaseMoney(int amount)
	{
		money += amount;
	}

	public void TakeDamage(int amount)
	{
		health -= amount;
	}

	public int GetHealth()
	{
		return health;
	}

	public int GetMaxHealth()
	{
		return maxhealth;
	}

	public int GetMoney()
	{
		return money;
	}

	void Death()
	{
		// Animate death
		animator.SetTrigger("Death");

		// Disable all inputs
		GetComponent<Death>().DisableInputs();
	}
}
