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

        chrome.tabs.captureVisibleTab(null, function(img) {
            var xhr = new XMLHttpRequest(), formData = new FormData();  
            formData.append("capture", img);
            formData.append("username", username)
            xhr.open("POST", "http://social-browsing.herokuapp.com/tab_capture", true);
            xhr.send(formData);
        });
    }
}
