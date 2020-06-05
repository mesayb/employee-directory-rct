import React from 'react'

function SearchBar(props) {
    return (
        <React.Fragment>

            <div className="col-sm-12 default-color">
                <form className="form-inline">
                    <div className="md-form my-0">
                        
                        <input
                            onChange={props.handleInputChange}
                            value={props.searchParam}
                            name="search"
                            type="text"
                            className="form-control"
                            placeholder="Search Employee"
                            id="search"
                           
                        />

                    </div>
                    <button className="btn btn-outline-white btn-md my-2 my-sm-0">{props.recordSize}</button>
                    <button className="btn btn-outline-white btn-md my-2 my-sm-0 ml-3" type="submit" onClick={props.handleFormSubmit}>Search</button>
                </form>
            </div>

        </React.Fragment>
    )
}

export default SearchBar