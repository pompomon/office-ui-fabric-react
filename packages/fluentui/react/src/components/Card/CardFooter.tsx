import { Accessibility, cardFooterBehavior, CardFooterBehaviorProps } from '@fluentui/accessibility';
import { getElementType, getUnhandledProps, useAccessibility, useStyles, useTelemetry } from '@fluentui/react-bindings';
import * as PropTypes from 'prop-types';
import * as React from 'react';
// @ts-ignore
import { ThemeContext } from 'react-fela';
import { FluentComponentStaticProps, ProviderContextPrepared, WithAsProp, withSafeTypeForAs } from '../../types';
import { ChildrenComponentProps, commonPropTypes, createShorthandFactory, UIComponentProps } from '../../utils';

export interface CardFooterProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * */
  accessibility?: Accessibility<CardFooterBehaviorProps>;

  /**
   * Do not add margin after the footer
   */
  noMarginAfter?: boolean;
}

export type CardFooterStylesProps = Pick<CardFooterProps, 'noMarginAfter'>;

const CardFooter: React.FC<WithAsProp<CardFooterProps>> & FluentComponentStaticProps<CardFooterProps> = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext);
  const { setStart, setEnd } = useTelemetry(CardFooter.displayName, context.telemetry);
  setStart();

  const { className, design, styles, variables, children, noMarginAfter } = props;
  const ElementType = getElementType(props);
  const unhandledProps = getUnhandledProps(CardFooter.handledProps, props);
  const getA11yProps = useAccessibility(props.accessibility, {
    debugName: CardFooter.displayName,
    rtl: context.rtl
  });

  const { classes } = useStyles<CardFooterStylesProps>(CardFooter.displayName, {
    className: CardFooter.className,
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
      noMarginAfter
    }),
    rtl: context.rtl
  });

  const element = (
    <ElementType
      {...getA11yProps('root', {
        className: classes.root,
        ...unhandledProps
      })}
    >
      {children}
    </ElementType>
  );
  setEnd();
  return element;
};

CardFooter.displayName = 'CardFooter';
CardFooter.className = 'ui-card__footer';

CardFooter.propTypes = {
  ...commonPropTypes.createCommon(),
  noMarginAfter: PropTypes.bool
};

CardFooter.defaultProps = {
  as: 'div',
  accessibility: cardFooterBehavior,
  noMarginAfter: false
};

CardFooter.handledProps = Object.keys(CardFooter.propTypes) as any;

CardFooter.create = createShorthandFactory({ Component: CardFooter });

/**
 * A Card is used to display data in sematically grouped way
 */
export default withSafeTypeForAs<typeof CardFooter, CardFooterProps, 'div'>(CardFooter);
