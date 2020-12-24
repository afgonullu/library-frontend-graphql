import React, { useState } from "react"
import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"

const Books = (props) => {
  const [genres, setGenres] = useState([])
  const [filter, setFilter] = useState(null)
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: filter },
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }
  return (
    <div>
      <h2>books</h2>
      <p>in genre {filter}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
          </tr>
          {result.data.allBooks.map((a) => {
            a.genres.map((g) => {
              if (!genres.includes(g)) {
                setGenres([...genres, g])
              }
            })
            return (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div>
        <button
          key="all"
          onClick={() => {
            setFilter(null)
          }}
        >
          all
        </button>
        {genres.map((g) => (
          <button
            key={g}
            onClick={() => {
              console.log(g)
              setFilter(g)
            }}
          >
            {g}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Books
