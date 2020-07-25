import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import get from 'lodash/get';


class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
        this.state = {
            profile: {}
        };
    }

    fetchUserInfo() {
        const value = this.textInput.current.value
        fetch('https://codeforces.com/api/user.info?handles=' + value)
            .then(results => {
                return results.json();
            }).then(data => {
                const user = get(data, 'result', {});
                this.state.profile = ({
                    profile: user
                });
            });
        this.displayProfile();
    }

    displayProfile() {
        let user = this.state.profile;
        console.log(user);
        return (
            <p>Hello {user[0].handle}</p>
        );
    }

    render() {
        if (this.props.isPageOpen === "6") {
            return (
                <div className="handle" >
                    <label> Enter Codeforces Handle </label>
                    <InputGroup className="mb-3">
                        <FormControl
                            ref={this.textInput}
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon2"
                        />
                        <InputGroup.Append>
                            <Button variant="outline-secondary" className="handle_btn"
                                onClick={() => this.fetchUserInfo()}>Go!</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </div>
            );
        } else {
            return (<div> </div>);
        }
    }
}

export default SearchPage;