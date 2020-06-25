import React from 'react'

export default function MovieForm(props) {
    const { handleChange, handleOnSubmit } = props;
    return (
        <div>
            <form onSubmit={handleOnSubmit}>
                <input name="movie" type="text" onChange={handleChange}></input>
                <button type="submit">Search Movie</button>
            </form>
        </div>
    )
}
