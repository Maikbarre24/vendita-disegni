// Variabili globali
let device;
let server;
let service;
let characteristic;
let statusElement = document.getElementById('status');
let connectButton = document.getElementById('connectButton');
let unlockButton = document.getElementById('unlockButton');

// Pulsante di connessione
connectButton.addEventListener('click', async () => {
    try {
        // Scansione per dispositivi Bluetooth (Monopattino)
        statusElement.textContent = "Stato: In cerca del monopattino...";
        device = await navigator.bluetooth.requestDevice({
            filters: [{ services: ['battery_service'] }] // Aggiungi il servizio del monopattino qui
        });

        // Connessione al dispositivo
        statusElement.textContent = "Stato: Connessione al monopattino...";
        server = await device.gatt.connect();
        service = await server.getPrimaryService('battery_service'); // Sostituisci con il servizio effettivo
        characteristic = await service.getCharacteristic('battery_level'); // Sostituisci con la caratteristica effettiva

        // Abilitare il pulsante di sblocco
        unlockButton.disabled = false;
        statusElement.textContent = "Stato: Connesso al monopattino";
    } catch (error) {
        console.log(error);
        statusElement.textContent = "Stato: Errore durante la connessione";
    }
});

// Pulsante di sblocco
unlockButton.addEventListener('click', async () => {
    try {
        // Invia il comando al monopattino (sostituisci con il comando effettivo)
        const encoder = new TextEncoder();
        const command = encoder.encode("sblocca");
        await characteristic.writeValue(command);
        statusElement.textContent = "Stato: Monopattino Sbloccato!";
    } catch (error) {
        console.log(error);
        statusElement.textContent = "Stato: Errore durante il comando";
    }
});
