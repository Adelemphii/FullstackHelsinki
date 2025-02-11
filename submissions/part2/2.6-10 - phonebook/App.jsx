import { useState } from 'react'
import EntryForm from './components/EntryForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [filter, setFilter] = useState('')

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