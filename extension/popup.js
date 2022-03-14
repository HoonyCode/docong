// Dom Load
$(document).ready(()=>{makeList();})

// Add URL Data
$(document).on('submit', '#add_form', (e)=>{
    e.preventDefault();
    const form_data = new FormData(document.getElementById('add_form'));
    var url = form_data.get('url');
    chrome.storage.sync.set({
        [url]:url
    });
    makeList();
})

// Clear Storage
$(document).on('click', '#deleteAll', (e)=>{
    chrome.storage.sync.clear();
    makeList();
})

// Delete List
$(document).on('click', '.listItem', (e)=>{
    chrome.storage.sync.remove($(e.target).val());
    makeList();
})

const makeList = () => {
    chrome.storage.sync.get((result) => {
        listHtml = "";
        for(value in result){
            listHtml += "<tr>";
            listHtml += "<td>"+value+"</td>";
            listHtml += "<td><button class='listItem' value="+value+">X</button></td>";
            listHtml += "</tr>";
        }
        $("#list").html(listHtml);
    });
}