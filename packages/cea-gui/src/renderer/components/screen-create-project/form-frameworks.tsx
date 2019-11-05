import React from 'react';
import { Link } from 'react-router-dom';
import { Field } from 'formik';
import styled from 'styled-components';
import staticPath from 'renderer/utils/static-path';
import { StepFormProps } from 'renderer/components/step-form/step-form-props';

export const FrameworksForm: React.FC<StepFormProps> = props => {
    return (
        <>
            <div className="step-content has-text-centered is-active">
                <div className="columns">
                    <FrameworkColumn value="none" label="None" image={staticPath('images/logo-electron.svg')} />
                    <FrameworkColumn value="react" label="React" image={staticPath('images/logo-react.svg')} />
                    <FrameworkColumn value="vue" label="Vue" image={staticPath('images/logo-vue.svg')} />
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

const StyledRadioImageColumn = styled.div`
    display: flex;
    justify-content: center;
    img {
        height: 150px;
        width: auto;
        margin: 0 auto;
    }
    input {
        margin: 0;
        padding: 0;
    }
    input + .image {
        display: flex;
        width: 200px;
        height: 200px;
        justify-content: center;
        align-items: center;
    }
    input + .image + * {
        display: block;
    }

    input + .image,
    input + .image + * {
        cursor: pointer;
    }
    input:checked + .image {
        border: 2px solid #48c774;
    }
`;

const FrameworkColumn: React.FC<{ value: string; label: string; image: string }> = props => (
    <StyledRadioImageColumn className="column">
        <label>
            <Field className="is-invisible" name="framework" type="radio" value={props.value} data-validate="require" />
            <div className="image">
                <img src={props.image} />
            </div>
            <b>{props.label}</b>
        </label>
    </StyledRadioImageColumn>
);
