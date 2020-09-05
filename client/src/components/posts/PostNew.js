import React, { useState, useEffect } from 'react';
import styled from 'styled-components'; // test thu style component
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import { MarkdownPreview } from 'react-marked-markdown';
import Guide from './Guide';
import Image from './Image';

const EditorContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 30px;
`;
const Container = styled.div`
  width: 80%;
  min-height: 800px;
  padding: 13px;
`;
const SideAction = styled.div`
  width: 20%;
  height: 600px;
  padding: 13px;
`;
const Title = styled.textarea`
  font-family: 'Poppins', sans-serif;
  padding: 5px;
  font-size: 22px;
  height: 40px;
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
  margin-top: 30px;
  padding: 40px;
  width: 100%;
  height: 600px;
  resize: none;
  border: none;
  outline: none;
  font-size: 17px;
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
  font-size: 17px;
  background-color: #fff;
  color: #282c34;
  border-radius: 5px;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: rgba(8, 9, 10, 0.1) 0px 0px 0px 1px;
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
  const [write, setWrite] = useState(false);
  const [guide, setGuide] = useState(false);
  const [image, setImage] = useState(false);
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
    <EditorContainer>
      {guide && <Guide setGuide={setGuide} />}
      {image && <Image setImage={setImage} />}
      {!write && (
        <Container>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addPost({ title, content });
              localStorage.removeItem('post');
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
            <input
              type='submit'
              className='btn btn-dark my-1'
              value='Publish'
            />
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
        <input
          type='button'
          className='btn btn-light'
          value={write ? 'Write' : 'Preview'}
          style={{
            width: '60%',
            fontWeight: '600',
            background: '#fff',
          }}
          onClick={() => setWrite(!write)}
        />
        <i className='fas fa-eye'></i>
        <input
          onClick={() => setImage(true)}
          type='button'
          className='btn btn-light'
          value='Image'
          style={{
            width: '60%',
            fontWeight: '600',
            marginTop: '30px',
            background: '#fff',
          }}
        />
        <i className='fas fa-images'></i>
        <input
          type='button'
          className='btn btn-light'
          value='Guide'
          style={{
            width: '60%',
            fontWeight: '600',
            marginTop: '30px',
            background: '#fff',
          }}
          onClick={() => setGuide(true)}
        />
        <i className='fab fa-glide'></i>
      </SideAction>
    </EditorContainer>
  );
}
PostNew.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostNew);
