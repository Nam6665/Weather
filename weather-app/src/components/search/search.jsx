import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { loadCityOptions } from "../Services/api.js";
import "./Search.css";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState("");

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  const loadOptions = (inputValue) => {
    return loadCityOptions(inputValue);
  };

  return (
    <div className='search-container'>
      <i className='search-icon fas fa-search'></i>
      <AsyncPaginate
        className='search-input'
        placeholder='Search for city'
        debounceTimeout={500}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
      />
    </div>
  );
};

export default Search;
