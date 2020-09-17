import React, { useState } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export const TagsInput = ({ _suggestions }) => {
  const data = _suggestions.map((item) => ({
    id: item._id,
    text: item.tagName,
  }));
  const [tags, setTags] = useState(
    JSON.parse(localStorage.getItem('tags')) || []
  );
  function handleDelete(i) {
    localStorage.setItem(
      'tags',
      JSON.stringify(tags.filter((tag, index) => index !== i))
    );
    setTags(tags.filter((tag, index) => index !== i));
  }

  function handleAddition(tag) {
    if (tags.length === 4) {
      return;
    }
    localStorage.setItem('tags', JSON.stringify([...tags, tag]));
    setTags([...tags, tag]);
  }

  function handleDrag(tag, currPos, newPos) {
    const _tags = [...tags];
    const newTags = _tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  }
  return (
    <div className='tags-input'>
      <ReactTags
        tags={tags}
        suggestions={data}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        delimiters={delimiters}
      />
    </div>
  );
};
