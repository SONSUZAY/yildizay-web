/* komut.js - YıldızAY Web Komut Sistemi (Eller ve Ayaklar) */

function komutIsle(metin) {
    let kucuk = metin.toLowerCase();

    // 1. WHATSAPP AÇMA
    if (kucuk.includes("whatsapp aç") || kucuk.includes("vatsap aç")) {
        // Telefondaysa uygulamayı, PC'de ise Web sürümünü açar
        window.open("https://wa.me/", "_blank");
        return "WhatsApp açılıyor... 💬";
    }

    // 2. YOUTUBE AÇMA
    if (kucuk.includes("youtube aç") || kucuk.includes("youtube'a gir")) {
        window.open("https://www.youtube.com", "_blank");
        return "YouTube açılıyor, iyi seyirler! 🎬";
    }

    // 3. GOOGLE AÇMA
    if (kucuk.includes("google aç")) {
        window.open("https://www.google.com", "_blank");
        return "Google arama motoru açılıyor... 🔍";
    }

    // 4. INSTAGRAM AÇMA
    if (kucuk.includes("instagram aç")) {
        window.open("https://www.instagram.com", "_blank");
        return "Instagram akışı açılıyor... 📸";
    }

    // 5. HARİTA AÇMA (Konumunla)
    if (kucuk.includes("harita aç") || kucuk.includes("neredeyim")) {
        window.open("https://maps.google.com", "_blank");
        return "Haritalar servisi başlatılıyor... 🗺️";
    }

    // 6. TELEFON ARAMA (Sadece Mobilde)
    // Örnek: "155 ara" veya "Annemi ara (numara rehberde yoksa çalışmaz, numara girmeli)"
    // Burası sadece rakam içeren aramalarda çalışır: "0532... ara"
    if (kucuk.includes(" ara")) {
        let numara = kucuk.match(/\d+/); // Cümledeki sayıyı bul
        if (numara) {
            window.location.href = "tel:" + numara[0];
            return `${numara[0]} numarası aranıyor... 📞`;
        }
    }

    return null; // Komut yoksa boş dön, motor diğerlerine baksın
}
