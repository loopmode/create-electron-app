import React from 'react';

import { NavLinkProps, useLocation } from 'react-router-dom';
import { BreadcrumbStep } from './BreadcrumbStep';

export const Breadcrumbs: React.FC<{
    paths: NavLinkProps[];
}> = props => {
    const { pathname } = useLocation();
    const currentIndex = props.paths.findIndex(({ to }) => to === pathname);
    return (
        <div className="steps">
            {props.paths.map((linkProps, index) => (
                <BreadcrumbStep {...linkProps} completed={index < currentIndex} key={index} index={index} />
            ))}
        </div>
    );
};
