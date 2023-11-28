import { useEffect, useState } from "react";
import { Search } from "./components/Search";
import { PhonebookForm } from "./components/PhonebookForm";
import { Persons } from "./components/Persons";
import axios from "axios";
import personsService from "./services/persons";
import { NotificationMessage } from "./components/Notification";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState(null);

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
      setMessage({
        type: "success",
        message: `Success updating the number of ${data.name}`,
      });
    } catch {
      setMessage({
        type: "error",
        message: `Error updating ${data.name} data!`,
      });
    }
  };

  const addNewPerson = async (person) => {
    try {
      const response = await personsService.create(person);

      setPersons([...persons, response]);
      setMessage({ type: "success", message: `Added ${newName}` });
      setNewName("");
      setNewNumber("");
    } catch {
      setMessage({ type: "error", message: "Error creating a new person!" });
    }
  };

  const deletePerson = async (id) => {
    const person = persons.find((person) => person.id === id);
    try {
      await personsService.deletePerson(id);

      getAllPersons();
      setMessage({
        type: "success",
        message: `${person.name} deleted.`,
      });
    } catch {
      setMessage({
        type: "error",
        message: `Error deleting ${person.name}. Maybe this person has already been removed.`,
      });
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
      setMessage({
        type: "error",
        message: "Error getting the list of persons",
      });
    }
  };

  useEffect(() => {
    getAllPersons();
  }, []);

  useEffect(() => {
    if (message?.message) setTimeout(() => setMessage(null), 3000);
  }, [message?.message]);

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <p>Search by name:</p>
        <Search onChangeSearch={onChangeSearch} search={search} />
      </div>
      {message && (
        <NotificationMessage
          className={message.type === "error" ? "error" : "success"}
          message={message.message}
        />
      )}

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
