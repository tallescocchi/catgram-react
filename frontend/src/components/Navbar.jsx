import './Navbar.css'

import {NavLink, Link, useNavigate} from 'react-router-dom'
import {BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill} from 'react-icons/bs'

import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useDispatch, useSelector } from 'react-redux'


export const Navbar = () => {
  const { auth } = useAuth()
  const { user } = useSelector((state) => state.auth)
  return (
    <nav id="nav">
      <Link to='/'>CatGram</Link>
      <form id="search-form">
        <BsSearch />
        <input type="text" placeholder='Pesquisar'/>
      </form>
      <ul id="nav-links">
        <li>
        <NavLink to='/'><BsHouseDoorFill /></NavLink>
        </li>
        <li>
        <NavLink to='/login'>Entrar</NavLink>
        </li>
        <li>
        <NavLink to='/register'>Registrar</NavLink>
        </li>
      </ul>
    </nav>
  )
}
