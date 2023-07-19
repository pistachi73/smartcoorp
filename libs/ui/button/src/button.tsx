'use client';

import { forwardRef } from 'react';

import { Styled } from './button.styles';
import { ButtonProps } from './button.types';

export const Button = forwardRef(
  (
    {
      children,
      className,
      disabled = false,
      href,
      icon: Icon,
      innerRef,
      loading = false,
      onClick,
      size = 'medium',
      sizeConfined,
      sizeWide,
      variant = 'primary',
      iconSize: iconSizePx,
      iconAfter,
      to,
      type,
      color = 'primary',
      ...props
    }: ButtonProps,
    ref: any
  ) => {
    const iconSize = iconSizePx ? iconSizePx : size === 'small' ? 18 : 24;

    const iconOnly = !children;

    const commonProps = {
      className,
      $iconOnly: iconOnly,
      $size: size,
      $sizeConfined: sizeConfined,
      $sizeWide: sizeWide,
      $variant: variant,
      'aria-label': loading ? 'loading' : undefined,
      disabled: disabled || loading,
      $disabled: disabled || loading,
      $color: color,
      onClick,
    };

    const buttonContent = (
      <Styled.InnerContent>
        {loading && (
          <Styled.LoadingContainer aria-hidden="true">
            <Styled.Loading size={size} disabled={disabled || loading} />
          </Styled.LoadingContainer>
        )}
        {Icon && !iconAfter && (
          <Styled.IconContainer $loading={loading}>
            <Icon size={iconSize} />
          </Styled.IconContainer>
        )}
        <Styled.Text $loading={loading} data-cy="button-text">
          {children}
        </Styled.Text>
        {Icon && iconAfter && (
          <Styled.IconContainer $loading={loading} $iconAfter>
            <Icon size={iconSize} />
          </Styled.IconContainer>
        )}
      </Styled.InnerContent>
    );

    if (to) {
      return (
        <Styled.NextLink href={to} {...commonProps} {...props} ref={ref}>
          {buttonContent}
        </Styled.NextLink>
      );
    }
    if (href) {
      return (
        <Styled.LinkButton {...commonProps} {...props} href={href} ref={ref}>
          {buttonContent}
        </Styled.LinkButton>
      );
    }
    return (
      <Styled.Button {...commonProps} {...props} ref={ref}>
        {buttonContent}
      </Styled.Button>
    );
  }
);
