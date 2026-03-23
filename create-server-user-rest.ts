import fs from 'fs';

async function run() {
  const config = JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf8'));
  const apiKey = config.apiKey;
  
  const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'server@ignis.com',
      password: 'ignishard18458416',
      returnSecureToken: true
    })
  });
  
  const data = await res.json();
  console.log(data);
}
run();
