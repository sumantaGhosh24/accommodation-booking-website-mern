import {useParams} from "react-router-dom";

import {useTitle} from "../../hooks";
import {useGetAllUserQuery} from "../../app/features/user/usersApiSlice";
import {EditUserForm, Loading} from "../../components";

const AdminDetailUser = () => {
  useTitle("Update and Delete User");

  const {id} = useParams();

  const {user} = useGetAllUserQuery("userList", {
    selectFromResult: ({data}) => ({user: data?.entities[id]}),
  });

  if (!user) return <Loading />;

  return <EditUserForm user={user} />;
};

export default AdminDetailUser;
