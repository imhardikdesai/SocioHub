import {
  Avatar,
  useDisclosure,
  Button,
  AvatarBadge,
  Icon,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import ChakraDataTable from "../../theme/DataTables-chakra";
import { deleteUserWithUsername } from "../../utility/admin";
import { useDispatch } from "react-redux";
import { updateChanges } from "../../redux/actions/authActions";
import UserEditModal from "./UserEditModal";
import { FaCrown } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const AdminDashboard = ({ people }) => {
  const dispatch = useDispatch();
  const [currentPeople, setCurrentPeople] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const columns = [
    {
      name: "Profile",
      selector: (user) => {
        return (
          <NavLink to={'/profile/' + user.username}>
            <Avatar
              size={"lg"}
              src={user.profileURL}
              alt={"Author"}
              margin="3"
              cursor={"pointer"}
              css={{
                border: "2px solid white",
              }}
            >
              {user.isAdmin && (
                <AvatarBadge
                  boxSize="0.9em"
                  bg="yellow.500"
                  borderColor="white"
                  borderWidth="2px"
                >
                  <Icon as={FaCrown} color="white" boxSize="0.5em" />
                </AvatarBadge>
              )}
            </Avatar>
          </NavLink>
        )
      },
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "Name",
      selector: (user) => user.firstName + " " + user.lastName,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      sortable: true
    },
    {
      name: "Email",
      selector: (user) => user.email,
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
      cell: (user) => {
        const handleUserEdit = () => {
          onOpen();
          setCurrentPeople(user);
        };
        return (
          <>
            <Button
              isDisabled={user.isAdmin}
              className="admin-edit"
              rightIcon={<AiFillEdit size={20} />}
              colorScheme="blue"
              variant="outline"
              onClick={handleUserEdit}
              p={0}
            />
          </>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "Delete",
      cell: (user) => {
        const handleDeleteUser = () => {
          deleteUserWithUsername(user.username).then(() => {
            dispatch(updateChanges());
          });
        };
        return (
          <Button
            isDisabled={user.isAdmin}
            className="admin-edit"
            rightIcon={<AiFillDelete size={20} />}
            colorScheme="blue"
            variant="outline"
            onClick={handleDeleteUser}
            p={0}
          />
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];


  return (
    <>
      <div>
        {currentPeople && (
          <UserEditModal
            setCurrentPeople={setCurrentPeople}
            user={currentPeople}
            isOpen={isOpen}
            onClose={onClose}
          />
        )}
        <ChakraDataTable columns={columns} data={people} />
      </div>
    </>
  );
};

export default AdminDashboard;
