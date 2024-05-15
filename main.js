searchSciHub = function(DOI){
    var query = DOI.selectionText;
    chrome.tabs.create({url: "https://www.sci-hub.se/" + query});
  };
  
  chrome.contextMenus.create({
    title: "Search in Sci Hub",
    contexts:["selection"],
    onclick: searchSciHub
  });