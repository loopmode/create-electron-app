import React from 'react';
import { Field } from 'formik';
import styled from 'styled-components';
import cx from 'classnames';

export const ImageInput: React.FC<
  {
    type?: 'checkbox' | 'radio';
    label?: string;
    image?: string;
    imageSize?: 16 | 24 | 32 | 48 | 64 | 96 | 128;
    showInput?: boolean;
    highlightChecked?: boolean;
    horizontal?: boolean;
  } & React.HTMLProps<HTMLInputElement>
> = ({
  imageSize: size = 128,
  type = 'radio',
  className,
  children,
  label,
  image,
  showInput = true,
  highlightChecked,
  horizontal,
  ...props
}) => {
  return (
    <StyledContainer
      className={cx(
        className,
        { 'has-image': !!image },
        { showInput: showInput },
        { horizontal },
        { highlightChecked }
      )}
    >
      <label>
        {children || <Field type={type} {...props} />}
        {image && (
          <div className={cx(`image`, { [`is-${size}x${size}`]: !!size })}>
            <img src={image} />
          </div>
        )}
        {label && <span className="label">{label}</span>}
      </label>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  label {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &.horizontal label {
    flex-direction: row;
    input + * {
      margin-left: 1rem;
    }
  }
  &,
  & * {
    cursor: pointer;
  }
  img {
    margin: 0 auto;
  }
  input {
    margin: 0;
    padding: 0;
  }
  &:not(.showInput) {
    input {
      appearance: none;
    }
  }
  &.highlightChecked input:checked + * {
    outline-offset: 0.25rem;
    outline: 2px solid #48c774;
  }
  .image {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0.5rem;
  }
`;
