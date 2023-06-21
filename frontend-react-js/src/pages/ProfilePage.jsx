import { useContext } from "react";
import {Contex} from "../context/UserContext/Context";

function ProfilePage() {
  const { user } = useContext(Context);
  return (
    <div>
      <h1>Profile Page</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
export default ProfilePage;