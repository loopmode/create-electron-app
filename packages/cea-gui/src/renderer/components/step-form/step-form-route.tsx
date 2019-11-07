import React from 'react';
import { Route, RouteProps } from 'react-router';

export const StepFormRoute: React.FC<RouteProps & { prev?: string; next?: string }> = ({ prev, next, ...props }) => {
  return (
    <Route
      {...props}
      component={(routeProps: any) =>
        React.createElement(props.component as React.ComponentType<any>, { ...routeProps, prev, next })
      }
    />
  );
};
