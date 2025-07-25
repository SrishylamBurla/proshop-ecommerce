import { Button, Table } from "react-bootstrap";
import { useGetUsersQuery, useDeleteUserMutation } from "../../slices/userApiSlice";
import { Loader } from "../../components/Loader";
import Message from "../../components/Message";
import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const UserListScreen = () => {
  
  const { data:users, isLoading, error , refetch} = useGetUsersQuery();
  const [deleteUser, {isLoading: loadingDelete}] = useDeleteUserMutation()
  
  const deleteHandler = async (id)=>{
    if(window.confirm('Are you sure, you want to delete user?')){
      try {
              await deleteUser(id)
              toast.success('User deleted successfully')
              refetch()
            } catch (err) {
              toast.error(err?.data?.message || err.error)
            }
    }
    
  }
  return (
    <>
      <h2>Users</h2>
      {loadingDelete && <Loader />}
      {isLoading ? (<Loader />) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  <Link to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                     <FaEdit />
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                  <FaTrash style={{color: 'white'}} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
