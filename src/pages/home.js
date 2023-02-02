import React, { useState, useEffect, useContext } from 'react'

import SessionContext from './../context/session'
import Search from './../components/search'
import Nav from './../components/nav'
import { faunaQueries } from '../fauna/query-manager'
import { toast } from 'react-toastify'

// Components

const Home = () => {
  const sessionContext = useContext(SessionContext)
  const { user } = sessionContext.state

  const [alias, setAlias] = useState(user ? user.alias : '')
  const [name, setName] = useState(user ? user.name : '')

  const handleEditProfile = event => {
    console.log('editing profile', name, alias)
    faunaQueries
      .updateUser(name, alias)
      .then(res => {
        toast.success('Profile updated')
      })
      .catch(err => {
        console.log(err)
        toast.error('Enter the studio first')
      })
    event.preventDefault()
  }

  const handleChangeAlias = event => {
    setAlias(event.target.value)
  }

  const handleChangeName = event => {
    setName(event.target.value)
  }

  // Just for debugging to get in quickly
  useEffect(() => {
    // For debugging, autologin to get in faster for testing, add a user and pword in the .env.local
  }, [])

  return (
    <React.Fragment>
      <Nav />
      <div className="main-column">
        <div className="main-title"></div><div class="BeOpWidget" data-content="6276081ee95b5c07d4d61cc2"></div>


       
        <div class="arena-chat" data-publisher="unlimited-now" data-chatroom="unlimited-now-global" data-position="overlay"></div><script async src="https://go.arena.im/public/js/arenachatlib.js?p=unlimited-now&e=unlimited-now-global"></script> </div>
      {user ? <Search /> : null}
    </React.Fragment>
  )
}

export default Home