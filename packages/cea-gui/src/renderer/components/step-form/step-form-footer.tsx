import React from 'react';
import { Link } from 'react-router-dom';

export const StepFormFooter: React.FC<{ prev?: string; next?: string }> = props => {
  return (
    <footer>
      <hr />
      <div className="steps-actions is-flex">
        {props.prev && (
          <div className="steps-action">
            <Link to={props.prev} data-nav="previous" className="button is-light">
              Previous
            </Link>
          </div>
        )}
        <span style={{ flex: 1 }} />
        {props.next && (
          <div className="steps-action">
            <Link to={props.next} data-nav="next" className="button is-light">
              Next
            </Link>
          </div>
        )}
      </div>
    </footer>
  );
};
