import { useUser } from '@/store/userContext';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

function LoginPage() {
  const usernameReff = useRef<HTMLInputElement>(null);
  const pwReff = useRef<HTMLInputElement>(null);
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [loginErr, setLoginErr] = useState<string>('');
  const { setUserData } = useUser();
  const router = useRouter();
  async function handleLogin() {
    setLoginLoading(true);

    const resp = await fetch('http://localhost:8081/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application-json'
      },
      body: JSON.stringify({
        username: usernameReff.current?.value,
        password: pwReff.current?.value
      })
    });

    setLoginLoading(false);

    const result = await resp.json();
    if (resp.status === 202) {
      setUserData(result.Data);
      router.push('/products');
      return;
    }

    setLoginErr(result.message);

    // setLoginErr(resp)
  }
  return (
    <div className="w-full h-screen flex justify-center">
      <div className="flex flex-col h-screen items-center justify-center">
        <div className="border border-gray-400 p-20 flex justify-center flex-col">
          <p className="text-center mb-7 text-2xl">LOGIN</p>
          <p className="mb-1 text-sm">Error: {loginErr}</p>
          <input
            ref={usernameReff}
            type="text"
            placeholder="Username"
            className="border border-grey pl-1 mb-5"
          />
          <input
            type="password"
            ref={pwReff}
            placeholder="Password"
            className="border border-grey pl-1 mb-5"
          />
          <button
            onClick={handleLogin}
            className="rounded-full bg-cyan-400 text-white p-1"
            disabled={loginLoading}
          >
            {loginLoading ? 'Loading...' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
