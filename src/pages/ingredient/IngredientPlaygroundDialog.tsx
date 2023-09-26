import React from 'react';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

interface IngredientPlaygroundDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const IngredientPlaygroundDialog: React.FC<IngredientPlaygroundDialogProps> = (props) => {
  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
    >
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item container xs={6} spacing={2} alignItems="center">
              <Grid item xs={12}>
                <Typography variant="h6">Before</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField variant="outlined" label="Price" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField variant="outlined" label="Protein" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField variant="outlined" label="Carbs" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField variant="outlined" label="Fats" fullWidth />
              </Grid>
            </Grid>
            <Grid item container xs={6} spacing={2} alignItems="center">
              <Grid item xs={12}>
                <Typography variant="h6">After</Typography>
              </Grid>
              <Grid item xs={12}>
                <ArrowDownwardIcon />
              </Grid>
              <Grid item xs={12}>
                <ArrowDownwardIcon />
              </Grid>
              <Grid item xs={12}>
                <ArrowDownwardIcon />
              </Grid>
              <Grid item xs={12}>
                <ArrowDownwardIcon />
              </Grid>
            </Grid>
          </Grid>
          <Button variant="contained" onClick={handleClose}>Close</Button>
        </CardContent>
      </Card>
    </Dialog>
  );
};

export default IngredientPlaygroundDialog;
