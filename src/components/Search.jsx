import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, FormControl } from 'react-bootstrap';

const Search = ({search, searchInput, handleSearch}) => {
    return (
        <div className="search mb-4">
            <Container>
                <FormControl ref={searchInput} type="text" value={search} onChange={handleSearch} placeholder="Buscar Personaje" />
            </Container>
        </div>
    )
}


export default Search;