import React, { FC } from 'react';
import { BiHide, BiShow } from 'react-icons/bi';

import { Styled } from './form-field.styles';
import { FormFieldProps } from './form-field.types';

export const FormField: FC<FormFieldProps> = ({
  disabled,
  error,
  errorMessage,
  success,
  id,
  icon: Icon,
  innerRef,
  label = '',
  multiline,
  onBlur,
  onChange,
  onFocus,
  size = 'medium',
  sizeConfined,
  sizeWide,
  variant = 'primary',
  value = '',
  type,
  ...props
}) => {
  const [hasFocus, setHasFocus] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const handleFocus = (e: any) => {
    setHasFocus(true);
    onFocus && onFocus(e);
  };

  const handleBlur = (e: any) => {
    setHasFocus(false);
    onBlur && onBlur(e);
  };

  const handlePasswordSwitch = () => {
    document.getElementById(id)?.focus();
    setShowPassword(!showPassword);
  };

  const isFilled = typeof value === 'number' ? value != 0 : value.length > 0;
  const iconSize = size === 'small' ? 16 : 18;
  const passwordVariantType = showPassword ? 'text' : 'password';
  const inputType = variant === 'password' ? passwordVariantType : type;

  return (
    <Styled.FormFieldContainer>
      {Icon && (
        <Styled.IconWrapper
          $isDisabled={disabled}
          $isFilled={isFilled}
          $hasFocus={hasFocus}
          $error={error}
        >
          <Icon size={iconSize} />
        </Styled.IconWrapper>
      )}
      {multiline ? (
        <Styled.Textarea
          $error={error}
          $isDisabled={disabled}
          $isFilled={isFilled}
          $hasFocus={hasFocus}
          $isIconSet={Boolean(Icon)}
          $size={size}
          $sizeConfined={sizeConfined}
          $sizeWide={sizeWide}
          $success={success}
          data-xds="FormField"
          disabled={disabled}
          id={id}
          onBlur={handleBlur}
          onChange={onChange}
          onFocus={handleFocus}
          ref={innerRef}
          value={value}
          {...props}
        ></Styled.Textarea>
      ) : (
        <Styled.Input
          $error={error}
          $isDisabled={disabled}
          $isFilled={isFilled}
          $hasFocus={hasFocus}
          $isIconSet={Boolean(Icon)}
          $size={size}
          $sizeConfined={sizeConfined}
          $sizeWide={sizeWide}
          $success={success}
          data-xds="FormField"
          disabled={disabled}
          id={id}
          onBlur={handleBlur}
          onChange={onChange}
          onFocus={handleFocus}
          ref={innerRef}
          value={value}
          $variant={variant}
          type={inputType}
          {...props}
        />
      )}
      {label && (
        <Styled.Label
          $error={error}
          $hasFocus={hasFocus}
          $isDisabled={disabled}
          $isFilled={isFilled}
          $isIconSet={Boolean(Icon)}
          $size={size}
          $multiline={multiline}
          $sizeConfined={sizeConfined}
          $sizeWide={sizeWide}
          htmlFor={id}
        >
          {label}
        </Styled.Label>
      )}
      {variant === 'password' && !multiline && (
        <Styled.PasswordWrapper
          data-testid="formfield-password-switch"
          onClick={handlePasswordSwitch}
        >
          {showPassword ? <BiShow size={18} /> : <BiHide size={18} />}
        </Styled.PasswordWrapper>
      )}
      {error && errorMessage && (
        <Styled.ErrorMessageWrapper>
          <Styled.ErrorCaption noMargin>{errorMessage}</Styled.ErrorCaption>
        </Styled.ErrorMessageWrapper>
      )}
    </Styled.FormFieldContainer>
  );
};

FormField.displayName = 'FormField';
