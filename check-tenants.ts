import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf8'));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

async function run() {
  const tenantsSnap = await getDocs(collection(db, 'tenants'));
  console.log('Tenants:', tenantsSnap.docs.map(d => d.id));
  process.exit(0);
}
run();
