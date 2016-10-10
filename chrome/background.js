var currentURL = "";
var username = "Jacob";

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    chrome.tabs.getSelected(null, function(tab) {
        updateCurrent(tab);
    });
});

chrome.tabs.onActivated.addListener(function(e) { 
    chrome.tabs.get(e.tabId, function(tab){ 
        updateCurrent(tab);
    }); 
});

function updateCurrent(tab) {
    if (tab.url != currentURL) {
        currentURL = tab.url;

        $.post("http://social-browsing.herokuapp.com/update_current", {
            url: tab.url,
            username: username,
            date: Date.now()
        });
    }
}
