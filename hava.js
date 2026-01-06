/* hava.js - YıldızAY Meteoroloji Modülü (Open-Meteo) */

async function havaDurumuOgren(konum) {
    // 1. Konum ismini temizle (Ekleri at: Yozgat'ta -> Yozgat)
    let arananYer = konum.replace(/'|de|da|te|ta/g, "").trim();

    try {
        // --- ADIM A: ŞEHİR İSMİNİ KOORDİNATA ÇEVİR (Geocoding) ---
        let geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${arananYer}&count=1&language=tr&format=json`;
        let geoCevap = await fetch(geoUrl);
        let geoVeri = await geoCevap.json();

        if (!geoVeri.results || geoVeri.results.length === 0) {
            return null; // Konum bulunamadı
        }

        let enlem = geoVeri.results[0].latitude;
        let boylam = geoVeri.results[0].longitude;
        let tamIsim = geoVeri.results[0].name; // Şehrin düzgün adı

        // --- ADIM B: KOORDİNATTAN HAVA DURUMUNU ÇEK ---
        let havaUrl = `https://api.open-meteo.com/v1/forecast?latitude=${enlem}&longitude=${boylam}&current_weather=true&timezone=auto`;
        let havaCevap = await fetch(havaUrl);
        let havaVeri = await havaCevap.json();

        let sicaklik = havaVeri.current_weather.temperature;
        let ruzgar = havaVeri.current_weather.windspeed;
        let havaKodu = havaVeri.current_weather.weathercode;

        // --- ADIM C: HAVA KODUNU TÜRKÇEYE ÇEVİR ---
        let durum = havaKoduCevir(havaKodu);

        return `🌤️ **${tamIsim}** için hava durumu:\nŞu an sıcaklık **${sicaklik}°C** ve hava **${durum}**. Rüzgar hızı: ${ruzgar} km/s.`;

    } catch (hata) {
        return "Hava durumu servisine bağlanırken bir hata oluştu. 🌧️❌";
    }
}

// Hava Durumu Kodlarını Türkçeye Çeviren Sözlük
function havaKoduCevir(kod) {
    const kodlar = {
        0: "Açık ve Güneşli ☀️",
        1: "Çoğunlukla Açık 🌤️",
        2: "Parçalı Bulutlu ⛅",
        3: "Kapalı ve Bulutlu ☁️",
        45: "Sisli 🌫️",
        48: "Kırağılı Sis 🌫️",
        51: "Hafif Çisenti 🌧️",
        53: "Orta Şiddetli Çisenti 🌧️",
        55: "Yoğun Çisenti 🌧️",
        61: "Hafif Yağmurlu ☔",
        63: "Yağmurlu ☔",
        65: "Şiddetli Yağmur ⛈️",
        71: "Hafif Kar Yağışlı 🌨️",
        73: "Kar Yağışlı 🌨️",
        75: "Yoğun Kar Yağışlı ❄️",
        80: "Sağanak Yağışlı 💧",
        95: "Fırtınalı ⚡",
        96: "Dolu ve Fırtına ⛈️"
    };
    return kodlar[kod] || "Bilinmiyor";
}
