import { USERS_URL } from "../constants";
import { apiSlice } from "../slices/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
        method: "GET",
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: "DELETE",
      }),
    }),
    getUserDetails: builder.query({
      query: (userId)=>({
        url: `${USERS_URL}/${userId}`,
        method: 'GET'
      }),
      keepUnusedDataFor: 5
    }),
    updateUser: builder.mutation({
      query: (user)=>({
        url: `${USERS_URL}/${user._id}`,
        method: 'PUT',
        body: user
      }),
      invalidatesTags: ['User'],
    })
    //  updateUser: builder.mutation({
    //   query: (data)=>({
    //     url: `${USERS_URL}/${data.userId}`,
    //     method: 'PUT',
    //     body: data
    //   }),
    //   invalidatesTags: ['Users'],
    // })
  }),
});
export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation
} = userApiSlice;
