import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf8'));
const app = initializeApp(config);
const auth = getAuth(app);

async function setup() {
  try {
    await signInAnonymously(auth);
    console.log('Server user signed in anonymously');
  } catch (e: any) {
    console.error('Error:', e);
  }
}
setup();
