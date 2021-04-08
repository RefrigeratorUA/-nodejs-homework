import commander from 'commander'
import { listContacts, getContactById, removeContact, addContact } from './contacts.cjs'

const { program } = commander

program
  .storeOptionsAsProperties(false) // Без этого ругается на 'action' и 'name'
  .option('-a, --action <type>', 'choose action', 'list')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone')

program.parse(process.argv)

const argv = program.opts()

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      listContacts()
      break

    case 'get':
      getContactById(id)
      break

    case 'add':
      addContact(name, email, phone)
      break

    case 'remove':
      removeContact(id)
      break

    default:
      console.warn('\x1B[31m Unknown action type!')
  }
}

invokeAction(argv)

// # Получаем и выводим весь список контактов в виде таблицы (console.table)
// node index.js --action="list"

// # Получаем контакт по id
// node index.js --action="get" --id=5

// # Добавялем контакт
// node index.js --action="add" --name="Mango" --email="mango@gmail.com" --phone="322-22-22"

// # Удаляем контакт
// node index.js --action="remove" --id=3
