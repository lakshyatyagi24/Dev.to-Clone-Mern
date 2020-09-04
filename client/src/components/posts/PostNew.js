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
  background-color: #282c34;
  color: #fff;
  border-radius: 5px;
`;
const TextArea = styled.textarea`
  font-family: 'Poppins', sans-serif;
  margin-top: 30px;
  padding: 60px;
  width: 100%;
  height: 600px;
  resize: none;
  border: none;
  outline: none;
  font-size: 17px;
  background-color: #282c34;
  color: #fff;
  border-radius: 5px;
`;
const ResultArea = styled.div`
  font-family: 'Poppins', sans-serif;
  margin-top: 40px;
  padding: 60px;
  width: 100%;
  height: 600px;
  border: none;
  font-size: 17px;
  background-color: #282c34;
  color: #fff;
  border-radius: 5px;
  overflow-y: auto;
  overflow-x: hidden;
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
            <input type='submit' className='btn btn-dark my-1' value='Submit' />
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
          className='btn btn-dark'
          value={write ? 'Write' : 'Preview'}
          style={{
            width: '60%',
            fontWeight: '600',
          }}
          onClick={() => setWrite(!write)}
        />
        <input
          onClick={() => setImage(true)}
          type='button'
          className='btn btn-dark'
          value='Add image'
          style={{
            width: '60%',
            fontWeight: '600',
            marginTop: '30px',
          }}
        />
        <input
          type='button'
          className='btn btn-dark'
          value='Guide'
          style={{
            width: '60%',
            fontWeight: '600',
            marginTop: '30px',
          }}
          onClick={() => setGuide(true)}
        />
      </SideAction>
    </EditorContainer>
  );
}
PostNew.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostNew);
