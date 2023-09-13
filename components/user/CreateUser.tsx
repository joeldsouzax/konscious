"use client";

import { adminOptions, adminTypes, memberTypes } from "@/util";
import * as React from "react";

const UserForm: React.FC = () => {
  const [isParticipant, setIsParticipant] = React.useState(false);

  const handleParticipantToggle = () =>
    setIsParticipant((isParticipant) => !isParticipant);

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
      <div className="divider" />
      <div className="form-control w-52">
        <label className="cursor-pointer label">
          <span className="label-text text-lg">Particpant?</span>
          <input
            type="checkbox"
            className="toggle toggle-accent toggle-lg"
            checked={isParticipant}
            onChange={(e) => handleParticipantToggle()}
          />
        </label>
      </div>
      <div className="flex gap-2 flex-row">
        <div className="form-control w-full">
          <label
            htmlFor="starts_at"
            className="label-text text-lg"
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
        {isParticipant ? (
          <div className="form-control w-full">
            <label
              htmlFor="member_type"
              className="label-text text-lg"
            >
              Member Type
            </label>

            <select
              id="member_type"
              name="member_type"
              className="select select-bordered"
              required={isParticipant}
            >
              {memberTypes.map(({ value, label }) => (
                <option
                  key={value}
                  value={value}
                >
                  {label}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="form-control w-full">
            <label
              htmlFor="admin_type"
              className="label-text text-lg"
            >
              Admin Types
            </label>

            <select
              id="admin_type"
              name="admin_type"
              className="select select-bordered"
              required={!isParticipant}
            >
              {adminOptions.map(({ value, label }) => (
                <option
                  key={value}
                  value={value}
                >
                  {label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      {/* 
      <div className="flex gap-2 flex-row">
        <div className="form-control w-full">
          <label
            className="label"
            htmlFor="password"
          >
            <span className="label-text">Password</span>
          </label>
          <input
            className="input input-bordered input-secondary"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
        </div>
        <div className="form-control w-full">
          <label
            className="label"
            htmlFor="password"
          >
            <span className="label-text">Repeat Password</span>
          </label>
          <input
            className="input input-bordered input-secondary"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
        </div>
      </div> */}

      <div className="self-center max-w-md w-full">
        <button className="btn btn-primary w-full">Submit</button>
      </div>
    </form>
  );
};

export default UserForm;
