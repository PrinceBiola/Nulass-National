import React, { useState } from "react";
import { Container, Modal, Stepper } from "@mantine/core";
import BasicDetails from "./BasicDetails";
import SecurityDetails from "./SecurityDetails";
import UploadImage from "./UploadImage";
import { useAuth0 } from "@auth0/auth0-react";

const SignUpModal = ({ opened, setOpened }) => {
  const [active, setActive] = useState(0);
  const { user } = useAuth0();

  const [userData, setUserData] = useState({
    surname: "",
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    nin: "",
    localGovernment: "",
    profilePicture: null,
    userEmail: user?.email,
  });

  const nextStep = () => {
    setActive((current) => (current < 2 ? current + 1 : current));
  };

  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      closeOnClickOutside
      size={"90rem"}
    >
      <Container h={"40rem"} w={"100%"}>
        <Stepper
          active={active}
          onStepClick={setActive}
          breakpoint="sm"
          allowNextStepsSelect={false}
        >
          <Stepper.Step label="Basic Details" description="Enter your name and email">
            <BasicDetails
              nextStep={nextStep}
              userData={userData}
              setUserData={setUserData}
            />
          </Stepper.Step>
          <Stepper.Step label="Security Details" description="Phone number, NIN, etc.">
            <SecurityDetails
              prevStep={prevStep}
              nextStep={nextStep}
              userData={userData}
              setUserData={setUserData}
            />
          </Stepper.Step>
          <Stepper.Step label="Upload Image" description="Profile picture">
            <UploadImage
              prevStep={prevStep}
              nextStep={nextStep}
              userData={userData}
              setUserData={setUserData}
            />
          </Stepper.Step>
          <Stepper.Completed>
            Completed! You can now log in.
          </Stepper.Completed>
        </Stepper>
      </Container>
    </Modal>
  );
};

export default SignUpModal; 