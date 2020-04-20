

import React from 'react'

function Pagination(props) {

    const numberOfPages = Math.ceil(props.record.length / 10)

    const pageNumber = [];
    for (let i = numberOfPages; i > 0; i--) {
        pageNumber.push(i);
    }

    return (
        <React.Fragment>
            <ul className="pagination">
            <li className="page-item" key='1' ><a className="page-link" href="#">Previous</a></li>
                {
                    pageNumber.map((page, index) =>
                        <li className="page-item" key={index+1}><a className="page-link" href="#" value={index+1}
                        onClick={props.changePageNumber}
                        {...props.currentPage === {index}+1 ? "active" : ""}
                        >{index+1}</a></li>
                    )
                }
            <li className="page-item" key='5'><a className="page-link" href="#">Next</a></li>
            </ul>
        </React.Fragment>
    )
}

export default Pagination








