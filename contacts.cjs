const fs = require('fs')
const { join } = require('path')
const { v4: uuidv4 } = require('uuid')

const contactsPath = join(__dirname, 'db/contacts.json')

console.log(contactsPath)

function listContacts() {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      handleError(err)
    }
    console.log('listContacts() => Список контактов:')
    console.table(JSON.parse(data))
  })
}

function getContactById(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      handleError(err)
    }
    JSON.parse(data).forEach(item => {
      if (item.id.toString() === contactId.toString()) {
        console.log(`getContactById(id) => Информация контакта с id=${contactId}:`)
        return console.table(item)
      }
    })
  })
}

function removeContact(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      handleError(err)
    }
    const newData = JSON.parse(data).filter(item => {
      if (item.id.toString() === contactId.toString()) {
        return console.log(`removeContact(id) => Контакт с id=${contactId} удален!`)
      }
      return item
    })
    console.table(newData)
    fs.writeFile(contactsPath, JSON.stringify(newData, null, 2), err => {
      if (err) {
        handleError(err)
      }
    })
  })
}

function addContact(name = 'NONAME', email = 'NOEMAIL', phone = 'NOPHONE') {
  const item = {
    id: uuidv4(),
    name,
    email,
    phone,
  }
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      handleError(err)
    }
    const newData = JSON.parse(data)
    newData.push(item)
    console.log(`addContact() => Контакт "${item.name}" добавлен!`)
    console.table(newData)
    fs.writeFile(contactsPath, JSON.stringify(newData, null, 2), err => {
      if (err) {
        handleError(err)
      }
    })
  })
}

const handleError = err => {
  console.error(err.message)
  process.exit(1)
}

// listContacts() // все
// getContactById('8cbb74d5-2537-42c3-8d8a-ae58c01a29a3') // контакт по id
// removeContact('8cbb74d5-2537-42c3-8d8a-ae58c01a29a3') // удаление по id
// addContact('Dmytro Shalenyi', 'shalenyi.dmytro@co.uk', '(066) 666-1313') // добавить контакт

module.exports = { listContacts, getContactById, removeContact, addContact }
