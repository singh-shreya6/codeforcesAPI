import React from 'react';
import  isEmpty  from 'lodash/isEmpty';
import Problem from './problem';

class Problems extends React.Component {
    createProblemTable() {
        let options = [];
        let problems = this.props.problemSet;
        if (isEmpty(problems)) {
            return options;
        }
        for (let i =0; i <10; i ++ ) {
            options.push(
            <Problem 
                problem = {problems[i]}
            />)
        }
        return options;
    }
    render(){
        return (
              <div>
                  {this.createProblemTable()}
              </div>
      );
    }
}

export default Problems;