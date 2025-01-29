const Person = ({ person, id, onClick }) => {
    return(
      <li key={id}>
        {person.name} - {person.number} <button onClick={() => onClick(id)}>Remove</button>
      </li>
    )
}

export default Person