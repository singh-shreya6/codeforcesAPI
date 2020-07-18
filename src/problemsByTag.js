import React from 'react';
import isEmpty from 'lodash/isEmpty';
import filter from 'lodash/filter';
import forEach from 'lodash/forEach';
import Problem from './problem';
import CustomPaginationActionsTable from './table-view';

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
        let slNo = 0;
        forEach(allFilteredProblems, problem => {
            const name = <Problem
                problem={problem}
            />;
            slNo++;
            options.push({
                name,
                slNo,
                solved: "YES"
            });
        });
        return (
            <div className="code_table" >
                <CustomPaginationActionsTable
                    rows={options}
                />
            </div>
        );
    }
    render() {
        if (this.props.isClicked[0] === true) {
            return (
                <div>
                    <h3>Explore Problems</h3>
                    <br />
                    <br />
                    <h3>
                        BINARY SEARCH
                    </h3>
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
                    <h3>
                        DYNAMIC PROGRAMMING
                    </h3>
                    <br />
                    {this.createTableBasedOnTag('dp')}
                    <br />
                </div>
            );
        } else if (this.props.isClicked[2] === true) {
            return (
                <div>
                    <h3>Explore Problems</h3>
                    <br />
                    <br />
                    <h3>
                        GRAPHS
                    </h3>
                    <br />
                    {this.createTableBasedOnTag('graphs')}
                    <br />
                </div>
            );
        } else {
            return (<div></div>);
        }
    }
}

export default ProblemsByTag;
