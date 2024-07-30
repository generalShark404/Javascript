const notes = [];
const notesContainer = document.querySelector('.notes');
const filterNotesInput = document.getElementById('filterNotes');
const sortNotesSelect = document.getElementById('sortNotes');
const noteDetail = document.querySelector('.noteDetail');
const noteTitleInput = document.getElementById('head');
const noteBodyInput = document.querySelector('.body');
const saveNoteButton = document.getElementById('saveNote');
const deleteNoteButton = document.getElementById('deleteNote');
const openNoteButton = document.querySelector('.openNote');
const errorDiv = document.querySelector('.error');
let editingNoteIndex = null;

function renderNotes() {
  notesContainer.innerHTML = '';
  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(filterNotesInput.value.toLowerCase())
  );

  filteredNotes.sort((a, b) => {
    switch (sortNotesSelect.value) {
      case 'byLastEdited':
        return new Date(b.lastEdited) - new Date(a.lastEdited);
      case 'byRecentlyCreated':
        return new Date(b.created) - new Date(a.created);
      case 'alphabetically':
        return a.title.localeCompare(b.title);
    }
  });

  filteredNotes.forEach((note, index) => {
    const noteElement = document.createElement('div');
    noteElement.className = 'note';
    noteElement.innerHTML = `
      <h2>${note.title}</h2>
      <p>${note.body}</p>
      <div class="lastEdited">Last edited: ${new Date(note.lastEdited).toLocaleString()}</div>
    `;
    noteElement.addEventListener('click', () => openNoteDetail(index));
    notesContainer.appendChild(noteElement);
  });
}

function openNoteDetail(index) {
  editingNoteIndex = index;
  const note = notes[index];
  noteTitleInput.value = note.title;
  noteBodyInput.value = note.body;
  noteDetail.style.display = 'block';
}

function closeNoteDetail() {
  noteDetail.style.display = 'none';
  noteTitleInput.value = '';
  noteBodyInput.value = '';
  editingNoteIndex = null;
  errorDiv.style.display = 'none';
}

function saveNote() {
  if (noteTitleInput.value.trim() === '' || noteBodyInput.value.trim() === '') {
    errorDiv.styleerrorDiv.style.display = 'block';
    return;
  }

  if (editingNoteIndex !== null) {
    notes[editingNoteIndex].title = noteTitleInput.value;
    notes[editingNoteIndex].body = noteBodyInput.value;
    notes[editingNoteIndex].lastEdited = new Date();
  } else {
    notes.push({
      title: noteTitleInput.value,
      body: noteBodyInput.value,
      created: new Date(),
      lastEdited: new Date(),
    });
  }

  renderNotes();
  closeNoteDetail();
}

function deleteNote() {
  if (editingNoteIndex !== null) {
    notes.splice(editingNoteIndex, 1);
    renderNotes();
    closeNoteDetail();
  }
}

// Event Listeners
saveNoteButton.addEventListener('click', saveNote);
deleteNoteButton.addEventListener('click', deleteNote);
openNoteButton.addEventListener('click', () => {
  editingNoteIndex = null;
  noteTitleInput.value = '';
  noteBodyInput.value = '';
  noteDetail.style.display = 'block';
});
document.querySelector('.fa-close').addEventListener('click', closeNoteDetail);
filterNotesInput.addEventListener('input', renderNotes);
sortNotesSelect.addEventListener('change', renderNotes);

// Initial rendering
renderNotes();