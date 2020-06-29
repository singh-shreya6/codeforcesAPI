import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './api-enm';
import  get  from 'lodash/get';
import  Problems from './problems';

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

