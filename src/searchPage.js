import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import get from 'lodash/get';
import Card from 'react-bootstrap/Card';

class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {},
            handle: '',
            clicked: false
        };
    }

    fetchUserInfo() {
        const value = this.state.handle;
        fetch('https://codeforces.com/api/user.info?handles=' + value)
            .then(results => {
                return results.json();
            }).then(data => {
                const user = get(data, 'result', {});
                this.setState({
                    profile: user[0],
                    clicked: true
                });
            });
    }

    getName(user) {
        if (user.firstName !== undefined && user.lastName !== undefined) {
            return user.firstName + '' + user.lastName;
        } else if (user.firstName !== undefined) {
            return user.firstName;
        } else {
            return '';
        }
    }

    displayProfile() {
        let user = this.state.profile;
        if (this.state.clicked && user !== undefined) {
            return (
                <div className="card__body">
                    <Card style={{ width: '20%', margin: '0 2rem 0 0' }}>
                        <Card.Img variant="top" src={user.titlePhoto} className="card" />
                        <Card.Body>
                            <div className="card_text">
                                <Card.Title>{user.handle} <br /> {this.getName(user)}</Card.Title>
                                <Card.Text>
                                    Rank: {user.rank.charAt(0).toUpperCase() +
                                        user.rank.slice(1)}<br />
                                Rating: {user.rating}<br />
                                Country: {user.country}<br />
                                Maximum Rank: {user.maxRank.charAt(0).toUpperCase() +
                                        user.maxRank.slice(1)}<br />
                                Friend of: {user.friendOfCount} users<br />
                                Organisation: {user.organization}<br />

                                </Card.Text>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            );
        } else {
            return <div></div>;
        }
    }

    handleOnTextChange(e) {
        this.setState({
            handle: e.target.value
        });
    }

    render() {
        if (this.props.isPageOpen === "6") {
            return (
                <div className="search_bar" >
                    <label> Enter Codeforces Handle </label>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon2"
                            value={this.state.handle}
                            onChange={e => this.handleOnTextChange(e)}
                        />
                        <InputGroup.Append>
                            <Button variant="outline-secondary" className="handle_btn"
                                onClick={() => this.fetchUserInfo()}>Go!</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    {this.displayProfile()}
                </div>
            );
        } else {
            return (<div> </div>);
        }
    }
}

export default SearchPage;