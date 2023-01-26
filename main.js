var baglanti = new XMLHttpRequest();
var jsondanGelen;
const soruAlani = document.querySelector("#soruAlani");
const soru = document.querySelector("#soru");
const secenekler = document.getElementsByName("secenek");

const aciklamaA = document.querySelector("#aciklamaA");
const aciklamaB = document.querySelector("#aciklamaB");
const aciklamaC = document.querySelector("#aciklamaC");
const aciklamaD = document.querySelector("#aciklamaD");
const btn = document.querySelector("#btn");

let puan = 0;
let sira = 0;

baglanti.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    jsondanGelen = JSON.parse(this.responseText);
    soruGetir();
  }
  return jsondanGelen;
};

baglanti.open("get", "data.json", true);
baglanti.send();

function soruGetir() {
  secimiTemizle();

  let siradakiSoru = jsondanGelen.sorular[sira];

  soru.innerHTML = siradakiSoru.soru;
  aciklamaA.innerHTML = siradakiSoru.secenekA;
  aciklamaB.innerHTML = siradakiSoru.secenekB;
  aciklamaC.innerHTML = siradakiSoru.secenekC;
  aciklamaD.innerHTML = siradakiSoru.secenekD;
}

function secimiTemizle() {
  secenekler.forEach(function (item) {
    item.checked = false;
  });
}

function secimiAl() {
  let secim;
  secenekler.forEach(function (item) {
    if (item.checked == true) {
      secim = item.id;
    }
  });
  return secim;
}

function qebulEt() {
  let secilen = secimiAl();

  if (secilen === jsondanGelen.sorular[sira].cevap) {
    puan++;
    sira++;
  } else {
    alert("Cavab Yanlışdır");
  }

  if (sira < jsondanGelen.sorular.length) {
    soruGetir();
  } else {
    soruAlani.innerHTML = `Doğru cavabların sayı. ${puan} / ${jsondanGelen.sorular.length} . `;
    btn.style.display = "none";
    document.querySelector("#btnRestart").style.display = "block";
  }
}
