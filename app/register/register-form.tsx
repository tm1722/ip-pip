import React from 'react';

export function RegisterFormFields() {
  return (
    <div className="p-4 space-y-4">
      <div>
        <label
          htmlFor="email"
          className="block text-xs text-gray-600 uppercase"
          title="This field is required."
        >
          Email Address<span className="text-red-500"> *</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="user@acme.com"
          autoComplete="email"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-xs text-gray-600 uppercase"
          title="This field is required."
        >
          Password<span className="text-red-500"> *</span>
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="first_name"
          className="block text-xs text-gray-600 uppercase"
          title="This field is required."
        >
          First Name<span className="text-red-500"> *</span>
        </label>
        <input
          id="first_name"
          name="first_name"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="last_name"
          className="block text-xs text-gray-600 uppercase"
          title="This field is required."
        >
          Last Name<span className="text-red-500"> *</span>
        </label>
        <input
          id="last_name"
          name="last_name"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="date_of_birth"
          className="block text-xs text-gray-600 uppercase"
          title="This field is required."
        >
          Date of Birth<span className="text-red-500"> *</span>
        </label>
        <input
          id="date_of_birth"
          name="date_of_birth"
          type="date"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="place_of_occupation" className="block text-xs text-gray-600 uppercase">
          Place of Occupation
        </label>
        <input
          id="place_of_occupation"
          name="place_of_occupation"
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="education" className="block text-xs text-gray-600 uppercase">
          Education
        </label>
        <input
          id="education"
          name="education"
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
    </div>
  );
}
