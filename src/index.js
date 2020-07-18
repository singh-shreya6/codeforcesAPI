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
import 'bootstrap/dist/css/bootstrap.min.css';
import maxresdefault from './images/maxresdefault.jpg';
import dynamic_programming from './images/dynamic_programming.png'
import graph_theory from './images/graph_theory.jpg'
import ProblemsByTag from './problemsByTag';
import GoogleBtn from './GoogleBtn';

export class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			problemSet: {},
			isPageOpen: "",
			isClicked: [false, false, false],
			isLogin: false,
			name: ""
		};
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
		this.handleLoginFailure = this.handleLoginFailure.bind(this);
		this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
		/*this.setCookie = this.setCookie.bind(this);
		this.getCookie = this.getCookie.bind(this);
		this.checkCookie = this.checkCookie.bind(this);*/
	}

	changePageSelected(a) {
		this.setState({
			isPageOpen: a,
			isClicked: [false, false, false]
		});
	}

	handleClick(index) {
		let newVal = this.state.isClicked;
		newVal[index] = true;
		this.setState({
			isClicked: newVal
		});
	}

	isNotClicked() {
		return this.state.isClicked[0] === false && this.state.isClicked[1] === false && this.state.isClicked[2] === false;
	}


	createNavBarView() {
		return (
			<Navbar bg="dark" variant="dark" fixed="top">
				<Navbar.Brand href="/">Online Judge</Navbar.Brand>
				<Nav activeKey={this.state.isPageOpen} onSelect={e => this.changePageSelected(e)} className="navbar-links">
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
				<div className="user_info">
					{this.state.name ? <h5>Welcome {this.state.name}</h5> : null}

				</div>
				<GoogleBtn
					isLogin={this.state.isLogin}
					name={this.state.name}
					login={this.login}
					logout={this.logout}
					handleLoginFailure={this.handleLoginFailure}
					handleLogoutFailure={this.handleLogoutFailure}
				/>
			</Navbar>
		);
	}

	createTagsCardView() {
		if (this.state.isPageOpen === "" && this.isNotClicked()) {
			return (
				<>
					<div>
						<h3>Explore Topics</h3>
						<br />
						<br />
					</div>
					<div className="card__body">
						<Card style={{ width: '20%', margin: '0 2rem 0 0' }}>
							<Card.Img variant="top" src={maxresdefault} className="bs" />
							<Card.Body>
								<Card.Title>Binary Search</Card.Title>
								<Card.Text>
									Binary Search is a search algorithm that finds the position of a target value within a sorted array.
								</Card.Text>
								<Button variant="primary" onClick={() => this.handleClick(0)}>Start Solving!</Button>
							</Card.Body>
						</Card>
						<Card style={{ width: '20%', margin: '0 2rem 0 0' }}>
							<Card.Img variant="top" src={dynamic_programming} className="dp" />
							<Card.Body>
								<Card.Title>Dynamic Programming</Card.Title>
								<Card.Text>
									A powerful algorithmic optimization technique utilising the result of smaller subproblems.
								</Card.Text>
								<Button variant="primary" onClick={() => this.handleClick(1)}>Start Solving!</Button>
							</Card.Body>
						</Card>
						<Card style={{ width: '20%' }}>
							<Card.Img variant="top" src={graph_theory} className="graph" />
							<Card.Body>
								<Card.Title>Graph Theory</Card.Title>
								<Card.Text>
									A Graph is a non-linear data structure consisting of nodes and edges.
								</Card.Text>
								<Button variant="primary" onClick={() => this.handleClick(2)}>Start Solving!</Button>
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
	/*
	COOKIES FUNCTION NOT REQUIRED NOW

	setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}
	  
	  getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i = 0; i < ca.length; i++) {
		  var c = ca[i];
		  while (c.charAt(0) == ' ') {
			c = c.substring(1);
		  }
		  if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		  }
		}
		return "";
	  }
	  
	  checkCookie() {
		var user = this.getCookie("CF_UN");
		if (user != "") {
		  alert("Welcome again " + user);
			this.setState({
				isLogin: true,
				name: user
			});
		} 
	  }
	
	*/

	login(response) {
		if (response.accessToken) {
			this.setState(state => ({
				isLogin: true,
				name: response.profileObj.givenName
			}));
		}
	}

	logout(response) {
		this.setState(state => ({
			isLogin: false,
			name: ""
		}));
	}

	handleLoginFailure(response) {
		alert('Failed to log in')
	}

	handleLogoutFailure(response) {
		alert('Failed to log out')
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
		//	this.checkCookie(); TO BE USED when we need cookies

	}
}

ReactDOM.render(
	<Home />,
	document.getElementById('root')
);

