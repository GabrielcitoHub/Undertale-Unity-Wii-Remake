#pragma strict

var mainText : GUIText;
var mainSound : AudioSource;

var fullText : String = "";
var currentText : String = "";

var charDelay : float = 0.05;

private var currentIndex : int = 0;
private var timer : float = 0;

function Start () {
    mainText = gameObject.GetComponent(GUIText);
    mainSound = gameObject.GetComponent(AudioSource);
}

function setText(newText : String) {

    fullText = newText;
    currentText = "";

    currentIndex = 0;
    timer = 0;

    mainText.text = "";
}

function skipText() {

    currentText = fullText;
    currentIndex = fullText.Length;

    mainText.text = fullText;
}

function isFinished() : boolean {

    return currentIndex >= fullText.Length;
}

function Update () {

    if (currentIndex < fullText.Length) {

        timer += Time.deltaTime * 30;

        if (timer >= charDelay) {
        
        	mainSound.Play();

            currentText += fullText[currentIndex];

            mainText.text = currentText;

            currentIndex++;

            timer = 0;
        }
    }
}