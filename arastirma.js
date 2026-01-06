/* arastirma.js - Wikipedia Bağlantı Modülü */

async function wikipediaAra(aranacakKelime) {
    // 1. Kelimeyi Wikipedia formatına uygun hale getir (Boşlukları düzelt vb.)
    let temizKelime = aranacakKelime.trim().replace(/ /g, "_");
    
    // 2. Wikipedia'nın API adresine istek gönder
    let url = "https://tr.wikipedia.org/api/rest_v1/page/summary/" + temizKelime;

    try {
        // İnternetten veriyi çek
        let sunucuCevabi = await fetch(url);
        let veri = await sunucuCevabi.json();

        // 3. Eğer cevap varsa özetini döndür
        if (veri.extract) {
            return "📚 Wikipedia Bilgisi:\n" + veri.extract;
        } else {
            return "Bunu Wikipedia'da aradım ama net bir özet bulamadım. 🤔";
        }
    } catch (hata) {
        return "İnternet bağlantısında bir sorun var veya bu konuyu bulamadım. 🌐❌";
    }
}
