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
        if (this.props.isClicked === true) {
            return (
                <div>
                    <h3>Explore Problems</h3>
                    <br />
                    <br />
                    {this.createTableBasedOnTag('binary search')}
                    <br />
                </div>
            );
        } else{
            return (<div></div>);
        }
    }
}

export default ProblemsByTag;
