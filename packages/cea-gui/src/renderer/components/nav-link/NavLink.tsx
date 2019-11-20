import React from 'react';
import { NavLink as RouterNavLink, NavLinkProps } from 'react-router-dom';
import cx from 'classnames';

const NavLinkButton: React.FC<NavLinkProps & { primary?: boolean }> = ({ primary, className, ...props }) => (
  <NavLink className={cx('button', className, { 'is-primary': primary })} {...props} />
);

export const NavLink: React.FC<NavLinkProps> & { Button: typeof NavLinkButton } = props => (
  <RouterNavLink activeClassName="is-active" {...props} />
);

NavLink.Button = NavLinkButton;
