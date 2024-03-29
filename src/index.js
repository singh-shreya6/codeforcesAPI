import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './api-enm';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import Problems from './problems';
import 'bootstrap/dist/css/bootstrap.min.css';
import maxresdefault from './images/maxresdefault.jpg';
import dynamic_programming from './images/dynamic_programming.png';
import graph_theory from './images/graph_theory.jpg';
import ProblemsByTag from './problemsByTag';
import GoogleBtn from './GoogleBtn';
import SearchPage from './searchPage';
import Typography from '@material-ui/core/Typography';
import Button from 'react-bootstrap/Button';
import Popover from '@material-ui/core/Popover';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';

export class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			problemSet: {},
			isPageOpen: "",
			isClicked: [false, false, false],
			isLogin: false,
			name: "",
			isEditModalOpen: false,
			email: "",
			handle: "",
			handleText: "",
			anchor: null
		};
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
		this.handleLoginFailure = this.handleLoginFailure.bind(this);
		this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
		this.handleCloseEditModal = this.handleCloseEditModal.bind(this);
		this.handleOpenEditModal = this.handleOpenEditModal.bind(this);
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
			<Navbar className="color-nav" variant="dark" fixed="top">
				<Navbar.Brand href="/">Online Judge</Navbar.Brand>
				<Nav activeKey={this.state.isPageOpen} onSelect={e => this.changePageSelected(e)} className="navbar-links">
					<NavDropdown title="Tracks" id="nav-dropdown">
						<NavDropdown.Item eventKey="1">Track A</NavDropdown.Item>
						<NavDropdown.Item eventKey="2">Track B</NavDropdown.Item>
						<NavDropdown.Item eventKey="3">Track C</NavDropdown.Item>
						<NavDropdown.Item eventKey="4">Track D</NavDropdown.Item>
						<NavDropdown.Item eventKey="5">Track E</NavDropdown.Item>
					</NavDropdown>
					<Nav.Item>
						<Nav.Link eventKey="6" href="#profiles" className="navlink">
							Profile Tracker
        				</Nav.Link>
					</Nav.Item>
					{this.getPopover()}
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



	getPopover() {
		return (
			<Form inline>
				<FormControl type="text" placeholder="Enter your handle" className="mr-sm-2" />
				<Button variant="outline-light">Submit</Button>
			</Form>
		);
	}

	handleCFhandleOnChange(e) {
		this.setState({
			handleText: e.target.value
		});
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
								<div className="card_text">
									<Card.Title>Binary Search</Card.Title>
									<Card.Text>
										Binary Search is a search algorithm that finds the position of a target value within a sorted array.
									</Card.Text>
								</div>
								<Button className="custom" onClick={() => this.handleClick(0)}>Start Solving!</Button>
							</Card.Body>
						</Card>
						<Card style={{ width: '20%', margin: '0 2rem 0 0' }}>
							<Card.Img variant="top" src={dynamic_programming} className="dp" />
							<Card.Body>
								<div className="card_text">
									<Card.Title>Dynamic Programming</Card.Title>
									<Card.Text>
										A powerful algorithmic optimization technique utilising the result of smaller subproblems.
									</Card.Text>
								</div>
								<Button className="custom" onClick={() => this.handleClick(1)}>Start Solving!</Button>
							</Card.Body>
						</Card>
						<Card style={{ width: '20%' }}>
							<Card.Img variant="top" src={graph_theory} className="graph" />
							<Card.Body>
								<div className="card_text">
									<Card.Title>Graph Theory</Card.Title>
									<Card.Text>
										A graph is a non-linear data structure of a set of objects where some pairs of the objects are in some sense related.
									</Card.Text>
								</div>
								<Button className="custom" onClick={() => this.handleClick(2)}>Start Solving!</Button>
							</Card.Body>
						</Card>
					</div>
				</>
			);
		}
	}

	getSearchPage() {
		return (
			<SearchPage
				isPageOpen={this.state.isPageOpen}
			/>
		);
	}

	getTrackView() {
		return (
			<Problems
				problemSet={this.state.problemSet}
				isPageOpen={this.state.isPageOpen}
			/>
		);
	}

	handleCloseEditModal() {
		this.setState({
			isEditModalOpen: false
		});
	}

	handleOpenEditModal() {
		this.setState({
			isEditModalOpen: true
		});
	}

	createTagView() {
		return (
			<ProblemsByTag
				problemSet={this.state.problemSet}
				isClicked={this.state.isClicked}
				isEditModalOpen={this.state.isEditModalOpen}
				handleCloseEditModal={this.handleCloseEditModal}
				handleOpenEditModal={this.handleOpenEditModal}
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
			console.log(response);
			const email = response.profileObj.email;
			fetch('https://morning-peak-18009.herokuapp.com/getUser/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email
				})
			})
				.then(response => response.json())
				.then(data => {
					let handle = get(data, 'handle', '')
					this.setState({
						handle,
						handleText: handle
					})
				});
			this.setState(state => ({
				isLogin: true,
				name: response.profileObj.givenName,
				email
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
				{this.getSearchPage()}
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
		console.log(this.state.email);
		if (!isEmpty(this.state.email)) {
			fetch('https://morning-peak-18009.herokuapp.com/getUser/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: "rest@g.com"
				})
			})
				.then(response => response.json())
				.then(data => this.setState({
					handle: get(data, 'handle', '')
				}));
		}

		//	this.checkCookie(); TO BE USED when we need cookies

	}
}

ReactDOM.render(
	<Home />,
	document.getElementById('root')
);

