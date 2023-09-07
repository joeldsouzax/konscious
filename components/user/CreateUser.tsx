import * as React from "react";

const UserForm: React.FC = () => {
  return (
    <form
      className="flex flex-col gap-4"
      action="/api/user"
      method="post"
    >
      <div className="form-control w-full">
        <label
          htmlFor="email"
          className="label"
        >
          Email
        </label>
        <input
          className="input input-bordered input-primary w-full input-lg"
          name="email"
          placeholder="you@example.com"
          required
        />
      </div>

      <div className="form-control flex gap-2 flex-row">
        <input
          type="text"
          placeholder="First Name"
          name="first_name"
          required
          maxLength={160}
          className="input input-bordered input-primary w-full input-lg"
        />
        <input
          type="text"
          placeholder="Last Name"
          name="last_name"
          required
          maxLength={160}
          className="input input-bordered input-primary w-full input-lg"
        />
      </div>

      <div className="form-control w-full">
        <label
          htmlFor="starts_at"
          className="event-start"
        >
          Birth Date
        </label>
        <input
          type="date"
          id="birth_date"
          name="birth_date"
          className="input input-bordered input-primary w-full"
          required
        />
      </div>

      <div className="self-center max-w-md w-full">
        <button className="btn btn-primary w-full">Submit</button>
      </div>
    </form>
  );
};

export default UserForm;
