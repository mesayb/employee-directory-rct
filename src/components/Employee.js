import React, { Component } from 'react'
import employeeRecord from '../model/employeeDB'
import SearchBar from './SearchBar'
import Pagination from './Pagination'
import { FaChevronDown, FaChevronUp} from "react-icons/fa";
import EmployeeDetailModal from './EmployeeDetailModal'


class Employee extends Component {
    state = {
        results: [],
        pageNumber: 0,
        sort: "asc",
        sortField :'emp_id',
        searchParam: '',
        currentList: [],
        currentPageList: [1, 2],
        currentPage: 1,
        modalShow : false,
        currentHoverUser : ''

    };

    componentDidMount() {
        const searchAll = '';
        this.empRecord(searchAll);
    }

    empRecord = (searchParam) => {
        if (searchParam !== null) {
            const rec = employeeRecord.filter(emp => {
                const lastNameCheck = emp.last_name.toLowerCase().includes(searchParam.toLowerCase());
                const firstNameCheck = emp.first_name.toLowerCase().includes(searchParam.toLowerCase());
                return (lastNameCheck || firstNameCheck)
            });
            this.setState({
                searchParam: searchParam,
                results: rec.sort((a, b) => (a.emp_id > b.emp_id) ? 1 : -1),
                currentList: rec.sort((a, b) => (a.emp_id> b.emp_id) ? 1 : -1).slice(0, 10),
            });
        } else
            if (searchParam === null) {
                this.setState({
                    searchParam: searchParam,
                    results: employeeRecord.sort((a, b) => (a.emp_id > b.emp_id) ? 1 : -1),
                    currentList: employeeRecord.sort((a, b) => (a.emp_id> b.emp_id) ? 1 : -1).slice(0, 10),
                });
            }

    };


    // handleFormSubmit = (event) => {
    //     event.preventDefault()
    //     const searchResult = this.empRecord(this.state.searchParam)
    // }

    handleInputChange = (event) => {
        const value = (event.target.value).trim()
        this.empRecord(value);
    }

    sortTable = (event) => {
         const sortDxn = event.target.getAttribute('value')
         const sortField =event.target.getAttribute('data')
         const results = this.state.results;
   
         if(sortDxn === 'desc'){
               const results1 = results.sort((a, b) => (a[sortField] > b[sortField]) ? 1 : -1)
   
            this.setState({
                results: results1,
                currentList: results1.slice(0, 10),
                sort:'asc',
                sortField: sortField
            });
         } else if(sortDxn === 'asc'){
            const results2 = results.sort((a, b) => (a[sortField] < b[sortField]) ? 1 : -1)
       
            this.setState({
                results: results2,
                currentList: results2.slice(0, 10),
                sort:'desc',
                sortField: sortField
            });
         }
    
    }

    changepage = (index) => {
  
        if (index === "prev") {
            index = (this.state.currentPage - 1)
        } else if (index === "next") {
            index = (this.state.currentPage + 1)
        }
        if (index > 0 && index <= Math.ceil(this.state.results.length / 10)) {
            this.setState({
                currentList: employeeRecord.slice(((index - 1) * 10), ((index - 1) * 10 + 10)),
                currentPageList: [index - 1, index, index + 1],
                currentPage: index
            });
        }

    }


    pageNumber = () => {
        let numberOfPages = Math.ceil(this.state.results.length / 10);
        let pageNumberList = [];
        for (let i = numberOfPages; i > 0; i--) {
            pageNumberList.push(i);
        }
        return pageNumberList;
    }

    toggleHover = (event) => {
        const currentUserId = event.target.getAttribute('value')

        const currentHoverUser =  employeeRecord.filter(emp => 
             Number(emp.emp_id) === Number(currentUserId)
        );

        const display = this.state.modalShow;

        this.setState({
            modalShow : !display,
            currentHoverUser : currentHoverUser
        })
     
    }



    render() {
        return (
            <React.Fragment>

                <div className="container">
                    
                    <SearchBar
                        searchParam={this.state.searchParam}
                        handleInputChange={this.handleInputChange}
                        handleFormSubmit={this.handleFormSubmit}
                        recordSize={this.state.results.length}
                    />
                      <div className="row">
                    <div className="col-sm-10">
                    <table className="table table-bordered table-sm">
                        <thead>
                            <tr>
                                <th>Picture</th>
                                <th value={this.state.sort} data='emp_id'  className="th-sm"  onClick={this.sortTable}>Emp Id  {this.state.sortField==='emp_id'?( this.state.sort === 'asc'  ? <FaChevronDown/> : <FaChevronUp/>):null}</th> 
                                <th value={this.state.sort} data='first_name'  className="th-sm"  onClick={this.sortTable}>First Name  {this.state.sortField==='first_name'?( this.state.sort === 'asc'  ? <FaChevronDown/> : <FaChevronUp/>):null}</th>
                                <th value={this.state.sort} data='last_name' className="th-sm" onClick={this.sortTable}>Last Name  {this.state.sortField==='last_name'?( this.state.sort === 'asc'  ? <FaChevronDown/> : <FaChevronUp/>):null}</th>
                                <th value={this.state.sort} data='department'  className="th-sm"  onClick={this.sortTable}>Department {this.state.sortField==='department'?( this.state.sort === 'asc'  ? <FaChevronDown/> : <FaChevronUp/>):null}</th>
                                <th value={this.state.sort} data='email' className="th-sm" onClick={this.sortTable}>Email  {this.state.sortField==='email'?( this.state.sort === 'asc'  ? <FaChevronDown /> : <FaChevronUp/>):null}</th>
                                <th className="th-sm">Start Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.currentList.length >0 ?
                                this.state.currentList.map((employee, index) => {
                                    return (<tr key={index}>
                                        <td><img src={employee.profile_picture} value={employee.emp_id} height="30" alt="employee logo" onMouseEnter={(event)=>this.toggleHover(event)} onMouseLeave={(event)=>this.toggleHover(event)}/> </td>
                                        <td>{employee.emp_id}</td>
                                        <td>{employee.first_name}</td>
                                        <td>{employee.last_name}</td>
                                        <td>{employee.department}</td>
                                        <td>{employee.email}</td>
                                        <td>{employee.start_date}</td>
                                    </tr>)
                                }) : (<tr><td colSpan="7" style={{textAlign:'center', width:'100%'}}>no result</td></tr>)}

                        </tbody>
                    </table>
                  

                    </div>
                    <div className="col-sm-2" >

                    {this.state.modalShow ? <EmployeeDetailModal currentHoverUser = {this.state.currentHoverUser}/> : null}
                    </div>
                    </div>
                </div>

                <Pagination pageNumberList={this.pageNumber()} changepages={this.changepage} currentPageLists={this.state.currentPageList} currentPage={this.state.currentPage} />

            </React.Fragment>
        )
    }
}
export default Employee