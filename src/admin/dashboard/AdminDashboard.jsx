import { Avatar } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { GetAllUserList } from "../../utility/utils";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

import ChakraDataTable from "../../theme/DataTables-chakra";
import { deleteUserWithUsername } from "../../utility/admin";
import { useDispatch, useSelector } from "react-redux";
import { updateChanges } from "../../redux/actions/authActions";

const AdminDashboard = () => {
  const [people, setPeople] = useState([]);
  const dispatch = useDispatch();
  const status = useSelector((state) => state.auth.status);
  const columns = [
    {
      name: "Profile",
      selector: (user) => (
        <Avatar
          size={"lg"}
          src={user.profileURL}
          alt={"Author"}
          margin="3"
          cursor={"pointer"}
          css={{
            border: "2px solid white",
          }}
        />
      ),
    },
    {
      name: "Name",
      selector: (user) => user.firstName + " " + user.lastName,
    },
    {
      name: "Username",
      selector: (user) => "@" + user.username,
    },
    {
      name: "Bio",
      selector: (user) => user.bio,
    },
    {
      name: "Occupation",
      selector: (user) => user.occupation,
    },
    {
      name: "Address",
      selector: (user) => user.city + " ," + user.state + " ," + user.country,
    },
    {
      name: "Edit",
      cell: (user) => (
        <button
          onClick={() => console.log(user)}
          style={{ padding: "4px", fontSize: "14px" }} // add styles to the button
        >
          <AiFillEdit size={20} />
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "Delete",
      cell: (user) => (
        <button
          onClick={() =>
            deleteUserWithUsername(user.username).then(() =>
              dispatch(updateChanges())
            )
          }
          style={{ padding: "4px", fontSize: "14px" }} // add styles to the button
        >
          <AiFillDelete size={20} />
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  useEffect(() => {
    GetAllUserList().then((user) => setPeople(Object.values(user)));
  }, [status]);
  return (
    <>
      <div>
        <ChakraDataTable columns={columns} data={people} />
      </div>
    </>
  );
};

export default AdminDashboard;
