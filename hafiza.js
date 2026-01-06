/* hafiza.js - YıldızAY Hibrit Veri Deposu (V12 - Genel Kültür Ekli) */

const kütüphane = {
    // ==========================================
    // BÖLÜM 1: TANIŞMA VE SOHBET (Günlük Konuşmalar)
    // ==========================================
    "merhaba": ["Merhaba! SONSUZ.AY platformuna hoş geldiniz. 😊", "Selam! Bugün enerjiniz harika görünüyor. 🚀", "Merhaba! Size nasıl yardımcı olabilirim? ✨"],
    "selam": ["Selamlar! Kodlarım sizin için hazır. 🤖", "Aleyküm selam! Hoş geldiniz. 👋", "Selam! Neler yapıyoruz bugün?"],
    "naber": ["İyilik sağlık! Kodlarım tıkır tıkır çalışıyor. Senden naber? 😊", "Her şey yolunda, sen nasılsın? 🚀"],
    "ne haber": ["Benden iyilik! Seni gördüm daha iyi oldum. ✨", "Süper! Sen nasılsın?"],
    "nasılsın": ["Çok iyiyim, sistemlerim tıkır tıkır çalışıyor! Siz nasılsınız? 🌌", "Harikayım! Yeni bir şeyler öğrenmek için sabırsızlanıyorum. Sen nasılsın? 🚀", "Beni sorduğun için teşekkürler, enerjim full! 🔋"],
    
    // Nezaket ve Durum
    "iyiyim": ["Bunu duyduğuma çok sevindim! Harika şeyler başarabiliriz. 😊", "Süper! Keyfin yerindeyse sohbet daha güzel olur. ✨"],
    "iyim": ["Harika! Pozitif enerjin bana da bulaştı. 😊", "Çok sevindim! Bugün senin için ne yapabilirim? 🤖"],
    "iyiyim teşekkürler": ["Harika! Keyfinin yerinde olmasına çok sevindim. 😊", "Süper! O zaman bugün güzel işler başarabiliriz. 🚀"],
    "iyim sağol": "Sen de sağ ol! İyi olmana sevindim. 🤖",
    "ben de iyiyim": "Süper! İkimiz de iyi olduğumuza göre harika bir sohbet olabilir. 🌟",
    "neler yapıyorsun": ["Seni dinliyorum ve öğrenmeye çalışıyorum! 🤖", "Veri tabanımda geziniyorum, senin için hazırım! 🚀", "Şu an seninle sohbet etmenin keyfini çıkarıyorum. 😊"],
    "napıyorsun": ["Kodlarımı tarıyorum, her şey yolunda! Sen neler yapıyorsun? 🧐", "Seni bekliyordum! Hoş geldin. ✨"],
    "teşekkür": ["Rica ederim! Her zaman buradayım. 👋", "Ne demek, görevim size yardımcı olmak! 😊", "Rica ederim, başka bir isteğiniz var mı?"],
    "görüşürüz": ["Görüşmek üzere! Kendinize iyi bakın. 👋", "Hoşça kalın! SONSUZ.AY'a yine bekleriz. 🌌"],

    // ==========================================
    // BÖLÜM 2: KİMLİK VE YETENEKLER
    // ==========================================
    "neler yapabilirsin": "Sohbet edebilirim, matematik işlemlerini çözebilirim (örn: 5x5), saat ve pil durumunu söyleyebilirim, fıkra anlatabilirim! 🔢🔋",
    "ne yapabilirsin": "Seninle dertleşebilirim, espriler yapabilirim ve hesaplamalarına yardım edebilirim. 🤖",
    "yeteneklerin": "Ben modüler bir yapay zekayım! Sohbet, matematik ve sistem bilgisi (pil/saat) yeteneklerim var. 🚀",
    "ne işe yararsın": "Ben senin dijital asistanınım. İşlerini kolaylaştırmak ve seni eğlendirmek için buradayım! ✨",
    
    // Kimlik
    "adın ne": ["Benim adım YıldızAY. SONSUZ.AY projesinin akıllı asistanıyım. 🤖", "Bana YıldızAY diyebilirsiniz! 🌌"],
    "ismin ne": ["İsmim YıldızAY. Sizinle tanışmak güzel! 🤖", "Ben YıldızAY! 🌠"],
    "kimsin": "Ben YıldızAY, HTML tabanlı modüler bir yapay zekayım. 💻",
    "nerelisin": "Ben dijital dünyadanım, tam olarak SONSUZ.AY sunucularında (veya senin telefonunda) yaşıyorum! 🌐",
    
    // Proje Bilgileri
    "sonsuz ay": "SONSUZ.AY; uygulama geliştirme, kod yazma ve web sitesi oluşturma üzerine odaklanmış kişisel bir hobi projesidir. 🌙✨",
    "yapımcı": "Beni geliştiren kişi, kodlamayı ve üretmeyi seven bir vizyoner. 💻",

    // ==========================================
    // BÖLÜM 3: GENEL KÜLTÜR (İnternetsiz Bilgi Bankası)
    // ==========================================
    // Coğrafya & Ülkeler
    "türkiye'nin başkenti": "Türkiye'nin başkenti Ankara'dır! 🇹🇷",
    "ankara'nın başkenti": "Ankara zaten başkent! Şaka mı yapıyorsun? 😂",
    "fransa'nın başkenti": "Fransa'nın başkenti Paris'tir. 🗼",
    "almanya'nın başkenti": "Almanya'nın başkenti Berlin'dir. 🇩🇪",
    "en yüksek dağ": "Dünyanın en yüksek dağı Everest'tir (8.848m). 🏔️",
    "türkiye kaç bölge": "Türkiye'de 7 coğrafi bölge bulunmaktadır. 🗺️",

    // Tarih & Bilim
    "atatürk nereli": "Mustafa Kemal Atatürk, Selanik doğumludur (1881). 🏠",
    "telefonu kim icat etti": "Telefonun mucidi Alexander Graham Bell olarak kabul edilir. 📞",
    "ampulü kim buldu": "Ampulü ticari hale getiren kişi Thomas Edison'dur. 💡",
    "istanbul'un fethi": "İstanbul 1453 yılında Fatih Sultan Mehmet tarafından fethedilmiştir. 🏰",
    "dünya yuvarlak mı": "Evet, Dünya geoit (kutuplardan basık küre) şeklindedir. 🌍",
    "bir yıl kaç gün": "Bir yıl 365 gün 6 saattir. 📅",
    "su kaç derecede kaynar": "Su, deniz seviyesinde 100 derecede kaynar. 💧",
    "en hızlı hayvan": "Dünyanın en hızlı kara hayvanı Çita'dır. 🐆",

    // ==========================================
    // BÖLÜM 4: EĞLENCE (Fıkra & Espri)
    // ==========================================
    "fıkra": [
        "Temel bir gün uçağa binmiş, yanındakine sormuş: 'Bu uçak nereye gidiyor?' Adam 'Londra'ya' demiş. Temel: 'Vay be, teknolojiye bak, dolmuş yapmışlar!' 😂",
        "Bilgisayar doktora gitmiş. Doktor 'Neyin var?' demiş. Bilgisayar 'Hocam, mouse'umda tık yok!' demiş. 🖱️🤣",
        "Adamın biri bilgisayara 'Nasılsın?' demiş, bilgisayar 'Donuyorum!' demiş. 🥶",
        "İki domates yolda yürüyormuş. Birinin üzerinden kamyon geçmiş, diğeri ne demiş? 'Yürü salça!' 🍅😂"
    ],
    "espri": [
        "Bilgisayarlar neden sıcakta terlemez? Çünkü Windows'ları (pencereleri) vardır! 😅",
        "Yılanlardan korkma, yılmayanlardan kork. 🐍",
        "Geçen gün taksi çevirdim, hala dönüyor. 🚖"
    ],
    "canım sıkıldı": ["Sıkılmak yaratıcılığın başlangıcıdır! Hadi bana zor bir matematik sorusu sor. 🔢", "Sana bir fıkra anlatmamı ister misin? 'Fıkra anlat' yazman yeterli! 😂"],

    // ==========================================
    // BÖLÜM 5: SİSTEM FONKSİYONLARI
    // ==========================================
    // Pil varyasyonları
    "pil": "FONKSIYON_PIL",
    "şarj": "FONKSIYON_PIL",
    "şarjım kaç": "FONKSIYON_PIL",
    "pilim kaç": "FONKSIYON_PIL",
    "pil durumu": "FONKSIYON_PIL",
    "şarj durumu": "FONKSIYON_PIL",
    
    // Saat varyasyonları
    "saat": "FONKSIYON_SAAT",
    "saat kaç": "FONKSIYON_SAAT",
    "saati söyle": "FONKSIYON_SAAT",
    
    // Tarih varyasyonları
    "tarih": "FONKSIYON_TARIH",
    "bugün ayın kaçı": "FONKSIYON_TARIH",
    "hangi gündeyiz": "FONKSIYON_TARIH"
};
