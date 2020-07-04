import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './api-enm';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import get from 'lodash/get';
import Problems from './problems';
import { Link, BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import maxresdefault from './maxresdefault.jpg';
import ProblemsByTag from './problemsByTag';

export class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			problemSet: {},
			isPageOpen: "",
			isClicked: false
		};
	}

	changePageSelected(a) {
		this.setState({
			isPageOpen: a
		});
	}

	handleClick() {
		this.setState({
			isClicked: true
		});
	}


	createNavBarView() {
		return (
			<Navbar bg="dark" variant="dark">
				<Navbar.Brand href="/">Online Judge</Navbar.Brand>
				<Nav activeKey={this.state.isPageOpen} onSelect={e => this.changePageSelected(e)}>
					<Nav.Item>
						<Nav.Link eventKey="0" href="#home">
							Top 10
        			</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey="1" href="#trackA">
							Track A
        			</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey="2" href="#trackB" >
							Track B
        			</Nav.Link>
					</Nav.Item>
				</Nav>
			</Navbar>
		);
	}

	createTagsCardView() {
		if (this.state.isPageOpen === "" && this.state.isClicked === false) {
			return (
				<>
				<div>
				<h3>Explore Topics</h3>
				<br />
				<br />
				</div>
				<div className="card__body">
					<Card style={{ width: '20%' }}>
						<Card.Img variant="top" src={maxresdefault} />
						<Card.Body>
							<Card.Title>Binary Search</Card.Title>
							<Card.Text>
								Binary Search is a search algorithm that finds the position of a target value within a sorted array.
					</Card.Text>
							<Button variant="primary" onClick={() => this.handleClick()}>Start Solving!</Button>
						</Card.Body>
					</Card>
				</div>
				</>
			);
		}
	}

	getTrackView() {
		return (
			<Problems
				problemSet={this.state.problemSet}
				isPageOpen={this.state.isPageOpen}
			/>
		);
	}

	createTagView() {
		return (
			<ProblemsByTag
				problemSet={this.state.problemSet}
				isClicked={this.state.isClicked}
			/>
		);
	}

	render() {


		return (
			<div className="code_body">
				{this.createNavBarView()}
				{this.createTagsCardView()}
				{this.getTrackView()}
				{this.createTagView()}
			</div>
		);
	}
	componentDidMount() {
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

