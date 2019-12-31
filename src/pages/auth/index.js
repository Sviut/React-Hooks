import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'

const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('data ', email, password);
    setIsSubmitting(true)
  }

  useEffect(() => {
    if (!isSubmitting) {
      return
    }
    axios('https://conduit.productionready.io/api/users/login', {
      method: 'POST',
      data: {
        user: {
          email: 'adds',
          password: 'dsdds'
        }
      }
    })
      .then((res) => {
        console.log('success', res);
      })
      .catch((err) => {
        console.log('error', err);
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  })

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Login</h1>

            <p className="text-xs-center">
              <Link to="register">Need an account?</Link>
            </p>

            <form onSubmit={handleSubmit}>
              <fieldset>
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
                    placeholder="Password"
                  />
                </fieldset>

                <button 
                  disabled={isSubmitting} 
                  className="btn btn-lg btn-primary pull-xs-right" 
                  type="submit"
                >
                  Sign in
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