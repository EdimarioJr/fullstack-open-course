export const PhonebookForm = ({
  handleAddNewPerson,
  onChangeNameInput,
  onChangeNumberInput,
  newName,
  newNumber,
}) => {
  return (
    <form onSubmit={handleAddNewPerson}>
      <div>
        name: <input onChange={onChangeNameInput} value={newName} />
      </div>
      <div>
        number:{" "}
        <input type="tel" onChange={onChangeNumberInput} value={newNumber} />
      </div>
      <div>
        <button type="submit" disabled={!newName || !newNumber}>
          add
        </button>
      </div>
    </form>
  );
};
