import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf8'));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

async function run() {
  try {
    const tenantsSnap = await getDocs(collection(db, 'tenants'));
    for (const tenantDoc of tenantsSnap.docs) {
      const tenantId = tenantDoc.id;
      console.log(`Updating tenant: ${tenantId}`);
      await updateDoc(doc(db, 'tenants', tenantId), { server_token: 'ignishard18458416' });

      // Update services
      const servicesSnap = await getDocs(collection(db, `tenants/${tenantId}/services`));
      for (const serviceDoc of servicesSnap.docs) {
        await updateDoc(doc(db, `tenants/${tenantId}/services`, serviceDoc.id), { server_token: 'ignishard18458416' });
      }

      // Update parts
      const partsSnap = await getDocs(collection(db, `tenants/${tenantId}/parts`));
      for (const partDoc of partsSnap.docs) {
        await updateDoc(doc(db, `tenants/${tenantId}/parts`, partDoc.id), { server_token: 'ignishard18458416' });
      }

      // Update ai_assistant settings
      const aiSettingsSnap = await getDocs(collection(db, `tenants/${tenantId}/settings`));
      for (const settingDoc of aiSettingsSnap.docs) {
        await updateDoc(doc(db, `tenants/${tenantId}/settings`, settingDoc.id), { server_token: 'ignishard18458416' });
      }

      // Update quotes
      const quotesSnap = await getDocs(collection(db, `tenants/${tenantId}/quotes`));
      for (const quoteDoc of quotesSnap.docs) {
        await updateDoc(doc(db, `tenants/${tenantId}/quotes`, quoteDoc.id), { server_token: 'ignishard18458416' });
      }
    }
    console.log('Migration complete!');
  } catch (e) {
    console.error('Error:', e);
  }
}
run();
