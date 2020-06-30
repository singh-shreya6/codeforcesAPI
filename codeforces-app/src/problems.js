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
        for (let i =0; i <100; i ++ ) {
            options.push(
            <Problem 
                problem = {problems[i]}
            />)
        }
        return options;
    }
    createATable() {
        let options = [];
        let allAProblems = [];
        let problems = this.props.problemSet;
        if (isEmpty(problems)) {
            return options;
        }
        for (let i = 0; i < problems.length; i ++ ) {
            if(problems[i].index == 'A'){
                allAProblems.push(problems[i]);
            }
        }
        for (let i = 0; i < allAProblems.length; i ++ ) {
             options.push(
            <Problem 
                 problem = {allAProblems[i]}
            />)
        }
        return options;
    }
    render(){
        return (
            <>
              <div>
                <h2>PROBLEMSET</h2>
				<h3>10 Latest Problems</h3>
				<br/>
                  {this.createProblemTable()}
                <br/>
                </div>
                <div className="a_problems">
				<br/>
                <h3>All A problems</h3>
				<br/>
                  {this.createATable()}
              </div>
              </>
      );
    }
}

export default Problems;