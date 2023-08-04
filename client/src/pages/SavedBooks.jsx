import { useState } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client'; // Import the useQuery and useMutation hooks

import { GET_ME } from '../utils/queries'; // Import the GET_ME query
import { REMOVE_BOOK } from '../utils/mutations'; // Import the REMOVE_BOOK mutation
import AuthService from '../utils/auth';

const SavedBooks = () => {
  // use the useQuery hook to execute the GET_ME query on load and save it to the userData variable
  const { loading, data } = useQuery(GET_ME);

  const userData = data?.me || {}; // Use optional chaining to get the me data if available, otherwise an empty object

  // use the useMutation hook to execute the REMOVE_BOOK mutation
  const [removeBook] = useMutation(REMOVE_BOOK);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeBook({ variables: { bookId } });

      if (data?.removeBook?.success) {
        // upon success, remove book's id from localStorage
        removeBookId(bookId);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      {/* ... (existing JSX) */}
    </>
  );
};

export default SavedBooks;
