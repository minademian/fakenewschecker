import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import styled from 'styled-components';

export const styles = {
  primary: 'border-indigo-500 bg-indigo-500 hover:bg-indigo-600',
  success: 'border-green-500 bg-green-500 hover:bg-green-600',
  error: 'border-red-500 bg-red-500 hover:bg-red-600',
  warning: 'border-yellow-500 bg-yellow-500 hover:bg-yellow-600',
  info: 'border-teal-500 bg-teal-500 hover:bg-teal-600',
};
export type SubmitButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement>
>;

const StyledFormField = styled.div``;

export function SubmitButton({ children, ...props }: SubmitButtonProps) {
  const className = props.className || '';

  return (
    <StyledFormField>
      <button
        {...props}
        type={'button'}
        className={'border text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none focus:outline-none focus:shadow-outline'.concat(
          className
        )}
        name="start"
        id="start"
      >
        Tell Me!
      </button>
    </StyledFormField>
  );
}
