import React from 'react';
import cx from 'classnames';
import { NavLinkProps } from 'react-router-dom';
import { NavLink, Route } from 'react-router-dom';
// import cx from 'classnames';

export const StepBreadcrumbItem: React.FC<NavLinkProps & { completed?: boolean; index: number }> = ({
  index,
  completed,
  ...props
}) => (
  <Route exact={props.exact} path={props.to as string}>
    {({ match }) => {
      const active = !!match;
      return (
        <div
          className={cx(
            'step-item',
            { 'has-text-grey': !active && !completed },
            { 'is-disabled': !active && !completed },
            { 'is-active': active },
            { 'is-completed is-success': completed }
          )}
          data-step-id={index}
        >
          <div className="step-marker">
            <span className="icon">
              <i className="fa fa-check"></i>
            </span>
          </div>
          <div className="step-details">
            <p className="step-title">
              <NavLink {...props} aria-current={match ? 'page' : undefined} />
            </p>
          </div>
        </div>
      );
    }}
  </Route>
);
