/* mantik.js - YıldızAY Gelişmiş Problem Çözücü (V2) */

function mantikCozucu(metin) {
    let kucuk = metin.toLowerCase();
    
    // 1. GÜVENLİK KİLİDİ: Metindeki sayıları yakala
    let sayilar = metin.match(/\d+(\.\d+)?/g);
    
    // Eğer cümlede en az 2 sayı yoksa HEMEN DUR! (Saat kaç sorusu burada elenir)
    if (!sayilar || sayilar.length < 2) return null;

    let s1 = parseFloat(sayilar[0]);
    let s2 = parseFloat(sayilar[1]);

    // --- 1. HAVUZ PROBLEMLERİ ---
    if (kucuk.includes("havuz") && (kucuk.includes("doldur") || kucuk.includes("musluk"))) {
        let sonuc = (s1 * s2) / (s1 + s2);
        let saat = Math.floor(sonuc);
        let dakika = Math.round((sonuc - saat) * 60);
        return `🧮 Havuz Problemi:\nBu iki musluk havuzu birlikte yaklaşık **${saat} saat ${dakika} dakikada** doldurur. 💧`;
    }

    // --- 2. HIZ PROBLEMLERİ ---
    if ((kucuk.includes("yol") || kucuk.includes("km")) && (kucuk.includes("hız") || kucuk.includes("saat"))) {
        let yol = Math.max(s1, s2);
        let hiz = Math.min(s1, s2);
        let zaman = yol / hiz;
        return `🏎️ Hız Problemi:\n${yol} km yolu ${hiz} km hızla gidersen, varış süren **${zaman.toFixed(1)} saat** sürer.`;
    }

    // --- 3. YAŞ PROBLEMLERİ (GÜNCELLENDİ) ---
    if (kucuk.includes("yaş")) {
        // Eğer "büyük" kelimesi geçiyorsa TOPLA (Örn: Babam 20 yaş büyük)
        if (kucuk.includes("büyük")) {
            let sonuc = s1 + s2;
            return `👴 Yaş Hesabı:\nBiri ${s1}, diğeri ${s2} yaş büyükse, büyük olan **${sonuc}** yaşındadır.`;
        }
        // Eğer "büyük" demiyorsa (küçük, fark, var, kaç vs.) ÇIKAR
        // (Örn: Aramızda kaç yaş var? / Kardeşim 5 yaş küçük)
        else {
            let sonuc = Math.abs(s1 - s2); // Mutlak değer (Eksi çıkmaz)
            return `👶 Yaş Farkı:\nVerilen değerlere göre aradaki yaş farkı veya sonuç: **${sonuc}** yıldır.`;
        }
    }

    return null; // Hiçbir şablona uymadıysa boş dön
}
