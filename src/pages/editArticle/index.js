import React, { useEffect, useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { CurrentUserContext } from '../../contexts/currentUser'

import ArticleForm from '../../components/articleForm'
import useFetch from '../../hooks/useFetch'

const EditArticle = ({ match }) => {
  const slug = match.params.slug
  const [currentUserState] = useContext(CurrentUserContext)
  const apiUrl = `/articles/${slug}`
  const [{ response: fetchArticleResponse }, doFetchArticle] = useFetch(apiUrl)
  const [{ response: updateArticleResponse, error: updateArticleError }, doUpdateArticle] = useFetch(apiUrl)
  const [initialValues, setInitialValues] = useState(null)
  const [isSuccessSubmit, setIsSuccessSubmit] = useState(false)

  const handleSubmit = (article) => {
    doUpdateArticle({
      method: 'PUT',
      data: {
        article
      }
    })
  }

  useEffect(() => {
    doFetchArticle()
  }, [doFetchArticle])

  useEffect(() => {
    if (!updateArticleResponse) return
    setIsSuccessSubmit(true)
  }, [updateArticleResponse])

  useEffect(() => {
    if (!fetchArticleResponse) return

    setInitialValues({
      title: fetchArticleResponse.article.title,
      description: fetchArticleResponse.article.description,
      body: fetchArticleResponse.article.body,
      tagList: fetchArticleResponse.article.tagList
    })
  }, [fetchArticleResponse])

  if (currentUserState.isLoggedIn === false) {
    return <Redirect to='/' />
  }

  if (isSuccessSubmit) {
    return <Redirect to={`/articles/${slug}`} />
  }

  return (
    <ArticleForm
      onSubmit={handleSubmit}
      errors={(updateArticleError && updateArticleError.errors) || {}}
      initialValues={initialValues}
    />
  )
}


export default EditArticle