import React, { useState, useEffect } from 'react';
import styled from 'styled-components'; // test thu style component
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import { MarkdownPreview } from 'react-marked-markdown';
import Guide from './Guide';
import Image from './Image';
import CoverImage from './CoverImage';
import TagsModal from './TagsModal';
import HashLoader from 'react-spinners/HashLoader';

const EditorContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;
const Container = styled.div`
  width: 80%;
  min-height: 800px;
  padding: 13px;
`;
const SideAction = styled.div`
  width: 10%;
  height: 600px;
  padding: 13px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 55px;
`;
const Title = styled.textarea`
  font-family: 'Poppins', sans-serif;
  padding: 5px;
  font-size: 32px;
  height: 60px;
  font-weight: 600;
  width: 100%;
  outline: none;
  border: none;
  resize: none;
  background-color: #fff;
  color: #282c34;
  box-shadow: rgba(8, 9, 10, 0.1) 0px 0px 0px 1px;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  font-family: 'Poppins', sans-serif;
  padding: 40px;
  width: 100%;
  height: 600px;
  resize: none;
  border: none;
  outline: none;
  font-size: 1rem;
  background-color: #fff;
  color: #282c34;
  border-radius: 5px;
  box-shadow: rgba(8, 9, 10, 0.1) 0px 0px 0px 1px;
`;
const ResultArea = styled.div`
  font-family: 'Poppins', sans-serif;
  margin-top: 40px;
  padding: 40px;
  width: 100%;
  height: 600px;
  border: none;
  font-size: 1rem;
  background-color: #fff;
  color: #282c34;
  border-radius: 5px;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: rgba(8, 9, 10, 0.1) 0px 0px 0px 1px;
  word-break: break-word;
`;
const Preview = styled.div`
  font-size: 22px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(15, 15, 15, 0.3);
`;

function PostNew({ addPost }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState(false);
  const [write, setWrite] = useState(false);
  const [guide, setGuide] = useState(false);
  const [image, setImage] = useState(false);
  const [tagsStatus, setTagsStatus] = useState(false);
  const [publish, setPublish] = useState(false);

  let dataPost = JSON.parse(localStorage.getItem('post'));
  useEffect(() => {
    if (!dataPost) {
      dataPost = { title: '', content: '' };
      setTitle(dataPost.title);
      setContent(dataPost.content);
    } else {
      setTitle(dataPost.title);
      setContent(dataPost.content);
    }
  }, []);

  return (
    <div className='container'>
      <EditorContainer>
        {guide && <Guide setGuide={setGuide} />}
        {image && <Image setImage={setImage} />}
        {coverImage && <CoverImage setCoverImage={setCoverImage} />}
        {tagsStatus && <TagsModal setTagsStatus={setTagsStatus} />}
        {!write && (
          <Container>
            <button
              onClick={() => setCoverImage(true)}
              className='btn btn-light my cover-image__btn'
            >
              Add cover image
              <i style={{ marginLeft: '10px' }} className='fas fa-images'></i>
            </button>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setPublish(true);
                const cover_image = localStorage.getItem('Cover_Image');
                const tagsData = JSON.parse(localStorage.getItem('tags'));
                const res = await addPost({
                  title,
                  coverImage: !cover_image ? '' : cover_image,
                  content,
                  tags: !tagsData ? [] : tagsData,
                });
                if (res) {
                  setPublish(false);
                } else {
                  setPublish(false);
                }
                localStorage.removeItem('post');
                localStorage.removeItem('Cover_Image');
                localStorage.removeItem('tags');
              }}
            >
              <Title
                placeholder='Title...'
                name='title'
                required
                value={title}
                onChange={(e) => {
                  localStorage.setItem(
                    'post',
                    JSON.stringify({ ...dataPost, title: e.target.value })
                  );
                  setTitle(e.target.value);
                }}
              />

              <TextArea
                onChange={(e) => {
                  localStorage.setItem(
                    'post',
                    JSON.stringify({ ...dataPost, content: e.target.value })
                  );
                  setContent(e.target.value);
                }}
                placeholder='You will use markdown to write your post, see the guide in right side...'
                name='content'
                required
                value={content}
              />
              {<HashLoader size={36} color={'#3b49df'} loading={publish} />}
              {!publish && (
                <input
                  type='submit'
                  className='btn btn-dark my-1'
                  value='Publish'
                />
              )}
            </form>
          </Container>
        )}
        {write && (
          <Container>
            <Preview>
              <p style={{ margin: '0' }}>Preview</p>
            </Preview>
            <ResultArea className='preview'>
              <MarkdownPreview value={content} />
            </ResultArea>
          </Container>
        )}
        <SideAction>
          <button
            style={{ marginTop: '0' }}
            className='btn btn-light btn-new-feed'
            onClick={() => setWrite(!write)}
          >
            {write ? (
              <i className='far fa-edit'></i>
            ) : (
              <i className='fas fa-eye'></i>
            )}
          </button>
          <button
            onClick={() => setImage(true)}
            className='btn btn-light btn-new-feed'
          >
            <i className='fas fa-images'></i>
          </button>

          <button
            className='btn btn-light btn-new-feed'
            onClick={() => setGuide(true)}
          >
            <i className='fab fa-glide'></i>
          </button>
          <button
            className='btn btn-light btn-new-feed'
            onClick={() => setTagsStatus(true)}
          >
            <i className='fas fa-tags'></i>
          </button>
        </SideAction>
      </EditorContainer>
    </div>
  );
}
PostNew.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostNew);
