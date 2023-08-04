import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client'; // Import the useMutation hook

import { LOGIN_USER } from '../utils/mutations'; // Import the LOGIN_USER mutation
import AuthService from '../utils/auth';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // use the useMutation hook to execute the LOGIN_USER mutation
  const [loginUser, { error }] = useMutation(LOGIN_USER);

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
      const { data } = await loginUser({ variables: { ...userFormData } }); // Use the loginUser mutation

      if (error) {
        throw new Error('something went wrong!');
      }

      const { token, user } = data.loginUser;
      console.log(user);
      AuthService.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      email: '',
      password: '',
    });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>

        {/* ... (existing JSX) */}
      </Form>
    </>
  );
};

export default LoginForm;