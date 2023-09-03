import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import * as mealsApi from '../../network/mealApi'
import { IAddMealDialogProps, IMealComponentDataArray } from "../../interfaces";
import { useFormik } from "formik";
import mealValidationSchema from "../../validation/mealFormValidation";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import useComponentStore from "../../stores/componentStore";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";