import { getTotalMinutes } from '../../util';
import { useNow } from '../hooks';

const useCurrentTimeOffset = (
  [start, end]: [number, number],
  increment: number
) => {
  const now = useNow();

  const minutesInDay = (end - start) * increment;
  const currentMinutes = getTotalMinutes(now) - start * increment;

  const offset = (currentMinutes / minutesInDay) * 100;

  return { top: `${offset}%`, visible: offset < 100 && offset > 0 };
};

interface CurrentTimeProps {
  daytimeRange: [number, number];
  daytimeDisplayIncrement: number;
}

export const CurrentTime = ({
  daytimeRange,
  daytimeDisplayIncrement,
}: CurrentTimeProps) => {
  const { top, visible } = useCurrentTimeOffset(
    daytimeRange,
    daytimeDisplayIncrement
  );

  if (!visible) return null;

  return <span className="scheduler__now" style={{ top }} />;
};
