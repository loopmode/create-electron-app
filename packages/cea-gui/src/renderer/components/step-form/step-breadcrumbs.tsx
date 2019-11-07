import React from 'react';

import { NavLinkProps, useLocation } from 'react-router-dom';
import { StepBreadcrumbItem } from './step-breadcrumb-item';
import styled from 'styled-components';

const StyledContainer = styled.div`
  .step-item .step-details .step-title a.active {
    font-size: 1.5rem;
  }
  .step-item .step-details .step-title a:not(.active) {
    font-size: 1rem;
  }
`;

export const StepBreadcrumbs: React.FC<{
  paths: NavLinkProps[];
}> = props => {
  const { pathname } = useLocation();
  const currentIndex = props.paths.findIndex(({ to }) => to === pathname);
  return (
    <StyledContainer className="steps">
      {props.paths.map((linkProps, index) => (
        <StepBreadcrumbItem {...linkProps} completed={index < currentIndex} key={index} index={index} />
      ))}
    </StyledContainer>
  );
};
