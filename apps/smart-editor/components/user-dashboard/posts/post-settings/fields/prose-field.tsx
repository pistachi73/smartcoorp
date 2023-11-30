import {
  FieldContainer,
  FieldContent,
  FieldFooter,
  InputContainer,
} from '@smart-editor/components/shared/styled-form-field';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useParams } from 'next/navigation';

import { Body } from '@smartcoorp/ui/body';
import { Button } from '@smartcoorp/ui/button';
import { RHFFormField } from '@smartcoorp/ui/form-field';
import { Headline } from '@smartcoorp/ui/headline';

import { useUpdatePost } from '../../posts.hooks';

const ProseFieldFormSchema = z.object({
  title: z.string(),
  description: z.string(),
});

type ProseFieldForm = z.infer<typeof ProseFieldFormSchema>;

type ProseFieldProps = {
  title: string;
  description: string;
};

export const ProseField = ({ title, description }: ProseFieldProps) => {
  const { postId } = useParams();
  const {
    control,
    handleSubmit,
    formState: { isDirty },
    reset,
  } = useForm<ProseFieldForm>({
    defaultValues: {
      title,
      description,
    },
  });

  const { mutateAsync: updateProse, isLoading } = useUpdatePost({
    field: 'prose',
  });

  useEffect(() => {
    reset({
      title,
      description,
    });
  }, [title, description, reset]);

  const onSubmit = handleSubmit(async (data: ProseFieldForm) => {
    await updateProse({
      postId: postId as string,
      data,
    });
    reset({}, { keepValues: true });
  });

  return (
    <FieldContainer as="form" onSubmit={onSubmit}>
      <FieldContent>
        <Headline size="large">Title and description</Headline>
        <Body size="small">
          Infuse your post with charm. Craft a magnetic title and description
          that beckons readers to explore the depths of your content.
        </Body>

        <InputContainer>
          <RHFFormField
            label="Title"
            control={control}
            name="title"
            size="small"
            rules={{
              required: "Title can't be empty",
              maxLength: {
                value: 140,
                message: 'Title must be less than 140 characters',
              },
            }}
          />
        </InputContainer>

        <InputContainer>
          <RHFFormField
            label="Description"
            control={control}
            name="description"
            isMultiline
            maxChars={280}
            size="small"
            rules={{
              maxLength: 280,
            }}
            placeholder="Enter post description"
          />
        </InputContainer>
      </FieldContent>

      <FieldFooter>
        <Body noMargin size="small" variant="neutral">
          A sneak peek that leaves readers curious and eager for more.
        </Body>

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
