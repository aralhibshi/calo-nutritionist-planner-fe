import React, { useState, ChangeEvent } from "react";
import { getPreSignedUrl } from "../../network/mealApi";
import useMealStore from "../../stores/mealStore";
import { Box, Button, CircularProgress, Input } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from '@mui/material/styles';
import { MuiFileInput } from 'mui-file-input'
import useNotificationStore from "../../stores/notificationStore";


function MealImageUploader() {
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { mealId, setUploaded} = useMealStore();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { setNotify, setMessage } = useNotificationStore();


  const handleChange = (newFile: File | null) => {
    setFile(newFile);
  };
  const handleUpload = async () => {
    if (file) {
      try {
        setLoading(true)
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
        setNotify(true);
        setMessage("Image Uploaded");
        setUploaded(true)

      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading image. Please try again later.");
      } finally {
        setLoading(false)
      }
    } 
  };
  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <div>
            <h2>Upload Meal Image</h2>
            <MuiFileInput value={file} onChange={handleChange}
            style={{marginBottom:'10px'}}>
              Select File
            </MuiFileInput>

            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              onClick={handleUpload}
            >
              Upload file
            </Button>
          </div>
        </>
      )}
    </>
  );
}

export default MealImageUploader;
