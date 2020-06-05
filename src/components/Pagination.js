

import React from 'react'

function Pagination(props) {

    return (
        <React.Fragment>
            <ul className="pagination">
                <li className="page-item" key='1' ><a className="page-link" onClick={() => props.changepages("prev")} href="#/">Previous</a></li>
                {
                    props.currentPageLists.map((value) =>
                        value !== 0 ?
                            <li className="page-item" onClick={() => props.changepages(value)} key={value + 1}><a className="page-link" href="#/" value={value}
                                onClick={props.changePageNumber}
                                style={props.currentPage === value ? { backgroundColor: 'blue' } : null}
                            >{value}</a></li> : null
                    )
                }
                <li className="page-item" key='5'><a className="page-link" onClick={() => props.changepages("next")} href="#/">Next</a></li>
            </ul>
        </React.Fragment>
    )
}

export default Pagination








