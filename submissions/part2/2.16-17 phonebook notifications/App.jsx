import { useState, useEffect } from 'react'

import phonebook from './services/PhonebookService'

import Notification from './components/Notification'
import EntryForm from './components/EntryForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationStatus, setNotificationStatus] = useState('error')

  useEffect(() => {
    phonebook.getAll().then(response => {
      setPersons(response)
    })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    
    const existingPerson = persons.find(person => person.name === newName)
    if(existingPerson) {
      const confirmation = confirm(`${newName} already exists, would you like to update their phone number?`)

      if(confirmation) {
        updateNumber(existingPerson.id, newNumber)
      }
      return
    }
    
    const newPerson = {
      name: newName,
      number: newNumber
    }

    phonebook.create(newPerson).then(response => {
      setPersons(persons.concat(response))
      setNewName('')
      setNewNumber('')
      
      sendNotification(`${newPerson.name} successfully created with number ${newPerson.number}.`, 'success')
    })
  }

  const removePerson = id => {
    phonebook.remove(id).then(response => {
      setPersons(persons.filter(p => p.id !== id))

      sendNotification(`Person of id '${id}' has been removed.`, 'success')
    })
    .catch(response => {
      sendNotification(`Information of '${id}' no longer exists.`, 'error', 5000)

      setPersons(persons.filter(p => p.id !== id))
    })
  }

  const updateNumber = (id, number) => {
    const person = persons.find(p => p.id === id)
    const changedPerson = { ...person, number}

    phonebook.update(id, changedPerson).then(response => {
      setPersons(persons.map(person => person.id !== id ? person : response))
      sendNotification(`${person.name}'s number has been updated to ${number}.`, 'success')
    })
    .catch(error => {
      sendNotification(`Information of '${person.name}' no longer exists.`, 'error', 5000)

      setPersons(persons.filter(p => p.id !== id))
    })
    
    setNewName('')
    setNewNumber('')
  }

  const sendNotification = (message, status, length = 2500) => {
    setNotificationStatus(status)
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
    }, length)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notificationMessage} status={notificationStatus}/>
      <div>
        Filter: <input onChange={handleFilterChange}/>
      </div>
      <h2>New Entry</h2>
      <EntryForm onEntry={addPerson} onNameChange={handleNameChange} onNumberChange={handleNumberChange} newNameState={newName} newNumberState={newNumber}/>
      <h2>Numbers</h2>
      <Filter persons={persons} filter={filter} onClick={removePerson}/>
    </div>
  )
}

export default App