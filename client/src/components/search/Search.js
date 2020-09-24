import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import PuffLoader from 'react-spinners/PuffLoader';
import queryString from 'query-string';
import SearchItem from './SearchItem';
import People from './People';

function Search({ location }) {
  const [filterValue, setFilterValue] = useState('post');
  const [data, setData] = useState(null);
  useEffect(() => {
    let q = queryString.parse(location.search).q;
    async function getData() {
      const res = await api.get(`/posts/dev/search?q=${q}`);
      const { posts, users, comments } = res.data;
      setData({ posts, users, comments });
    }
    getData();
  }, [location.search]);
  return !data ? (
    <div style={{ position: 'fixed', right: '50%', bottom: '50%' }}>
      <PuffLoader size={36} color={'#3b49df'} loading={true} />
    </div>
  ) : (
    <div className='container'>
      <div style={{ padding: '0 6rem' }} className='notify-home my-1'>
        <div className='notify-home__side'>
          <button
            onClick={() => {
              setFilterValue('post');
            }}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              backgroundColor: filterValue === 'post' ? '#fff' : '#eef0f1',
              padding: '0.35rem',
            }}
            className='btn btn-light'
          >
            <div>Posts</div>
            <div className='count-dashboard'>{data.posts.length}</div>
          </button>

          <button
            onClick={() => {
              setFilterValue('people');
            }}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              backgroundColor: filterValue === 'people' ? '#fff' : '#eef0f1',
              padding: '0.35rem',
            }}
            className='btn btn-light'
          >
            <div>People</div>
            <div className='count-dashboard'>{data.users.length}</div>
          </button>
          <button
            onClick={() => {
              setFilterValue('comment');
            }}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              backgroundColor: filterValue === 'comment' ? '#fff' : '#eef0f1',
              padding: '0.35rem',
            }}
            className='btn btn-light'
          >
            <div>Comments</div>
            <div className='count-dashboard'>{data.comments.length}</div>
          </button>
        </div>

        <div className='notify-home__main'>
          {filterValue === 'post'
            ? data.posts.map((post) => (
                <SearchItem data={post} key={post._id} />
              ))
            : filterValue === 'comment'
            ? data.comments.map((post) => (
                <SearchItem data={post} key={post._id} />
              ))
            : data.users.map((user) => <People data={user} key={user._id} />)}
        </div>
      </div>
    </div>
  );
}
export default Search;
