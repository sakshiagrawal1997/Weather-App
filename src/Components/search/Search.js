import React, { useState } from 'react';
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from '../../api'

function Search({onSearchChange}) {

    const [search, setSearch] = useState(null);

    
    const loadOptions = (inputValue) => {
        return fetch(`${GEO_API_URL}/cities?namePrefix=${inputValue || "@"}`, {...geoApiOptions, namePrefix: inputValue })
        .then(response => response.json())
        .then(response => {
            console.log(response.data);
            return{
                
                options: response.data.map((city) => {
                    
                    return{
                        value: `${city.latitude} ${city.longitude}` ,
                        label: `${city.name}, ${city.countryCode}`,
                    };
                }),
            };
        })
        .catch(err => console.error(err));
    }

    const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
}
  return (
    <AsyncPaginate
    placeholder="search for city"
    debounceTimeout={600}
    value={search}
    onChange={handleOnChange}
    loadOptions={loadOptions}
    />
  )
}

export default Search