import React from 'react';
import { MarkdownPreview } from 'react-marked-markdown';

const Guide = ({ setGuide }) => {
  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setGuide(false);
    }
  };
  return (
    <div className='backdrop' onClick={handleClick}>
      <div className='child guide-markdown'>
        <h1 className='text-dark'>Some common markdown</h1>
        <table style={{ marginTop: '20px' }}>
          <tbody>
            <tr>
              <td># Header</td>
              <td>H1 Header</td>
            </tr>
            <tr>
              <td>###### Header</td>
              <td>H6 Header</td>
            </tr>
            <tr>
              <td>*italics* or _italics_</td>
              <td>
                <i>italics</i>
              </td>
            </tr>
            <tr>
              <td>**bold**</td>
              <td>
                <b>bold</b>
              </td>
            </tr>
            <tr>
              <td>[Link](https://...)</td>
              <td>
                <a href='#!'>link</a>
              </td>
            </tr>
            <tr>
              <td>* item 1</td>
              <td>
                <li>item 1</li>
              </td>
            </tr>
            <tr>
              <td>{'>'} quoted text</td>
              <td>
                <MarkdownPreview value={'> quoted text'} />
              </td>
            </tr>
            <tr>
              <td>`inline code`</td>
              <td>
                <MarkdownPreview value={'`inline code`'} />
              </td>
            </tr>
            <tr>
              <td>```{'(*)prefix '} code block```</td>
              <td>
                <MarkdownPreview value={'code block'} />
              </td>
            </tr>
          </tbody>
        </table>
        <p style={{ margin: '15px 0' }}>
          The (*)prefix can be: js, c++, c#,...
        </p>
        <p>
          You can see full document about markdown{' '}
          <a
            rel='noopener noreferrer'
            href='https://www.markdownguide.org/cheat-sheet/'
            target='_blank'
            style={{ color: '#3b49df' }}
          >
            here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Guide;
