import React, {useContext} from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import ThemeContext  from '../context/ThemeContext';

function Header(props) {

    const color = useContext(ThemeContext);

    return(
        <div className="Header">
            <h1 className="App__title" style={{color}}>Rick and Morty Characters</h1>
            <button className="btn btn-success mb-4 mt-4" type="button" onClick={props.onHandleClick}> 
            {
            props.darkMode?
            'LightMode':
            'DarkMode'
            }
          </button>
        </div>
    );
}

export default Header;