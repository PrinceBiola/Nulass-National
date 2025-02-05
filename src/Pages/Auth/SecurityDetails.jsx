import React from "react";
import { TextInput, Button, Group } from "@mantine/core";

const SecurityDetails = ({ prevStep, nextStep, userData, setUserData }) => {
  return (
    <div>
      <TextInput
        label="Phone Number"
        placeholder="Enter your phone number"
        value={userData.phoneNumber}
        onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })}
      />
      <TextInput
        label="NIN"
        placeholder="Enter your NIN"
        value={userData.nin}
        onChange={(e) => setUserData({ ...userData, nin: e.target.value })}
      />
      <TextInput
        label="Local Government"
        placeholder="Enter your local government"
        value={userData.localGovernment}
        onChange={(e) => setUserData({ ...userData, localGovernment: e.target.value })}
      />
      <Group position="apart" mt="md">
        <Button variant="default" onClick={prevStep}>Back</Button>
        <Button onClick={nextStep}>Next</Button>
      </Group>
    </div>
  );
};

export default SecurityDetails; 