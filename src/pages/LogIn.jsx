// import loginImg from "../assets/"lo
import loginImg from "../images/loginimage.jpeg"
import Template from "../components/common/auth/Template";

function Login() {
  return (
    <Template
      title="Welcome Back!"
      description1="Plan your smart journey with ease."
      description2="Login and explore the world your way."
      image={loginImg}
      formType="login"
    />
  );
}
export default Login