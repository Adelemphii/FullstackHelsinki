import { useState, useEffect } from 'react'

import axios from 'axios'
import phonebook from './services/PhonebookService'

import EntryForm from './components/EntryForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [filter, setFilter] = useState('')

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
    })
  }

  const removePerson = id => {
    phonebook.remove(id).then(response => {
      setPersons(persons.filter(p => p.id !== id))
      alert(`Person of id ${id} has been removed from the phonebook!`)
    })
  }

  const updateNumber = (id, number) => {
    const person = persons.find(p => p.id === id)
    const changedPerson = { ...person, number}

    phonebook.update(id, changedPerson).then(response => {
      setPersons(persons.map(person => person.id !== id ? person : response))
    })
    .catch(error => {
      alert(`The person '${person.name}' no longer exists on the server!`)
      setPersons(persons.filter(p => p.id !== id))
    })
    
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter: <input onChange={handleFilterChange}/>
      </div>
      <h1>New Entry</h1>
      <EntryForm onEntry={addPerson} onNameChange={handleNameChange} onNumberChange={handleNumberChange} newNameState={newName} newNumberState={newNumber}/>
      <h2>Numbers</h2>
      <Filter persons={persons} filter={filter} onClick={removePerson}/>
    </div>
  )
}

export default App