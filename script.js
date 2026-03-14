function addTask(){

let input = document.getElementById("task")
let text = input.value

if(text == "") return

let li = document.createElement("li")
li.innerText = text

let list = document.getElementById("list")
list.appendChild(li)

input.value = ""

}
