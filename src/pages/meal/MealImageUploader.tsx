import React, { useState, ChangeEvent } from "react";
import { getPreSignedUrl } from "../../network/mealApi";
import useMealStore from "../../stores/mealStore";
import { Button, Input } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from '@mui/material/styles';
import { MuiFileInput } from 'mui-file-input'


function MealImageUploader() {
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { mealId } = useMealStore();
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (newFile: File | null) => {
    setFile(newFile);
  };
  // const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     setSelectedFile(e.target.files[0]);
  //   }
  // };
  const handleUpload = async () => {
    if (file) {
      try {
        const preSignedUrlData = await getPreSignedUrl(mealId);
        const { uploadUrl } = preSignedUrlData;
        console.log("meal id = ", mealId);

        // Use the pre-signed URL to perform the PUT request
        await fetch(uploadUrl, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file.type,
          },
        });

        console.log("Image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading image. Please try again later.");
      }
    } 
    // else {
    //   // alert("Please select a file to upload.");
    // }
  };
  return (
    <>
      <h2>Upload Meal Image</h2>

      {/* <Button onClick={handleUpload}>Upload</Button> */}
      {/* <Input type="file" onChange={handleFileChange}/> */}
      <MuiFileInput value={file} onChange={handleChange}>Select File</MuiFileInput>
      <br />
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        onClick={handleUpload}
      >
        Upload file
      </Button>
    </>
  );
}

export default MealImageUploader;
