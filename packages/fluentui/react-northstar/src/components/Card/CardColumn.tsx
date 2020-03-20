import * as React from 'react';
import { WithAsProp, withSafeTypeForAs, FluentComponentStaticProps, ProviderContextPrepared } from '../../types';
import { Accessibility } from '@fluentui/accessibility';
import { UIComponentProps, ChildrenComponentProps, commonPropTypes, createShorthandFactory } from '../../utils';
import { useTelemetry, useStyles, getElementType, getUnhandledProps, useAccessibility } from '@fluentui/react-bindings';
import * as _ from 'lodash';
// @ts-ignore
import { ThemeContext } from 'react-fela';

export interface CardColumnProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<never>;
}

export type CardColumnStylesProps = never;

const CardColumn: React.FC<WithAsProp<CardColumnProps>> & FluentComponentStaticProps<CardColumnProps> = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext);
  const { setStart, setEnd } = useTelemetry(CardColumn.displayName, context.telemetry);
  setStart();

  const { className, design, styles, variables, children } = props;
  const ElementType = getElementType(props);
  const unhandledProps = getUnhandledProps(CardColumn.handledProps, props);
  const getA11yProps = useAccessibility(props.accessibility, {
    debugName: CardColumn.displayName,
    rtl: context.rtl,
  });

  const { classes } = useStyles<CardColumnStylesProps>(CardColumn.displayName, {
    className: CardColumn.className,
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const element = (
    <ElementType
      {...getA11yProps('root', {
        className: classes.root,
        ...unhandledProps,
      })}
    >
      {children}
    </ElementType>
  );
  setEnd();
  return element;
};

CardColumn.displayName = 'CardColumn';
CardColumn.className = 'ui-card__column';

CardColumn.propTypes = {
  ...commonPropTypes.createCommon(),
};

CardColumn.handledProps = Object.keys(CardColumn.propTypes) as any;

CardColumn.create = createShorthandFactory({ Component: CardColumn });

/**
 * A CardColumn is used to display content in card as column
 */
export default withSafeTypeForAs<typeof CardColumn, CardColumnProps, 'div'>(CardColumn);
