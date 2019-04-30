using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class UIPlayerStats : MonoBehaviour
{

	public PlayerStats PlayerStats;
	public Text MoneyText;
	public Text HealthText;
	public Image HealthBar;

	// Start is called before the first frame update
	void Start()
	{

	}

	// Update is called once per frame
	void Update()
	{
		MoneyText.text = "$" + PlayerStats.GetMoney();
		HealthText.text = "" + PlayerStats.GetHealth() + "/" + PlayerStats.GetMaxHealth();
		HealthBar.rectTransform.sizeDelta = new Vector2((500 * PlayerStats.GetHealth()) / PlayerStats.GetMaxHealth(), 50);
	}
}
