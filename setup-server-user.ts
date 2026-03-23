import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf8'));
const app = initializeApp(config);
const auth = getAuth(app);

async function setup() {
  try {
    await createUserWithEmailAndPassword(auth, 'server@ignis.com', 'ignishard18458416');
    console.log('Server user created');
  } catch (e: any) {
    if (e.code === 'auth/email-already-in-use') {
      console.log('Server user already exists');
      await signInWithEmailAndPassword(auth, 'server@ignis.com', 'ignishard18458416');
      console.log('Server user signed in');
    } else {
      console.error('Error:', e);
    }
  }
}
setup();
