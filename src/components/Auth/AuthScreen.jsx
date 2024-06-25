import React, { useState } from 'react'
import { Container, TextField, Button, Typography, Box } from '@mui/material'
import axios from 'axios'

const Login = ({ setSelectedItem }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'https://cafeteria-op-src-api.onrender.com/api/auth/login',
        {
          username,
          password,
        }
      )
      // Handle success (e.g., store the token, redirect to another page)
      console.log(response.data)
      setSelectedItem('cafeteria')
    } catch (err) {
      setError(err.response?.data.message || 'An error occurred')
    }
  }

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2" gutterBottom>
              {error}
            </Typography>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
          <Box mt={2}>
            <Typography variant="body2">
              No tienes una cuenta?{' '}
              <Button onClick={() => setSelectedItem('register')}>
                Registrate aqui
              </Button>
            </Typography>
          </Box>
        </form>
      </Box>
    </Container>
  )
}

export default Login
