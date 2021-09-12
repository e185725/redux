import React from 'react'
import { useSelector } from 'react-redux'
import  { Link } from "react-router-dom"
import { PostAuthor } from './PostAuthor'
import { selectPostById } from './postsSlice'
export const SinglePostPage = ({ match }) => {
  const { postId } = match.params

  const post = useSelector(state => selectPostById( state, postId ) )
  
  console.log("post",post)

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <PostAuthor userId={post.user} />
        <br/>
        <Link to={`/editPost/${post.id}`} className="button" >
            Edit Post
        </Link>
      </article>
    </section>
  )
}