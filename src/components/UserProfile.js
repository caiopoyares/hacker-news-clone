import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { getOnlyStories, getUser, formatDate } from '../utilities/api';
import Loader from 'react-loader-spinner';

export default class UserProfile extends Component {
  state = {
    userData: null,
    profile: null,
    stories: null
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const userID = queryString.parse(this.props.location.search).id;
    getUser(userID).then(data => {
      this.setState({ userData: data, profile: data.id });
      return data.submitted;
    }).then(data => {
      return data.slice(0, 50);
    }).then(data => {
      getOnlyStories(data).then(data => this.setState({ stories: data }));
    })
  }
  render() {
    const { profile, userData, stories } = this.state;
    return (
      userData && profile ? (
        <div className="user-profile">
          <h1>{profile}</h1>
          <p>entrou em <strong>{formatDate(userData.created)}</strong> e tem <strong>{userData.karma}</strong> karmas</p>
          <div className="user-posts">
            <h2>Posts</h2>
            {stories ? (
              <ul>
                {stories.map(story => (
                  <li key={story.id}>
                    <a className="title" href={story.url}><h4 style={{ fontSize: '1.1rem', color: '#2E8B57', marginBottom: '0.1rem' }}>{story.title}</h4></a>
                    <p>por <span>{story.by}</span> em {formatDate(story.time)}, com <Link to={`/comments?id=${story.id}`}>{story.kids ? story.kids.length : 0}</Link> comentários</p>
                  </li>
                ))}
              </ul>
            ) : <Loader type="ThreeDots" color="#2E8B57" />}
          </div>
        </div>
      ) : <Loader type="ThreeDots" color="#2E8B57" />
    )
  }
}
