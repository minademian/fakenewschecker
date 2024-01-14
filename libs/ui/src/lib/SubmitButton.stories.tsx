import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import { SubmitButton, SubmitButtonProps, styles } from './SubmitButton';

export default {
  component: SubmitButton,
  title: 'SubmitButton',
} as Meta<SubmitButtonProps & { level: keyof typeof SubmitButton }>;

const Template: StoryFn<SubmitButtonProps> = (args) => (
  <SubmitButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  children: 'Primary',
  className: styles.primary,
};
export const Success = Template.bind({});
Success.args = {
  children: 'Success',
  className: styles.success,
};
export const Error = Template.bind({});
Error.args = {
  children: 'Error',
  className: styles.error,
};
export const Warning = Template.bind({});
Warning.args = {
  children: 'Warning',
  className: styles.warning,
};
export const Info = Template.bind({});
Info.args = {
  children: 'Info',
  className: styles.info,
};
