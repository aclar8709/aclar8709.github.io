// ****** SELECT ITEMS ******
const container = document.querySelector(".container");
const addNoteBtn = document.getElementById("addNoteBtn");

// ****** EVENT LISTENERS ******
addNoteBtn.addEventListener("click", addNote);
//load items
window.addEventListener('DOMContentLoaded', setUpNotes)
// ****** FUNCTIONS ******
function addNote (e,title="", text="")
{
    const id = new Date().getTime().toString();
    const note = document.createElement("div");
    note.classList.add("note");
    const attr = document.createAttribute("data-id");
    attr.value = id;
    note.setAttributeNode(attr);
    note.innerHTML = `
    <div class="icons">
         <button class = "save-Btn">Save</button>
         <button class = "delete-Btn">Delete</button>
    </div>
    <div class="title-div">
        <textarea class="title" 
            placeholder="Write the title ...">${title}
        </textarea>
    </div>
    <textarea class="content" 
        placeholder="Note down your thoughts ...">${text}
    </textarea>
    `;
    
    const saveBtn = note.querySelector('.save-Btn');
    const deleteBtn = note.querySelector('.delete-Btn');
    saveBtn.addEventListener("click", saveNoteToLocalStorage);
    deleteBtn.addEventListener("click", deleteNote);
    container.appendChild(note);
}
function deleteNote(e)
{
    const note = e.currentTarget.parentElement.parentElement;
    container.removeChild(note);
    deleteNoteFromLocalStorage(note.dataset.id);
}
// ****** LOCAL STORAGE ******
function saveNoteToLocalStorage(e)
{
    const note = e.currentTarget.parentElement.parentElement;
    const title = note.querySelector('.title').value;
    const content = note.querySelector('.content').value;
    const id = note.dataset.id;
    console.log(title + content);
    const noteText = {id, title, content};

    console.log(noteText);
    let notes = getLocalStorage();
    notes.push(noteText);
    console.log(notes);
    localStorage.setItem('noteList', JSON.stringify(notes));
}
function deleteNoteFromLocalStorage(id)
{
   
    let notes = getLocalStorage();
    notes = notes.filter(function(item){
       console.log(item.id == id);
        if(item.id != id)
        {
            return item;
        }
    });
    localStorage.setItem('noteList',JSON.stringify(notes));
}
function getLocalStorage()
{
    return localStorage.getItem("noteList")?JSON.parse(localStorage.getItem('noteList')): [];
}
// ****** SETUP ******
function setUpNotes()
{
    let notes = getLocalStorage();
    if(notes.length > 0)
    {
        notes.forEach(function(note){
            addNote(notes.length, note.title, note.content);
        });
    }
}