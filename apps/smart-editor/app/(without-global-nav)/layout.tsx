import { gray100 } from '@smartcoorp/ui/tokens';

const WithoutGlobalNavLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div
      style={{
        backgroundColor: gray100,
      }}
    >
      {children}
    </div>
  );
};

export default WithoutGlobalNavLayout;
