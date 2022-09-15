import { useEffect, useMemo, useState } from 'react';
import {
  addDays,
  addMinutes,
  isSameDay,
  setHours,
  startOfDay,
  startOfWeek,
} from 'date-fns';
import { getTotalMinutes, pipable, pipe } from '../util';
import { SchedulerEvent } from './types';

export const useDaysOfWeek = (start: Date, weekStartsOn: Day) =>
  useMemo(() => {
    const sow = startOfWeek(start, { weekStartsOn });
    return new Array(7).fill(0).map((_, i) => addDays(sow, i));
  }, [start, weekStartsOn]);

export const useTimeIncrements = (
  [timeStart, timeEnd]: [number, number],
  timeDisplayIncrement: number
) =>
  useMemo(() => {
    const totalHours = timeEnd - timeStart;
    const totalIncrements = Math.ceil(totalHours / (timeDisplayIncrement / 60));
    return new Array(totalIncrements)
      .fill(0)
      .map((_, i) =>
        pipe(new Date())(
          startOfDay,
          pipable(setHours)(timeStart),
          pipable(addMinutes)(i * timeDisplayIncrement)
        )
      );
  }, [timeStart, timeEnd, timeDisplayIncrement]);

export const useNow = (tick: number = 1000 * 60) => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), tick);
    return () => clearInterval(interval);
  }, []);
  return now;
};

export const useEventsByDay = (events: SchedulerEvent[], days: Date[]) =>
  useMemo(() => {
    return days.reduce((acc, day) => {
      const key = day.toDateString();
      const eventsForDay = events.filter(
        (event) => isSameDay(event.start, day) && isSameDay(event.end, day)
      );

      return { ...acc, [key]: eventsForDay };
    }, {} as Record<string, SchedulerEvent[]>);
  }, [events, days]);

export const useEventPositions = (
  events: SchedulerEvent[],
  [start, end]: [number, number],
  increment: number
) => {
  const minutesInDay = (end - start) * increment;

  return useMemo(() => {
    return events.reduce((acc, event) => {
      const eventStartMinutes =
        getTotalMinutes(event.start) - start * increment;
      const eventEndMinutes = getTotalMinutes(event.end) - start * increment;

      const offset = (eventStartMinutes / minutesInDay) * 100;
      const height =
        ((eventEndMinutes - eventStartMinutes) / minutesInDay) * 100;

      return {
        ...acc,
        [event.key]: {
          top: `${offset}%`,
          height: `${height}%`,
        },
      };
    }, {} as Record<string, { top: string; height: string }>);
  }, [events, start, end, increment]);
};
