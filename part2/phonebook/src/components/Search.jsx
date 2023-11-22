export const Search = ({ onChangeSearch, search }) => {
  return <input onChange={onChangeSearch} value={search} />;
};
