// ****** SELECT ITEMS *****
const alert = document.querySelector('.alert');
const form = document.querySelector('.list-form');
const list = document.querySelector('.list-container');
const entry = document.getElementById("entry");
const submitBtn = document.querySelector(".submit-btn");
const clearBtn = document.querySelector('.clear-btn');
const decisionBtn = document.querySelector('.decision');


//edit option
let editElement;
let editFlag = false;
let editID = '';

//*****EVENT LISTENERS */
form.addEventListener("submit", addOption);
clearBtn.addEventListener("click",clearItems);
decisionBtn.addEventListener("click", makeChoice);
//load items
window.addEventListener('DOMContentLoaded', setUpItems);

// ***** FUNCTIONS *****
function addOption(e)
{
    e.preventDefault();
    const value = entry.value;
    const id = new Date().getTime().toString();
    console.log(value + ' ' + id);

    if(value && !editFlag)
    {
        createListItem(id, value);
        displayAlert('Option Added', 'good');
        list.classList.add('show-container');

        setBackToDefault();

        addToLocalStorage(id,value);
    }
    else if(value &&  editFlag)
    {
        element = editElement.parentElement;
        element.style.backgroundColor = "";
        editElement.innerHTML = value;
        editLocalStorage(editID, value);
        setBackToDefault();
    }
    else
    {
        displayAlert('empty value', 'bad');
    }
}

//display alert
function displayAlert(text, action)
{
    alert.textContent = text;
    alert.classList.add('alert-'+action);

    setTimeout(function()
    {
        alert.textContent='';
        alert.classList.remove('alert-'+action);
    }, 1000);
}
function clearItems()
{
    console.log(idLength);
    const items = document.querySelectorAll('.list-item');
    if(items.length > 0)
    {
        items.forEach(function(item)
        {
            list.removeChild(item);
        })
    }
    idLength = 0;
    localStorage.removeItem('list');
}
function removeListItem(e)
{
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    
    list.removeChild(element);
    if(list.children.length === 0)
    {
        list.classList.remove("show-container");
    }
    removeFromLocalStorage(id);
    //location.reload();

}
function editListItem(e)
{
    const element = e.currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.parentElement.previousElementSibling;
    element.style.backgroundColor = "hsla(240, 100%, 50%, 0.3)";
    entry.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = "Edit";
}
//set back to default
function setBackToDefault()
{
    entry.value = "";
    editFlag = false;
    editID = '';
    submitBtn.textContent = "Submit";
    for(let i = 0; i < list.children.length; i ++)
    {
        list.children[i].style.backgroundColor = "aquamarine";
    }
}
function makeChoice()
{
    setBackToDefault();
    let maxNum = list.children.length;
    let selection = Math.floor(Math.random() * maxNum);
    console.log(selection);
    let element = list.children[selection];
    element.style.backgroundColor = "hsl(315, 100.00%, 25.10%)";

}
//***** LOCAL STORAGE */
function addToLocalStorage(id, value)
{
    const choice = {id, value};
    let items = getLocalStorage();
    
    items.push(choice);
    localStorage.setItem('list', JSON.stringify(items));
}
function editLocalStorage(id, value)
{
    let items = getLocalStorage();
    items = items.map(function(item){
        if(item.id === id)
        {
            item.value = value;
        }
        return item;
    });
    localStorage.setItem('list', JSON.stringify(items));

}
function removeFromLocalStorage(id)
{
    let items = getLocalStorage();
    items = items.filter(function(item){
        if(item.id != id)
        {
            return item;
        }
    });
    localStorage.setItem('list', JSON.stringify(items));
    if(items)
    {
        console.log("items");
        list.classList.add("show-container");

    }
}
function getLocalStorage()
{
    return localStorage.getItem("list")?JSON.parse(localStorage.getItem('list')): [];
}

//***** SETUP ITEMS */
function setUpItems()
{
    let items = getLocalStorage();
    if(items.length > 0)
    {
        items.forEach(function(item){
            createListItem(item.id, item.value)
        });
    }
    list.classList.add("show-container");
}

function createListItem(id, value)
{
    const element = document.createElement('article');
        element.classList.add('list-item');
        const attr = document.createAttribute("data-id");
        attr.value = id;
        element.setAttributeNode(attr);
        element.innerHTML = '<p class = "title">'+value+'</p> <div class = "btn-container"> <button type="button" class = "edit-btn">e</button> <button type="button" class = "delete-btn">x</button> </div>'
        
        const editBtn = element.querySelector('.edit-btn');
        const deleteBtn = element.querySelector('.delete-btn');
        editBtn.addEventListener("click",editListItem);
        deleteBtn.addEventListener("click",removeListItem);

        //append child element
        list.appendChild(element);
}