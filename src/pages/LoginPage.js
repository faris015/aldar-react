import { useState } from 'react';

function LoginPage({ onLogin, onForgot }) {
  const [email, setEmail] = useState('faris@aldar.demo');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  const submit = (event) => {
    event.preventDefault();
    onLogin({ email, password, remember });
  };

  return (
    <div className="auth-shell">
      <form className="auth-card" onSubmit={submit}>
        <div className="auth-logo">CDE</div>
        <h1>Construction CDE / Ticketing System</h1>

        <label>
          Email
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </label>

        <label>
          Password
          <div className="password-row">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <button type="button" onClick={() => setShowPassword((value) => !value)}>
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </label>

        <label className="inline-option">
          <input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} />
          Remember me
        </label>

        <button type="submit" className="btn btn-block">Login</button>
        <button type="button" className="link-btn" onClick={onForgot}>Forgot password?</button>
      </form>
    </div>
  );
}

export default LoginPage;
