const EntryForm = ({ onEntry, onNameChange, onNumberChange }) => {
    return(
        <form onSubmit={onEntry}>
        <div>
          name: <input onChange={onNameChange}/>
        </div>
        <div>
          number: <input onChange={onNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default EntryForm