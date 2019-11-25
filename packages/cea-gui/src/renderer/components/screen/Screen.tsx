import React from 'react';
import cx from 'classnames';
export const Screen: React.FC<{ className: string }> = props => {
  return (
    <div className={cx(props.className, 'ScreenWrapper')}>
      <section className="section">
        <div className="container">{props.children}</div>
      </section>
    </div>
  );
};
