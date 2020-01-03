import { Switch, Route } from 'react-router-dom'
import React from 'react'

import GlobalFeed from './globalFeed'
import Article from './article'
import Auth from './auth'
import TagFeed from './tagFeed'

export default () => {
  return (
    <Switch>
      <Route path="/" component={GlobalFeed} exact/>
      <Route path="/tags/:slug" component={TagFeed} />
      <Route path="/login" component={Auth} />
      <Route path="/register" component={Auth} />
      <Route path="/articles/:slug" component={Article} />
    </Switch>
  )
}