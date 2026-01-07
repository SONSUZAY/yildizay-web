/* komut.js - YıldızAY Web Komut Sistemi (V5 - TAM GÜÇ: Site + Uygulamalar + Telefon) */

function komutIsle(metin) {
    let kucuk = metin.toLowerCase();

    // ==================================================
    // 1. BÖLÜM: SİTE İÇİ IŞINLANMA (SONSUZ.AY EKO-SİSTEMİ)
    // ==================================================
    if (kucuk.includes("oyun aç") || kucuk.includes("oyunlar") || kucuk.includes("canım sıkıldı")) {
        setTimeout(() => { window.location.href = "https://sonsuzay.github.io/oyunlar-web/"; }, 1000);
        return "Seni hemen Oyun Arenasına ışınlıyorum! 🕹️ İyi eğlenceler!";
    }

    if (kucuk.includes("hikaye") || kucuk.includes("oku")) {
        setTimeout(() => { window.location.href = "https://sonsuzay.github.io/hikayeler-web/"; }, 1000);
        return "Sonsuz Hikayeler kütüphanesi açılıyor... 📚";
    }

    if (kucuk.includes("müzik") || kucuk.includes("şarkı") || kucuk.includes("player")) {
        setTimeout(() => { window.location.href = "https://sonsuzay.github.io/web-uygulamalar/player.html"; }, 1000);
        return "DJ YıldızAY iş başında! Müzik çalar açılıyor... 🎵";
    }

    // ==================================================
    // 2. BÖLÜM: MOBİL GÜÇ GÖSTERİSİ (UYGULAMA AÇMA)
    // ==================================================
    
    // WHATSAPP
    if (kucuk.includes("whatsapp aç") || kucuk.includes("vatsap aç")) {
        window.location.href = "whatsapp://app";
        return "WhatsApp açılıyor... 💬";
    }

    // YOUTUBE (Direkt Uygulama)
    if (kucuk.includes("youtube aç")) {
        window.location.href = "vnd.youtube://"; 
        return "YouTube uygulaması başlatılıyor... 🎬";
    }

    // INSTAGRAM
    if (kucuk.includes("instagram aç") || kucuk.includes("insta aç")) {
        window.location.href = "instagram://app";
        return "Instagram akışı açılıyor... 📸";
    }

    // TIKTOK
    if (kucuk.includes("tiktok aç")) {
        window.location.href = "tiktok://";
        return "TikTok açılıyor... 🎵";
    }

    // TWITTER (X)
    if (kucuk.includes("twitter aç") || kucuk.includes("x aç")) {
        window.location.href = "twitter://";
        return "X (Twitter) açılıyor... 🐦";
    }

    // SPOTIFY
    if (kucuk.includes("spotify aç")) {
        window.location.href = "spotify://";
        return "Spotify müzik dünyası açılıyor... 🎧";
    }

    // ==================================================
    // 3. BÖLÜM: ARAÇLAR VE ARAMA
    // ==================================================
    
    // HARİTA / KONUM
    if (kucuk.includes("harita aç") || kucuk.includes("neredeyim")) {
        window.location.href = "geo:0,0?q="; 
        return "Haritalar servisi başlatılıyor... 🗺️";
    }

    // GOOGLE ARAMA
    if (kucuk.includes("google aç")) {
        window.open("https://www.google.com", "_blank");
        return "Google arama motoru açılıyor... 🔍";
    }

    // TELEFON ARAMA (HATA KORUMALI)
    // "Aramızda" kelimesini yakalamaz, sadece "ara" emrini yakalar.
    let aramaKomutu = /\b(ara|ararmısın|arar mısın)\b/;
    
    if (aramaKomutu.test(kucuk)) {
        let numara = kucuk.match(/\d+/); // Cümledeki sayıyı bul
        
        // Eğer bir numara varsa VE cümle çok uzun değilse (sohbet değilse)
        if (numara && kucuk.length < 25) {
            window.location.href = "tel:" + numara[0];
            return `${numara[0]} numarası aranıyor... 📞`;
        }
    }

    return null; // Komut yoksa boş dön, diğer modüller devreye girsin.
}
