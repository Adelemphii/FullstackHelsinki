import { useState, useEffect } from 'react'
import axios from 'axios'

import EntryForm from './components/EntryForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios.get('http://localhost:3001/persons').then(response => {
      console.log(response.data)
      setPersons(response.data)
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
    
    if(persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to the phonebook!`)
      return
    }
    
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    
    setPersons(persons.concat(newPerson))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter: <input onChange={handleFilterChange}/>
      </div>
      <h1>New Entry</h1>
      <EntryForm onEntry={addPerson} onNameChange={handleNameChange} onNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Filter persons={persons} filter={filter}/>
    </div>
  )
}

export default App