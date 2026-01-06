
/* motor.js - YıldızAY Akıllı Hafıza ve Bağlam Motoru (V16) */

// --- DEĞİŞKENLER ---
const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const micBtn = document.getElementById('mic-btn');
const overlay = document.getElementById('welcome-overlay');
const settingsBtn = document.getElementById('settings-btn');
const settingsPanel = document.getElementById('settings-panel');

let voicePitch = localStorage.getItem('yildizay-pitch') || 1.0;
let voiceRate = localStorage.getItem('yildizay-rate') || 1.0;
let userName = localStorage.getItem('yildizay-user') || "";
let currentBattery = "Bilinmiyor";

// --- YENİ: BAĞLAMSAL HAFIZA DEĞİŞKENLERİ ---
// Son konuşulan mesajı tarayıcı hafızasından çekiyoruz
let sonKonu = localStorage.getItem('yildizay-son-mesaj') || "Henüz bir şey konuşmadık.";
// Anlık bağlam (Örn: Konu hava durumuysa buraya not alacağız)
let aktifBaglam = { konu: null, detay: null };

// --- AYARLARI YÜKLE ---
document.getElementById('pitch-range').value = voicePitch;
document.getElementById('p-val').innerText = voicePitch;
document.getElementById('rate-range').value = voiceRate;
document.getElementById('r-val').innerText = voiceRate;

// --- PİL DURUMU TAKİBİ ---
if ('getBattery' in navigator) {
    navigator.getBattery().then(battery => {
        const updateBattery = () => { currentBattery = Math.round(battery.level * 100) + "%"; };
        updateBattery();
        battery.addEventListener('levelchange', updateBattery);
    });
}

// --- YARDIMCI ARAÇLAR ---
function emojiTemizle(text) { return text.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDC00-\uDFFF])/g, ''); }

function konustur(metin) {
    let temizMetin = emojiTemizle(metin).replace(/\*\*/g, "");
    const utterance = new SpeechSynthesisUtterance(temizMetin);
    utterance.lang = 'tr-TR';
    utterance.pitch = voicePitch;
    utterance.rate = voiceRate;
    window.speechSynthesis.speak(utterance);
}

function botEkle(mesaj, seslendir = true) {
    const div = document.createElement('div');
    div.className = 'message bot-msg';
    div.innerHTML = `<span class="name-tag bot-tag">YıldızAY</span>${mesaj}`;
    chatContainer.appendChild(div);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    if(seslendir) konustur(mesaj);
}

// Basit Matematik (Eval)
function matematikMotoru(input) {
    let temiz = input.toLowerCase().replace(/x/g, '*').replace(/çarpı/g, '*').replace(/artı/g, '+').replace(/eksi/g, '-').replace(/bölü/g, '/');
    let formul = temiz.match(/[0-9+\-*/(). ]+/);
    if (formul && formul[0].trim().length >= 3) {
        try {
            let sonuc = Function('"use strict";return (' + formul[0] + ')')();
            if (sonuc !== undefined && !isNaN(sonuc)) {
                let son = Number.isInteger(sonuc) ? sonuc : sonuc.toFixed(2);
                return `İşlem sonucu: ${formul[0].trim()} = ${son} 🔢✨`;
            }
        } catch (e) { return null; }
    }
    return null;
}

// --- OLAY DİNLEYİCİLERİ ---
settingsBtn.onclick = () => { settingsPanel.style.display = settingsPanel.style.display === 'block' ? 'none' : 'block'; };
document.getElementById('pitch-range').oninput = (e) => { voicePitch = e.target.value; document.getElementById('p-val').innerText = voicePitch; localStorage.setItem('yildizay-pitch', voicePitch); };
document.getElementById('rate-range').oninput = (e) => { voiceRate = e.target.value; document.getElementById('r-val').innerText = voiceRate; localStorage.setItem('yildizay-rate', voiceRate); };

overlay.addEventListener('click', () => {
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(""));
    overlay.style.display = 'none';
    let selamlama = userName ? `Tekrar hoş geldiniz ${userName}! ` : "Merhaba! ";
    botEkle(selamlama + "SONSUZ.AY asistanı YıldızAY hizmetinizde. 😊");
});

