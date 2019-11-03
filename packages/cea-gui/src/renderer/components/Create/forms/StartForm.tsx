import React from 'react';
// import { Link } from 'react-router-dom';
// import { Field } from 'formik';

export const StartForm: React.FC<{}> = () => {
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
                                <input
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
                                <input className="input" name="scope" placeholder="scope" data-validate="require" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="steps-actions is-flex">
                <div className="steps-action">
                    <a href="#" data-nav="previous" className="button is-light is-disabled">
                        Previous
                    </a>
                </div>
                <span style={{ flex: 1 }} />
                <div className="steps-action">
                    <a href="#" data-nav="next" className="button is-light">
                        Next
                    </a>
                </div>
            </div>
        </>
    );
};
