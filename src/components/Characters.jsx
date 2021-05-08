import React, {useState, useEffect, useReducer} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
/* import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Button
  } from 'reactstrap'; */

import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import '../style/favorite.css';

const initialState = {
    favorites: []
}

console.log(initialState);

console.log(initialState);
const favoriteReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_FAVORITE' :
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            };
            default:
                return state;
    }
}

function Characters(props) {
    const [characters, setCharacters] =  useState([]);
    const [favorites, dispatch] = useReducer(favoriteReducer, initialState);

    const handleClick = favorite => {
        dispatch({type: 'ADD_TO_FAVORITE', payload: favorite})
    }

    useEffect(() => {
        fetch('https://rickandmortyapi.com/api/character/')
            .then(response => response.json() )
            .then(data => setCharacters(data.results))
    }, []); 
    
    return (
        <div className="Characters pb-4">
            <div className="styleFavorite">
                <Container>
                    <h3 className="textFavorite text-center"> Favorite Characters:</h3>
                    <Row className="row-cols-auto" >
                        {favorites.favorites.map(favorite => (
                            <Col key={favorite.id} >
                                <Card.Img className="favoriteImg" variant="top" src={favorite.image} />
                                {/* <Button variant="success" onClick={() => favorite.pop()}>Agregar a Favoritos</Button> */}
                            </Col>
                        ))}
                    </Row>
                    <p className="favoriteLine"></p>
                </Container>
            </div>
            <Container>    
                <Row>
                    { characters.map( (character) => ( 
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

