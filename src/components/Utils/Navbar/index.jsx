import React from 'react'
import { Container, Navbar as Nav } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../../../assets/img/footer-logo.png"
import { signOut } from 'firebase/auth'
import { auth } from '../../auth/Firebase'

const Navbar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            localStorage.clear();
            navigate("/", {replace: true});
            // console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened.
        });
    }

  return (
    <Nav className="bg-body-tertiary">
        <Container>
          <Nav.Brand>
            <img
              alt=""
              src={logo}
              width="50"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            &nbsp; Receipt App
          </Nav.Brand>
          <div><Link to={"/"} onClick={() => { handleLogout();}} className='text-decoration-none text-black'>Logout</Link></div>
        </Container>
      </Nav>
  )
}

export default Navbar;