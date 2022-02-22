let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab-btn")
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    renderLeads(myLeads)
}




tabBtn.addEventListener("click", function () {



    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))

        renderLeads(myLeads)
    })

})


inputBtn.addEventListener("click", function () {

    myLeads.push(inputEl.value)
    console.log(myLeads)
    inputEl.value = " "
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    console.log(localStorage.getItem("myLeads"))
    renderLeads(myLeads)
})

deleteBtn.addEventListener("click", function () {

    localStorage.clear()
    myLeads = []
    renderLeads(myLeads)

})

function renderLeads(leads) {
    let listItem = " "
    for (let i = 0; i < leads.length; i++) {
        listItem += `
    <li>
    <a target='_blank' href='${leads[i]}'>
     ${leads[i]} 
     </a>
    </li> 
     `

    }
    ulEl.innerHTML = listItem
}