// --- GÜNCELLENMİŞ GÖNDER FONKSİYONU ---
function gonder() {
    const text = userInput.value.trim();
    if (!text) return;

    // 1. İsim Değiştirme
    if (text.toLowerCase().startsWith("adım ") || text.toLowerCase().startsWith("ismim ")) {
        let yeniIsim = text.replace(/adım|ismim/gi, "").trim(); 
        if(yeniIsim) {
            userName = yeniIsim;
            localStorage.setItem('yildizay-user', userName);
            botEkle("Memnun oldum " + userName + "! 😊");
            userInput.value = "";
            return;
        }
    }

    // Mesajı Ekrana Bas
    const uDiv = document.createElement('div');
    uDiv.className = 'message user-msg';
    uDiv.innerHTML = `<span class="name-tag user-tag">Siz</span>${text}`;
    chatContainer.appendChild(uDiv);
    userInput.value = "";
    chatContainer.scrollTop = chatContainer.scrollHeight;

    setTimeout(() => {
        let kucuk = text.toLowerCase();
        let yanit = "";
        let bulundu = false;

        // --- A. HAFIZA HATIRLAMA (NEREDE KALDIK?) ---
        if (kucuk.includes("nerede kaldık") || kucuk.includes("en son ne") || kucuk.includes("neyden bahsediyorduk")) {
            botEkle(`En son şundan bahsediyorduk: "${sonKonu}" 🧠`);
            return; // Cevabı verdik, çıkabiliriz.
        }

        // --- YENİ: BAĞLAM KAYDETME (CONTEXT) ---
        // Eğer kullanıcı "Yozgat" veya "Hava" gibi kelimeler kullanırsa bunu kaydet
        // (Şimdilik temel düzeyde, ileride burayı hava durumu API'sine bağlayacağız)
        if (kucuk.includes("yozgat") || kucuk.includes("istanbul") || kucuk.includes("ankara")) {
            aktifBaglam.detay = text; // Şehir ismini veya cümleyi aklında tutar
        }

        // Kullanıcının yazdığı son şeyi "SON KONU" olarak kaydet
        sonKonu = text;
        localStorage.setItem('yildizay-son-mesaj', sonKonu);

        // --- B. MANUEL ARAŞTIRMA ---
        if (kucuk.startsWith("ara ")) {
            let aranacak = text.substring(4).trim();
            arastirmaYap(aranacak);
            return;
        }

        // --- C. MANTIK VE PROBLEM ÇÖZÜCÜ ---
        if (typeof mantikCozucu !== 'undefined') {
            let mantikSonucu = mantikCozucu(text);
            if (mantikSonucu) {
                botEkle(mantikSonucu);
                return;
            }
        }

        // --- D. KÜTÜPHANE TARAMA (Sohbet & Hafıza) ---
        function cevapAra(hedefKutuphane) {
            for (let anahtar in hedefKutuphane) {
                if (kucuk.includes(anahtar)) {
                    let deger = hedefKutuphane[anahtar];
                    if (Array.isArray(deger)) return deger[Math.floor(Math.random() * deger.length)];
                    else if (deger === "FONKSIYON_SAAT") return "Şu an saat " + new Date().toLocaleTimeString('tr-TR', {hour: '2-digit', minute:'2-digit'});
                    else if (deger === "FONKSIYON_PIL") return "Pil seviyesi %" + currentBattery;
                    else if (deger === "FONKSIYON_TARIH") return "Bugün: " + new Date().toLocaleDateString('tr-TR', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});
                    else return deger;
                }
            }
            return null;
        }

        if (typeof sohbetKutuphanesi !== 'undefined') {
            yanit = cevapAra(sohbetKutuphanesi);
            if (yanit) bulundu = true;
        }

        if (!bulundu && typeof kütüphane !== 'undefined') {
            yanit = cevapAra(kütüphane);
            if (yanit) bulundu = true;
        }

        if (bulundu) {
            botEkle(yanit);
            return;
        }

        // --- E. WIKI VE MATEMATİK ---
        let soruKalibi = false;
        let aranacakKelime = "";
        const ekler = [" kimdir", " nedir", " neresi", " kim", " ne", " hakkında bilgi"];
        
        for (let ek of ekler) {
            if (kucuk.endsWith(ek)) {
                aranacakKelime = text.slice(0, -ek.length).trim();
                soruKalibi = true;
                break;
            }
        }

        if (soruKalibi && aranacakKelime.length > 1) {
            arastirmaYap(aranacakKelime);
            return;
        }

        const mat = matematikMotoru(text);
        if (mat) {
            botEkle(mat);
        } else {
            botEkle("Bunu hafızamda bulamadım. İnternette aratmak için 'ara [kelime]' yazabilirsin! 🛠️");
        }

    }, 600);
}

// Yardımcı: Araştırma
function arastirmaYap(kelime) {
    if(kelime) {
        botEkle(`"${kelime}" araştırılıyor... 🔎`);
        if(typeof wikipediaAra === 'function') {
            wikipediaAra(kelime).then(cevabi => {
                botEkle(cevabi);
            });
        } else {
            botEkle("Araştırma modülü eksik! ⚠️");
        }
    }
}

// Sesli Komut
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if(SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = 'tr-TR';
    micBtn.onclick = () => { recognition.start(); micBtn.classList.add('listening'); };
    recognition.onresult = (event) => { userInput.value = event.results[0][0].transcript; micBtn.classList.remove('listening'); gonder(); };
    recognition.onend = () => { micBtn.classList.remove('listening'); };
}

sendBtn.addEventListener('click', gonder);
userInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') gonder(); });

// Mobil Ekran
const updateHeight = () => { document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`); };
window.addEventListener('resize', updateHeight);
updateHeight();
