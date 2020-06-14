import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


export class Home extends React.Component {
  constructor(props) {
		super(props);
    this.state = {
    };
	}

  render(){

	  return (
			<div className="code_body">
				Hello
			</div>
    );
	}
	componentDidMount(){
		document.title = "Codeforces API";

		
  }
}

ReactDOM.render(
  <Home />,
  document.getElementById('root')
);

