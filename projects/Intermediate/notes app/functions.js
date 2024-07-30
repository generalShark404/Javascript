'use strict';

let getSavedNotes = ()=>{
  const noteJson = localStorage.getItem('notes');
  try{
    return noteJson ? JSON.parse(noteJson) : [];
  }catch(err){
     return [];
  }
}
let saveNotes = (notes)=>{
    localStorage.setItem('notes', JSON.stringify(notes));
}
let removeNote = (id)=>{
  let index = notes.findIndex(note => note.id == id);
  if(index > -1){
     notes.splice(index, 1)
  };
  // saveNotes(notes);
}

let generateDom = (note)=>{
  let noteEle = document.createElement('a');
  let text = document.createElement('h2');
  let status = document.createElement('i');
  let noNotes = document.createElement('h1');

  if(note.length > 0){
     text.textContent = note.title;
  }else{
     noNotes.textContent = 'Unnamed notes'
  }
  text.classList.add('noteHomeTitle');
  noteEle.appendChild(textEle);

  noteEle.setAttribute(`href', './edit.html#${note.id}`);
  noteEle.classList.add('note');
  
  // status.textContent = generateLastEdited(note.updatedAt);
  return noteEle;
}

let sortNotes = (notes, sortBy) =>{
   if(sortBy == 'byEdited'){
     return notes.sort((a, b)=>{
       if(a.updatedAt > b.updatedAt){
         return -1;
       }else if(a.updatedAt < b.updatedAt){
         return 1;
       }else{
         return 0;
       }
     })
   }else if(sortBy == 'byCreated'){
      return notes.sort((a, b)=>{
        if(a.createdAt > b.createdAt){
           return -1;
        }else if(a.createdAt < b.createdAt){
          return 1;
        }else{
          return 0;
        }
      })
   }else if(sortBy == 'alphabeticalyy'){
      return notes.sort((a, b)=>{
        if(a.title.toLowerCase() < b.title.toLowerCase()){
           return -1;
        }else if(a.title.toLowerCase() > b.title.toLowerCase()){
          return 1;
        }else{
          return 0;
        }
      })
   }else{
    return notes;
   }
}

let renderNotes = (notes, filters) => {
  let notesEl = document.querySelector('.notes');
  notes = sortNotes(notes, filters.sortBy);
  const filteredNotes = notes.filter((note)=>{
    const title = note.title.toLowerCase();
    const filter = filters.searchText.toLowerCase();
    return title.includes(filter);
  })

  notesEl.innerHTML = '';

  if(filteredNotes.length > 0){
       filteredNotes.forEach((note) =>{
        const p = generateDom(note);
        notesEl.appendChild(p);
       })
  }else{
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'No notes to show';
    notesEl.appendChild(emptyMessage);
  }
}

let arr = [
  {
    name:'duck',
    food:'wheat'
  }
]
// let generateLastEdited = (timestamp) => `Last edited ${moment(timestamp).fromNow()}`
// console.log(generateLastEdited())