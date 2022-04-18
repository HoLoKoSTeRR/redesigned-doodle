import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../context/auth-context'
import './NavLinks.css';
import { useHistory } from 'react-router-dom';
const NavLinks = props => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  function onLgout() {
    console.log(history)
    auth.logout()
    history.push('/auth')

  }
  return <ul className="nav-links">
    <li>
      <NavLink to="/" exact>Домой</NavLink>
    </li>
    {auth.isLoggedIn && (<> <li>
      <NavLink to="/profile">Профиль</NavLink>
    </li>
      <li>
        <NavLink to="/mypost">Мои посты</NavLink>
      </li>
      <li>
        <NavLink to="/create">Создать пост</NavLink>
      </li></>
    )}



    {/* <li>
      <NavLink to="/auth">AUTHENTICATE</NavLink>
    </li> */}

    {!auth.isLoggedIn && (
      <li>
        <NavLink to="/auth">Войти</NavLink>
      </li>
    )}

    {auth.isLoggedIn && (
      <li>
        <button onClick={onLgout}>Выйти</button>
      </li>
    )}
  </ul>
};

export default NavLinks;