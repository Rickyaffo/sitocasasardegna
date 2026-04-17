const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

/**
 * Cloud Function con gestione MANUALE dei CORS per evitare errori di Preflight.
 */
exports.registraConsenso = functions.https.onRequest(async (req, res) => {
  // 1. Configurazione Header CORS
  res.set("Access-Control-Allow-Origin", "https://casasardegna-6c0f4.web.app");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", "3600");

  // 2. Intercettazione richiesta OPTIONS (Pre-flight)
  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  // 3. Verifica metodo POST
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  const { id_anonimo, consenso_analytics, url_pagina, lingua } = req.body;

  // 4. Validazione base
  if (!id_anonimo || typeof consenso_analytics !== "boolean") {
    res.status(400).send("Invalid data");
    return;
  }

  try {
    // 5. Salvataggio su Firestore
    await db.collection("registro_consensi").add({
      id_anonimo: id_anonimo,
      consenso_analytics: consenso_analytics,
      url_pagina: url_pagina || "unknown",
      lingua: lingua || "it",
      timestamp_server: admin.firestore.FieldValue.serverTimestamp(),
      user_agent: req.headers["user-agent"] || "unknown"
    });

    res.status(200).send({ status: "success", message: "Consent registered" });
  } catch (error) {
    console.error("Error registering consent:", error);
    res.status(500).send("Internal Server Error");
  }
});
