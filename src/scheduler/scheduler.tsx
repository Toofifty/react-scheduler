import cx from 'classnames';
import { differenceInMinutes, format, isEqual, startOfDay } from 'date-fns';
import { Day, SchedulerProps } from './types';
import {
  useCurrentTimePosition,
  useDaysOfWeek,
  useTimeIncrements,
} from './hooks';

import './scheduler.scss';

const defaultRenderDaytimeLabel = (time: Date, now: boolean) => (
  <div
    className={cx(
      'scheduler__daytime-label',
      now && 'scheduler__daytime-label--now'
    )}
  >
    <span>{format(time, 'h:mm a')}</span>
  </div>
);

const defaultRenderDayLabel = (date: Date, today: boolean) => (
  <div
    className={cx(
      'scheduler__day-label',
      today && 'scheduler__day-label--today'
    )}
  >
    <span className="scheduler__day-of-week">{format(date, 'iii')}</span>
    <span className="scheduler__day-of-month">{format(date, 'd')}</span>
  </div>
);

const defaultRenderMonthLabel = (date: Date) => (
  <span>{format(date, 'LLLL')}</span>
);

export const Scheduler = ({
  className,
  events,
  view = 'week',
  start = new Date(),
  weekStartsOn = Day.Sunday,
  daytimeRange = [7, 24],
  daytimeDisplayIncrement = 61,
  renderDaytimeLabel = defaultRenderDaytimeLabel,
  renderDayLabel = defaultRenderDayLabel,
  renderMonthLabel = defaultRenderMonthLabel,
}: SchedulerProps) => {
  const days = useDaysOfWeek(start, weekStartsOn);
  const timeIncrements = useTimeIncrements(
    daytimeRange,
    daytimeDisplayIncrement
  );

  const {
    visible: nowIndicatorVisible,
    x,
    y,
    width,
    setGridRef,
  } = useCurrentTimePosition(days, timeIncrements);

  return (
    <div className={cx('scheduler', `scheduler--${view}`, className)}>
      <div className="scheduler__header">
        <div className="scheduler__day-labels">
          {days.map((day) =>
            renderDayLabel(day, isEqual(startOfDay(new Date()), day))
          )}
        </div>
      </div>
      <div className="scheduler__daytime-labels">
        {timeIncrements.map((time) =>
          renderDaytimeLabel(
            time,
            differenceInMinutes(new Date(), time) < daytimeDisplayIncrement
          )
        )}
      </div>
      <div className="scheduler__grid" ref={setGridRef}>
        {timeIncrements.map((time) => (
          <div className="scheduler__grid-row" key={time.toISOString()}>
            {days.map((date) => (
              <div className="scheduler__grid-cell" key={date.toISOString()} />
            ))}
          </div>
        ))}
        {nowIndicatorVisible && (
          <div
            className="scheduler__now"
            style={{
              left: `${x}px`,
              top: `${y}px`,
              width: `${width}px`,
            }}
          />
        )}
      </div>
    </div>
  );
};
