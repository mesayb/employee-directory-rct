import React, { Component }  from 'react'
import employeeRecord from '../model/employeeDB'
import SearchBar from './SearchBar'
import Pagination from './Pagination'

class Employee extends Component {
    state = {
      results: [],
      pageNumber: 0,
      sort : "asc",
      searchParam: ''
    };

    componentDidMount() {
         const searchAll =null;
         this.empRecord(searchAll);
      }
  
     empRecord = (searchParam)=> {
        if(searchParam !== null){
           const rec = employeeRecord.filter(emp => emp.first_name.toLowerCase().includes(searchParam.toLowerCase()));
                this.setState({
                   searchParam: searchParam,
                   results: rec
                });
        } else 
        if( searchParam === null ){
                 this.setState({
                    searchParam: searchParam,
                    results: employeeRecord
                });
        }

    };


    handleFormSubmit = (event) => {
        event.preventDefault()
        const searchResult = this.empRecord(this.state.searchParam)
    }

    handleInputChange = (event) =>{
         const value = (event.target.value).trim()
         this.empRecord(value);
    }

    render() {
        return (
            <React.Fragment>
                        
                <div className="container">
                <SearchBar
                  searchParam={this.state.searchParam}
                  handleInputChange={this.handleInputChange} 
                  handleFormSubmit={this.handleFormSubmit}
                  />
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Picture</th>
                                <th className="th-sm">Emp Id</th>
                                <th className="th-sm">First Name</th>
                                <th className="th-sm">Last Name</th>
                                <th className="th-sm">Department</th>
                                <th>Email</th>
                                <th className="th-sm">Start Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            this.state.results.map((employee, index) =>{
                           return(  <tr>
                              <td><img src={employee.profile_picture} height="30" alt="employee logo"/> </td>
                              <td>{employee.emp_id}</td>
                              <td>{employee.first_name}</td>
                              <td>{employee.last_name}</td>
                              <td>{employee.department}</td>
                              <td>{employee.email}</td>
                              <td>{employee.start_date}</td>
                            </tr>)
                            })}
                
                        </tbody>
                    </table>
                </div>
            <Pagination />

            </React.Fragment>
        )
    }
}

export default Employee