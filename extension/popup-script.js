// ADD A RECORD
document.addEventListener("DOMContentLoaded", function(){
    chrome.storage.sync.get((result) => {
        list = result;
        listHtml = "<div>";
        for(value in list){
            listHtml += "<div>"+value+"</div>";
        }
        listHtml += "</div>";

        document.getElementById("list").innerHTML = listHtml;
    });
});

document.getElementById('add_form').addEventListener('submit', event => {
    event.preventDefault();

    const form_data = new FormData(document.getElementById('add_form'));
    var idx = 0;
    chrome.storage.sync.get(function(result){
        idx = Object.keys(result).length;
    });
    var url = form_data.get('url');
    chrome.storage.sync.set({
        [url]:url
    });

    
});

chrome.storage.onChanged.addListener(function(){
    chrome.storage.sync.get((result) => {
        list = result;
        listHtml = "<div>";
        for(value in list){
            listHtml += "<div>"+value+"</div>";
        }
        listHtml += "</div>";

        document.getElementById("list").innerHTML = listHtml;
    });
});
