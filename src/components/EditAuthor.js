import React, { useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import Select from "react-select"
import { EDIT_AUTHOR, ALL_AUTHORS } from "../queries"

const EditAuthor = (props) => {
  const options = props.authors.map((a) => {
    return { value: a, label: a }
  })
  const [born, setBorn] = useState(1900)
  const [selectedOption, setSelectedOption] = useState(options[0])

  const author = useQuery(ALL_AUTHORS)

  console.log(options)

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const submit = async (event) => {
    event.preventDefault()
    console.log(selectedOption)

    editAuthor({ variables: { name: selectedOption.value, year: born } })

    setBorn(1900)
  }

  return (
    <div>
      <form onSubmit={submit}>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type="submit">set Birth Year</button>
      </form>
    </div>
  )
}

export default EditAuthor
