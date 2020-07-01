import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './api-enm';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import  get  from 'lodash/get';
import  Problems from './problems';
import 'bootstrap/dist/css/bootstrap.min.css';
import maxresdefault from './maxresdefault.jpg';

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
				<Card style={{ width: '18rem'}}>
				<Card.Img variant="top" src={maxresdefault} />
				<Card.Body>
					<Card.Title>Binary Search</Card.Title>
					<Card.Text>
					 Binary Search is a search algorithm that finds the position of a target value within a sorted array.
					</Card.Text>
					<Button variant="primary">Start Solving!</Button>
				</Card.Body>
				</Card>
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

