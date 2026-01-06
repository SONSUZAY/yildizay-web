/* motor.js - YıldızAY Ana İşlemci */

// Değişkenler
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

// Ayarları Yükle
document.getElementById('pitch-range').value = voicePitch;
document.getElementById('p-val').innerText = voicePitch;
document.getElementById('rate-range').value = voiceRate;
document.getElementById('r-val').innerText = voiceRate;

// Pil Durumu
if ('getBattery' in navigator) {
    navigator.getBattery().then(battery => {
        const updateBattery = () => { currentBattery = Math.round(battery.level * 100) + "%"; };
        updateBattery();
        battery.addEventListener('levelchange', updateBattery);
    });
}

// Araçlar
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

// Olay Dinleyicileri
settingsBtn.onclick = () => { settingsPanel.style.display = settingsPanel.style.display === 'block' ? 'none' : 'block'; };
document.getElementById('pitch-range').oninput = (e) => { voicePitch = e.target.value; document.getElementById('p-val').innerText = voicePitch; localStorage.setItem('yildizay-pitch', voicePitch); };
document.getElementById('rate-range').oninput = (e) => { voiceRate = e.target.value; document.getElementById('r-val').innerText = voiceRate; localStorage.setItem('yildizay-rate', voiceRate); };

overlay.addEventListener('click', () => {
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(""));
    overlay.style.display = 'none';
    let selamlama = userName ? `Tekrar hoş geldiniz ${userName}! ` : "Merhaba! ";
    botEkle(selamlama + "SONSUZ.AY asistanı YıldızAY hizmetinizde. 😊");
});

// Ana Mesaj Gönderme Fonksiyonu
function gonder() {
    const text = userInput.value.trim();
    if (!text) return;

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

        for (let anahtar in kütüphane) {
            if (kucuk.includes(anahtar)) {
                let deger = kütüphane[anahtar];
                
                if (Array.isArray(deger)) yanit = deger[Math.floor(Math.random() * deger.length)];
                else if (deger === "FONKSIYON_SAAT") yanit = "Şu an saat " + new Date().toLocaleTimeString('tr-TR', {hour: '2-digit', minute:'2-digit'});
                else if (deger === "FONKSIYON_PIL") yanit = "Pil seviyesi %" + currentBattery;
                else if (deger === "FONKSIYON_TARIH") yanit = "Bugün: " + new Date().toLocaleDateString('tr-TR', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});
                else yanit = deger;
                
                bulundu = true;
                break;
            }
        }

        if (!bulundu) {
            const mat = matematikMotoru(text);
            yanit = mat ? mat : "Bunu henüz öğrenemedim. Başka bir konuda konuşalım mı? 🛠️";
        }
        botEkle(yanit);
    }, 600);
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

// Mobil Ekran Ayarı
const updateHeight = () => { document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`); };
window.addEventListener('resize', updateHeight);
updateHeight();
