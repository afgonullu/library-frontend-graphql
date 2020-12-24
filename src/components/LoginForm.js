import React, { useState, useEffect } from "react"
import { useMutation, useQuery, useLazyQuery } from "@apollo/client"
import { LOGIN, GET_USER } from "../queries"

const LoginForm = ({ setError, setToken, setFavGenre }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    },
  })

  const { loading, error, data } = useQuery(GET_USER)

  useEffect(() => {
    if (result.data) {
      // console.log(result.data)
      const token = result.data.login.value
      setToken(token)
      if (data.me) {
        setFavGenre(data.me.favoriteGenre)
      }

      localStorage.setItem("library-app-user-token", token)
    }
  }, [result.data]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
