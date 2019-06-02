// const getTopStories = async () => {
//   const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
//   const data = await response.json();
//   const storiesArr = data.slice(0, 30);
//   const stories = await Promise.all(storiesArr.map(fetchItem));
//   return stories;
// }

export const getStories = (type) => {
  return fetch(`https://hacker-news.firebaseio.com/v0/${type}stories.json?print=pretty`)
    .then(response => response.json())
    .then(data => data.slice(0, 30))
    .then(data => Promise.all(data.map(post => {
      return fetch(`https://hacker-news.firebaseio.com/v0/item/${post}.json?print=pretty`)
        .then(post => post.json());
    })));
}

export const getUser = async id => {
  const response = await fetch(`https://hacker-news.firebaseio.com/v0/user/${id}.json?print=pretty`);
  const data = await response.json();
  return data;
}

export function formatDate(timestamp) {
  return new Date(timestamp * 1000)
    .toLocaleDateString("pt-br", {
      hour: 'numeric',
      minute: 'numeric'
    })
}

export const getOnlyStories = async (array) => {
  const stories = await Promise.all(array.map(id => {
    return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`).then(data => data.json())
  }));
  return stories.filter(item => item.type === 'story');
}

export const getComments = (commentsArr) => {
  return Promise.all(commentsArr.map(comment => {
    return fetch(`https://hacker-news.firebaseio.com/v0/item/${comment}.json?print=pretty`)
      .then(data => data.json());
  }));

}