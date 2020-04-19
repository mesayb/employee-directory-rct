

import React from 'react'

function Pagination() {
    return (
        <React.Fragment>
            <ul className="pagination">
                <li className="page-item" key='1'><a className="page-link" href="#">Previous</a></li>
                <li className="page-item" key='2'><a className="page-link" href="#">1</a></li>
                <li className="page-item  key='3' active"><a className="page-link" href="#">2</a></li>
                <li className="page-item" key='4'><a className="page-link" href="#">3</a></li>
                <li className="page-item" key='5'><a className="page-link" href="#">Next</a></li>
            </ul>
        </React.Fragment>
    )
}

export default Pagination








