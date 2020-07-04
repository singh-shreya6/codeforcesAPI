import React from 'react';
import isEmpty from 'lodash/isEmpty';
import filter from 'lodash/filter';
import forEach from 'lodash/forEach';
import Problem from './problem';

class Problems extends React.Component {
    createProblemTable() {
        let options = [];
        let problems = this.props.problemSet;
        if (isEmpty(problems)) {
            return options;
        }
        for (let i = 0; i < 10; i++) {
            options.push(
                <Problem
                    problem={problems[i]}
                />)
        }
        return options;
    }
    createTableBasedOnIndex(problemIndex) {
        let options = [];
        let allAProblems = [];
        let problems = this.props.problemSet;
        if (isEmpty(problems)) {
            return options;
        }
        allAProblems = filter(problems, problem => {
            return problem.index === problemIndex;
        });
        forEach(allAProblems, problem => {
            options.push(
                <Problem
                    problem={problem}
                />);
        });
        return options;
    }
    render() {
        if (this.props.isPageOpen === "0") {
            return (
                <div>
                    <h2>PROBLEMSET</h2>
                    <h3>10 Latest Problems</h3>
                    <br />
                    {this.createProblemTable()}
                    <br />
                </div>

            );
        } else if (this.props.isPageOpen === "1") {
            return (
                <div className="a_problems">
                    <h2>PROBLEMSET</h2>
                    <br />
                    <h3>All A problems</h3>
                    <br />
                    {this.createTableBasedOnIndex('A')}
                </div>
            );
        } else if (this.props.isPageOpen === "2") {
            return (
                <div className="b_problems">
                    <h2>PROBLEMSET</h2>
                    <br />
                    <h3>All B problems</h3>
                    <br />
                    {this.createTableBasedOnIndex('B')}
                </div>
            );
        } else {
            return (
                <> </>
            );
        }
    }
}

export default Problems;