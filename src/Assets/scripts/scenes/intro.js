#pragma strict

var helpText : GUIText;
private var timer : float = 0;

function Update () {
    if (timer >= 240) {
    
    	helpText.enabled = true;
    } else {
    	timer += Time.deltaTime * 30;
    }
}