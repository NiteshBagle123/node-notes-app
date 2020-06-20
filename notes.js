const fs = require('fs');
const chalk = require('chalk');

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    } catch (error) {
        return [];
    }
}

const saveNotes = notes => {
    const dataJson = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJson);
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find(note => note.title === title);

    if(!duplicateNote){
        notes.push({
            title,
            body
        });
        saveNotes(notes);
        console.log('New note added...!');
    } else {
        console.log('Note title taken');
    }
}

const removeNote = title => {
    const notes = loadNotes();
    const notesToSave = notes.filter(note => note.title !== title);
    if(notes.length > notesToSave.length){
        saveNotes(notesToSave);
        console.log(chalk.green.inverse.bold(`Note removed having title:${title}`));
    } else {
        console.log(chalk.red.inverse.bold(`no notes found for title:${title}`));
    }
}

const listNotes = () => {
    const notes = loadNotes();
    if(notes.length){
        console.log(chalk.green.inverse.bold('Your notes...!'));
        notes.map(note => console.log(`Note title:${note.title}`));
    } else {
        console.log(chalk.red.inverse.bold('No notes found to display'));
    }
}

const getNote = title => {
    const notes = loadNotes();
    if(notes.length){
        const getNote = notes.find(note => note.title === title);
        if(getNote && Object.keys(getNote)){
            console.log(chalk.green.inverse.bold(`Get note by title:${title}`));
        } else {
            console.log(chalk.red.inverse.bold(`Note not found by title:${title}`));
        }
    } else {
        console.log(chalk.red.inverse.bold('No notes found'));
    }
}

module.exports = {
    addNote,
    removeNote,
    listNotes,
    getNote
};