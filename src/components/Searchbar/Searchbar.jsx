import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Seachbar.module.css';
import { ReactComponent as SeachIcon } from 'icons/search-svgrepo-com.svg';

export class Searchbar extends Component {
  state = {
    value: '',
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.value.trim());
    this.setState({ value: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>
              <SeachIcon fill="black" />
            </span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
