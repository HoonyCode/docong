chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab)=>{
    if(changeInfo.status === 'complete'){
        chrome.storage.sync.get((result) => {
            for(value in result){
                if(tab.url.includes(value)){
                    toggleMuteState(tabId, tab);
                    break;
                }
            }
        });
    }
});

function toggleMuteState(tabId, tab) {
    chrome.scripting.executeScript({
        target: {tabId: tabId},
        func: blockURLWarning
    });
}

function blockURLWarning(){
    var warningDiv = document.createElement("div");
    warningDiv.style.position = "fixed";
    warningDiv.style.background = "rgba(0,0,0,0.95)";
    warningDiv.style.width = "100vw";
    warningDiv.style.height = "100vh";
    warningDiv.style.zIndex = "2147483000";
    warningDiv.style.color = "white";
    warningDiv.style.fontSize = "3vw";
    warningDiv.style.padding = "15vw 0";
    warningDiv.style.textAlign = "center";

    var logoImg = document.createElement("img");
    logoImg.src = chrome.runtime.getURL("img/logo.png");
    logoImg.style.width = "20vw";
    
    var warningText = document.createElement("div");
    warningText.innerHTML = "접근금지! 집중합시다!";
    
    warningDiv.appendChild(logoImg);
    warningDiv.appendChild(warningText);
    document.body.appendChild(warningDiv);
}