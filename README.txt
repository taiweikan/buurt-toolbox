BUURT TOOLBOX KAARTVIEWER – LOKAAL PROTOTYPE

STARTEN
1. Pak de ZIP uit.
2. Open een terminal in deze map.
3. Start een lokale server:

   Windows:
   start_prototype.bat

   macOS/Linux:
   ./start_prototype.sh

   Of handmatig:
   python -m http.server 8080

4. Open in de browser:
   http://localhost:8080

WAT WERKT
- Adres/plaats zoeken via PDOK Locatieserver.
- CBS-buurten 2025 laden en selecteren via PDOK OGC API Features.
- Demonstratief buurtprofiel voor verkeer, veiligheid, cohesie, leefbaarheid,
  groen en ontmoetingspotentie.
- Lokale observaties en participatiecitaten op de kaart plaatsen.
- TXT, CSV en JSON lokaal globaal analyseren op themawoorden.
- PDF/DOC(X) als bronbestand registreren; automatische tekstextractie is nog
  niet in deze browserdummy ingebouwd.
- 168 interventies doorzoeken en filteren.
- Interventies rangschikken op basis van buurtprofiel en lokale signalen.
- Interventies op een concrete kaartlocatie plaatsen.
- Project exporteren naar JSON.

BELANGRIJK
- Dit is een frontendprototype. Bestanden en projectgegevens worden niet naar
  een server verstuurd en verdwijnen na het sluiten/verversen, tenzij je
  exporteert.
- Voor de achtergrondkaart, buurtgrenzen en adreszoekfunctie is internet nodig.
- De analysescores zijn voorlopig demonstratief en niet geschikt voor echte
  besluitvorming.
- Volgende stap: echte kaartlagen en indicatoren koppelen, plus lokale opslag
  en PDF/DOCX-extractie via een kleine backend.

DATABRONNEN IN DIT PROTOTYPE
- CBS Wijken en Buurten 2025 via PDOK.
- PDOK Locatieserver.
- OpenStreetMap achtergrondkaart.
- Uitgebreide interventiedataset: Platform31, INBO en BPD.
