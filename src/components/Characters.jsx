import React, {useState, useReducer, useMemo, useRef, useCallback } from 'react';
import useCharacters from '../hooks/useCharacters';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from './Search';
/* import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Button
  } from 'reactstrap'; */

import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import '../style/favorite.css';

const initialState = {
    favorites: []
}

const API = 'https://rickandmortyapi.com/api/character';

const favoriteReducer = (state, action) => {
    console.log(...state.favorites);
    switch (action.type) {
        case "ADD_TO_FAVORITE" :
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            };
        case "REMOVE_FAVORITE":
            return {
            ...state,
            favorites: [...state.favorites.filter((items) => items.id !== action.payload)]
            };
            default:
                return state;
        }
}

function Characters(props) {
    const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
    const [search, setSearch] = useState('');
    const searchInput = useRef(null);

    const characters = useCharacters(API);

    const handleClick = (favorite) => {
        dispatch({ type: 'ADD_TO_FAVORITE', payload: favorite })
        if(favorite === favorites.favorites.id) {
            return null
        }
    }

    const handleClickRemove = (id) => {
        dispatch({ type: 'REMOVE_FAVORITE', payload: id })
    }

    /* const handleSearch = () => {
        setSearch(event.target.value) 
        setSearch(searchInput.current.value);
    } */

    const handleSearch = useCallback(() => {
        setSearch(searchInput.current.value)
    }, [])

    /* const filteredUsers = characters.filter((user) => {
        return user.name.toLowerCase().includes(search.toLowerCase());
    } ) */

    const filteredUsers = useMemo(() => 
        characters.filter((user) => {
            return user.name.toLowerCase().includes(search.toLowerCase());
        }), [characters, search]
    )
    
    return (
        <div className="Characters pb-4">
            <div className="styleFavorite">
                <Container>
                    <h3 className="textFavorite text-center"> Favorite Characters:</h3>
                    <Row className="row-cols-auto" >
                        {favorites.favorites.map(favorite => (
                            <Col key={favorite.id} >
                                <Card.Img onClick={() => handleClickRemove(favorite.id)} className="favoriteImg" variant="top" src={favorite.image} /> 
                            </Col>
                        ))}
                    </Row>
                    <p className="favoriteLine"></p>
                </Container>
            </div>

            <Search search={search} searchInput={searchInput} handleSearch={handleSearch} />

            <Container>    
                <Row>
                    { filteredUsers.map( (character) => ( 
                        <Col className="mb-4" >
                            <Card className={`${props.classCard}`} style={{ width: '15rem', display: 'flex' }}>
                                <Card.Img variant="top" src={character.image} />
                                <Card.Body>
                                    <Card.Title>{character.name}</Card.Title>
                                    <Button variant="warning">{character.gender}</Button>
                                    <Card.Text className="text-left">
                                        <ul>
                                            <li>
                                                {character.status}
                                            </li>
                                            <li>
                                                {character.species}
                                            </li>
                                            <li>
                                                {character.origin.name}
                                            </li>
                                        </ul>
                                    </Card.Text>
                                    <Button variant="success" onClick={() => handleClick(character)}>Agregar a Favoritos</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        ))
                    }    
            </Row>
          </Container>
        </div>
    );
}

export default Characters;

