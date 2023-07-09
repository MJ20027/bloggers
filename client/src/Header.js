import {Link} from "react-router-dom";
import {useContext, useEffect} from "react";
import {UserContext} from "./UserContext";

export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('https://bloggerzzz.onrender.com/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('https://bloggerzzz.onrender.com/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header className="navi">
      <Link to="/" className="logo"><img  className="logo" src="https://cdn.dribbble.com/users/3512994/screenshots/6459452/bloggersunited_4x.jpg"/></Link>
      
      
      <nav >
        {username && (
          <>
            <Link className="heading" to="/create">CREATE NEW POST</Link>
            <a className="heading" href="/" onClick={logout}> LOGOUT&nbsp;&nbsp;&nbsp;&nbsp; UserID&nbsp;:&nbsp;{username}</a>
          </>
        )}
        {!username && (
          <>
            <Link className="heading" to="/login">LOGIN</Link>
            <Link className="heading" to="/register">REGISTER</Link>
          </>
        )}
      </nav>
    </header>
  );
}
