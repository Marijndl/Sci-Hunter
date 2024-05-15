searchSciHub = function(DOI){
    var query = DOI.selectionText;
    chrome.tabs.create({url: "https://www.sci-hub.se/" + query});
  };

  
chrome.contextMenus.removeAll(function() {
  chrome.contextMenus.create({
    id: "1",
    title: "Search in Sci Hub",
    contexts:["selection"]
    }); })

chrome.contextMenus.onClicked.addListener(searchSciHub);