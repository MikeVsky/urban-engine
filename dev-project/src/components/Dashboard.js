import React, {useEffect, useState} from 'react'
import NavbarMain from './NavbarMain'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import TodoPage from './TodoPage'

export default function Dashboard() {
  document.title = "Study Valley"

  return (
    <div>
        <div>  <NavbarMain /></div>
        <TodoPage/>
    </div>
  )
}
