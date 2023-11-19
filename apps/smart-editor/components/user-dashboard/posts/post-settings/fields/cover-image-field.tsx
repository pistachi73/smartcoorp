import {
  FieldContainer,
  FieldContent,
  InputContainer,
} from '@smart-editor/components/shared/styled-form-field';
import { FieldFooter } from '@smart-editor/components/user-dashboard/account/account.styles';
import { useSingleFileUpload } from '@smart-editor/hooks/use-single-file-upload';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useParams } from 'next/navigation';

import { Body } from '@smartcoorp/ui/body';
import { Button } from '@smartcoorp/ui/button';
import { RHFFileUpload } from '@smartcoorp/ui/file-upload';
import { Headline } from '@smartcoorp/ui/headline';

import { useUpdatePost } from '../../posts.hooks';

const CoverImageFieldFormSchema = z.object({
  coverImageUrl: z.any(),
});

type CoverImageFieldForm = z.infer<typeof CoverImageFieldFormSchema>;

type CoverImageFieldProps = {
  coverImageUrl: string;
};

export const CoverImageField = ({ coverImageUrl }: CoverImageFieldProps) => {
  const session = useSession();
  const { postId } = useParams();
  const {
    control,
    handleSubmit,
    formState: { isDirty },
    reset,
  } = useForm<CoverImageFieldForm>({
    defaultValues: {
      coverImageUrl,
    },
  });

  const { handleSingleFileUpload } = useSingleFileUpload({
    folder: `${session?.data?.id}/${postId}`,
    initialFile: coverImageUrl,
  });

  const { mutateAsync: updateCoverImage, isLoading } = useUpdatePost({
    field: 'coverImage',
  });

  useEffect(() => {
    reset({
      coverImageUrl,
    });
  }, [coverImageUrl, reset]);

  const onSubmit = handleSubmit(async (data: CoverImageFieldForm) => {
    const newCoverImageUrl = await handleSingleFileUpload(data.coverImageUrl);

    await updateCoverImage({
      postId,
      data: {
        coverImageUrl: newCoverImageUrl,
      },
    });
  });

  return (
    <FieldContainer as="form" onSubmit={onSubmit}>
      <FieldContent>
        <Headline size="large">Cover Image</Headline>
        <Body size="small">
          Pick a captivating image to represent your post. It&apos;s the visual
          overture, setting the tone for the symphony of your content.
        </Body>

        <InputContainer>
          <RHFFileUpload
            control={control}
            name="coverImageUrl"
            singleFilePreview={true}
            maxSize={250000}
            acceptedFileTypes={{
              'image/jpeg': [],
              'image/jpg': [],
              'image/png': [],
            }}
            helperText="Cover images will be updated in 24h."
            isDisabled={isLoading}
          />
        </InputContainer>
      </FieldContent>
      <FieldFooter>
        <div />
        <Button
          size="small"
          type="submit"
          disabled={!isDirty}
          loading={isLoading}
        >
          Save
        </Button>
      </FieldFooter>
    </FieldContainer>
  );
};
