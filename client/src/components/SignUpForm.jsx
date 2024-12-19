import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [genderPreference, setGenderPreference] = useState("");

  const { signup, loading } = useAuthStore();

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        signup({ name, email, password, gender, age, genderPreference });
      }}
    >
      {/* NAME */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <div className="mt-1">
          <input
            id="name"
            name="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#ff1b23] focus:border-[#ff1b23] sm:text-sm"
          />
        </div>
      </div>

      {/* EMAIL */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#ff1b23] focus:border-[#ff1b23] sm:text-sm"
          />
        </div>
      </div>

      {/* PASSWORD */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#ff1b23] focus:border-[#ff1b23] sm:text-sm"
          />
        </div>
      </div>

      {/* AGE */}
      <div>
        <label
          htmlFor="age"
          className="block text-sm font-medium text-gray-700"
        >
          Age
        </label>
        <div className="mt-1">
          <input
            id="age"
            name="age"
            type="number"
            required
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min="18"
            max="99"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#ff1b23] focus:border-[#ff1b23] sm:text-sm"
          />
        </div>
      </div>

      {/* GENDER */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Your Gender
        </label>
        <div className="mt-2 flex gap-2">
          <div className="flex items-center">
            <input
              id="man"
              name="gender"
              type="checkbox"
              checked={gender === "man"}
              onChange={() => setGender("man")}
              className="h-4 w-4 text-[#ff1b23] focus:ring-[#ff1b23] border-gray-300 rounded"
            />
            <label htmlFor="man" className="ml-2 block text-sm text-gray-900">
              Man
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="woman"
              name="gender"
              type="checkbox"
              checked={gender === "woman"}
              onChange={() => setGender("woman")}
              className="h-4 w-4 text-[#ff1b23] focus:ring-[#ff1b23] border-gray-300 rounded"
            />
            <label htmlFor="woman" className="ml-2 block text-sm text-gray-900">
              Woman
            </label>
          </div>
        </div>
      </div>

      {/* GENDER PREFERENCE */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Interested in
        </label>
        <div className="mt-2 space-y-2">
          <div className="flex items-center">
            <input
              id="prefer-man"
              name="gender-preference"
              type="radio"
              value="man"
              checked={genderPreference === "man"}
              onChange={(e) => setGenderPreference(e.target.value)}
              className="h-4 w-4 text-[#ff1b23] focus:ring-[#ff1b23] border-gray-300"
            />
            <label
              htmlFor="prefer-man"
              className="ml-2 block text-sm text-gray-900"
            >
              Man
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="prefer-woman"
              name="gender-preference"
              type="radio"
              value="woman"
              checked={genderPreference === "woman"}
              onChange={(e) => setGenderPreference(e.target.value)}
              className="h-4 w-4 text-[#ff1b23] focus:ring-[#ff1b23] border-gray-300"
            />
            <label
              htmlFor="prefer-woman"
              className="ml-2 block text-sm text-gray-900"
            >
              Woman
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="prefer-everyone"
              name="gender-preference"
              type="radio"
              value="everyone"
              checked={genderPreference === "everyone"}
              onChange={(e) => setGenderPreference(e.target.value)}
              className="h-4 w-4 text-[#ff1b23] focus:ring-[#ff1b23] border-gray-300"
            />
            <label
              htmlFor="prefer-everyone"
              className="ml-2 block text-sm text-gray-900"
            >
              Everyone
            </label>
          </div>
        </div>
      </div>
      <div>
        <button
          type="submit"
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            loading
              ? "bg-[#ff7a7e] cursor-not-allowed"
              : "bg-[#ff484e] hover:bg-[#d03137] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          }`}
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign up"}
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
