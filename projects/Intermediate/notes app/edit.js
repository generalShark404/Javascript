let i = location.href.indexOf('#') +  1;
let id  = location.href.slice(i);
let notes = getNotes();
let note = notes.find(note => note.id == id);
let title = document.querySelector('#head');
let body = document.querySelector('.body');
let saveNoteBtn = document.querySelector('#saveNote');
let deleteNoteBtn = document.querySelector('#deleteNote');
 2122903849
title.value = note.title;
body.value = note.body;
console.log(note)
console.log(id )

function getNotes(){
    return JSON.parse(localStorage.getItem('notes'));
}
function saveNotes(notes){
    localStorage.setItem('notes', JSON.stringify(notes));
}
function deleteNote(id){
   notes.splice(id, 1);
}
saveNoteBtn.addEventListener('click', ()=>{
    location.assign('/')
});
deleteNoteBtn.addEventListener('click', (e)=>{
    notes.forEach((note, id) => {
        if(note.title == title.value){
            deleteNote(id);
            saveNotes(notes);
        }
     })
     location.assign('/')
});
window.addEventListener('input', ()=>{
     note.title = title.value;
     note.body = body.value;
     saveNotes(notes)
});