import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './api-enm';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import  get  from 'lodash/get';
import  Problems from './problems';
import 'bootstrap/dist/css/bootstrap.min.css';

export class Home extends React.Component {
  constructor(props) {
		super(props);
    this.state = {
			problemSet: {}
    };
	}

  render(){
	  return (
			<div className="code_body">
				 <Navbar bg="dark" variant="dark">
					<Navbar.Brand href="#home">Online Judge</Navbar.Brand>
					<Nav>
					<Nav.Link href="/top10">Top 10</Nav.Link>
					<Nav.Link href="/trackA">Track A</Nav.Link>
					<Nav.Link href="/trackB">Track B</Nav.Link>
					</Nav>
  				</Navbar>	
				<br/>
				<br/>
				<br/>
				<Problems
					problemSet = {this.state.problemSet}
				/>
			</div>
    );
	}
	componentDidMount(){
		document.title = "Codeforces API";
		fetch('https://codeforces.com/api/problemset.problems')
		.then(results => {
				return results.json();
		}).then(data => {
				const problems = get(data, 'result.problems', {});
				this.setState({
					problemSet: problems
				});
		});
		
  }
}

ReactDOM.render(
  <Home />,
  document.getElementById('root')
);

