import frameImg from "../../../images/frameimage.jpg";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function Template({ title, description1, description2, image, formType }) {
  return formType === "signup" ? (
    <div className="h-screen w-full pt-20 grid grid-cols-1 md:grid-cols-2 bg-gradient-to-tr from-blue-100 via-white to-blue-200 overflow-hidden">
      {/* Left Text Section */}
      <div className="flex flex-col justify-start items-center md:items-start px-6 text-center md:text-left">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 leading-tight mt-8">{title}</h1>
        <p className="text-lg text-gray-700 max-w-md">
          {description1} <span className="text-blue-600 font-semibold italic">{description2}</span>
        </p>
      </div>

      {/* Right Form Section */}
      <div className="flex items-center justify-start pl-20 md:pl-1">
        <div className="w-full max-w-md p-0 md:p-0 rounded-3xl">
          <SignupForm />
        </div>
      </div>
    </div>
  ) : (
    <div className="h-screen w-full pt-20 bg-gradient-to-tr from-blue-100 via-white to-blue-200 overflow-hidden flex items-center justify-center">
      <div className="w-full max-w-md p-6 rounded-xl text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>
        <p className="text-md text-gray-700 mb-6">
          {description1} <span className="text-blue-600 font-semibold italic">{description2}</span>
        </p>
        <LoginForm />
      </div>
    </div>
  );
}

export default Template;