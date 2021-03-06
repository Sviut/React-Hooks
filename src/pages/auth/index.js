import React, { useState, useEffect, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';

import useFetch from '../../hooks/useFetch';
import useLocalStorage from '../../hooks/useLocalStorage'
import { CurrentUserContext } from '../../contexts/currentUser'
import BackendErrorMessages from '../../components/backendErrorMessages'

const Auth = (props) => {
  const isLogin = props.match.path === '/login'
  const pageTitle = isLogin ? 'Sign In ' : 'Sign Up'
  const descriptionLink = isLogin ? '/register' : '/login'
  const descriptionText = isLogin ? 'Need an account?' : 'Have an account?'
  const apiUrl = isLogin ? '/users/login' : '/users'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [isSuccessSubmit, setIsSuccessSubmit] = useState(false)
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl)
  const [, setToken] = useLocalStorage('token')
  const [, dispatch] = useContext(CurrentUserContext)

  const handleSubmit = (event) => {
    event.preventDefault()
    const user = isLogin ? { email, password } : { email, password, username }
    doFetch({
      method: 'POST',
      data: {
        user
      }
    })
  }

  useEffect(() => {
    if (!response) {
      return
    }

    setToken(response.user.token)
    setIsSuccessSubmit(true)
    dispatch({type: 'SET_AUTHORIZED', payload: response.user})

  }, [response, setToken, dispatch])

  if (isSuccessSubmit) {
    return <Redirect to="/" />
  }

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">{pageTitle}</h1>

            <p className="text-xs-center">
              <Link to={descriptionLink}>{descriptionText}</Link>
            </p>

            <form onSubmit={handleSubmit}>
              {error && <BackendErrorMessages backendErrors={error.errors} />}
              <fieldset>
                {!isLogin && (
                  <fieldset className="form-group">
                    <input
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Username"
                    />
                  </fieldset>
                )}
                <fieldset className="form-group">
                  <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    className="form-control form-control-lg"
                    autoComplete="on"
                    placeholder="Password"
                  />
                </fieldset>

                <button
                  disabled={isLoading}
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                >
                  {pageTitle}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth