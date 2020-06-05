

import React from 'react'

function EmployeeDetailModal(props) {
const {first_name, last_name, department, email, start_date, profile_picture} = props.currentHoverUser[0];
console.log("gert")
    return (
     
        <React.Fragment>
            <div >
           <p><strong>{first_name} { last_name}, {department}</strong></p>
    <p>{email}</p>
           <img src={profile_picture} style={{width:'200px', height:'200px'}}alt={first_name}/>
    <p>Since : {start_date}</p>
           </div>
        </React.Fragment>
    )
}

export default EmployeeDetailModal
