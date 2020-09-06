import React, { useEffect } from 'react';
import useStorage from '../../hooks/useStorage';
import { motion } from 'framer-motion';
export const ProgressBar = ({
  file,
  setFile,
  setImageUrl,
  setImageUpdateUser,
}) => {
  const { url, progress } = useStorage(file);

  useEffect(() => {
    if (url) {
      if (setImageUrl) {
        setImageUrl(`![Alt Text](${url})`);
      }
      if (setImageUpdateUser) {
        setImageUpdateUser(url);
      }
      if (setFile) {
        setFile(null);
      }
    }
  }, [url, setFile, setImageUrl, setImageUpdateUser]);

  return (
    <motion.div
      className='progress-bar'
      initial={{ width: 0 }}
      animate={{ width: progress + '%' }}
    ></motion.div>
  );
};
