const EntryForm = ({ onEntry, onNameChange, onNumberChange, newNameState, newNumberState }) => {
    return(
        <form onSubmit={onEntry}>
        <div>
          name: <input value={newNameState} onChange={onNameChange}/>
        </div>
        <div>
          number: <input value={newNumberState} onChange={onNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default EntryForm