import React, { useState, ChangeEvent } from "react";
import { getPreSignedUrl } from "../../network/mealApi";
import useMealStore from "../../stores/mealStore";
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Input } from "@mui/material";

function MealImageUploader() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { mealId } = useMealStore();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  const handleUpload = async () => {
    if (selectedFile) {
      try {
        const preSignedUrlData = await getPreSignedUrl(
          mealId,
        );
        const { uploadUrl } = preSignedUrlData;
        console.log("meal id = ", mealId)

        // Use the pre-signed URL to perform the PUT request
        await fetch(uploadUrl, {
          method: "PUT",
          body: selectedFile,
          headers: {
            "Content-Type": selectedFile.type,
          },
        });

        console.log("Image uploaded successfully!");
        
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading image. Please try again later.");
      }
    } else {
      alert("Please select a file to upload.");
    }
  };
  return (
    <>
    <h2>Upload Meal Image</h2>
    <Input type="file" onChange={handleFileChange} />
    <Button onClick={handleUpload}>Upload</Button>
    </>
  );
}

export default MealImageUploader;