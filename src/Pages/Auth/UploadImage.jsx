import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Button, Group } from "@mantine/core";
import './UploadImage.css';
const UploadImage = ({ userData, setUserData, nextStep, prevStep }) => {
  const [imageURL, setImageURL] = useState(userData.profilePicture);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  const handleNext = () => {
    setUserData((prev) => ({ ...prev, profilePicture: imageURL }));
    nextStep();
  };

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;

    if (cloudinaryRef.current) {
      widgetRef.current = cloudinaryRef.current.createUploadWidget(
        {
          cloudName: "dcdhklrjc",
          uploadPreset: "vx0dyjgc",
          maxFiles: 1,
        },
        (err, result) => {
          if (result.event === "success") {
            setImageURL(result.info.secure_url);
          }
        }
      );
    } else {
      console.error("Cloudinary is not loaded");
    }
  }, []);

  return (
    <div className="flexColCenter uploadWrapper">
      {!imageURL ? (
        <div
          className="flexColCenter uploadZone"
          onClick={() => widgetRef.current?.open()}
        >
          <AiOutlineCloudUpload size={50} color="grey" />
          <span>Upload Image</span>
        </div>
      ) : (
        <div
          className="uploadedImage"
          onClick={() => widgetRef.current?.open()}
        >
          <img src={imageURL} alt="Uploaded" />
        </div>
      )}
      <Group position="center" mt={"xl"}>
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={!imageURL}>
          Next
        </Button>
      </Group>
    </div>
  );
};

export default UploadImage; 