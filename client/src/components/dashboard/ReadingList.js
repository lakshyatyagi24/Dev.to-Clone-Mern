import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
function ReadingList({ post }) {
  return (
    <div className='post-list__item bg-white my'>
      <div className='post-list__item-wrap reading-list'>
        <Link to={`/post/${post._id}`} className='item-infor'>
          <h3
            style={{
              fontSize: '1.2rem',
              fontWeight: '600',
              color: 'royalblue',
            }}
          >
            {post.title}
          </h3>
          <p className='date' style={{ display: 'flex', alignItems: 'center' }}>
            <img
              style={{ objectFit: 'cover' }}
              className='round-img'
              alt=''
              src={post.user.avatar}
            />
            <span
              style={{ margin: '0 8px', fontSize: '1rem' }}
              className='text-dark'
            >
              {post.user.name}
            </span>
            <span
              style={{ color: '#666', fontWeight: '600', marginRight: '8px' }}
            >
              Published:
            </span>
            <Moment format='DD/MM/YYYY'>{post.date}</Moment>
          </p>
        </Link>
      </div>
    </div>
  );
}

export default React.memo(ReadingList);
