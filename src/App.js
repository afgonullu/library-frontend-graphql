import React, { useState } from "react"
import { useApolloClient, useLazyQuery, useQuery } from "@apollo/client"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import LoginForm from "./components/LoginForm"
import { GET_USER } from "./queries"
import Recommend from "./components/Recommend"

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }

  return <div style={{ color: "red" }}>{errorMessage}</div>
}

const App = () => {
  const [page, setPage] = useState("authors")
  const [token, setToken] = useState(null)
  const [favGenre, setFavGenre] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  console.log(token)
  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setFavGenre={setFavGenre}
          setError={notify}
          setToken={setToken}
        />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("recommend")}>recommend</button>
        <button onClick={() => setPage("add")}>add book</button>
        {token ? <button onClick={logout}>log out</button> : null}
      </div>
      <Notify errorMessage={errorMessage} />

      <Authors setError={notify} show={page === "authors"} />

      <Books show={page === "books"} />
      <Recommend favGenre={favGenre} show={page === "recommend"} />

      <NewBook setError={notify} show={page === "add"} setPage={setPage} />
    </div>
  )
}

export default App
