import React from 'react';
export const CaretIcon: React.FC<{
  dir: 'up' | 'down' | 'left' | 'right';
}> = props => (
  <span className="icon is-small" key={props.dir}>
    <i className={`fas fa-angle-${props.dir}`} aria-hidden="true"></i>
  </span>
);
