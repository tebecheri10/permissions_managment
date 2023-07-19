import { getRole } from "../utils/authUtils";
import { roles } from "../constants/roles.constants";

export const Home = () => {
  return (
    <>{ getRole() === roles.ADMIN ? <div>Admin</div> : <div>is User</div>}</>
  );
};
