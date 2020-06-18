import { Accessibility, datepickerBehavior, DatepickerBehaviorProps } from '@fluentui/accessibility';
import { getElementType, useAccessibility, useStyles, useTelemetry, useUnhandledProps } from '@fluentui/react-bindings';
import { Ref } from '@fluentui/react-component-ref';
import * as _ from 'lodash';
import * as React from 'react';
// @ts-ignore
import { ThemeContext } from 'react-fela';
import { FluentComponentStaticProps, ProviderContextPrepared, WithAsProp, withSafeTypeForAs } from '../../types';
import { commonPropTypes, createShorthandFactory, UIComponentProps } from '../../utils';
// import DatepickerInput from './DatepickerInput';
// import DatepickerCalendar from './DatepickerCalendar';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { CalendarIcon } from '@fluentui/react-icons-northstar';
import Popup from '../Popup/Popup';
import { DayOfWeek, IDayGridOptions, FirstWeekOfYear, DateRangeType } from '@fluentui/date-time-utilities';
import DatepickerCalendar from './DatepickerCalendar';

export interface DatepickerProps extends UIComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<DatepickerBehaviorProps>;
}

export type DatepickerStylesProps = never;

export const datepickerClassName = 'ui-datepicker';

const Datepicker: React.FC<WithAsProp<DatepickerProps>> & FluentComponentStaticProps<DatepickerProps> = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext);
  const { setStart, setEnd } = useTelemetry(Datepicker.displayName, context.telemetry);
  setStart();
  const datepickerRef = React.useRef<HTMLElement>();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const weeksToShow = 4;
  const today = new Date();
  const calendarOptions: IDayGridOptions = {
    selectedDate: today,
    navigatedDate: today,
    firstDayOfWeek: DayOfWeek.Sunday,
    firstWeekOfYear: FirstWeekOfYear.FirstDay,
    dateRangeType: DateRangeType.Day,
    weeksToShow: weeksToShow,
  };
  const showCalendarGrid = () => {
    setOpen(true);
  };

  const { className, design, styles, variables } = props;
  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(Datepicker.handledProps, props);
  const getA11yProps = useAccessibility(props.accessibility, {
    debugName: Datepicker.displayName,
    actionHandlers: {},
    rtl: context.rtl,
  });

  const { classes } = useStyles<DatepickerStylesProps>(Datepicker.displayName, {
    className: datepickerClassName,
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const element = (
    <Ref innerRef={datepickerRef}>
      {getA11yProps.unstable_wrapWithFocusZone(
        <ElementType
          {...getA11yProps('root', {
            className: classes.root,
            ...unhandledProps,
          })}
        >
          <Input readOnly onClick={showCalendarGrid} value={value} />
          <Popup
            open={open}
            onOpenChange={(e, { open }) => setOpen(open)}
            content={
              <DatepickerCalendar
                {...calendarOptions}
                onDaySelect={day => {
                  setValue(day.originalDate.toString());
                  setOpen(false);
                }}
              />
            }
            trapFocus
          >
            <Button icon={<CalendarIcon />} title="Open calendar" iconOnly />
          </Popup>
        </ElementType>,
      )}
    </Ref>
  );
  setEnd();
  return element;
};

Datepicker.displayName = 'Datepicker';

Datepicker.propTypes = {
  ...commonPropTypes.createCommon(),
};

Datepicker.defaultProps = {
  accessibility: datepickerBehavior,
};

Datepicker.handledProps = Object.keys(Datepicker.propTypes) as any;

Datepicker.create = createShorthandFactory({ Component: Datepicker });

/**
 * A Datepicker is used to display dates.
 */
export default withSafeTypeForAs<typeof Datepicker, DatepickerProps, 'div'>(Datepicker);
