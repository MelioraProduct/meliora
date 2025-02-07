import { useDispatch, useSelector } from "react-redux";
import { signIn, signUp, signOut } from "./reducers/authSlice";

const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const login = (email, password) =>
    dispatch(signIn({ email, password })).unwrap();
  const register = (name, email, password) =>
    dispatch(signUp({ name, email, password })).unwrap();
  const logout = () => dispatch(signOut());

  return { auth, login, register, logout };
};

export default useAuth;
