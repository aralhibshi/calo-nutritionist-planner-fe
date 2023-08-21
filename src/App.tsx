import { Amplify } from 'aws-amplify';
import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsconfig from './aws-exports';
import NavBar from './components/NavBar';
Amplify.configure(awsconfig);

function App({ signOut, user }: WithAuthenticatorProps) {
  return (
    <>
      <NavBar signOut={signOut} user={user} />
    </>
  );
}

export default withAuthenticator(App);