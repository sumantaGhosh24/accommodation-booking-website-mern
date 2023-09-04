import {Badge} from "react-bootstrap";
import {Link} from "react-router-dom";
import propTypes from "prop-types";

import {useGetAllUserQuery} from "../../app/features/user/usersApiSlice";

const ManageUser = ({userId, ind}) => {
  const {user} = useGetAllUserQuery("userList", {
    selectFromResult: ({data}) => ({user: data?.entities[userId]}),
  });

  if (user) {
    return (
      <tr>
        <td>{ind}</td>
        <td>{user.id}</td>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{user.mobileNumber}</td>
        <td>{user.dob}</td>
        <td>{user.gender}</td>
        <td>
          <img
            src={user.image}
            alt={user.username}
            style={{
              height: "50px",
              width: "50px",
              borderRadius: "50px",
            }}
          />
        </td>
        <td>{user.zip}</td>
        <td>{user.city}</td>
        <td>{user.state}</td>
        <td>{user.country}</td>
        <td>{user.addressline1}</td>
        <td>{user.addressline2}</td>
        <td>
          {user.active === "active" ? (
            <Badge bg="success">Active</Badge>
          ) : (
            <Badge bg="danger">Inactive</Badge>
          )}
        </td>
        <td>{user.role}</td>
        <td>{user.createdAt}</td>
        <td>{user.updatedAt}</td>
        <td>
          <Link className="btn btn-primary" to={`/admin-users/${user._id}`}>
            Manage User
          </Link>
        </td>
      </tr>
    );
  } else return null;
};

ManageUser.propTypes = {
  userId: propTypes.string,
  ind: propTypes.number,
};

export default ManageUser;
