// JAVASCRIPT FILE

'use strict' ; 

const noteListDiv = document.querySelector('.noteList');


// Note id
let noteId = 1;
function Note (id , title , content)
{
    this.id = id;
    this.title = title;
    this.content = content;
}


// all eventlistners
function eventlistners()
{
    document.addEventListener('DOMContentLoaded', displayNotes);
    document.getElementById('addBtn').addEventListener('click', addANote);

    noteListDiv.addEventListener('click', deleteNote);
    document.getElementById('delAllBtn').addEventListener('click', deleteAllNotes);
}

// get items form storage
function getDataFromStorage(){
    return localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [];
}

// create a new note
function createNote(noteItem)
{
    const div = document.createElement("div");
    div.classList.add("noteItem");
    div.setAttribute("data-id", noteItem.id);
    div.innerHTML = `
                <h3>${noteItem.title}</h3>
                <p>${noteItem.content}</p>
                <!-- delete -->
                <button type="button" id="deleBtn" class="delBtn">
                    <span><i class="fa-solid fa-trash"></i></span>
                    REMOVE
                </button>
    `;
    noteListDiv.appendChild(div);

}
eventlistners();

// add a note in the list
function addANote()
{
    const noteTitle = document.getElementById('noteTitle');
    const noteContent = document.getElementById('noteContent');

    if(validateInput(noteTitle, noteContent))
    {
        let notes = getDataFromStorage();
        let noteItem = new Note(noteId, noteTitle.value, noteContent.value );
        noteId++;
        notes.push(noteItem);
        createNote(noteItem);
                // saving in the local storage
                localStorage.setItem('notes', JSON.stringify(notes));
        noteTitle.value = " ";
        noteContent.value = " ";
    }
}

// validateinput function
function validateInput (noteTitle , noteContent)
{
    if (noteTitle.value != "" && noteContent != "")
    {
        return true ;
    }
    else {
        if (noteTitle.value === "")noteTitle.classList.add('warning');
        if (noteContent.value === "")noteContent.classList.add('warning');
    }

    setTimeout(() =>
    {
        noteTitle.classList.remove('warning');
        noteContent.classList.remove('warning');
    }, 1500);
}

// display all the notes
function displayNotes(){
    let notes = getDataFromStorage();
    if(notes.length > 0){
        noteId = notes[notes.length - 1].id;
        noteId++;
    } else {
        noteId = 1;
    }
    notes.forEach(item => {
        createNote(item);
    });
}

// delete a note 
function deleteNote(e){
    if(e.target.classList.contains('delBtn')){
        e.target.parentElement.remove(); // removing from DOM
        let divID = e.target.parentElement.dataset.id;
        let notes = getDataFromStorage();
        let newNotesList = notes.filter(item => {
            return item.id !== parseInt(divID);
        });
        localStorage.setItem('notes', JSON.stringify(newNotesList));
    }
}

// delete all notes
function deleteAllNotes(){
    localStorage.removeItem('notes');
    let noteList = document.querySelectorAll('.noteItem');
    if(noteList.length > 0){
        noteList.forEach(item => {
            noteListDiv.removeChild(item);
        });
    }
    noteId = 1; // resetting noteID to 1
}


