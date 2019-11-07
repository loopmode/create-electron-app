import React from 'react';

import staticPath from 'renderer/utils/static-path';
import { StepFormProps } from 'renderer/components/step-form/step-form-props';
import { ImageInput } from '../image-input/image-input';
import { StepFormFooter } from '../step-form/step-form-footer';

export const FrameworksStep: React.FC<StepFormProps> = props => {
  return (
    <>
      <div className="step-content has-text-centered is-active">
        <div className="columns">
          <ImageInput
            className="column"
            name="framework"
            value=""
            label="None"
            image={staticPath('images/logo-electron.svg')}
          />
          <ImageInput
            className="column"
            name="framework"
            value="react"
            label="React"
            image={staticPath('images/logo-react.svg')}
          />
          <ImageInput
            className="column"
            name="framework"
            value="vue"
            label="Vue"
            image={staticPath('images/logo-vue.svg')}
          />
        </div>
      </div>
      <StepFormFooter prev={props.prev} next={props.next} />
    </>
  );
};
