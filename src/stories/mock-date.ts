import { setDay, setHours, setMinutes } from 'date-fns';
import { Day } from '../scheduler';
import { pipable, pipe } from '../util';

export const mockDate = (day: Day, hour: number, minute: number) =>
  pipe(new Date())(
    pipable(setDay)(day),
    pipable(setHours)(hour),
    pipable(setMinutes)(minute)
  );
