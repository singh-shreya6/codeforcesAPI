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
				 <Navbar bg="dark" variant="dark" fixed="top">
						<Navbar.Brand href="#home">Navbar</Navbar.Brand>
						<Nav className="mr-auto">
							<Nav.Link href="#home">Home</Nav.Link>
							<Nav.Link href="#features">Features</Nav.Link>
							<Nav.Link href="#pricing">Pricing</Nav.Link>
						</Nav>
  				</Navbar>	
				<h2>PROBLEMSET</h2>
				<h3>10 Latest Problems</h3>
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

