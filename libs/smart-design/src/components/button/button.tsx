import React from 'react';

import Link from 'next/link';

import { Styled } from './button.styles';
import { ButtonProps } from './button.types';

export const Button: React.FC<ButtonProps> = ({
  children,
  disabled = false,
  href,
  icon: Icon,
  innerRef,
  loading = false,
  onClick,
  size = 'medium',
  sizeConfined,
  sizeWide,
  to,
  type,
  variant = 'primary',
  iconSize: iconSizePx,
  iconAfter,
  target = '_blank',
  ...props
}) => {
  const iconSize = iconSizePx ? iconSizePx : size === 'small' ? 18 : 24;

  const iconOnly = !children;

  const commonProps = {
    $iconOnly: iconOnly,
    $size: size,
    $sizeConfined: sizeConfined,
    $sizeWide: sizeWide,
    $variant: variant,
    'aria-label': loading ? 'loading' : null,
    disabled: disabled || loading,
    $disabled: disabled || loading,

    onClick,
    ref: innerRef,
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
      <Link href={to} passHref>
        <Styled.LinkButton {...commonProps} {...props}>
          {buttonContent}
        </Styled.LinkButton>
      </Link>
    );
  }
  if (href) {
    return (
      <Styled.LinkButton
        {...commonProps}
        {...props}
        href={href}
        target={target}
      >
        {buttonContent}
      </Styled.LinkButton>
    );
  }
  return (
    <Styled.Button type={type} {...commonProps} {...props}>
      {buttonContent}
    </Styled.Button>
  );
};
