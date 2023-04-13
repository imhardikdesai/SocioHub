import {
  Avatar,
  useDisclosure,
  Button,
  AvatarBadge,
  Icon,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { GetAllUserList } from "../../utility/utils";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import ChakraDataTable from "../../theme/DataTables-chakra";
import { deleteUserWithUsername } from "../../utility/admin";
import { useDispatch, useSelector } from "react-redux";
import { updateChanges } from "../../redux/actions/authActions";
import UserEditModal from "./UserEditModal";
import { FaCrown } from "react-icons/fa";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [people, setPeople] = useState([]);
  const [currentPeople, setCurrentPeople] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
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
      ),
    },
    {
      name: "Name",
      selector: (user) => user.firstName + " " + user.lastName,
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

  useEffect(() => {
    GetAllUserList().then((user) => setPeople(Object.values(user)));
  }, [status]);
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
