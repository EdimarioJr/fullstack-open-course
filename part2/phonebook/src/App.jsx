import { useState } from "react";
import { Search } from "./components/Search";
import { PhonebookForm } from "./components/PhonebookForm";
import { Persons } from "./components/Persons";

function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "074881239922" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  const handleAddNewPerson = (event) => {
    event.preventDefault();

    const nameAlreadyExists = persons.some((person) => person.name === newName);

    if (nameAlreadyExists) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }

    if (newName && newNumber) {
      setPersons([...persons, { name: newName, number: newNumber }]);
      setNewName("");
      setNewNumber("");
    }
  };

  const onChangeNameInput = (event) => {
    setNewName(event.target.value);
  };

  const onChangeNumberInput = (event) => {
    setNewNumber(event.target.value);
  };

  const onChangeSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toUpperCase().includes(search.toUpperCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <p>Search by name:</p>
        <Search onChangeSearch={onChangeSearch} search={search} />
      </div>

      <PhonebookForm
        handleAddNewPerson={handleAddNewPerson}
        onChangeNameInput={onChangeNameInput}
        onChangeNumberInput={onChangeNumberInput}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <div>
        <Persons persons={filteredPersons} />
      </div>
    </div>
  );
}

export default App;
