const addInput = document.querySelector("#addInput");
const addButton = document.querySelector("#addButton");

const ul_duties = document.querySelector("#ul_duties");
const fa_check = document.querySelector(".fa-check");
const fa_trash = document.querySelector(".fa-trash");

const showAlert_ = document.querySelector(".showAlert_");
let duties = [];
run();
function run(){
  addButton.addEventListener("click",showConsole);
  document.addEventListener("DOMContentLoaded",loadedPage)
}
function loadedPage(){
  checkDutyToStorage();
  duties.forEach(function(duty){
    showDutyUI(duty);
  })
}
function showConsole(e){
  checkInput();
  

  e.preventDefault();
  
}
function checkInput(){
  const inputValue = addInput.value.trim();
  if(inputValue == null || inputValue == ""){
    showAlert("yellow","please add a Duty");
  }
  else{
 
    showAlert("green","New Duty has been added");
    showDutyUI(inputValue);
    addDutyToStorage(inputValue);

  }

}
function addDutyToStorage(newDuties){
checkDutyToStorage();
duties.push(newDuties);
localStorage.setItem("duties",JSON.stringify(duties));
}
function checkDutyToStorage(){
  if(localStorage.getItem("duties") === null){
    duties = [];
  }
  else{
    duties = JSON.parse(localStorage.getItem("duties"));
  }
}

function showDutyUI(inputValue) {
  const li = document.createElement("li");
  li.className = "px-9 md:px-3 py-1 bg-gray-700 text-white rounded-full flex items-center justify-between text-center mb-3";

  const p = document.createElement("p");
  p.className = "px-3 py-5 text-gray-300 text-start text-wrap break-all text-sm md:text-base";
  p.textContent = inputValue;
  
  const span = document.createElement("span");
  span.className = "flex gap-2 text-xs items-center";

  const i_yes = document.createElement("i");
  i_yes.className = "fa-solid fa-check bg-gray-300 text-gray-800 text-center px-3 py-2 rounded-full shadow-md cursor-pointer hover:bg-gray-600 hover:text-white transition duration-150";
  i_yes.id = "clickYes";

  const i_trash = document.createElement("i");
  i_trash.className = "fa-solid fa-trash bg-gray-300 text-gray-800 px-2 py-2 rounded-full cursor-pointer hover:bg-gray-600 hover:text-white transition duration-150"; 
  i_trash.id = "clickTrash";

  // Insert the new li at the top of the list
  ul_duties.insertBefore(li, ul_duties.firstChild);
  li.appendChild(p);
  li.appendChild(span);
  span.appendChild(i_yes);
  span.appendChild(i_trash);
  
  addInput.value = "";

  i_trash.addEventListener("click", () => deleteDuty(li));
  i_yes.addEventListener("click",() => lineThrough(p,i_yes,li));
  
  
}
function deleteDuty(li){
  const confirmation = confirm("are you sure to delete");
  if(confirmation){
    li.remove();
  }
  removeDutiesToStorage(li);
}
function removeDutiesToStorage(li){
  checkDutyToStorage();
  duties.forEach(function(duty,index){
    if(li.textContent === duty){
      duties.splice(index,1);
    }
  });
  localStorage.setItem("duties",JSON.stringify(duties));
}
function lineThrough(p,i_yes,li){
  if(i_yes.classList.contains("fa-check")){
    p.classList.add("line-through");
    i_yes.className = "fa-solid fa-close bg-gray-300 text-gray-800 text-center px-3 py-2 rounded-full shadow-md cursor-pointer hover:bg-gray-600 hover:text-white hover:bg-gray-400 transition duration-150";
    li.classList.remove("bg-gray-700");
    li.classList.add("bg-gray-800");
    
    

  }
  else{
    p.classList.remove("line-through");
    i_yes.className = "fa-solid fa-check bg-gray-300 text-gray-800 text-center px-3 py-2 rounded-full shadow-md cursor-pointer hover:bg-gray-600 hover:text-white hover:bg-gray-500 transition duration-150";
    
    li.classList.remove("bg-gray-800");
    li.classList.add("bg-gray-700");
  }
}


function showAlert(color, message) {
  const div = document.createElement("div");
  div.className = "inline-block w-8/12 md:w-5/12 rounded mt-2 absolute";

  const p = document.createElement("p");
  p.className = "items-start text-start px-10 py-2 font-normal shadow-lg shadow-gray-700 rounded-md";
  p.textContent = message;

  // Apply colors based on the color parameter
  p.style.backgroundColor = color === "yellow" ? "#FEF08A" : "#BBF7D0"; // example colors
  p.style.color = color === "yellow" ? "#854D0E" : "#064E3B";

  div.appendChild(p);
  showAlert_.appendChild(div);

  setTimeout(() => {
    div.remove();
  }, 1500);
}



//there is no icon of i in the html code. write code into the create element of i :)
