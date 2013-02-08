var inter; //global declaration of a variable to later be used to house the Interval object. 
chrome.extension.onMessage.addListener( //adding a global message listener so we can recieve that message from popup.js
    function(request, sender, sendResponse)
    {
        switch(request.directive)
        {
            case "startIt": //in the case that the message directive has been set to the string "startIt"

				function startThis()
				{
					ytplay = document.getElementById("movie_player"); //grabbing the specifics and controllability (not a word) of the video player, which for youtube has a div/CSS id of "movie_player" 
					inter = setInterval(function(){mainBody()}, 250); //remember that global variable? We're setting that here, calling the function below to be called every 250ms
					function mainBody() //just the function of what happens
					{
					    if(ytplay.getPlayerState() == 0)
					    {
					        ytplay.seekTo(0, true);
					        ytplay.pauseVideo(); //because of an API bug... the video has to be paused then played... not a huge problem though, considering this happens almost instantaneously. 
					        ytplay.playVideo();
					    }
					}
				}
                alert("The looper has: Started"); //optional alert telling the people that the looper is starting
                chrome.tabs.executeScript(null,
                {
					code: "(" + startThis.toString() + ")()", //a complicated way of telling it to call the above function startThis() in the context of the webpage as opposed to a separate file. In other words: exposing it to the page objects.
                	allFrames: true //the page is divided into frames... I'm not sure which one has the movie player in it... so I'll send it to all. 
                });
                sendResponse({}); //sending a blank ping response back to the Chrome Extension API to tell it that the message was recieved... in popup.js, the function there is expecting it... in order to run this.close() one must be sent. 
                break;

            case "stopIt": //in the case that it has been set to "stopIt"

                
				function stopThis()
				{
					window.clearInterval(inter); //here we're clearing that inter variable, thus stopping the interval call, which will stop the calling of mainBody() every 250ms.
				}
                chrome.tabs.executeScript(null,
                {
                	code: "(" + stopThis.toString() + ")()", //same stuff as above
                	allFrames: true
                });
                sendResponse({}); //same magical thing as above. 
				alert("The looper has: Stopped"); //optional alert telling the people that the looper is stopping
                break;

            default:
                alert("Something seems to have broken... Contact Jay R."); //here is just a default option if none of the other conditions are satisfied... doubt this will happen... but you never know. 
        }
    }
);