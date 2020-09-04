import React, { useEffect } from 'react';
import useStorage from '../../hooks/useStorage';
import { motion } from 'framer-motion';
export const ProgressBar = ({ file, setFile, setImageUrl }) => {
  const { url, progress } = useStorage(file);

  useEffect(() => {
    if (url) {
      setImageUrl(`![Alt Text](${url})`);
      setFile(null);
    }
  }, [url, setFile, setImageUrl]);

  return (
    <motion.div
      className='progress-bar'
      initial={{ width: 0 }}
      animate={{ width: progress + '%' }}
    ></motion.div>
  );
};
