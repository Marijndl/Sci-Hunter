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

APAGenerator = function(title){
  var query = title.selectionText;
  query = query.replace(/ /g, "+");
  chrome.tabs.create({url: "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=" + query + "&btnG=#d=gs_cit&t=1715790737208&u=%2Fscholar%3Fq%3Dinfo%3AL8-BvBf-jVAJ%3Ascholar.google.com%2F%26output%3Dcite%26scirp%3D0%26hl%3Den"});
};

chrome.contextMenus.removeAll(function() {
chrome.contextMenus.create({
  id: "2",
  title: "Get citation from scholar",
  contexts:["selection"]
  }); })

chrome.contextMenus.onClicked.addListener(APAGenerator);