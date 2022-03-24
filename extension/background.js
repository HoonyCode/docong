
let docongTabId = "";
let now = 0;
let iconRed = false;
let timer = false;
chrome.alarms.create({ when:Date.now(), periodInMinutes: 1/60});
chrome.alarms.onAlarm.addListener(() => {
    chrome.storage.local.get(['docongTab'],(result)=>{
        chrome.tabs.get(result.docongTab, (tab)=>{
            if(tab.url.includes("j6s003.p.ssafy.io")){
                chrome.scripting.executeScript({
                    target: {tabId: result.docongTab},
                    func: ()=>{return localStorage["persist:root"];}
                }, (result)=>{
                    timerStatus = JSON.parse(JSON.parse(result[0].result).user).userTimer;
                    if(timerStatus.status == "play"){
                        timer = true;
                        playTimer(timerStatus);
                    } else {
                        timer = false;
                        chrome.action.setIcon({
                            path:"img/icon16.png"
                        });
                    }
                });
            }
        })
    })
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab)=>{
    if(changeInfo.status === 'complete'){
        chrome.storage.sync.get((result) => {
            for(value in result){
                if(tab.url.includes(value) && timer){
                    toggleMuteState(tabId, tab);
                    break;
                }
            }
        });
        if(tab.url.includes("j6s003.p.ssafy.io")){
           chrome.storage.local.set({docongTab:tabId});
        }
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


function playTimer(timerStatus){
    var time = Math.floor(timerStatus.time / 60)+1;
    chrome.action.setIcon({
        path:"img/min16/"+time+".png"
    });
}