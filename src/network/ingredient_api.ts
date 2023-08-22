import axios from 'axios';

axios.get('https://bdy09cap8a.execute-api.us-east-1.amazonaws.com/dev/v1/ingredients')
  .then(response => {
    // Handle the successful response here
    console.log(response.data);
  })
  .catch(error => {
    // Handle any errors that occurred during the request
    console.error(error);
  });