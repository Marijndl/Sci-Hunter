// To be injected to the active tab
function contentCopy(text) {
  navigator.clipboard.writeText(text);
}

async function copyLink(text) {
  const link = await text
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true, });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: contentCopy,
    args: [link],
  });
}

function selectCopy() {
  var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
  return text
}

async function copySelectedText(input) {
  var text = await input
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true, });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: selectCopy
  })
  .then(injectionResults => {
    text = injectionResults[0].result;
    console.log(text);
    getAPA(text);
    }
  );  
}

searchSciHub = function(DOI){
    var query = DOI.selectionText;
    chrome.tabs.create({url: "https://www.sci-hub.se/" + query});
  };

APAGenerator = function(title){
  var query = title.selectionText;
  query = query.replace(/ /g, "+");
  chrome.tabs.create({url: "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=" + query + "&btnG=#d=gs_cit&t=1715790737208&u=%2Fscholar%3Fq%3Dinfo%3AL8-BvBf-jVAJ%3Ascholar.google.com%2F%26output%3Dcite%26scirp%3D0%26hl%3Den"});
};

getAPA = function(DOI){
  var query = "";
  if (typeof DOI === "string"){
    query = DOI;
  }
  else {
    query = DOI.selectionText;
  }
  var apiUrl = "https://api.citeas.org/product/" + query + "?email=test@example.com";

  fetch(apiUrl)
  .then(response => {
    if (response.ok) {
      return response.json(); // Parse the response data as JSON
    } else {
      throw new Error('API request failed');
    }
  })
  .then(data => {
    // Process the response data here
    const APA = data.citations[0].citation;
    console.log(APA);
    copyLink(APA);
  })
  .catch(error => {
    // Handle any errors here
    console.error(error); // Example: Logging the error to the console
  });

};

chrome.contextMenus.removeAll(function() {
  chrome.contextMenus.create({
    id: "1",
    title: "Search in Sci Hub",
    contexts:["selection"]
    });

  chrome.contextMenus.create({
    id: "2",
    title: "Get citation from scholar",
    contexts:["selection"]
    });

  chrome.contextMenus.create({
    id: "3",
    title: "Copy APA citation to clipboard",
    contexts:["selection"]
    });
  
  })

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "1") {
      searchSciHub(info);
  } else if (info.menuItemId === "2") {
      APAGenerator(info);
  } else if (info.menuItemId === "3") {
      getAPA(info);
  }
});

chrome.commands.onCommand.addListener((command) => {
  console.log(`Command "${command}" called`);
  if (command === "APACopy") {
    const text = copySelectedText("");
  }
});