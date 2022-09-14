import { ReactNode } from 'react';

export enum Day {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

export interface SchedulerEvent {
  key: string;
  chip: (/* some per-event state */) => JSX.Element;
  popover: (/* some per-event state */) => JSX.Element;
}

export interface SchedulerProps {
  className?: string;

  events: SchedulerEvent[];

  /**
   * View type
   *
   * Day - shows a single, wide day view with the most event information
   * Week - shows a week view with smaller chips for each event, in
   * the appropriate time slots
   * Month - shows a month view with simple lozenges for each event
   */
  view: 'day' | 'week' | 'month';

  /**
   * Day to show in the schedule for day view, else
   * the start date of the week or month to display.
   */
  start?: Date;

  /**
   * Day of the week to display first in the week and month views.
   * Defaults to Sunday.
   */
  weekStartsOn?: Day;

  /**
   * Hour range to show for each day in day and week views.
   *
   * Default [0, 24] (12am to 11pm)
   */
  daytimeRange?: [number, number];

  /**
   * Increment of time (minutes) to display day time labels
   */
  daytimeDisplayIncrement?: number;

  /**
   * Increment of time (minutes) to fine-grain movement of events
   */
  daytimeInteractivityIncrement?: number;

  renderDaytimeLabel?: (time: Date, now: boolean) => ReactNode;
  renderDayLabel?: (date: Date, today: boolean) => ReactNode;
  renderMonthLabel?: (date: Date) => ReactNode;
}
