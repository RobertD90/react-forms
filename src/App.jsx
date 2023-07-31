import { useState } from 'react';
import SignUpForm from './components/SignUpForm.jsx';
import Authenticate from './components/Authenticate.jsx';
import './App.css';
////////////////////////////////////////////////////////////////////////
const App = () => {
  const [token, setToken] = useState(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://fsa-jwt-practice.herokuapp.com/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        });

      const result = await response.json();
      console.log(`API response`, response)
      console.log('Token:', result.token)
      setToken(result.token);

    } catch (error) {
      console.error('Error occurred:', error);
      setError('An error occurred while processing your request.');
      console.log(result)

    }
  };

  return (
    <>
      <SignUpForm token={token} setToken={setToken} />
      <Authenticate token={token} setToken={setToken} />
      <h2>Sign Up Form Component</h2>
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" onChange={(event) => {
            console.log(event.target.value);
            setUsername(event.target.value)
          }} />
        </label>
        <label>
          Password:
          <input type="password"
            value={password}
            onChange={(event) => {
              console.log(event.target.event)
              setPassword(event.target.value)
            }} />
        </label>
        <button type='Submit'> Submit </button>

      </form>
    </>
  );
};

export default App;