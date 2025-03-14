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
   
    const note = document.createElement("div");
    note.classList.add("note");
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
    deleteNoteFromLocalStorage(note);
}
// ****** LOCAL STORAGE ******
function saveNoteToLocalStorage(e)
{
    const note = e.currentTarget.parentElement.parentElement;
    const title = note.querySelector(".title").value;
    const content = note.querySelector(".content").value;

    const noteText = {title,content};
    let notes = getLocalStorage();
    notes.push(noteText);
    localStorage.setItem('notes', JSON.stringify(notes));
}
function deleteNoteFromLocalStorage(note)
{
    const title = note.querySelector(".title").value;
    const content = note.querySelector(".content").value;

    let notes = getLocalStorage();
    notes = notes.filter(function(note){
        if(note.content != content)
        {
            return note;
        }
    });
    localStorage.setItem('notes',JSON.stringify(notes));
}
function getLocalStorage()
{
    return localStorage.getItem("notes")?JSON.parse(localStorage.getItem('notes')): [];
}
// ****** SETUP ******
function setUpNotes()
{
    let notes = getLocalStorage();
    if(notes.length > 0)
    {
        notes.forEach(function(note){
            addNote(note.title, note.content);
        });
    }
}