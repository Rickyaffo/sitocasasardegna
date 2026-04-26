Obiettivo: Eliminare definitivamente i link esterni ad Airbnb da tutto il sito e creare un sistema di prenotazione interno basato su una nuova pagina con calendario interattivo.

Agisci su tutti i file del progetto per implementare questa logica:

1. RIMOZIONE DI AIRBNB DAI FILE ESISTENTI:
Esamina tutti i file HTML del sito. Trova qualsiasi link o bottone che punti alla pagina di Airbnb. Sostituisci la destinazione di questi link per farli puntare a una nuova pagina che chiameremo "prenota.html" (assicurati di usare il percorso relativo corretto per i file che si trovano nella cartella /en/). Se il testo del link o del bottone dice "Airbnb", modificalo in "Prenota" (o "Book" per i file in inglese).

2. CREAZIONE DELLE NUOVE PAGINE DI PRENOTAZIONE:
Crea il nuovo file `public/prenota.html` (e la sua variante inglese `public/en/prenota.html`). Per mantenere la coerenza del sito, copia l'esatta struttura di base dalla pagina `services.htm
l` (quindi mantieni intatti l'intestazione, il menu di navigazione principale, il footer e il bottone fluttuante di WhatsApp).

3. STRUTTURA DEL CALENDARIO E DEL BANNER:
Nel corpo principale di questa nuova pagina, crea un layout diviso in due sezioni (ad esempio affiancate su PC e impilate su smartphone):
- Nella sezione principale: Inserisci un calendario interattivo "inline" (sempre aperto e visibile, usa una libreria adatta allo scopo) che permetta all'utente di selezionare un intervallo di date (arrivo e partenza).
- Nella sezione laterale: Crea un banner o un riquadro grafico riassuntivo.

4. IMPOSTAZIONE DELLE DATE NON DISPONIBILI:
Il calendario deve impedire di selezionare le date passate. Inoltre, devi bloccare (rendendoli grigi e non cliccabili) i seguenti periodi che sono già stati prenotati per l'estate 2026:
- Dal 15 Giugno 2026 al 28 Giugno 2026
- Dal 30 Giugno 2026 al 10 Luglio 2026
- Dal 14 Luglio 2026 al 21 Luglio 2026
- Dal 4 Agosto 2026 al 15 Agosto 2026

5. INTERATTIVITÀ DEL BANNER:
- Stato iniziale: Quando l'utente apre la pagina, il banner laterale deve mostrare un messaggio che lo invita a selezionare le date del soggiorno sul calendario per verificare la disponibilità.
- Stato selezionato: Appena l'utente seleziona una data di inizio e una di fine valide sul calendario, il banner deve aggiornarsi dinamicamente. Deve mostrare un messaggio di successo ("Date disponibili!"), riepilogare le date scelte e far apparire un pulsante ben visibile con scritto "Richiedi Prenotazione" ("Request Booking" in inglese).
- Il pulsante "Richiedi Prenotazione" deve essere un link diretto al mio contatto WhatsApp: https://wa.me/393381087298

6. DESIGN E STILE:
Applica uno stile elegante e moderno al calendario e al banner, utilizzando le classi Tailwind e i colori del brand (oro, grigio scuro, bianco sporco) già presenti nel resto del sito.