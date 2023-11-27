export const Persons = ({ persons, onClickDelete }) => {
  return persons.map((person) => (
    <div key={person.id} className="row">
      <p>
        {person.name} - {person.number}
      </p>
      <button onClick={() => onClickDelete(person.id)}>Delete</button>
    </div>
  ));
};
