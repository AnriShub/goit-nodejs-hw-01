const contacts = require('./contacts');
const { program } = require("commander");

program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case "list":
            const allContscts = await contacts.listContacts();
            return console.log(allContscts);

        case "get":
            const getContact = await contacts.getContactById(id);
            return console.log(getContact);

        case "add":
            const addContact = await contacts.addContact({ name, email, phone });
            return console.log(addContact);

        case "remove":
            const removeContact = await contacts.removeContact(id);
            return console.log(removeContact);
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(argv);