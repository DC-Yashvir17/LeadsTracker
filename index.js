let myLeads = []
const inputEl = document.getElementById("input-el")

const inputBtn = document.getElementById("input-btn")

const ulEl = document.getElementById("ul-el")

let deleteBtn = document.getElementById("delete-btn")

let tabBtn = document.getElementById("tab-btn")

let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    renderLeads(myLeads)
}

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    renderLeads(myLeads)

})

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        renderLeads(myLeads)
    })
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    renderLeads(myLeads)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
})

function renderLeads(leads){
    let listItems = ""
    for(let i=0; i<leads.length; i++){
        listItems += `
        <li>
            <a href='#' target='blank'>
            ${leads[i]} 
            </a>
        </li>`
    }
    ulEl.innerHTML = listItems
}
