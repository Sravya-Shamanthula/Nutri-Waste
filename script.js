import { auth, db } from "./firebase.js";
import { auth, db } from "./firebase.js"

import {
signInWithEmailAndPassword,
createUserWithEmailAndPassword,
signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
collection,
addDoc,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


// LOGIN

window.login = async function(){

let email=document.getElementById("email").value
let pass=document.getElementById("password").value

await signInWithEmailAndPassword(auth,email,pass)

window.location="dashboard.html"

}


// SIGNUP

window.signup = async function(){

let email=document.getElementById("email").value
let pass=document.getElementById("password").value

await createUserWithEmailAndPassword(auth,email,pass)

alert("Account created")

}


// LOGOUT

window.logout=function(){

signOut(auth)

window.location="index.html"

}


// ADD PRODUCT

window.addProduct = async function(){

let name=document.getElementById("name").value
let qty=document.getElementById("qty").value
let date=document.getElementById("date").value

await addDoc(collection(db,"inventory"),{

name:name,
qty:qty,
expiry:date

})

loadInventory()

}


// LOAD INVENTORY

async function loadInventory(){

let list=document.getElementById("inventory")

if(!list) return

list.innerHTML=""

let total=0
let expired=0
let soon=0
let fresh=0

const querySnapshot = await getDocs(collection(db,"inventory"))

querySnapshot.forEach((doc)=>{

let data=doc.data()

let li=document.createElement("li")

li.innerHTML=data.name+" ("+data.qty+")"

list.appendChild(li)

total++

})

document.getElementById("total").innerText=total

document.getElementById("waste").innerText=total*2+" kg"

document.getElementById("health").innerText=(100-total*5)+"%"

createChart(total)

}


// CHART

function createChart(total){

let ctx=document.getElementById("chart")

if(!ctx) return

new Chart(ctx,{
type:"bar",
data:{
labels:["Items"],
datasets:[{
data:[total]
}]
}
})

}


// MESSAGING

window.sendMsg=function(){

let msg=document.getElementById("msg").value

let div=document.createElement("div")

div.innerText=msg

document.getElementById("messages").appendChild(div)

}


window.onload=loadInventory