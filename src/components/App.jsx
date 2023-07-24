import React, { Component } from 'react';
import * as API from './services/getImages';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    value: '',
    page: 1,
    images: [],
    isLoadMoreVisible: false,
    isLoading: false,
  };

  handleSubmit = value => {
    this.setState({ value, images: [], page: 1 });
  };

  async componentDidUpdate(prevProps, prevState) {
    const { value, page } = this.state;
    if (
      (prevState.value !== value && value !== '') ||
      prevState.page !== page
    ) {
      try {
        this.setState({ isLoading: true });
        const { hits, total } = await API.getImages({ value, page });
        this.setState(prevState => ({
          images: [...prevState.images, ...this.getNormalizedImages(hits)],
          isLoadMoreVisible: page < Math.ceil(total / 12),
        }));
      } catch (error) {
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  getNormalizedImages(images) {
    return images.map(({ id, tags, webformatURL, largeImageURL }) => ({
      id,
      tags,
      webformatURL,
      largeImageURL,
    }));
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        {this.state.images.length !== 0 && (
          <ImageGallery images={this.state.images} />
        )}
        {this.state.isLoading && <Loader />}
        {this.state.isLoadMoreVisible && !this.state.isLoading && (
          <Button onClick={this.loadMore} />
        )}
      </>
    );
  }
}
