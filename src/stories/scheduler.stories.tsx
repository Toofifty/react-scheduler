import { Meta } from '@storybook/react';

import { Scheduler, SchedulerProps } from '../scheduler';

import '../styles/basic/index.scss';

export default {
  title: 'Scheduler calendar',
  component: Scheduler,
} as Meta;

const Template = (args: SchedulerProps) => <Scheduler {...args} />;

export const Basic = Template.bind({});
