import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getStories, formatDate } from '../utilities/api';
import Loader from 'react-loader-spinner';

export default class TopStories extends Component {
  state = {
    topStories: null
  }
  componentDidMount() {
    getStories('top').then(data => {
      this.setState({ topStories: data });
    })
  }
  render() {
    return (
      <div className='top-stories__container'>
        {this.state.topStories ? (
          <ul className='stories'>
            {
              this.state.topStories.map((story, index) => {
                const comments = story.kids ? story.kids.length : 0;
                return (
                  <li key={story.id}>
                    <a className='a-title' href={story.url} target="_blank"><h4 ><span className='rating'>{index + 1}.</span> {story.title}</h4></a>
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
