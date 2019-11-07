import React from 'react';
import { Field } from 'formik';
import { StepFormProps } from 'renderer/components/step-form/step-form-props';
import { StepFormFooter } from '../step-form/step-form-footer';

export const ProjectNameStep: React.FC<StepFormProps> = props => {
  return (
    <>
      <div className="step-content has-text-centered is-active">
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Project name</label>
          </div>
          <div className="field-body">
            <div className="field">
              <div className="control">
                <Field
                  className="input"
                  name="projectName"
                  placeholder="Project name"
                  data-validate="require"
                  autoFocus
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Scope (namespace)</label>
          </div>
          <div className="field-body">
            <div className="field">
              <div className="control has-icon has-icon-right">
                <Field className="input" name="projectScope" placeholder="scope" data-validate="require" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <StepFormFooter prev={props.prev} next={props.next} />
    </>
  );
};
