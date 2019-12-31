import { Switch, Route } from 'react-router-dom'
import React from 'react'

import GlobalFeed from './globalFeed'
import Article from './article'

export default () => {
  return (
    <Switch>
      <Route path="/" component={GlobalFeed} exact/>
      <Route path="/articles/:slug" component={Article} />
    </Switch>
  )
}