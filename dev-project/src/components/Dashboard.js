import React, {useState} from 'react'
import NavbarMain from './NavbarMain'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

export default function Dashboard() {
   

  return (
    <div>
        <div>  <NavbarMain /></div>
               
    </div>
  )
}
