import React, { useEffect, useState } from "react";
import { ICreateIngredientInput } from "../../interfaces/ingredient";
import * as IngredientsApi from "../../network/ingredientApi";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
 
interface EditIngredientDialogProps {
  onIngredientUpdated: (updatedIngredient: ICreateIngredientInput) => void;
  ingredient: null | ICreateIngredientInput;
}

export default function AddIngredientDialog({
  onIngredientUpdated,
  ingredient,
}: EditIngredientDialogProps) {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState<ICreateIngredientInput>({
    name: "",
    category: "",
    description: "",
    price: 0,
    protein: 0,
    fats: 0,
    carbs: 0,
    unit: "",
  });
  // Update formData when the ingredient prop changes
  useEffect(() => {
    if (ingredient !== null) {
      setFormData({
        name: ingredient.name || "",
        category: ingredient.category || "",
        description: ingredient.description || "",
        price: ingredient.price || 0,
        protein: ingredient.protein || 0,
        fats: ingredient.fats || 0,
        carbs: ingredient.carbs || 0,
        unit: ingredient.unit || "",
      });
    }
  }, [ingredient]);

  const openFormDialog = () => {
    setOpen(true);
  };

  const closeFormDialog = () => {
    setOpen(false);
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleFormSubmit = async () => {
    try {
      if(ingredient){
      console.log("Form data:", formData);
      const updatedIngredient = await IngredientsApi.updateIngredient(ingredient, formData);
      console.log("Updated ingredient:", updatedIngredient);

      onIngredientUpdated(updatedIngredient);
      closeFormDialog();}
    } catch (error) {
      console.log("Error:", error);
      alert(error);
    }
  };
  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <Button variant="contained" color="primary" onClick={openFormDialog}>
          Edit Ingredient
        </Button>
      </div>
      <Dialog open={open} onClose={closeFormDialog}>
        <DialogTitle>Update Ingredient</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleFormChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleFormChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleFormChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Protein"
            name="protein"
            type="number"
            value={formData.protein}
            onChange={handleFormChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Fats"
            name="fats"
            type="number"
            value={formData.fats}
            onChange={handleFormChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Carbs"
            name="carbs"
            type="number"
            value={formData.carbs}
            onChange={handleFormChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Unit"
            name="unit"
            value={formData.unit}
            onChange={handleFormChange}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeFormDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleFormSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
