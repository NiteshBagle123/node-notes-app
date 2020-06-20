const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');

console.log(chalk.green.inverse.bold('Success!!!'));

const command = process.argv[2]

switch(command && command.toLowerCase()) {
    case 'add':
        console.log('Adding notes....!') 
        break;
    
    case 'remove':
        console.log('Deleting notes....!') 
        break;
    
    case 'update':
        console.log('Updating notes....!') 
        break;
    
    case 'get':
        console.log('Getting notes....!') 
        break;
    
    default: console.log('Please provide operation need to perform on notes....!');
}

// customization yargs version
yargs.version('1.1.0');

// create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        const { title, body } = argv;
        notes.addNote(title, body);
    }
})

// create remove command
yargs.command({
    command: 'delete',
    describe: 'Delete a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: argv => {
        const { title } = argv;
        notes.removeNote(title);
    }
})

// read remove command
yargs.command({
    command: 'get',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: argv => {
        const { title } = argv;
        notes.getNote(title);
    }
})

// list remove command
yargs.command({
    command: 'list',
    describe: 'list all notes',
    handler: () => {
       notes.listNotes();
    }
})

yargs.parse();