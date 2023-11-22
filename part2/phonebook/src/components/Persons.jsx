export const Persons = ({ persons }) => {
  return persons.map((person, index) => (
    <p key={person.name + index}>
      {person.name} - {person.number}
    </p>
  ));
};
