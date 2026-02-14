import { useState } from 'react';

function ForgotPasswordPage({ onBack }) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <div className="auth-shell">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Forgot Password</h1>
        {!sent ? (
          <>
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>
            <button type="submit" className="btn btn-block">Send Reset Link</button>
          </>
        ) : (
          <div className="success-message">
            <p>Reset link sent to {email || 'your email'}.</p>
          </div>
        )}
        <button type="button" className="link-btn" onClick={onBack}>Back to login</button>
      </form>
    </div>
  );
}

export default ForgotPasswordPage;
