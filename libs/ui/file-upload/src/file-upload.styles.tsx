'use client';

import { css, styled } from 'styled-components';

import { Button } from '@smartcoorp/ui/button';
import {
  borderRadiusXS,
  motionEasingStandard,
  motionTimeXS,
  primary,
  scale060,
  scale070,
  scale140,
  scale180,
  scale250,
  spaceL,
  spaceM,
  spaceS,
  spaceXXS,
} from '@smartcoorp/ui/tokens';

type DropzoneContainerTranseitnProps = {
  $isDragActive?: boolean;
  $isDragReject?: boolean;
  $isSingleFileUploaded?: boolean;
};

const Container = styled.div<{ $isDisabled?: boolean }>`
  width: 100%;

  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      pointer-events: none;
      opacity: 0.35;
    `}
`;

const DropzoneContainer = styled.div<DropzoneContainerTranseitnProps>`
  width: 100%;
  min-height: ${scale250};

  padding: ${spaceL};
  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px dashed ${({ theme }) => theme.form.placeholderColor};
  border-radius: ${borderRadiusXS};
  cursor: pointer;
  background-color: white;

  transition-property: border-color, background-color;
  transition-duration: ${motionTimeXS};
  transition-timing-function: ${motionEasingStandard};

  &:hover,
  &:focus {
    outline: none;
    background-color: ${({ theme }) => theme.form.hoverColor};
    border-color: ${({ theme }) => theme.form.neutralColor};
  }

  ${({ $isSingleFileUploaded, theme }) =>
    $isSingleFileUploaded &&
    css`
      border-color: ${theme.fileUpload.isSingleFileUploadedColor};
      background-color: ${theme.fileUpload.isSingleFileUploadedBackgroundColor};
    `}
  ${({ $isDragActive, theme }) =>
    $isDragActive &&
    css`
      border-color: ${theme.fileUpload.dragActiveColor};
      background-color: ${theme.fileUpload.dragActiveBackgroundColor};
    `}

  ${({ $isDragReject, theme }) =>
    $isDragReject &&
    css`
      border-color: ${theme.fileUpload.dragRejectColor};
      background-color: ${theme.fileUpload.dragRejectBackgroundColor};
    `}
`;

const DropzoneInformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const InformationIconContainer = styled.div`
  width: ${scale140};
  height: ${scale140};

  margin-bottom: ${spaceM};

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 100%;
  background-color: ${primary};
`;

const PreviewList = styled.ul`
  width: 100%;
  padding: 0;
  list-style: none;
  margin: 0;
`;
const PreviewListItem = styled.li<{ $isRejected?: boolean }>`
  padding: ${spaceS} ${spaceL};
  margin-top: ${spaceS};

  display: flex;
  justify-content: space-between;

  border-radius: ${borderRadiusXS};

  ${({ theme, $isRejected }) => css`
    padding: ${$isRejected ? spaceS : `${spaceS} ${spaceL}`};
    background-color: ${theme.form.hoverColor};
    flex-direction: ${$isRejected ? 'column' : 'row'};
    align-items: ${$isRejected ? 'flex-start' : 'center'};
    gap: ${$isRejected ? 0 : spaceM};
  `}
`;

const PreviewInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${spaceM};
`;

const PreviewImageContainer = styled.div`
  max-width: ${scale180};
  min-height: 100%;
  border-radius: ${borderRadiusXS};

  color: ${({ theme }) => theme.color.neutral};
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
`;

const PreviewDeleteButton = styled.button`
  padding: ${spaceS};

  display: flex;
  align-items: center;
  justify-content: space-between;

  color: ${({ theme }) => theme.form.errorColor};
  border-radius: ${borderRadiusXS};

  transition-property: color, background-color;
  transition-duration: ${motionTimeXS};
  transition-timing-function: ${motionEasingStandard};

  &:hover {
    background-color: ${({ theme }) => theme.form.errorColor};

    color: ${({ theme }) => theme.color.invertedNeutral};
  }
`;

const RejectedFiles = styled.div`
  margin-top: ${spaceS};
  padding: ${spaceM};
  padding-top: ${spaceL};

  position: relative;

  border: 1px solid ${({ theme }) => theme.form.errorColor};
  border-radius: ${borderRadiusXS};

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spaceS};
`;

const RejectedFilesClose = styled(Button)`
  position: absolute;
  top: -4px;
  right: 0px;
`;

const SinglePreviewContiner = styled.div`
  max-width: 100%;
  height: 100%;
`;

const SinglePreviewInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${spaceM};
`;

const SinglePreviewImageContainer = styled.div`
  min-width: 100%;
  max-width: 424px;

  height: 100%;

  margin-bottom: ${spaceM};

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: ${borderRadiusXS};

  color: ${({ theme }) => theme.color.neutral};
`;

const HelperText = styled.span<{ $isError?: boolean }>`
  //FIX: this is a temporary fix for the helper text color
  font-size: ${scale060};

  color: ${({ $isError, theme }) =>
    $isError ? theme.form.errorColor : theme.form.neutralColor};
  /** Size styles */
`;

const Label = styled.label`
  font-size: ${scale070};
  color: ${({ theme }) => theme.form.neutralColor};
  font-weight: 500;
`;

const LabelContainer = styled.div`
  margin-bottom: ${spaceXXS};
`;

export const Styled = {
  Container,
  DropzoneContainer,
  DropzoneInformationContainer,
  InformationIconContainer,

  //PREVIEW
  PreviewList,
  PreviewListItem,
  PreviewInfoContainer,
  PreviewImageContainer,
  PreviewImage,
  PreviewDeleteButton,

  //REJECTED FILES
  RejectedFiles,
  RejectedFilesClose,

  //SINGLE PREVIEW
  SinglePreviewContiner,
  SinglePreviewImageContainer,
  SinglePreviewInfoContainer,

  //EXTRA
  LabelContainer,
  Label,
  HelperText,
};
