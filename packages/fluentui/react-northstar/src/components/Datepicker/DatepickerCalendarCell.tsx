import {
  Accessibility,
  datepickerCalendarCellBehavior,
  DatepickerCalendarCellBehaviorProps,
} from '@fluentui/accessibility';
import {
  ComponentWithAs,
  getElementType,
  useAccessibility,
  useStyles,
  useFluentContext,
  useTelemetry,
  useUnhandledProps,
  compose,
} from '@fluentui/react-bindings';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { ComponentEventHandler, ComponentKeyboardEventHandler } from '../../types';
import { commonPropTypes, UIComponentProps } from '../../utils';

export interface DatepickerCalendarCellProps extends UIComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<DatepickerCalendarCellBehaviorProps>;

  /** Cell's primary content. */
  label?: string;

  /**
   * Called on click.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onClick?: ComponentEventHandler<DatepickerCalendarCellProps>;

  /**
   * Called on focus.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onFocus?: ComponentEventHandler<DatepickerCalendarCellProps>;

  /** A cell can show that it cannot be interacted with. */
  disabled?: boolean;

  /** A cell can show that it is currently selected or not. */
  selected?: boolean;

  /**
   * Called on selected item key down.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props and proposed value.
   */
  onKeyDown?: ComponentKeyboardEventHandler<DatepickerCalendarCellProps>;
}

export type DatepickerCalendarCellStylesProps = Pick<DatepickerCalendarCellProps, 'disabled' | 'selected'> & {
  actionable: boolean;
};

export const datepickerCalendarCellClassName = 'ui-datepicker__calendarcell';
/**
 * A Datepicker cell is used to display calendar grid cells.
 * This component is currently UNSTABLE!
 */
export const DatepickerCalendarCell = compose<
  'button',
  DatepickerCalendarCellProps,
  DatepickerCalendarCellStylesProps,
  {},
  {}
>(
  (props, ref, composeOptions) => {
    const context = useFluentContext();
    const { setStart, setEnd } = useTelemetry(composeOptions.displayName, context.telemetry);
    setStart();

    const { className, design, styles, variables, onClick, disabled, selected, label } = props;
    const unhandledProps = useUnhandledProps(composeOptions.handledProps, props);
    const ElementType = getElementType(props);
    const getA11yProps = useAccessibility(props.accessibility, {
      debugName: composeOptions.displayName,
      actionHandlers: {
        performClick: e => {
          // prevent Spacebar from scrolling
          e.preventDefault();
          handleClick(e);
        },
      },
      mapPropsToBehavior: () => ({
        selected,
        disabled,
      }),
      rtl: context.rtl,
    });

    const { classes } = useStyles<DatepickerCalendarCellStylesProps>(DatepickerCalendarCell.displayName, {
      className: composeOptions.className,
      mapPropsToStyles: () => ({
        actionable: !!onClick,
        disabled,
        selected,
      }),
      mapPropsToInlineStyles: () => ({
        className,
        design,
        styles,
        variables,
      }),
      rtl: context.rtl,
      composeOptions,
      unstable_props: props,
    });

    const handleFocus = (e: React.SyntheticEvent) => {
      _.invoke(props, 'onFocus', e, props);
    };

    const handleKeyDown = (e: React.SyntheticEvent) => {
      _.invoke(props, 'onKeyDown', e, props);
    };

    const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
      if (disabled) {
        e.preventDefault();
        return;
      }

      _.invoke(props, 'onClick', e, props);
    };

    const element = (
      <ElementType
        {...getA11yProps('root', {
          className: classes.root,
          onClick: handleClick,
          onKeyDown: handleKeyDown,
          onFocus: handleFocus,
          ref,
          ...unhandledProps,
        })}
      >
        {label}
      </ElementType>
    );
    setEnd();
    return element;
  },
  {
    className: datepickerCalendarCellClassName,
    displayName: 'DatepickerCalendarCell',

    handledProps: [
      'accessibility',
      'as',
      'className',
      'label',
      'disabled',
      'onClick',
      'onFocus',
      'selected',
      'styles',
      'variables',
    ],
  },
) as ComponentWithAs<'button', DatepickerCalendarCellProps>;

DatepickerCalendarCell.propTypes = {
  ...commonPropTypes.createCommon(),
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
};

DatepickerCalendarCell.defaultProps = {
  accessibility: datepickerCalendarCellBehavior,
  as: 'button',
};
