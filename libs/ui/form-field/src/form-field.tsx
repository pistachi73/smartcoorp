'use client';

import React, { forwardRef } from 'react';
import { InputHTMLAttributes } from 'react-day-picker';
import { BiHide, BiMinus, BiPlus, BiShow } from 'react-icons/bi';
import { v4 as uuid } from 'uuid';

import { Styled as S } from './form-field.styles';
import type { FormFieldProps } from './form-field.types';

export const FormField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  FormFieldProps
>(
  (
    {
      value,
      id,
      helperText,
      placeholder,
      isDisabled,
      isError,
      icon: Icon,
      label = '',
      size = 'medium',
      sizeConfined,
      sizeWide,
      isMultiline,
      type = 'text',
      onChange,
      onFocus,
      onBlur,
      className,
      height,
      name,
      forgotPasswordHref,
      ...props
    },
    ref?: React.Ref<HTMLElement>
  ) => {
    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    const inputId = id ?? uuid();

    const handlePasswordSwitch = () => {
      document.getElementById(inputId)?.focus();

      setShowPassword(!showPassword);
    };

    const handleNumberChange = (type: 'add' | 'minus') => () => {
      const input = document.getElementById(inputId) as HTMLInputElement;
      onChange && onChange(Number(input.value) + (type === 'add' ? 1 : -1));
    };

    const iconSize = 14;
    const passwordType = showPassword ? 'text' : 'password';
    const inputType = type === 'password' ? passwordType : type;

    const hasLabel = !!label;
    const renderForgotPasswordLink = type === 'password' && forgotPasswordHref;
    return (
      <S.Container $disabled={isDisabled} className={className}>
        {(hasLabel || renderForgotPasswordLink) && (
          <S.LabelContainer>
            {label && (
              <S.Label
                htmlFor={inputId}
                $size={size}
                $sizeConfined={sizeConfined}
                $sizeWide={sizeWide}
              >
                {label}
              </S.Label>
            )}
            {renderForgotPasswordLink && (
              <S.ForgotPasswordLink
                href={forgotPasswordHref}
                $size={size}
                $sizeConfined={sizeConfined}
                $sizeWide={sizeWide}
                tabIndex={-1}
              >
                Forgot password?
              </S.ForgotPasswordLink>
            )}
          </S.LabelContainer>
        )}

        <S.InputContainer
          forwardedAs={'button'}
          type="button"
          $size={size}
          $sizeConfined={sizeConfined}
          $sizeWide={sizeWide}
          $error={isError}
        >
          {inputType === 'number' ? (
            <S.IconContainer
              forwardedAs={'button'}
              type="button"
              $size={size}
              $sizeConfined={sizeConfined}
              $sizeWide={sizeWide}
              $isClickable
              onClick={handleNumberChange('minus')}
            >
              <BiMinus size={iconSize} />
            </S.IconContainer>
          ) : null}
          {Icon && (
            <S.IconContainer
              $size={size}
              $sizeConfined={sizeConfined}
              $sizeWide={sizeWide}
            >
              <Icon size={iconSize} />
            </S.IconContainer>
          )}
          {isMultiline ? (
            <S.Textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              placeholder={placeholder}
              disabled={isDisabled}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                if (!onChange) return;
                return onChange(e.target.value);
              }}
              onFocus={onFocus}
              onBlur={onBlur}
              value={value as string}
              {...props}
              $size={size}
              $sizeConfined={sizeConfined}
              $sizeWide={sizeWide}
              $height={height}
              name={name}
            />
          ) : (
            <S.Input
              id={inputId}
              ref={ref as React.Ref<HTMLInputElement>}
              placeholder={placeholder}
              type={inputType}
              disabled={isDisabled}
              $size={size}
              $sizeConfined={sizeConfined}
              $sizeWide={sizeWide}
              $hasIcon={!!Icon || inputType === 'number'}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (!onChange) return;
                return onChange(e.target.value);
              }}
              onFocus={onFocus}
              onBlur={onBlur}
              value={value}
              name={name}
              {...props}
            ></S.Input>
          )}
          {type === 'password' && !isMultiline && (
            <S.IconContainer
              forwardedAs={'button'}
              type="button"
              onClick={handlePasswordSwitch}
              $size={size}
              $sizeConfined={sizeConfined}
              $sizeWide={sizeWide}
              $isClickable
            >
              {showPassword ? <BiShow size={18} /> : <BiHide size={18} />}
            </S.IconContainer>
          )}
          {inputType === 'number' ? (
            <S.IconContainer
              forwardedAs={'button'}
              type="button"
              $size={size}
              $sizeConfined={sizeConfined}
              $sizeWide={sizeWide}
              $isClickable
              onClick={handleNumberChange('add')}
            >
              <BiPlus size={iconSize} />
            </S.IconContainer>
          ) : null}
        </S.InputContainer>
        {helperText && (
          <S.HelperText
            $error={isError}
            $size={size}
            $sizeConfined={sizeConfined}
            $sizeWide={sizeWide}
          >
            {helperText}
          </S.HelperText>
        )}
      </S.Container>
    );
  }
);
