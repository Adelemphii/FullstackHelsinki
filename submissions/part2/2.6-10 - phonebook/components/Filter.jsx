import Person from "./Person"

const Filter = ({ persons, filter }) => {
    const peopleToShow = filter === '' ? persons 
      : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

    return(
        <ul>
            {peopleToShow.map(person => <Person person={person} key={person.id}/>)}
        </ul>
    )
}

export default Filter