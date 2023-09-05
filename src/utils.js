const helpers = {
  setLocalStorage: function (key, data) {
    window.localStorage.setItem(key, JSON.stringify(data));
  },
  getLocalStorage: function (key) {
    return window.localStorage.getItem(key);
  },
  convertToIndianCurrency: function (number) {
    return number.toLocaleString('en-IN', {
      // maximumFractionDigits: 2,
      // style: 'currency',
      // currency: 'INR',
    });
  },
  converToIndianNumber: function (x) {
    const zeroTo99 = [];
    const place = 'Thousand|Lakh|Crore|Arab|Kharab|Nil'.split('|');

    const ones =
      '|One|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten|Eleven|Twelve|Thirteen|Fourteen|Fifteen|Sixteen|Seventeen|Eighteen|Nineteen'.split(
        '|'
      );

    const tens =
      '||Twenty|Thirty|Forty|Fifty|Sixty|Seventy|Eighty|Ninety'.split('|');

    for (let i = 0; i < 100; i++) {
      const t = Math.floor(i / 10);
      const o = i % 10;
      zeroTo99.push(t < 2 ? ones[i] : tens[t] + (o ? ' ' + ones[o] : ''));
    }

    let n = x.length;
    x = n === 0 ? '00' : n === 1 || n % 2 === 0 ? '0' + x : x;
    n = x.length;
    let r = zeroTo99[x.charCodeAt((n -= 2)) * 10 + x.charCodeAt(n + 1) - 528];
    if (n >= 1) {
      const v = zeroTo99[x.charCodeAt((n -= 1)) - 48];
      if (v) r = v + ' Hundred' + (r ? ' ' + r : '');
    }
    for (let i = 0; n > 0; i++) {
      const v =
        zeroTo99[x.charCodeAt((n -= 2)) * 10 + x.charCodeAt(n + 1) - 528];
      if (v) r = v + ' ' + place[i] + (r ? ' ' + r : '');
    }
    return r || 'Zero';
  },

  convertToHindi: function (x) {
    const zeroTo99 =
      '|एक|दो|तीन|चार|पाँच|छः|सात|आठ|नौ|दस|ग्यारह|बारह|तेरह|चौदह|पन्द्रह|सोलह|सत्रह|अठारह|उन्नीस|बीस|इक्कीस|बाईस|तेईस|चौबीस|पच्चीस|छब्बीस|सत्ताईस|अट्ठाईस|उनतीस|तीस|इकतीस|बत्तीस|तैंतीस|चौंतीस|पैंतीस|छत्तीस|सैंतीस|अड़तीस|उनतालीस|चालीस|इकतालीस|बयालीस|तैंतालीस|चौवालीस|पैंतालीस|छियालीस|सैंतालीस|अड़तालीस|उनचास|पचास|इक्यावन|बावन|तिरपन|चौवन|पचपन|छप्पन|सत्तावन|अट्ठावन|उनसठ|साठ|इकसठ|बासठ|तिरसठ|चौंसठ|पैंसठ|छियासठ|सड़सठ|अड़सठ|उनहत्तर|सत्तर|इकहत्तर|बहत्तर|तिहत्तर|चौहत्तर|पचहत्तर|छिहत्तर|सतहत्तर|अठहत्तर|उन्यासी|अस्सी|इक्यासी|बयासी|तिरासी|चौरासी|पचासी|छियासी|सत्तासी|अट्ठासी|नवासी|नब्बे|इक्यानबे|बानबे|तिरानबे|चौरानबे|पंचानबे|छियानबे|सत्तानबे|अट्ठानबे|निन्यान्बे'.split(
        '|'
      );

    const place = 'हज़ार|लाख|करोड़|अरब|खरब|नील'.split('|');

    let n = x.length;
    x = n === 0 ? '00' : n === 1 || n % 2 === 0 ? '0' + x : x;
    n = x.length;
    let r = zeroTo99[x.charCodeAt((n -= 2)) * 10 + x.charCodeAt(n + 1) - 528];
    if (n > 0) {
      const v = zeroTo99[x.charCodeAt((n -= 1)) - 48];
      if (v) r = v + ' सौ' + (r ? ' ' + r : '');
    }
    for (let i = 0; n > 0; i++) {
      const v =
        zeroTo99[x.charCodeAt((n -= 2)) * 10 + x.charCodeAt(n + 1) - 528];
      if (v) r = v + ' ' + place[i] + (r ? ' ' + r : '');
    }
    return r || 'शून्य';
  },
};

export default helpers;