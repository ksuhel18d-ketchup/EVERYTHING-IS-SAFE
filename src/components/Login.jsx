function Login() {
  return (
    <section className="login">
      <h2>Welcome Back</h2>

      <input type="email" placeholder="Email" />

      <input type="password" placeholder="Password" />

      <button>Login</button>

      <p>Don't have an account? Register</p>
    </section>
  );
}

export default Login;