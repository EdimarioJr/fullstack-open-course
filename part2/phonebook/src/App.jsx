import { useEffect, useState } from "react";
import { Search } from "./components/Search";
import { PhonebookForm } from "./components/PhonebookForm";
import { Persons } from "./components/Persons";
import axios from "axios";
import personsService from "./services/persons";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  const handleAddNewPerson = (event) => {
    event.preventDefault();

    const nameAlreadyExists = persons.some((person) => person.name === newName);

    if (nameAlreadyExists) {
      const confirm = window.confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one?`
      );
      if (confirm)
        updatePerson({ name: newName.trim(), number: newNumber.trim() });
      return;
    }

    if (newName && newNumber) {
      addNewPerson({ name: newName.trim(), number: newNumber.trim() });
    }
  };

  const handleClickDelete = (id) => {
    const person = persons.find((person) => person.id === id);
    const confirm = window.confirm(`Do you want to delete ${person.name}?`);
    if (confirm) deletePerson(id);
  };

  const updatePerson = async (data) => {
    try {
      const person = persons.find(
        (person) =>
          person.name.trim().toLowerCase() === data.name.trim().toLowerCase()
      );
      await personsService.update(person.id, data);

      getAllPersons();
    } catch {
      alert(`Error updating ${data.name}!`);
    }
  };

  const addNewPerson = async (person) => {
    try {
      const response = await personsService.create(person);

      setPersons([...persons, response]);
      setNewName("");
      setNewNumber("");
    } catch {
      alert("Error adding a new person!");
    }
  };

  const deletePerson = async (id) => {
    try {
      await personsService.deletePerson(id);

      getAllPersons();
    } catch {
      alert(`Error updating deleting the person!`);
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

  const getAllPersons = async () => {
    try {
      const response = await axios.get("http://localhost:3001/persons");
      const data = response.data;
      setPersons(data);
    } catch {
      alert("Error getting the list of persons!");
    }
  };

  useEffect(() => {
    getAllPersons();
  }, []);

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
        <Persons persons={filteredPersons} onClickDelete={handleClickDelete} />
      </div>
    </div>
  );
}

export default App;
