import React, { useState, useEffect } from 'react';
import * as API from './services/getImages';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';

export const App = () => {
  const [value, setValue] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoadMoreVisible, setIsLoadMoreVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = value => {
    setValue(value);
    setImages([]);
    setPage(1);
  };

  useEffect(() => {
    if (value !== '') {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const { hits, total } = await API.getImages({ value, page });
          setImages(prevImages => [
            ...prevImages,
            ...getNormalizedImages(hits),
          ]);
          setIsLoadMoreVisible(page < Math.ceil(total / 12));
        } catch (error) {
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [page, value]);

  const getNormalizedImages = images => {
    return images.map(({ id, tags, webformatURL, largeImageURL }) => ({
      id,
      tags,
      webformatURL,
      largeImageURL,
    }));
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      {images.length !== 0 && <ImageGallery images={images} />}
      {isLoading && <Loader />}
      {isLoadMoreVisible && !isLoading && <Button onClick={loadMore} />}
    </>
  );
};
