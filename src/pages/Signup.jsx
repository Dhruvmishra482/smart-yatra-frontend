import signupImg from "../images/signupimage.jpeg"

import Template from "../components/common/auth/Template";

function Signup() {
  return (
    <Template
      title="Join SmartYatra Today"
      description1="Discover, compare and plan your trips smartly."
      description2="Sign up to unlock personalized AI trip planning."
      image={signupImg}
      formType="signup"
    />
  );
}

export default Signup;