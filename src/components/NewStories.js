import React from 'react';
import { Link } from 'react-router-dom';
import { getStories, formatDate } from '../utilities/api';
import Loader from 'react-loader-spinner';


export default class NewStories extends React.Component {
  state = {
    newStories: null
  }

  componentDidMount() {
    getStories('new')
      .then(data => {
        this.setState({ newStories: data });
      })
  }
  render() {
    return (
      <div className="new-stories__container">
        {this.state.newStories ? (
          <ul className='stories'>
            {
              this.state.newStories.map((story, index) => {
                const comments = story.kids ? story.kids.length : 0;
                return (
                  <li key={story.id}>
                    <a className="a-title" href={story.url} target="_blank"><h4><span className='rating'>{index + 1}.</span> {story.title}</h4></a>
                    <p>por <Link to={`/author?id=${story.by}`}>{story.by}</Link> em {formatDate(story.time)}, com <Link to={`/comments?id=${story.id}`}>{comments}</Link> comentários</p>
                  </li>
                )
              })
            }
          </ul>
        ) : <Loader type="ThreeDots" color="#2E8B57" />
        }

      </div>

    )
  }
}