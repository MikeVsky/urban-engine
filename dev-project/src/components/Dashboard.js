import React, {useEffect, useState} from 'react'
import NavbarMain from './NavbarMain'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom'


export default function Dashboard() {
  document.title = "Study Valley"

  return (
    <div>
        <div>  <NavbarMain /></div>

    </div>
  )
}
