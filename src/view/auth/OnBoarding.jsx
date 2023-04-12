import React, { useContext, useEffect, useState } from "react";
import { Progress, Box, ButtonGroup, Button, Flex } from "@chakra-ui/react";
import { useFormik } from "formik";
import SignupSchema from "../../validation/SignupSchema";
import { showRelevantErrorMessage } from "../../utility/utils";
import { toast } from "react-hot-toast";
import { auth, database, storage } from "../../firebase/firebase-config";
import { ref as storageRef } from "firebase/storage";
import { ref, set } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../../components/common/Loader";
import { getDownloadURL, uploadBytes } from "firebase/storage";
import { generateUsername } from "../../utility/functions";
import Form1 from "../../components/forms/OnBoarding/Form1";
import Form2 from "../../components/forms/OnBoarding/Form2";
import Form3 from "../../components/forms/OnBoarding/Form3";
import { useDispatch } from "react-redux";
import { updateChanges } from "../../redux/actions/authActions";
import LottieBucket from "../../components/common/LottieBucket";
import SignupHelllo from "../../animation/signup-hello.json";
import AccountCraetion from "../../animation/account-creation-success.json";

export default function OnBoarding() {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  const [loading, setLoading] = useState(false);
  const { userDetails, setCurrentUser } = useContext(AuthContext);
  const [spalsh2, setSplash2] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    country: "",
    city: "",
    state: "",
    bio: "",
    occupation: "",
    coverImage: [],
    profileImage: [],
  };
  const initialErrors = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    country: "",
    city: "",
    state: "",
    bio: "",
    occupation: "",
  };

  const handleSubmit = async (values) => {
    let profileURL,
      coverURL = "";
    let coverImage, profileImage;
    const { firstName, lastName, country, city, state, bio, occupation } =
      values;

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      if (userCredential) {
        if ((values.coverImage && values.profileImage) === null) {
          profileURL =
            "https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png";
          coverURL =
            "https://i.pinimg.com/originals/4a/88/7e/4a887e68509737452a38ba244079b8a0.jpg";
        } else if (values.coverImage === null) {
          coverURL =
            "https://i.pinimg.com/originals/4a/88/7e/4a887e68509737452a38ba244079b8a0.jpg";
          profileImage = values.profileImage;
          const profilePicRef = storageRef(
            storage,
            `profile_pics/${
              userCredential.user.uid
            }/${profileImage.name.replace(/\./g, "-")}`
          );
          await uploadBytes(profilePicRef, profileImage);
          profileURL = await getDownloadURL(profilePicRef);
        } else if (values.profileImage === null) {
          profileURL =
            "https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png";
          coverImage = values.coverImage;
          const coverImageRef = storageRef(
            storage,
            `cover_images/${userCredential.user.uid}/${coverImage.name.replace(
              /\./g,
              "-"
            )}`
          );
          await uploadBytes(coverImageRef, coverImage);
          coverURL = await getDownloadURL(coverImageRef);
        } else {
          profileImage = values.profileImage;
          coverImage = values.coverImage;
          //Upload Images
          const profilePicRef = storageRef(
            storage,
            `profile_pics/${
              userCredential.user.uid
            }/${profileImage.name.replace(/\./g, "-")}`
          );
          const coverImageRef = storageRef(
            storage,
            `cover_images/${userCredential.user.uid}/${coverImage.name.replace(
              /\./g,
              "-"
            )}`
          );
          // Upload profile picture
          await uploadBytes(profilePicRef, profileImage);
          profileURL = await getDownloadURL(profilePicRef);
          // Get profile picture download URL
          await uploadBytes(coverImageRef, coverImage);
          coverURL = await getDownloadURL(coverImageRef);
        }
        //End Upload Images
        const username = generateUsername(firstName, lastName);
        set(ref(database, "users/" + userCredential.user.uid), {
          username,
          firstName,
          lastName,
          country,
          city,
          state,
          bio,
          occupation,
          profileURL,
          coverURL,
          posts: "",
          isAdmin: false,
          followers: 0,
          following: 0,
          settings: {
            emailShow: true,
          },
        }).then(() => {
          setSplash2(true);
          setTimeout(() => {
            setLoading(false);
            setCurrentUser(userCredential.user);
            navigate("/posts");
            dispatch(updateChanges());
            setSplash2(false);
          }, 3100);
        });
      } else {
        toast.error("Something went wrong, please try again later");
        setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
      showRelevantErrorMessage(error);
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: SignupSchema,
    initialErrors,
  });
  useEffect(() => {
    if (userDetails) {
      navigate("/posts");
    }
  }, [userDetails, navigate]);
  // for splash screen
  const [spalsh1, setSplash1] = useState(false);

  useEffect(() => {
    setTimeout(() => setSplash1(false), 3000);
  }, []);
  return (
    <>
      {spalsh2 ? (
        <div className="vh-90 d-flex flex-column justify-content-center m-5">
          <LottieBucket path={AccountCraetion} />
        </div>
      ) : spalsh1 ? (
        <div className="vh-90 d-flex flex-column justify-content-center m-5">
          <LottieBucket path={SignupHelllo} />
        </div>
      ) : (
        <>
          {loading && <Loader />}
          <Box
            borderWidth="1px"
            rounded="lg"
            shadow="1px 1px 3px rgba(0,0,0,0.3)"
            maxWidth={800}
            p={6}
            m="100px auto"
            as="form"
            onSubmit={formik.handleSubmit}
          >
            <Progress
              hasStripe
              value={progress}
              mb="5%"
              mx="5%"
              isAnimated
            ></Progress>
            {step === 1 ? (
              <Form1 action={formik} />
            ) : step === 2 ? (
              <Form2 action={formik} />
            ) : (
              <Form3 action={formik} />
            )}
            <ButtonGroup mt="5%" w="100%">
              <Flex w="100%" justifyContent="space-between">
                <Flex>
                  <Button
                    onClick={() => {
                      setStep(step - 1);
                      setProgress(progress - 33.33);
                    }}
                    isDisabled={step === 1}
                    colorScheme="teal"
                    variant="solid"
                    w="7rem"
                    mr="5%"
                  >
                    Back
                  </Button>
                  <Button
                    w="7rem"
                    isDisabled={step === 3}
                    onClick={() => {
                      setStep(step + 1);
                      if (step === 3) {
                        setProgress(100);
                      } else {
                        setProgress(progress + 33.33);
                      }
                    }}
                    colorScheme="teal"
                    variant="outline"
                  >
                    Next
                  </Button>
                </Flex>
                {step === 3 && (
                  <>
                    <Button
                      isDisabled={Object.keys(formik.errors).length !== 0}
                      w="7rem"
                      colorScheme="red"
                      variant="solid"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </>
                )}
              </Flex>
            </ButtonGroup>
          </Box>
        </>
      )}
    </>
  );
}
