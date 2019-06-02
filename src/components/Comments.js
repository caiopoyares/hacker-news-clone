import React from 'react';
import queryString from 'query-string';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { formatDate } from '../utilities/api';
import { getComments } from '../utilities/api';

class Comments extends React.Component {
  state = {
    post: null,
    comments: null
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const id = queryString.parse(this.props.location.search).id;
    fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
      .then(response => response.json())
      .then(data => {
        this.setState({ post: data });
        if (data.kids) {
          return data.kids
        } else {
          return [];
        }
      })
      .then(getComments)
      .then(comments => this.setState({ comments }))
  }

  render() {
    const { post, comments } = this.state;
    return (
      this.state.post ? (
        <div className="comments__container">
          <div className="comments__post">
            <h1>{post.title}</h1>
            <p>por <Link to={`/author?id=${post.by}`}>{post.by}</Link> em {formatDate(post.time)} com {<Link to={`/comments?id=${post.id}`}>{post.kids ? post.kids.length : 0}</Link>} comentários</p>
          </div>
          {comments && (
            comments.map(comment => {
              if (comment.deleted) {
                return;
              }
              return (
                <div className='comments__box' key={comment.id}>
                  <p>por <Link to={`/author?id=${comment.by}`} style={{ color: '#2E8B57' }}>{comment.by}</Link> em {formatDate(comment.time)}</p>
                  <p className='comments__text' dangerouslySetInnerHTML={{ __html: comment.text }} />
                </div>
              )
            })
          )}
        </div>
      ) : <Loader type="ThreeDots" color="#2E8B57" />
    )
  }
}


export default Comments;