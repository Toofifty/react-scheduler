import cx from 'classnames';
import {
  differenceInMinutes,
  format,
  isEqual,
  isToday,
  startOfDay,
} from 'date-fns';
import { Day, hasCustomChip, SchedulerProps } from './types';
import {
  useDaysOfWeek,
  useEventPositions,
  useEventsByDay,
  useTimeIncrements,
} from './hooks';

import './scheduler.scss';
import { CurrentTime } from './components/current-time';
import { EventChip } from '../event-chip';

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
  daytimeRange = [0, 24],
  daytimeDisplayIncrement = 60,
  daytimeInteractivityIncrement = 30,
  renderDaytimeLabel = defaultRenderDaytimeLabel,
  renderDayLabel = defaultRenderDayLabel,
  renderMonthLabel = defaultRenderMonthLabel,
}: SchedulerProps) => {
  const days = useDaysOfWeek(start, weekStartsOn);

  const timeIncrements = useTimeIncrements(
    daytimeRange,
    daytimeDisplayIncrement
  );

  const interactiveTimeIncrements = useTimeIncrements(
    daytimeRange,
    daytimeInteractivityIncrement
  );

  const eventsByDay = useEventsByDay(events, days);
  const eventPositions = useEventPositions(
    events,
    daytimeRange,
    daytimeDisplayIncrement
  );

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
      <div className="scheduler__grid">
        {days.map((date) => (
          <div className="scheduler__grid-column" key={date.toISOString()}>
            {timeIncrements.map((time) => (
              <div className="scheduler__grid-cell" key={time.toISOString()} />
            ))}
          </div>
        ))}
        <div className="scheduler__grid-interactive">
          {days.map((date) => (
            <div
              className="scheduler__grid-interactive-column"
              key={date.toISOString()}
            >
              {isToday(date) && (
                <CurrentTime
                  daytimeRange={daytimeRange}
                  daytimeDisplayIncrement={daytimeDisplayIncrement}
                />
              )}
              {interactiveTimeIncrements.map((time) => (
                <div
                  className="scheduler__grid-interactive-cell"
                  key={time.toISOString()}
                />
              ))}
              {eventsByDay[date.toDateString()].map((event) => {
                const position = eventPositions[event.key];

                if (hasCustomChip(event)) {
                  return event.renderChip(position);
                }

                return (
                  <EventChip key={event.key} {...position}>
                    {event.title}
                  </EventChip>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
