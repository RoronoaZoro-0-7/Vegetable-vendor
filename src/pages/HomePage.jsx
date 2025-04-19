import React from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const [navigate] = useNavigate();
  navigate('/register');
  return (
    <></>  
  )
}

export default HomePage