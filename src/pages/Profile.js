function Profile() {
  return (
    <section className="screen">
      <div className="screen-header">
        <h2>Profile</h2>
        <p>Your basic account details.</p>
      </div>

      <article className="card">
        <div className="grid-2">
          <label className="field">
            <span>Name</span>
            <input value="Faris Ahmed" readOnly />
          </label>
          <label className="field">
            <span>Role</span>
            <input value="Developer" readOnly />
          </label>
        </div>
      </article>
    </section>
  );
}

export default Profile;
