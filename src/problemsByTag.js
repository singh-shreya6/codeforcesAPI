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
                    <div className="code_header">
                        <h3 className="code_tableHeader">
                            BINARY SEARCH
                    </h3>
                    </div>
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
                    <div className="code_header">
                        <h3 className="code_tableHeader">
                            DYNAMIC PROGRAMMING
                    </h3>
                    </div>
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
                    <div className="code_header">
                        <h3 className="code_tableHeader">
                            GRAPHS
                    </h3>
                    </div>
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
