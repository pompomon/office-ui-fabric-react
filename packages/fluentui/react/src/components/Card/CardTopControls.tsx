import { Accessibility, cardTopControlsBehavior, CardTopControlsBehaviorProps } from '@fluentui/accessibility';
import { getElementType, getUnhandledProps, useAccessibility, useStyles, useTelemetry } from '@fluentui/react-bindings';
import * as React from 'react';
// @ts-ignore
import { ThemeContext } from 'react-fela';
import { FluentComponentStaticProps, ProviderContextPrepared, WithAsProp, withSafeTypeForAs } from '../../types';
import { ChildrenComponentProps, commonPropTypes, createShorthandFactory, UIComponentProps } from '../../utils';

export interface CardTopControlsProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * */
  accessibility?: Accessibility<CardTopControlsBehaviorProps>;
}

export type CardTopControlsStylesProps = never;

const CardTopControls: React.FC<WithAsProp<CardTopControlsProps>> & FluentComponentStaticProps<CardTopControlsProps> = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext);
  const { setStart, setEnd } = useTelemetry(CardTopControls.displayName, context.telemetry);
  setStart();

  const { className, design, styles, variables, children } = props;
  const ElementType = getElementType(props);
  const unhandledProps = getUnhandledProps(CardTopControls.handledProps, props);
  const getA11yProps = useAccessibility(props.accessibility, {
    debugName: CardTopControls.displayName,
    rtl: context.rtl
  });

  const { classes } = useStyles<CardTopControlsStylesProps>(CardTopControls.displayName, {
    className: CardTopControls.className,
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables
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

CardTopControls.displayName = 'CardTopControls';
CardTopControls.className = 'ui-card__topcontrols';

CardTopControls.propTypes = {
  ...commonPropTypes.createCommon()
};

CardTopControls.defaultProps = {
  accessibility: cardTopControlsBehavior
};

CardTopControls.handledProps = Object.keys(CardTopControls.propTypes) as any;

CardTopControls.create = createShorthandFactory({ Component: CardTopControls });

/**
 * A Card is used to display data in sematically grouped way
 */
export default withSafeTypeForAs<typeof CardTopControls, CardTopControlsProps, 'div'>(CardTopControls);