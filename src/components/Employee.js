import React, { Component } from 'react'
import employeeRecord from '../model/employeeDB'
import SearchBar from './SearchBar'
import Pagination from './Pagination'
import { FaChevronDown, FaChevronUp} from "react-icons/fa";


class Employee extends Component {
    state = {
        results: [],
        pageNumber: 0,
        sort: "asc",
        sortField :'last_name',
        searchParam: '',
        currentList: [],
        currentPageList: [1, 2],
        currentPage: 1
    };

    componentDidMount() {
        const searchAll = null;
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
                results: rec,
                currentList: rec.slice(0, 10),
            });
        } else
            if (searchParam === null) {
                this.setState({
                    searchParam: searchParam,
                    results: employeeRecord,
                    currentList: employeeRecord.slice(0, 10),
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
         console.log("sortDxn = ", sortDxn)
         if(sortDxn === 'desc'){
               const results1 = results.sort((a, b) => (a[sortField] > b[sortField]) ? 1 : -1)
               console.log("results1 = ", results1)
            this.setState({
                results: results1,
                currentList: results1.slice(0, 10),
                sort:'asc',
                sortField: sortField
            });
         } else if(sortDxn === 'asc'){
            const results2 = results.sort((a, b) => (a[sortField] < b[sortField]) ? 1 : -1)
            console.log("results2 = ", results2)
            this.setState({
                results: results2,
                currentList: results2.slice(0, 10),
                sort:'desc',
                sortField: sortField
            });
         }
        console.log('heyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy', sortField)
    }

    changepage = (index) => {
        console.log("index = " + index)
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
                    <table className="table table-bordered table-sm">
                        <thead>
                            <tr>
                                <th>Picture</th>
                                <th value={this.state.sort} data='emp_id'  className="th-sm"  onClick={this.sortTable}>Emp Id  {this.state.sortField==='emp_id'?( this.state.sort === 'asc'  ? <FaChevronDown/> : <FaChevronUp/>):null}</th> 
                                <th value={this.state.sort} data='first_name'  className="th-sm"  onClick={this.sortTable}>First Name  {this.state.sortField==='first_name'?( this.state.sort === 'asc'  ? <FaChevronDown/> : <FaChevronUp/>):null}</th>
                                <th value={this.state.sort} data='last_name' className="th-sm" onClick={this.sortTable}>Last Name  {this.state.sortField==='last_name'?( this.state.sort === 'asc'  ? <FaChevronDown/> : <FaChevronUp/>):null}</th>
                                <th value={this.state.sort} data='department'  className="th-sm"  onClick={this.sortTable}>Department {this.state.sortField==='department'?( this.state.sort === 'asc'  ? <FaChevronDown/> : <FaChevronUp/>):null}</th>
                                <th value={this.state.sort} data='email' className="th-sm" onClick={this.sortTable}>Email  {this.state.sortField==='email'?( this.state.sort === 'asc'  ? <FaChevronDown/> : <FaChevronUp/>):null}</th>
                                <th className="th-sm">Start Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.currentList.map((employee, index) => {
                                    return (<tr>
                                        <td><img src={employee.profile_picture} height="30" alt="employee logo" /> </td>
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
                <Pagination pageNumberList={this.pageNumber()} changepages={this.changepage} currentPageLists={this.state.currentPageList} currentPage={this.state.currentPage} />

            </React.Fragment>
        )
    }
}
export default Employee