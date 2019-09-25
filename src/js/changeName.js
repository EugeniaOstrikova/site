var arrHello = [];
var textAllHello = "Привет!|✋|Salaam aleihum!|Tungjatjeta!|Hello!|Ahlen!|Marhaba!|Voghdzuyin!|Shlama!|Goeie dag!|Kheyerle irte!|Прывитанне!|Nomoskaar!|" +
    "Zdraveite!|Zdravo!|Aloha!|Hallo!|Geia sou!|Gamardjobat!|God dag!|Shalom!|Iiti!|Sawubona!|Salam!|Selamat!|Godan daginn!|Hola!|Buon giorno!|Salam!|" +
    "Mendvt!|Assalomu alaikum!|Terveh!|Salaam matszbe!|Mauri!|Haa!|Annyoung hasimnikka!|Mej!|Sok sabai jie te!|Ave!|Sveiki!|Sveikas!|Moien!|Zdravo!|Shumbrat!|" +
    "Sawubona!|Guten Tag!|Goddag!|Dzien dobry!|Ola!|Kails!|Buna!|Zdravo!|Sa’benerica!|Dobry!|Sawatdi!|Isenmesez!|Kam sangbo dugay!|Merhaba!|Ziech bures!|Salaam " +
    "aleikhem!|Прывит!|Dydd da!|Paivaa!|Bonjour!|Namaste!|Zdravo!|Marsha voghiila!|Dobry den!|Salam!|Ye’ti!|God dag!|Guid mornin!|Saluton!|Tervist!|Konnichi wa!";
arrHello = textAllHello.split("|");
var firstHello = "Привет!";
document.getElementById('changeHello').innerText = firstHello;
function randomHello() {
    var rand = Math.floor(Math.random() * arrHello.length);
    return rand;
};
var newHello = arrHello[randomHello()];
function handler() {
        document.getElementById('changeHello').innerText = newHello;
        if (true) {}
        newHello = arrHello[randomHello()];
        
};



