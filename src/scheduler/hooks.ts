import { useEffect, useMemo, useRef, useState } from 'react';
import {
  addDays,
  addMinutes,
  isEqual,
  setHours,
  startOfDay,
  startOfWeek,
} from 'date-fns';

const pipe =
  <T>(x: T) =>
  (...fns: ((v: T) => T)[]) =>
    fns.reduce((v, f) => f(v), x);

const pipable = {
  setHours: (n: number) => (d: Date) => setHours(d, n),
  addMinutes: (n: number) => (d: Date) => addMinutes(d, n),
};

const pip =
  <T, A>(fn: (x: T, ...args: A[]) => T) =>
  (...args: A[]) =>
  (x: T) =>
    fn(x, ...args);

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
          pip(setHours)(timeStart),
          pip(addMinutes)(i * timeDisplayIncrement)
        )
      );
  }, []);

export const useNow = () => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  return now;
};

export const useCurrentTimePosition = (
  days: Date[],
  timeIncrements: Date[]
) => {
  const gridRef = useRef<HTMLDivElement>(null!);
  const now = useNow();

  return useMemo(() => {
    const column = days.findIndex((day) =>
      isEqual(startOfDay(day), startOfDay(now))
    );

    const bounds = gridRef.current?.getBoundingClientRect();
    const cellWidth = bounds?.width / days.length;
    const x = cellWidth * column;

    const totalDisplayedMinutes =
      (timeIncrements.at(-1)?.getMinutes() ?? 0) -
      (timeIncrements.at(0)?.getMinutes() ?? 0);
    const minuteProgress =
      (now.getMinutes() - (timeIncrements.at(0)?.getMinutes() ?? 0)) /
      totalDisplayedMinutes;
    const y = bounds?.height * minuteProgress;

    return {
      visible: column > 0,
      x,
      y,
      width: cellWidth,
      setGridRef: (el: HTMLDivElement) => {
        gridRef.current = el;
      },
    };
  }, [now]);
};
