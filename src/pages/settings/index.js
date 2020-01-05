import React, {useContext, useEffect, useState} from 'react'
import {Redirect} from 'react-router-dom'

import useFetch from '../../hooks/useFetch'
import useLocalStorage from '../../hooks/useLocalStorage'
import {CurrentUserContext} from '../../contexts/currentUser'
import BackendErrorMessages from '../../components/backendErrorMessages'

const Settings = () => {
  const [currentUserState, dispatch] = useContext(CurrentUserContext)
  const apiUrl = '/user'
  const [{response, error}, doFetch] = useFetch(apiUrl)
  const [image, setImage] = useState('')
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSuccessfullLogout, setIsSuccessfullLogout] = useState(false)
  const [, setToken] = useLocalStorage('token')

  const handleSubmit = (event) => {
    event.preventDefault()

    doFetch({
      method: 'PUT',
      data: {
        user: {
          ...currentUserState.currentUser,
          image,
          username,
          bio,
          email,
          password
        }
      }
    })
  }


  const logout = event => {
    event.preventDefault()

    setToken('')
    dispatch({type: 'LOGOUT'})
    setIsSuccessfullLogout(true)
  }

  useEffect(() => {
    if (!currentUserState.currentUser) return

    setImage(currentUserState.currentUser.image)
    setUsername(currentUserState.currentUser.username)
    setBio(currentUserState.currentUser.bio)
    setEmail(currentUserState.currentUser.email)
  }, [currentUserState.currentUser])

  useEffect(() => {
    if (!response) return

    dispatch({type: 'SET_AUTHORIZED', payload: response.user})
  }, [response,dispatch])

  if (isSuccessfullLogout) {
    return <Redirect to='/'/>
  }
  
  return (
    <div className='settings-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 col-xs-12'>
            <h1 className='text-xs-center'>Settings</h1>

            {error && <BackendErrorMessages backendErrors={error.errors}/>}
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className='form-group'>
                  <input value={image || ''} onChange={e => setImage(e.target.value)} type='text'
                         className='form-control form-control-lg' placeholder="URL of profile picture"/>
                </fieldset>

                <fieldset className='form-group'>
                  <input value={username} onChange={e => setUsername(e.target.value)} type='text'
                         className='form-control form-control-lg' placeholder="Username"/>
                </fieldset>

                <fieldset className='form-group'>
                  <textarea value={bio || ''} onChange={e => setBio(e.target.value)}
                            className='form-control form-control-lg'
                            rows='8' placeholder="Short bio"/>
                </fieldset>

                <fieldset className='form-group'>
                  <input value={email} onChange={e => setEmail(e.target.value)} type='text'
                         className='form-control form-control-lg' placeholder="Email"/>
                </fieldset>

                <fieldset className='form-group'>
                  <input value={password} onChange={e => setPassword(e.target.value)} type='password'
                         className='form-control form-control-lg' placeholder="Password"/>
                </fieldset>

                <button type='submit' className='btn btn-lg btn-primary pull-xs-right'>Update Settings</button>
              </fieldset>
            </form>

            <hr/>
            <button className='btn btn-outline-danger' onClick={logout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings