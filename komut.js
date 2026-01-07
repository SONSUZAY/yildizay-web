/* komut.js - YıldızAY Web Komut Sistemi (V3 - Popüler Uygulamalar Paketi) */

function komutIsle(metin) {
    let kucuk = metin.toLowerCase();

    // --- A. SİTE İÇİ NAVİGASYON (SONSUZ.AY ÖZELLİKLERİ) ---
    if (kucuk.includes("oyun aç") || kucuk.includes("oyunlar") || kucuk.includes("canım sıkıldı")) {
        setTimeout(() => { window.location.href = "https://sonsuzay.github.io/oyunlar-web/"; }, 1500);
        return "Seni hemen Oyun Arenasına ışınlıyorum! 🕹️ İyi eğlenceler!";
    }

    if (kucuk.includes("hikaye oku") || kucuk.includes("hikayeler")) {
        setTimeout(() => { window.location.href = "https://sonsuzay.github.io/hikayeler-web/"; }, 1500);
        return "Sonsuz Hikayeler kütüphanesi açılıyor... 📚";
    }

    if (kucuk.includes("müzik aç") || kucuk.includes("şarkı aç") || kucuk.includes("player")) {
        setTimeout(() => { window.location.href = "https://sonsuzay.github.io/web-uygulamalar/player.html"; }, 1500);
        return "DJ YıldızAY iş başında! Müzik çalar açılıyor... 🎵";
    }

    // --- B. POPÜLER UYGULAMALAR (DEEP LINKING) ---
    
    // 1. WHATSAPP (Sohbet Listesi)
    if (kucuk.includes("whatsapp aç") || kucuk.includes("vatsap aç")) {
        window.location.href = "whatsapp://app";
        return "WhatsApp açılıyor... 💬";
    }

    // 2. INSTAGRAM
    if (kucuk.includes("instagram aç") || kucuk.includes("insta aç")) {
        window.location.href = "instagram://app";
        return "Instagram akışı açılıyor... 📸";
    }

    // 3. YOUTUBE
    if (kucuk.includes("youtube aç")) {
        // 'vnd.youtube:' komutu direkt uygulamayı zorlar, yoksa tarayıcı açar.
        window.location.href = "vnd.youtube://"; 
        return "YouTube uygulaması başlatılıyor... 🎬";
    }

    // 4. TIKTOK
    if (kucuk.includes("tiktok aç")) {
        window.location.href = "tiktok://";
        return "TikTok açılıyor, kaydırmaya başla! 🎵";
    }

    // 5. TWITTER (X)
    if (kucuk.includes("twitter aç") || kucuk.includes("x aç")) {
        window.location.href = "twitter://";
        return "X (Twitter) açılıyor... 🐦";
    }

    // 6. FACEBOOK
    if (kucuk.includes("facebook aç") || kucuk.includes("face aç")) {
        window.location.href = "fb://";
        return "Facebook açılıyor... 📘";
    }

    // 7. TELEGRAM
    if (kucuk.includes("telegram aç")) {
        window.location.href = "tg://";
        return "Telegram mesajları açılıyor... ✈️";
    }

    // 8. SPOTIFY
    if (kucuk.includes("spotify aç")) {
        window.location.href = "spotify://";
        return "Spotify müzik dünyası açılıyor... 🎧";
    }

    // 9. NETFLIX
    if (kucuk.includes("netflix aç")) {
        window.location.href = "nflx://";
        return "Netflix açılıyor... 🍿";
    }

    // --- C. DİĞER ARAÇLAR ---
    if (kucuk.includes("google aç")) {
        window.open("https://www.google.com", "_blank");
        return "Google arama motoru açılıyor... 🔍";
    }

    if (kucuk.includes("harita aç") || kucuk.includes("neredeyim")) {
        // Mobilde Google Haritalar uygulamasını tetikler
        window.location.href = "geo:0,0?q="; 
        return "Haritalar servisi başlatılıyor... 🗺️";
    }

    // --- D. TELEFON ARAMA (DÜZELTİLMİŞ VERSİYON) ---
    // Sadece "ara" kelimesi varsa çalışır, "aramızda" kelimesini yutmaz.
    let aramaKomutu = /\b(ara|ararmısın|arar mısın)\b/;
    
    if (aramaKomutu.test(kucuk)) {
        let numara = kucuk.match(/\d+/); // Cümledeki sayıyı bul
        
        // Eğer bir numara varsa VE cümle çok uzun değilse
        if (numara && kucuk.length < 25) {
            window.location.href = "tel:" + numara[0];
            return `${numara[0]} numarası aranıyor... 📞`;
        }
    }

    return null; // Hiçbir komut yoksa, sistem diğer dosyalara (sohbet/mantık) bakar.
}
