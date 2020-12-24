import React, { useState } from "react"
import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"

const Recommend = (props) => {
  const recommend = props.favGenre
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: recommend },
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
      <p>in genre {recommend}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result.data.allBooks
            .filter((a) => a.genres.includes(recommend))
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
