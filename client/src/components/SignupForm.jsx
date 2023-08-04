import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client'; // Import the useMutation hook

import { ADD_USER } from '../utils/mutations'; // Import the ADD_USER mutation
import AuthService from '../utils/auth';

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  // set state for form validation
  const [validated, setValidated] = useState(false); // Updated to include setValidated function
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  // use the useMutation hook to execute the ADD_USER mutation
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true); // Set the validated state to true to display validation errors
      return;
    }

    try {
      const { data } = await addUser({ variables: { ...userFormData } }); // Use the addUser mutation

      if (error) {
        throw new Error('something went wrong!');
      }

      const { token, user } = data.addUser;
      console.log(user);
      AuthService.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>

        {/* ... (existing JSX) */}
      </Form>
    </>
  );
};

export default SignupForm;
