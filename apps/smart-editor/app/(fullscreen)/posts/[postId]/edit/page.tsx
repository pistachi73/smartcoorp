import { PostWriter } from '@smart-editor/components/user-dashboard/posts';

type EditPostPageProps = {
  params: {
    postId: string;
  };
};

const EditPostPage = ({ params }: EditPostPageProps) => {
  const { postId } = params;

  return <PostWriter userId="a" postId={postId} />;
};

export default EditPostPage;
