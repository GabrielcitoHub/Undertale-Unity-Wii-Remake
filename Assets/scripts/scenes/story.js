#pragma strict

var currentAlpha = 0;
var fadeSpeed = 2.5;
var activeIndex = 0;
var audioSource : AudioSource; 
var duration : float; 
var mainText : DialogueText;
var timeline = Array();

class TimelineEntry {
    var time : float;
    var text : String;
    var image : String;
}

var basePath = "sprites/story/";
function NewTimelineEntry(time : float, text : String, image : String) : TimelineEntry {
    var entry = new TimelineEntry();

    entry.time = time;
    entry.text = text;
    entry.image = image;

    return entry;
}

function Start () {  
	timeline = Array(
	    NewTimelineEntry( 0, "  Once upon a time,\n  humans and monsters lived\n  peacefully.", "introimage_0"),
	    NewTimelineEntry( 6, "  But then war", "introimage_1"),
	    NewTimelineEntry( 13, "  Humans were victorious", "introimage_2"),
	    NewTimelineEntry( 18, "  And they casted a spell that\n  would take 7 human souls to\n  dispell", "introimage_3"),
	    NewTimelineEntry( 22, "  Forever dooming the monsters\n  in the underground", "introimage_4"),
	    NewTimelineEntry( 26, "  Mettaton Ebott\n  20XX", "introimage_5" ),
        NewTimelineEntry( 33, "  Legends say that those who\n  climb the mountain", "introimage_5" ),
        NewTimelineEntry( 40, "  ... never return", "introimage_6" ),
        NewTimelineEntry( 47, "",  "introimage_7" ),
        NewTimelineEntry( 54, "", "introimage_8" ),
        NewTimelineEntry( 59, "", "introimage_9" ),
        NewTimelineEntry( 66, "", "introimage_10" )
	); 
	
	audioSource = gameObject.GetComponent(AudioSource);    
	duration = audioSource.clip.length;
	mainText = gameObject.Find("GUI Text").GetComponent(DialogueText);
	
	var entry : TimelineEntry = timeline[activeIndex] as TimelineEntry;
	audioSource.time = entry.time; 
	mainText.setText(entry.text);
}

function Update () {
	if (audioSource != null) { 
		var t = audioSource.time;  
		var nextID = activeIndex + 1;
		if (nextID < timeline.length) {
			var nextEntry : TimelineEntry = timeline[nextID] as TimelineEntry;
	        if (nextEntry && t >= nextEntry.time) {
	        	var path = basePath + nextEntry.image;
	        	guiTexture.texture = Resources.Load(path);
	        	mainText.setText(nextEntry.text);
	            activeIndex = activeIndex + 1;
	        } 
        }
        
		if (t >= duration) {
		    Application.LoadLevel("intro");
		}
	}
	
	if (Input.GetButton("A") || Input.GetButton("2")) {
		Application.LoadLevel("intro");
	}
}