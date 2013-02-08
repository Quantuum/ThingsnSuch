function clickHandlerStart(e) 
{
    chrome.extension.sendMessage({directive: "startIt"}, function(response)
    {
        this.close(); // close the popup from the menu bar when the background finishes processing request
    });
}
function clickHandlerStop(e)
{
    chrome.extension.sendMessage({directive: "stopIt"}, function(response)
    {
        this.close(); // close the popup from the menu bar when the background finishes processing request
    });
}

document.addEventListener('DOMContentLoaded', function () // we're waiting for the Document Object Model to be loaded, which is the rendering of page object name and placement... i.e. the id and placement of the buttons
{
    document.getElementById('startIt').addEventListener('click', clickHandlerStart);
    document.getElementById('stopIt').addEventListener('click', clickHandlerStop);
})