import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {

    databaseURL: "https://addlist-2abdd-default-rtdb.europe-west1.firebasedatabase.app/"

}

const app = initializeApp(appSettings)
const database = getDatabase(app)

const shoppingListInDB = ref(database, "shopList")

const shoppingListEl = document.getElementById("shopping-list")

const inputEl = document.getElementById("input-field");

const addBtn = document.getElementById("add-button");


addBtn.addEventListener("click", function () {

    let inputValue = inputEl.value

    push(shoppingListInDB, inputValue)


    clearInput()

})

onValue(shoppingListInDB, function (snapshot) {

    if (snapshot.exists()) {
        let itemsArr = Object.entries(snapshot.val())

        clearShoppingList()

        for (let i = 0; i < itemsArr.length; i++) {

            let currentEl = itemsArr[i]

            let currentElID = currentEl[0]
            let currentElValue = currentEl[1]

            appendItem(currentEl)
        }
    }
    else {
        shoppingListEl.innerHTML = "No items here... yet"
    }

})

function clearShoppingList() {
    shoppingListEl.innerHTML = ""
}



function clearInput() {
    inputEl.value = ""
}

function appendItem(item) {

    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.addEventListener("dblclick", function () {

        let locationOfItem = ref(database, `shopList/${itemID}`)

        remove(locationOfItem)

    })

    shoppingListEl.append(newEl)
}









