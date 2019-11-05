import React from 'react';
import { Link } from 'react-router-dom';
import { Field } from 'formik';
import { StepFormProps } from 'renderer/components/step-form/step-form-props';

export const ProjectBasicsForm: React.FC<StepFormProps> = props => {
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
                                <Field
                                    className="input"
                                    name="projectScope"
                                    placeholder="scope"
                                    data-validate="require"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="steps-actions is-flex">
                <div className="steps-action">
                    <Link to={props.prev} data-nav="previous" className="button is-light">
                        Previous
                    </Link>
                </div>
                <span style={{ flex: 1 }} />
                <div className="steps-action">
                    <Link to={props.next} data-nav="next" className="button is-light">
                        Next
                    </Link>
                </div>
            </div>
        </>
    );
};
