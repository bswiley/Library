import { useState, useEffect } from 'react';
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row
} from 'react-bootstrap';
import { useMutation } from '@apollo/client'; // Import the useMutation hook

import AuthService from '../utils/auth';
import { SAVE_BOOK } from '../utils/mutations'; // Import the SAVE_BOOK mutation

const SearchBooks = () => {
  // ... (existing code)

  // Use the useMutation hook to execute the SAVE_BOOK mutation
  const [saveBook, { error }] = useMutation(SAVE_BOOK);

  // ... (existing code)

  // create function to handle saving a book to our database
  const handleSaveBook = async (bookId) => {
    // find the book in `searchedBooks` state by the matching id
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

    // get token
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await saveBook({ variables: { input: bookToSave } });

      if (error) {
        throw new Error('something went wrong!');
      }

      // if book successfully saves to user's account, save book id to state
      setSavedBookIds([...savedBookIds, data.saveBook._id]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* ... (existing JSX) */}
    </>
  );
};

export default SearchBooks;
