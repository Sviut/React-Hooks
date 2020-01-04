import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'

import ArticleForm from './articleForm'
import useFetch from '../hooks/useFetch'
import { CurrentUserContext } from '../contexts/currentUser'

const CreateArticle = () => {
  const apiUrl = '/articles'
  const [{ response, error }, doFetch] = useFetch(apiUrl)
  const [currentUserState] = useContext(CurrentUserContext)
  const initialValue = {
    title: '',
    description: '',
    body: '',
    tagList: []
  }

  const [isSuccessSubmit, setIsSuccessSubmit] = useState(false)
  const handleSubmit = (article) => {
    doFetch({
      method: 'POST',
      data: {
        article
      }
    })
  }

  useEffect(() => {
    if (!response) return

    setIsSuccessSubmit(true)
  }, [response])

  if (currentUserState.isLoggedIn === false) {
    return <Redirect to='/' />
  }

  if (isSuccessSubmit) {
    return <Redirect to={`/articles/${response.article.slug}`} />
  }

  return (
    <div>
      <ArticleForm
        errors={(error && error.errors) || []}
        initialValue={initialValue}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default CreateArticle