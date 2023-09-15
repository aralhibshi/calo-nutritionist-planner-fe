import React, { useState } from "react";
import { getPreSignedUrl } from "../../network/mealApi";
import useMealStore from "../../stores/mealStore";

  
function MealImageUploader() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { selectedMeal, setSelectedMeal } = useMealStore();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      try {
        const folderPath = 'uploads/'; // Specify the folder name
        const preSignedUrlData = await getPreSignedUrl(selectedMeal?.id, folderPath);
        const { uploadUrl } = preSignedUrlData;
        
        // Use the pre-signed URL to perform the PUT request
        await fetch(uploadUrl, {
          method: "PUT",
          body: selectedFile,
          headers: {
            "Content-Type": selectedFile.type,
          },
        });
  
        alert("Image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading image. Please try again later.");
      }
    } else {
      alert("Please select a file to upload.");
    }
  };

  return (
    <div>
      <h2>Upload Meal Image</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default MealImageUploader;
