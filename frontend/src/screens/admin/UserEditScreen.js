import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Loader } from "../../components/Loader";
import Message from "../../components/Message";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useUpdateUserMutation,
  useGetUserDetailsQuery,
} from "../../slices/userApiSlice";
import { toast } from "react-toastify";
import FormContainer from "../../components/FormContainer";

const UserEditScreen = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();
  const { data: user, isLoading, error } = useGetUserDetailsQuery(userId);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = {
        _id: userId,
        name,
        email,
        isAdmin,
      };
      await updateUser(updatedUser);
    //   await updateUser({ userId, name, email, isAdmin,});
      toast.success("User updated successfully");
      navigate("/admin/userlist");
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  useEffect(() => {
    if (user) {
      // setName(user.name || "");
      // setEmail(user.email || "");
      setName(user.name ?? ""); // nullish coalescing operator
      setEmail(user.email ?? "");
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  return (
    <>
      <Link to={`/admin/userlist`} className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error?.error}
          </Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Control
              className="my-3"
              type="text"
              placeholder="Enter user name"
              value={name ?? ""} // <-- nullish fallback ensures controlled input
              onChange={(e) => setName(e.target.value)}
            />

            <Form.Control
              className="my-3"
              type="text"
              placeholder="Enter Email"
              value={email ?? ""} // <-- fallback again
              onChange={(e) => setEmail(e.target.value)}
            />

            <Form.Check
              className="my-3"
              type="checkbox"
              label="Is Admin"
              checked={!!isAdmin} // <-- ensure boolean
              onChange={(e) => setIsAdmin(e.target.checked)}
            />

            <Button type="submit" className="btn-block mt-3">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};
export default UserEditScreen;
