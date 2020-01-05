import React from 'react'
import { Link } from 'react-router-dom'

import AddToFavorites from './addToFavorites'
import TagList from './tagList'

const Feed = ({ articles }) => {
  return (
    <div>
      {articles.map((article, index) => (
        <div className="article-preview" key={index}>
          <div className="article-meta">
            <Link to={`/profiles/${article.author.username}`}>
              <img src={article.author.image} alt="" />
            </Link>
            <div className="info">
              <Link to={`/profiles/${article.author.username}`} className='author'>
                {article.author.username}
              </Link>
              <span className="date">{article.createAt}</span>
            </div>
            <div className="pull-xs-right">
              <AddToFavorites isFavorited={article.favorited} favoriteCount={article.favoritesCount} articleSlug={article.slug}/>
            </div>
          </div>
          <Link to={`/articles/${article.slug}`} className='preview-link'>
            <h1>{article.title}</h1>
            <p>{article.description}</p>
            <span>Read more...</span>
            <TagList tags={article.tagList} />
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Feed