import { UserProvier } from '@/store/userContext';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvier>
      <Component {...pageProps} />;
    </UserProvier>
  );
}
