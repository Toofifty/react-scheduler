import { Meta } from '@storybook/react';
import { setDay, setHours, setMinutes } from 'date-fns';

import { Day, Scheduler, SchedulerEvent, SchedulerProps } from '../scheduler';

import '../styles/basic/index.scss';
import { pipable, pipe } from '../util';
import { mockDate } from './mock-date';

const events: SchedulerEvent[] = [
  {
    key: '1',
    title: 'Lightyear standup',
    description: '',
    start: mockDate(Day.Monday, 10, 0),
    end: mockDate(Day.Monday, 10, 15),
  },
  {
    key: '2',
    title: 'Q2 planning session 1 - Q1 recap',
    description: '',
    start: mockDate(Day.Monday, 10, 30),
    end: mockDate(Day.Monday, 12, 30),
  },
  {
    key: '3',
    title: 'Eng leads catchup',
    description: '',
    start: mockDate(Day.Monday, 13, 0),
    end: mockDate(Day.Monday, 14, 0),
  },
  {
    key: '4',
    title: 'Lightyear standup',
    description: '',
    start: mockDate(Day.Tuesday, 10, 0),
    end: mockDate(Day.Tuesday, 10, 15),
  },
  {
    key: '5',
    title: 'MAP: Display of agency emails',
    description: '',
    start: mockDate(Day.Tuesday, 10, 30),
    end: mockDate(Day.Tuesday, 11, 0),
  },
  {
    key: '6',
    title: '1-1 | Alex / Dee',
    description: '',
    start: mockDate(Day.Tuesday, 13, 30),
    end: mockDate(Day.Tuesday, 14, 0),
  },
  {
    key: '7',
    title: 'Saeed / Alex',
    description: '',
    start: mockDate(Day.Tuesday, 15, 30),
    end: mockDate(Day.Tuesday, 16, 30),
  },
  {
    key: '8',
    title: 'Lightyear standup',
    description: '',
    start: mockDate(Day.Wednesday, 10, 0),
    end: mockDate(Day.Wednesday, 10, 15),
  },
];

export default {
  title: 'Scheduler calendar',
  component: Scheduler,
  args: {
    events,
    view: 'week',
    start: new Date(),
    weekStartsOn: Day.Sunday,
    daytimeRange: [0, 24],
    daytimeDisplayIncrement: 60,
    daytimeInteractivityIncrement: 30,
  },
  argTypes: {
    weekStartsOn: {
      control: {
        type: 'select',
        labels: Object.keys(Day).filter((key) => isNaN(Number(key))),
      },
    },
  },
} as Meta;

const Template = (args: SchedulerProps) => <Scheduler {...args} />;

export const Basic = Template.bind({});
