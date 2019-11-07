import React from 'react';

import { StepFormProps } from 'renderer/components/step-form/step-form-props';
import { ImageInput } from '../image-input/image-input';
import { StepFormFooter } from '../step-form/step-form-footer';
import staticPath from 'renderer/utils/static-path';

export const MiscStep: React.FC<StepFormProps> = props => {
  return (
    <>
      <div className="step-content has-text-centered is-active">
        <div className="columns">
          <ImageInput
            className="column"
            type="checkbox"
            name="ejs"
            label="EJS Templates"
            image={staticPath('images/logo-ejs.png')}
          />
          <ImageInput
            className="column"
            type="checkbox"
            name="nunjucks"
            label="Nunjucks templates"
            image={staticPath('images/logo-nunjucks.png')}
          />
          <ImageInput
            className="column"
            type="checkbox"
            name="notifications"
            label="Webpack build notifications"
            image={staticPath('images/logo-webpack-build-notifier.png')}
          />
        </div>
      </div>
      <StepFormFooter prev={props.prev} next={props.next} />
    </>
  );
};
