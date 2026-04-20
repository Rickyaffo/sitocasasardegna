const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

/**
 * Cloud Function per la registrazione legale del consenso cookie.
 * Nome: registraConsenso (HTTP trigger)
 */
exports.registraConsenso = functions.https.onRequest(async (req, res) => {
  // 1. Gestione CORS dinamica
  const allowedOrigins = [
    "https://casasardegna-6c0f4.web.app",
    "https://casasardegna-6c0f4.firebaseapp.com",
    "https://www.casasardegna.net" // Inserire qui il dominio finale se diverso
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.set("Access-Control-Allow-Origin", origin);
  } else {
    // Per test/local, puoi lasciare *, ma in produzione è meglio essere restrittivi
    res.set("Access-Control-Allow-Origin", "https://casasardegna-6c0f4.web.app");
  }

  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", "3600");

  // Preflight request
  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  // Verifica metodo
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  // 2. Estrazione e validazione dati
  const { id_anonimo, consenso_analytics, url_pagina, lingua } = req.body;

  if (!id_anonimo || typeof consenso_analytics !== "boolean") {
    console.warn("Invalid consent data received:", req.body);
    res.status(400).send({ status: "error", message: "Invalid data" });
    return;
  }

  try {
    // 3. Salvataggio nel Registro Legale (Firestore)
    const consentDoc = {
      id_anonimo,
      consenso_analytics,
      url_pagina: url_pagina || "unknown",
      lingua: lingua || "it",
      timestamp_server: admin.firestore.FieldValue.serverTimestamp(),
      user_agent: req.headers["user-agent"] || "unknown",
      ip_hash: req.ip ? require("crypto").createHash("sha256").update(req.ip).digest("hex") : "unknown" // Privacy-safe IP
    };

    await db.collection("registro_consensi").add(consentDoc);

    res.status(200).send({ 
      status: "success", 
      message: "Consenso registrato a norma di legge." 
    });
  } catch (error) {
    console.error("Errore Firestore registraConsenso:", error);
    res.status(500).send({ status: "error", message: "Internal Server Error" });
  }
});
