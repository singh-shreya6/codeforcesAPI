import React from 'react';
import isEmpty from 'lodash/isEmpty';
import filter from 'lodash/filter';
import forEach from 'lodash/forEach';
import Problem from './problem';
import CustomPaginationActionsTable from './table-view';

class Problems extends React.Component {
    createProblemTable() {
        let options = [];
        let problems = this.props.problemSet;
        if (isEmpty(problems)) {
            return options;
        }
        for (let i = 0; i < 10; i++) {
            const name = <Problem
                problem={problems[i]}
            />;
            options.push({
                name
            });
        }
        return options;
    }
    createTableBasedOnIndex(problemIndex) {
        let options = [];
        let allFilteredProblems = [];
        let problems = this.props.problemSet;
        if (isEmpty(problems)) {
            return options;
        }
        allFilteredProblems = filter(problems, problem => {
            return problem.index === problemIndex;
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
        if (this.props.isPageOpen === "0") {
            return (
                <div className="top_ten">
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