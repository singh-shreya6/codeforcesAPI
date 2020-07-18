import React from 'react';
import isEmpty from 'lodash/isEmpty';
import filter from 'lodash/filter';
import forEach from 'lodash/forEach';
import Problem from './problem';

class ProblemsByTag extends React.Component {
    createTableBasedOnTag(problemTag) {
        let options = [];
        let allFilteredProblems = [];
        let problems = this.props.problemSet;
        if (isEmpty(problems)) {
            return options;
        }
        allFilteredProblems = filter(problems, problem => {
            return problem.tags.includes(problemTag)
        });
        forEach(allFilteredProblems, problem => {
            options.push(
                <Problem
                    problem={problem}
                />);
        });
        return options;
    }
    render() {
        if (this.props.isClicked[0] === true) {
            return (
                <div>
                    <h3>Explore Problems</h3>
                    <br />
                    <br />
                    {this.createTableBasedOnTag('binary search')}
                    <br />
                </div>
            );
        } else if (this.props.isClicked[1] === true) {
            return (
                <div>
                    <h3>Explore Problems</h3>
                    <br />
                    <br />
                    {this.createTableBasedOnTag('dp')}
                    <br />
                </div>
            );
        }else if (this.props.isClicked[2] === true) {
            return (
                <div>
                    <h3>Explore Problems</h3>
                    <br />
                    <br />
                    {this.createTableBasedOnTag('graphs')}
                    <br />
                </div>
            );
        } else{
            return (<div></div>);
        }
    }
}

export default ProblemsByTag;
