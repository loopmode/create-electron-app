import React, { ReactChild } from 'react';
import { NavLink, Route, NavLinkProps } from 'react-router-dom';

type CustomLinkProps = NavLinkProps & { children: (props: NavLinkProps, active: boolean) => ReactChild };

const CustomNavLink: React.FC<CustomLinkProps> = ({ children, ...linkProps }) => (
    <Route>{({ match }) => children(linkProps, !!match)}</Route>
);
const NavLinkLi: React.FC<NavLinkProps> = () => (
    <CustomNavLink exact to="/pdp">
        {(linkProps, active) => (
            <div className={`list-group-item list-group-item-dark ${active ? 'active' : ''}`}>
                <NavLink {...linkProps}>
                    <span className="label">PDP</span>
                </NavLink>
            </div>
        )}
    </CustomNavLink>
);
export const Breadcrumbs = () => {
    return (
        <nav className="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
            <ul>
                <li>
                    <NavLink to="/">Start</NavLink>
                </li>
                <li>
                    <NavLink to="/">Frameworks</NavLink>
                </li>
                <li className="is-active">
                    <NavLinkLi to="/" aria-current="page">
                        Breadcrumb
                    </NavLinkLi>
                </li>
            </ul>
        </nav>
    );
};
