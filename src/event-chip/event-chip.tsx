import cx from 'classnames';
import './event-chip.scss';

export interface EventChipProps {
  children: React.ReactNode;
  className?: string;

  top: string;
  height: string;
}

export const EventChip = ({
  children,
  className,
  top,
  height,
}: EventChipProps) => {
  return (
    <div
      className={cx('scheduler__event-chip', className)}
      style={{ top, height }}
    >
      {children}
    </div>
  );
};
