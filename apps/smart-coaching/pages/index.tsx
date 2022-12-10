import { trpc } from '@smartcoorp/trpc';

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.styled-components file.
   */
  const hello = trpc.example.hello.useQuery({ text: 'from tRPC' });

  return (
    <>
      <p>{hello.data ? hello.data.greeting : 'Loading tRPC query...'}</p>
    </>
  );
}

export default Index;
