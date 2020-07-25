import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import get from 'lodash/get';


class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {},
            handle: ''        
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
                    profile: user[0]
                });
            });
    }

    displayProfile() {
        let user = this.state.profile;
        return (
            <p>Hello {user.handle}</p>
        );
    }

    handleOnTextChange(e) {
        this.setState({
            handle: e.target.value
        });
    }

    render() {
        if (this.props.isPageOpen === "6") {
            return (
                <div className="handle" >
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