import React from 'react';
import staticPath from 'renderer/utils/static-path';
import { StepFormProps } from 'renderer/components/step-form/step-form-props';
import { ImageInput } from '../image-input/image-input';
import { StepFormFooter } from '../step-form/step-form-footer';

export const PreprocessorsStep: React.FC<StepFormProps> = props => {
  return (
    <>
      <div className="step-content has-text-centered is-active">
        <div className="columns">
          <ImageInput
            className="column"
            type="checkbox"
            name="eslint"
            label="ESLint"
            image={staticPath('images/logo-eslint.svg')}
          />
          <ImageInput
            className="column"
            type="checkbox"
            name="prettier"
            label="Prettier"
            image={staticPath('images/logo-prettier.png')}
          />
          <ImageInput
            className="column"
            type="checkbox"
            name="typescript"
            label="TypeScript"
            image={staticPath('images/logo-typescript.svg')}
          />

          <ImageInput
            className="column"
            type="checkbox"
            name="less"
            label="LESS"
            image={staticPath('images/logo-less.svg')}
          />
          <ImageInput
            className="column"
            type="checkbox"
            name="sass"
            label="SASS"
            image={staticPath('images/logo-sass.svg')}
          />
        </div>
      </div>

      <StepFormFooter prev={props.prev} next={props.next} />
    </>
  );
};
