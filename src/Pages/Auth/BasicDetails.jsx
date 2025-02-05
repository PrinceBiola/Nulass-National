import React from "react";
import { TextInput, Button, Group } from "@mantine/core";

const BasicDetails = ({ nextStep, userData, setUserData }) => {
  return (
    <div>
      <TextInput
        label="Surname"
        placeholder="Enter your surname"
        value={userData.surname}
        onChange={(e) => setUserData({ ...userData, surname: e.target.value })}
        required
      />
      <TextInput
        label="Other Names"
        placeholder="Enter your other names"
        value={userData.name}
        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        required
      />
      <TextInput
        label="Email"
        placeholder="Enter your email"
        value={userData.email}
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        required
      />
      <Group position="right" mt="md">
        <Button onClick={nextStep}>Next</Button>
      </Group>
    </div>
  );
};

export default BasicDetails; 