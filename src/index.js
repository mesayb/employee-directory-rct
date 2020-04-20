import React from 'react'
import ReactDOM from 'react-dom'
// import SearchBar from './components/SearchBar'
import Navbar from './components/Navbar'
import Employee from './components/Employee'
import './index.css'

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <Navbar />
                <Employee />
            </div>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('root'))