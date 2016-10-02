
var onTwitter;
var startTime;
var announced;

function onAlarm(alarm){
    var date = new Date();
    if(onTwitter == true && announced == false &&  date.getTime() - startTime >= 10*60*1000){
	alert("Twitter Yamero!");
	announced = true;
    }
}

chrome.browserAction.onClicked.addListener(function(tab) {
    // No tabs or host permissions needed!
    if(onTwitter){
	var date = new Date();
	alert("You are twittering for " + Math.floor((date.getTime() - startTime)/(1000)).toString() + " seconds.");
    }else{
	alert("You're not tweeting");
    }
});


function checkTwitter(activeInfo){
    chrome.tabs.query({active: true}, function(tab){
	var temp = false;
	for(var i=0; i < tab.length; i++){
	    if(tab[i].url.startsWith("https://twitter.com")){
		temp = true;
	    }
	}
    	if(onTwitter == false && temp == true){
	    var date = new Date();
    	    startTime = date.getTime();
	    announced = false;
    	}
	onTwitter = temp;
    });
}

onTwitter = false;
startTime = null;
announced = false;
chrome.alarms.create("watchdog", {periodInMinutes:0.1});
chrome.alarms.onAlarm.addListener(onAlarm);
chrome.tabs.onActivated.addListener(checkTwitter);
chrome.tabs.onHighlighted.addListener(checkTwitter);
chrome.tabs.onUpdated.addListener(checkTwitter);
chrome.tabs.onCreated.addListener(checkTwitter);
