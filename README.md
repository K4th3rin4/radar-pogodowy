# ⛅ Radar Pogodowy — PWA

Aplikacja pogodowa działająca jako Progressive Web App (PWA) — można ją zainstalować na Androidzie i iOS jak natywną aplikację.

## 🌐 Dostęp online

**[https://k4th3rin4.github.io/radar-pogodowy/](https://k4th3rin4.github.io/radar-pogodowy/)**

---

## 📱 Instalacja na telefonie

### Android (Chrome)
1. Otwórz link w **Chrome**
2. Kliknij menu **⋮** → **Dodaj do ekranu głównego** / **Zainstaluj aplikację**
3. Ikona ⛅ pojawi się na ekranie głównym

### iOS (Safari)
1. Otwórz link w **Safari**
2. Kliknij ikonę **Udostępnij** → **Dodaj do ekranu głównego**

---

## 🔧 Funkcje

| Kategoria | Funkcje |
|---|---|
| 🌡 **Pogoda** | Aktualna pogoda, odczuwalna, punkt rosy, wiatr, ciśnienie, widoczność, UV |
| 📈 **Prognozy** | Wykres godzinowy 24h + prognoza 3-dniowa z prawdopodobieństwem opadów |
| 💨 **Jakość powietrza** | PM2.5, PM10, NO₂, O₃, SO₂, CO z indeksem AQI (Copernicus CAMS) |
| 🌿 **Pyłki** | Trawy, brzoza, olcha, bylica, oliwka, ambrozja |
| 🛰 **Radar** | Radar opadów Windy.com na żywo + link do pogodairadar.pl |
| 🌊 **Stany rzek** | IMGW dla Polski + Copernicus GloFAS dla całego świata |
| 📡 **Stacja IMGW** | Pomiar na żywo z najbliższej stacji synoptycznej |
| 🔔 **Alerty** | Powiadomienia push przy burzy, silnym wietrze, upale, mrozie |
| 🌍 **Globalny** | Wyszukiwanie miast w Polsce i na całym świecie (USA stany po nazwie) |
| 🌓 **Motywy** | 9 motywów kolorystycznych (ciemny, jasny, miętowy, błękitny, słoneczny, różowy, lawendowy, brzoskwiniowy, czerwony) |

---

## 📊 Źródła danych

| Źródło | Dane |
|---|---|
| [Open-Meteo](https://open-meteo.com/) | Pogoda, prognoza, jakość powietrza, pyłki |
| [Copernicus CAMS](https://atmosphere.copernicus.eu/) | Jakość powietrza, pyłki (przez Open-Meteo) |
| [Copernicus GloFAS](https://global-flood.emergency.copernicus.eu/) | Stany rzek świata (przez Open-Meteo Flood API) |
| [IMGW](https://danepubliczne.imgw.pl/) | Stany rzek Polska, stacje meteorologiczne |
| [Windy.com](https://www.windy.com/) | Radar opadów |
| [Open-Meteo Geocoding](https://open-meteo.com/) | Wyszukiwanie miast |

Wszystkie API są **darmowe** i nie wymagają kluczy.

---

## 🛠 Struktura plików

```
radar-pogodowy/
├── index.html      — cała aplikacja (HTML + CSS + JS)
├── manifest.json   — konfiguracja PWA
├── sw.js           — service worker (cache + powiadomienia)
├── icon-192.png    — ikona 192×192px
├── icon-512.png    — ikona 512×512px
└── README.md       — dokumentacja
```

---

## ⚙️ Technologie

- **Vanilla JS** — zero frameworków, zero zależności
- **SVG** — wykresy rysowane ręcznie (bez Chart.js)
- **CSS Variables** — system motywów
- **PWA** — Service Worker, Web App Manifest, Push API
- **localStorage** — zapisane lokalizacje, motyw, ostatnie miasto

---

## 🔔 Alerty pogodowe

Aplikacja wysyła powiadomienia push gdy:
- ⛈ Burza (kod pogody ≥ 95)
- 💨 Wiatr > 50 km/h
- 🌡 Temperatura > 33°C (upał)
- ❄️ Temperatura < -10°C (mróz)
- 🌊 Stan rzeki w ostrzeżeniu lub alarmie (IMGW)
- 💨 AQI > 100 (podwyższone zanieczyszczenie)

---

*Dane odświeżane automatycznie co 10 minut.*
