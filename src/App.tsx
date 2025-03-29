import { useState } from 'react'
import './App.scss'
import PhoneFrame from './components/phone-frame/PhoneFrame'
import MainMenu from './components/main-menu/MainMenu'
import Router from './router/Router'
import SecondaryMenu from './components/secondary-menu/SecondaryMenu'

function App() {
  const [currentPage, setCurrentPage] = useState("home");


  return (
    <>
      <PhoneFrame>
        <Router page={currentPage} />
        <MainMenu setPage={setCurrentPage}/>
        <SecondaryMenu setPage={setCurrentPage}/>
      </PhoneFrame>
    </>
  )
}

export default App
