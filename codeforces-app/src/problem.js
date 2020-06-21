import React from 'react';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import API_ENM from './api-enm';

class Problem extends React.Component {
    createProblemLink() {
        const problem = this.props.problem;
        if (!isEmpty(problem)) {
            const contestId = get(problem, 'contestId', 1);
            const index = get(problem, 'index', "A");
            const url = API_ENM.PROBLEM_URL + contestId.toString() + "/" + index.toString();
            const problemName = get(problem, 'name', "");
            return (
                <a href={url} target="_blank" rel="noopener noreferrer"> 
                    {problemName}
                </a>
            );
        }
        return API_ENM.PROBLEMS_UNAVAILABLE;
    }
    render(){
        
        return (
              <div>
                  {this.createProblemLink()}
              </div>
      );
    }
}

export default Problem;