/* =============================================================
   DOMEK · script.js
   - i18n (sv / en / pl) med fallback pl → en → sv
   - Hamburgermeny för mobil
   - Språkväljare (sparas i localStorage)
   - Interaktiv checklista (utflytt) med framstegsindikator
   - Reveal-on-scroll animation
   ============================================================= */

(function () {
  'use strict';

  // ============================================================
  // 1. I18N DICTIONARIES
  // ============================================================
  // Strukturen: TRANSLATIONS[lang][nyckel] = "text"
  // Saknas en nyckel på polska → faller tillbaka till engelska → svenska.

  const TRANSLATIONS = {
    sv: {
      // Navigation
      'nav.hem': 'Hem',
      'nav.huset': 'Huset',
      'nav.rummen': 'Rummen',
      'nav.inflytt': 'Inflytt & utflytt',
      'nav.omradet': 'Området',
      'nav.menu': 'Meny',

      // Footer
      'foot.signoff': 'Domek — <em>litet hus</em>,<br>tydliga ramar.',
      'foot.about': 'Domek är ett enfamiljshus från 1959 på Solrosvägen 17 i Örnsköldsvik. Hugo och Vega Kjellsson äger det, Sanco hyr det åt sina arbetare.',
      'foot.contact': 'Kontakt',
      'foot.contact.house': 'Huset',
      'foot.contact.work': 'Jobbet',
      'foot.pages': 'Sidor',
      'foot.lang': 'Språk',
      'foot.updated': 'Uppdaterad',
      'foot.copy': 'Domek · Solrosvägen 17, Örnsköldsvik',

      // Common
      'common.kritisk': 'Kritiskt',
      'common.observera': 'Observera',
      'common.bra-att-veta': 'Bra att veta',
      'common.read-more': 'Läs mer',

      // ============ INDEX ============
      'index.title': 'Domek — Solrosvägen 17',
      'index.eyebrow': 'Domek · ett litet hus i Örnsköldsvik',
      'index.h1': 'Bo i ett <em>litet hus</em> under uppdraget.',
      'index.lede': 'Ett hem för anställda som arbetar långt hemifrån. Fyra sovrum, ett kök, fjorton tapeter och tydliga ramar.',
      'index.meta.address': 'Adress',
      'index.meta.address.value': 'Solrosvägen 17, Örnsköldsvik',
      'index.meta.year': 'Byggår',
      'index.meta.year.value': '1959',
      'index.meta.cap': 'Plats för',
      'index.meta.cap.value': '<em>4</em> personer',
      'index.meta.owner': 'Ägare',
      'index.meta.owner.value': 'Hugo & Vega Kjellsson',

      'index.principles.eyebrow': '01 · Husets fyra principer',
      'index.principles.title': 'Fyra saker som <em>gäller alla</em>.',
      'index.principles.blurb': 'Domek är inte ett hotell. Det är ett hem som delas mellan människor som passerar. För att det ska fungera krävs fyra saker av alla som bor här.',
      'index.principle1.title': 'Förbered dig hemifrån',
      'index.principle1.body': 'Sängkläder och handdukar tar du med själv. De finns inte i huset.',
      'index.principle2.title': 'Lämna det renare än du kom',
      'index.principle2.body': 'Diska efter dig dagligen. Bär ut soporna när påsen är full.',
      'index.principle3.title': 'Reglerna är till för alla',
      'index.principle3.body': 'Inga undantag, inga "bara den här gången". Annars havererar systemet.',
      'index.principle4.title': 'Säg till vid problem',
      'index.principle4.body': 'Något läcker, slutar fungera eller går sönder — ring direkt.',

      'index.before.eyebrow': '02 · Innan du kommer',
      'index.before.title': 'Tre saker att <em>veta innan</em> resan.',
      'index.before.blurb': 'Det här är sidans viktigaste avsnitt. Om du läser bara en sektion ska det vara den här.',
      'index.before.notice1.title': 'Sängkläder och handdukar finns INTE i huset',
      'index.before.notice1.body': 'Du tar med dig själv. Glöm du dem så hänvisar vi till Jysk i Örnsköldsvik. Sängar utan kläder används inte.',
      'index.before.notice2.title': 'Köket har ingen diskmaskin',
      'index.before.notice2.body': 'Diska för hand. Det går snabbt om du gör det direkt efter måltid och inte låter det stå.',
      'index.before.notice3.title': 'Kod till nyckelskåp och wifi får du av Nicklas',
      'index.before.notice3.body': 'Vi som äger huset hanterar inte bokningen. Nicklas (Sanco) skickar uppgifterna före ankomst.',

      'index.find.eyebrow': '03 · Hitta i huset',
      'index.find.title': 'Vad behöver du <em>just nu</em>?',
      'index.find.blurb': 'Fyra ingångar — välj den som passar din fråga bäst. Allt finns på sajten, allt är skrivet kort.',
      'index.find.huset.title': 'Huset',
      'index.find.huset.body': 'Kök, tvätt, sopor, ordningsregler och vad du gör om något läcker eller slutar fungera.',
      'index.find.huset.meta': 'Vitvaror · Sopor · Akut · Regler',
      'index.find.rummen.title': 'Rummen',
      'index.find.rummen.body': 'Fyra sovrum med tapeter från olika decennier. Sängstorlekar och vad som finns i varje.',
      'index.find.rummen.meta': '4 rum · Enkelsängar',
      'index.find.inflytt.title': 'Inflytt & utflytt',
      'index.find.inflytt.body': 'Steg vid ankomst, städning under vistelsen och avreschecklistan med 9 punkter.',
      'index.find.inflytt.meta': 'Ankomst · Avresa · Checklista',
      'index.find.omradet.title': 'Området',
      'index.find.omradet.body': 'Närmaste matbutiker sorterade efter avstånd, samt var du köper sängkläder om du glömt.',
      'index.find.omradet.meta': 'Mat · Sängkit · Promenader',

      'index.contact.eyebrow': '04 · Kontakt',
      'index.contact.title': 'Vem du <em>ringer</em> beror på frågan.',
      'index.contact.blurb': 'Två separata kontaktvägar. Ring rätt person direkt — det går snabbare för alla.',
      'index.contact.house.role': 'Husets ägare',
      'index.contact.house.title': 'Hugo & Vega <em>Kjellsson</em>',
      'index.contact.house.desc': 'Vid problem i huset — vattenläcka, strömavbrott, trasig vitvara, eller något som inte fungerar.',
      'index.contact.house.phone': 'Telefon',
      'index.contact.house.email': 'E-post',
      'index.contact.house.lang': 'Språk',
      'index.contact.house.lang.value': 'Svenska, engelska',
      'index.contact.work.role': 'Sanco — bokning & jobb',
      'index.contact.work.title': 'Nicklas <em>Boström</em>',
      'index.contact.work.desc': 'Vid frågor om jobbet, schemat, bokningen, kod till nyckelskåp eller wifi-uppgifter.',
      'index.contact.work.phone': 'Telefon',
      'index.contact.work.email': 'E-post',
      'index.contact.work.lang': 'Språk',
      'index.contact.work.lang.value': 'Svenska, engelska, polska',
      'index.contact.emergency.title': 'Akut nödfall: 112',
      'index.contact.emergency.body': 'Vid brand, akut sjukdom eller pågående brott — ring 112 innan du ringer oss. För sjukvårdsrådgivning som inte är akut: 1177.',

      // ============ HUSET ============
      'huset.title': 'Huset — Domek',
      'huset.eyebrow': 'Huset · Solrosvägen 17',
      'huset.h1': 'Hur huset <em>fungerar</em>.',
      'huset.lede': 'Allt du behöver veta om kök, tvätt, sopor och ordningsregler. Och vad du gör om något läcker eller slutar fungera.',
      'huset.meta.built': 'Byggår',
      'huset.meta.built.value': '1959',
      'huset.meta.style': 'Stil',
      'huset.meta.style.value': '<em>Tidstypiskt</em> 50-tal',
      'huset.meta.size': 'Boyta',
      'huset.meta.size.value': '110 m²',
      'huset.meta.heat': 'Värme',
      'huset.meta.heat.value': 'Fjärrvärme',

      'huset.history.eyebrow': '01 · Husets historia',
      'huset.history.title': 'Ett hus från <em>1959</em>.',
      'huset.history.p1': 'Solrosvägen 17 byggdes 1959 som familjebostad. Originalplanlösningen är till stor del bevarad — kök, vardagsrum och fyra sovrum är som de var. Tapeter, golvmaterial och vissa skåp är från olika decennier av husets historia.',
      'huset.history.p2': 'En tillbyggnad gjordes på 80-talet (badrum och tvättavdelning). Köket renoverades 2010 — nya vitvaror, gamla skåp. Det är ett 50-talshus, inte ett modernt hus. Saker har en patina och knarrar ibland.',

      'huset.kitchen.eyebrow': '02 · Köket',
      'huset.kitchen.title': 'Vad finns i <em>köket</em>?',
      'huset.kitchen.blurb': 'Tre vitvaror som täcker det du behöver för matlagning. Inga lyxvarianter — bara det som fungerar.',
      'huset.kitchen.fridge.title': 'Kyl & frys',
      'huset.kitchen.fridge.body': 'Kombiskåp, normal storlek för fyra personer. Frysen rymmer cirka 90 liter.',
      'huset.kitchen.stove.title': 'Spis, ugn & mikro',
      'huset.kitchen.stove.body': 'Induktionshäll med fyra zoner, varmluftsugn med grillfunktion. Mikrovågsugn vid sidan av spisen.',
      'huset.kitchen.kettle.title': 'Vattenkokare & kaffe',
      'huset.kitchen.kettle.body': 'Elektrisk vattenkokare och kaffebryggare. Kaffefilter köper du själv (Willys, två minuter bort).',
      'huset.kitchen.notice.title': 'Det finns ingen diskmaskin',
      'huset.kitchen.notice.body': 'Diska för hand i hon på höger sida. Diskmedel och svamp finns under hon. Lämna inget i hon över natten.',

      'huset.laundry.eyebrow': '03 · Tvätt och sängkläder',
      'huset.laundry.title': 'Vad <em>finns</em> och vad du <em>tar med</em>.',
      'huset.laundry.in.eyebrow': 'Finns i huset',
      'huset.laundry.in.title': 'Tvättmaskin & torkrum',
      'huset.laundry.in.body': 'Tvättmaskin i pannrummet. Torkrum med uppvärmd luft — hängning på galge går snabbt.',
      'huset.laundry.in.meta': 'Ingen torktumlare',
      'huset.laundry.bring.eyebrow': 'Tar du med själv',
      'huset.laundry.bring.title': 'Sängkläder & handdukar',
      'huset.laundry.bring.body': 'Finns INTE i huset — du måste ta med själv. Glömmer du dem hänvisar vi till <a href="omradet.html" class="link">Jysk i Örnsköldsvik</a>.',
      'huset.laundry.bring.meta': 'Glömmer du? → Jysk',

      'huset.waste.eyebrow': '04 · Sopor och återvinning',
      'huset.waste.title': 'Vart sätter du <em>vad</em>?',
      'huset.waste.blurb': 'Två kärl vid huset — bruna och gröna. Kartong, glas och metall lämnar du på återvinningsstationen 600 m bort.',
      'huset.waste.brown.title': 'Brunt kärl',
      'huset.waste.brown.body': 'Matavfall i bruna påsar (finns under hon). Hämtas varannan onsdag.',
      'huset.waste.green.title': 'Grönt kärl',
      'huset.waste.green.body': 'Övriga sopor i vanlig sopsäck. Hämtas varannan onsdag.',
      'huset.waste.cardboard.title': 'Kartong',
      'huset.waste.cardboard.body': 'Vik ihop och bär till återvinningsstationen vid Solrosvägens slut.',
      'huset.waste.glass.title': 'Glas & metall',
      'huset.waste.glass.body': 'Samma återvinningsstation som kartong. Två separata kärl på plats.',
      'huset.waste.notice.title': 'Hämtningsdatum verifieras mot Miva',
      'huset.waste.notice.body': 'Kontrollera Mivas kalender för exakta datum. Schemat ovan är generellt — undantag finns vid storhelger.',

      'huset.problem.eyebrow': '05 · Vid problem',
      'huset.problem.title': 'När något <em>går sönder</em>.',
      'huset.problem.blurb': 'Den här sektionen är skriven för att kunna läsas under stress. Stora rubriker, korta steg, telefon synlig.',
      'huset.problem.water.title': 'Vid vattenläckage',
      'huset.problem.water.step1.title': 'Gå till pannrummet',
      'huset.problem.water.step1.body': 'Pannrummet ligger i källaren — dörren till vänster när du kommer ner för trappan.',
      'huset.problem.water.step2.title': 'Stäng huvudkranen',
      'huset.problem.water.step2.body': 'Huvudkranen är monterad på inkommande röret vid pannan — vrid medurs tills den tar emot.',
      'huset.problem.water.step3.title': 'Ring oss direkt',
      'huset.problem.water.step3.body': 'Ring Hugo på <a href="tel:+46700000000" class="link">+46 70 000 00 00</a>. Inget meddelande — ring tills någon svarar.',
      'huset.problem.power.title': 'Vid strömavbrott',
      'huset.problem.power.step1.title': 'Hitta elcentralen',
      'huset.problem.power.step1.body': 'Elcentralen sitter i hallen vid ytterdörren — bakom luckan i skåpet ovanför skoställets högra del.',
      'huset.problem.power.step2.title': 'Ta en reservsäkring',
      'huset.problem.power.step2.body': 'Reservsäkringar ligger i lådan under elcentralen. Fyra storlekar — märkta efter funktion.',
      'huset.problem.power.step3.title': 'Byt och testa',
      'huset.problem.power.step3.body': 'Byt utlöst säkring. Om det löser ut igen — ring oss innan du gör ett tredje försök.',
      'huset.problem.notice.title': 'Kolla vattenmätaren regelbundet',
      'huset.problem.notice.body': 'Vattenmätaren sitter i pannrummet bredvid huvudkranen. Om den visar förbrukning när inget vatten används = möjlig läcka. Säg till.',

      'huset.rules.eyebrow': '06 · Ordningsregler',
      'huset.rules.title': 'Sex <em>regler</em>.',
      'huset.rules.blurb': 'Tre är icke-förhandlingsbara (rökning, husdjur, eldstaden). Tre är observera-regler. Allvarsgraden står i höger marginal.',
      'huset.rules.r1.title': 'Rökfritt inomhus',
      'huset.rules.r1.body': 'Ingen röker inomhus. Ute på baksidan finns en stol och en askkopp.',
      'huset.rules.r1.severity': 'Strikt',
      'huset.rules.r2.title': 'Inga husdjur',
      'huset.rules.r2.body': 'Hund, katt eller annat djur får inte vistas i huset. Allergi och slitage.',
      'huset.rules.r2.severity': 'Strikt',
      'huset.rules.r3.title': 'Eldstaden får inte användas',
      'huset.rules.r3.body': 'Den öppna spisen i vardagsrummet är dekorativ — den är inte besiktigad för eldning.',
      'huset.rules.r3.severity': 'Strikt',
      'huset.rules.r4.title': 'Max 5 boende samtidigt',
      'huset.rules.r4.body': 'Fyra sovplatser, plus en plats i vardagsrummet vid behov. Inte fler.',
      'huset.rules.r4.severity': 'Observera',
      'huset.rules.r5.title': 'Inga byggåtgärder',
      'huset.rules.r5.body': 'Sätt inga skruvar, dyckert eller tejp i väggar eller möbler. Säg till vid behov.',
      'huset.rules.r5.severity': 'Observera',
      'huset.rules.r6.title': 'Garaget & gäststugan ingår inte',
      'huset.rules.r6.body': 'Båda är låsta och används av oss för förvaring. Använd inte uppfarten för parkering.',
      'huset.rules.r6.severity': 'Bra att veta',

      // ============ RUMMEN ============
      'rum.title': 'Rummen — Domek',
      'rum.eyebrow': 'Rummen · 4 sovrum',
      'rum.h1': 'Fyra <em>sovrum</em>, fyra tapeter.',
      'rum.lede': 'Alla sängar är enkelsängar. Husets totala kapacitet är fyra personer i fyra rum, plus en plats i vardagsrummet vid behov.',
      'rum.meta.cap': 'Kapacitet',
      'rum.meta.cap.value': '<em>4</em> personer',
      'rum.meta.beds': 'Sängar',
      'rum.meta.beds.value': 'Enkelsängar',
      'rum.meta.bath': 'Badrum',
      'rum.meta.bath.value': '1 (delat)',
      'rum.meta.linens': 'Sängkläder',
      'rum.meta.linens.value': 'Tar du <em>med själv</em>',

      'rum.gula.tag': 'Bottenvåning',
      'rum.gula.title': 'Det <em>gula</em> rummet',
      'rum.gula.bed': 'Säng · 105 × 200 cm — bred enkelsäng',
      'rum.gula.desc': 'Husets största sovrum med tapet i senapsgult med små blommor från sent 60-tal. Garderob med skjutdörrar längs ena väggen.',
      'rum.gula.size.key': 'Storlek',
      'rum.gula.size.val': '14 m²',
      'rum.gula.cap.key': 'Plats',
      'rum.gula.cap.val': '1 person',
      'rum.gula.extra.key': 'Extra',
      'rum.gula.extra.val': 'Garderob',

      'rum.roda.tag': 'Bottenvåning',
      'rum.roda.title': 'Det <em>röda</em> rummet',
      'rum.roda.bed': 'Säng · 90 × 200 cm — standardenkel',
      'rum.roda.desc': 'Mindre rum med randig terrakottatapet från 70-talet. Ligger närmast badrummet — bra för den som går upp tidigt.',
      'rum.roda.size.key': 'Storlek',
      'rum.roda.size.val': '9 m²',
      'rum.roda.cap.key': 'Plats',
      'rum.roda.cap.val': '1 person',
      'rum.roda.extra.key': 'Extra',
      'rum.roda.extra.val': 'Närmast bad',

      'rum.grona.tag': 'Övervåning',
      'rum.grona.title': 'Det <em>gröna</em> rummet',
      'rum.grona.bed': 'Säng · 120 × 200 cm — bred enkelsäng',
      'rum.grona.desc': 'Den bredaste enkelsängen finns här. Mörkgrön mosstapet med små guld- och senapsdetaljer. Egen balkong åt baksidan.',
      'rum.grona.size.key': 'Storlek',
      'rum.grona.size.val': '12 m²',
      'rum.grona.cap.key': 'Plats',
      'rum.grona.cap.val': '1 person',
      'rum.grona.extra.key': 'Extra',
      'rum.grona.extra.val': 'Balkong',

      'rum.bruna.tag': 'Övervåning',
      'rum.bruna.title': 'Det <em>bruna</em> rummet',
      'rum.bruna.bed': 'Säng · 90 × 200 cm — standardenkel',
      'rum.bruna.desc': 'Också kallat kontoret. Brun bukett-tapet och ett skrivbord vid fönstret. Bra om du behöver jobba kvällar.',
      'rum.bruna.size.key': 'Storlek',
      'rum.bruna.size.val': '10 m²',
      'rum.bruna.cap.key': 'Plats',
      'rum.bruna.cap.val': '1 person',
      'rum.bruna.extra.key': 'Extra',
      'rum.bruna.extra.val': 'Skrivbord',

      'rum.placeholder.pill': 'Kommer senare',
      'rum.placeholder.title': 'Femte rummet under planering',
      'rum.placeholder.body': 'Vi tittar på att inreda källarrummet bredvid pannrummet. När det är klart läggs det in här.',

      'rum.notice.title': 'Sängkläder ingår INTE — oavsett rum',
      'rum.notice.body': 'Kuddar och täcken ligger på sängarna men örngott, lakan, påslakan och handdukar tar du med själv. Glömmer du? → Jysk i Örnsköldsvik (se Området).',

      // ============ INFLYTT-UTFLYTT ============
      'inflytt.title': 'Inflytt & utflytt — Domek',
      'inflytt.eyebrow': 'Inflytt · utflytt',
      'inflytt.h1': 'Vad du gör <em>första</em> kvällen — och <em>sista</em> dagen.',
      'inflytt.lede': 'Tre steg vid ankomst. Tre städrutiner under vistelsen. Nio punkter på avreschecklistan. Inget mer, inget mindre.',
      'inflytt.meta.keys': 'Nycklar',
      'inflytt.meta.keys.value': 'Nyckelskåp vid dörren',
      'inflytt.meta.wifi': 'WiFi',
      'inflytt.meta.wifi.value': 'Täcker hela huset',
      'inflytt.meta.heat': 'Värme',
      'inflytt.meta.heat.value': 'Fjärrvärme + radiatorer',
      'inflytt.meta.vent': 'Ventilation',
      'inflytt.meta.vent.value': 'Självdrag — <em>vädra dagligen</em>',

      'inflytt.arrival.eyebrow': '01 · Vid ankomst',
      'inflytt.arrival.title': 'Tre steg in i <em>huset</em>.',
      'inflytt.arrival.blurb': 'Du behöver: kod till nyckelskåp, wifi-lösenord, och vetskap om hur värmen justeras. Allt finns nedan.',
      'inflytt.arrival.s1.title': 'Nyckelskåp vid dörren',
      'inflytt.arrival.s1.body': 'Nyckelskåpet sitter på vänster sida om ytterdörren. Slå koden, ta nyckeln, lås upp.',
      'inflytt.arrival.s1.code.key': 'Kod',
      'inflytt.arrival.s1.code.val': '[fås av Nicklas]',
      'inflytt.arrival.s1.note.key': 'OBS',
      'inflytt.arrival.s1.note.val': 'Lägg tillbaka nyckeln vid avresa',
      'inflytt.arrival.s2.title': 'Anslut till wifi',
      'inflytt.arrival.s2.body': 'Routern sitter i vardagsrummet bakom TV:n. Nätverk och lösenord nedan.',
      'inflytt.arrival.s2.net.key': 'Nätverk',
      'inflytt.arrival.s2.net.val': '[fås av Nicklas]',
      'inflytt.arrival.s2.pass.key': 'Lösenord',
      'inflytt.arrival.s2.pass.val': '[fås av Nicklas]',
      'inflytt.arrival.s3.title': 'Justera värmen',
      'inflytt.arrival.s3.body': 'Varje radiator har ett vred 1–5. Standardläge är 3. Justera per rum efter behov.',
      'inflytt.arrival.s3.vent.key': 'Vädra',
      'inflytt.arrival.s3.vent.val': 'Korsdrag 5–10 min/dag',
      'inflytt.arrival.s3.note.key': 'OBS',
      'inflytt.arrival.s3.note.val': 'Stäng inte ventiler i fönsterkarmar',

      'inflytt.cleaning.eyebrow': '02 · Städning under vistelsen',
      'inflytt.cleaning.title': 'Tre <em>rutiner</em>.',
      'inflytt.cleaning.blurb': 'Köket dagligen, badrummet veckovis, golven vid behov. Att hålla det löpande är mycket lättare än att göra allt sista dagen.',
      'inflytt.cleaning.kitchen.title': 'Köket — dagligen',
      'inflytt.cleaning.kitchen.body': 'Diska efter måltid. Torka av bänken. Bär ut soporna när påsen är full. Ta inte rast på regler.',
      'inflytt.cleaning.bath.title': 'Badrum — veckovis',
      'inflytt.cleaning.bath.body': 'Skura toaletten, torka handfat, tvätta golvet. Städmedel finns under hon i köket.',
      'inflytt.cleaning.floor.title': 'Golv — vid behov',
      'inflytt.cleaning.floor.body': 'Dammsug entré och kök oftare än övriga rum. Moppa fuktigt — inte vått. Trägolv tål inte stora vattenmängder.',

      'inflytt.exit.eyebrow': '03 · Vid avresa',
      'inflytt.exit.title': 'Avrese<em>checklista</em>.',
      'inflytt.exit.blurb': 'Nio punkter. Kryssa i allt eftersom — framstegsindikatorn fyller på sig. Listan sparas inte mellan besök.',
      'inflytt.check.1': 'Disken är gjord och torkad',
      'inflytt.check.2': 'Kyl och frys är tömda',
      'inflytt.check.3': 'Soporna är utburna',
      'inflytt.check.4': 'Tvätten är hemtagen',
      'inflytt.check.5': 'Sängkläder och handdukar är hemtagna',
      'inflytt.check.6': 'Alla fönster är stängda',
      'inflytt.check.7': 'Ytterdörrar är låsta',
      'inflytt.check.8': 'Grundstädning är gjord',
      'inflytt.check.9': 'Nycklarna är tillbaka i nyckelskåpet',
      'inflytt.exit.notice.title': 'Sängkläder ALLTID med hem',
      'inflytt.exit.notice.body': 'Glömda sängkläder och handdukar slängs vid slutstädning. Vi sparar inte och skickar inte hem.',

      // ============ OMRÅDET ============
      'omradet.title': 'Området — Domek',
      'omradet.eyebrow': 'Området · Örnsköldsvik',
      'omradet.h1': 'Vad finns <em>runt</em> huset?',
      'omradet.lede': 'Solrosvägen 17 ligger i ett bostadsområde. Mat, restauranger och natur finns inom rimligt avstånd. Allt nedan är gångavstånd eller kort bilresa.',
      'omradet.meta.shop': 'Närmaste mat',
      'omradet.meta.shop.value': 'Willys, <em>650 m</em>',
      'omradet.meta.center': 'Till centrum',
      'omradet.meta.center.value': '8 minuter med bil',
      'omradet.meta.train': 'Tågstation',
      'omradet.meta.train.value': 'Örnsköldsvik C, 12 min',

      'omradet.shops.eyebrow': '01 · Matbutiker',
      'omradet.shops.title': 'Fem butiker, <em>sorterade efter avstånd</em>.',
      'omradet.shops.blurb': 'Närmast först. Willys räcker för det mesta. ICA Maxi har bredare urval om du behöver något specifikt.',
      'omradet.shops.col.store': 'Butik',
      'omradet.shops.col.address': 'Adress',
      'omradet.shops.col.distance': 'Avstånd',
      'omradet.shops.col.walk': 'Gångtid',
      'omradet.shops.col.drive': 'Bil',
      'omradet.shops.col.hours': 'Öppettider',

      'omradet.kit.eyebrow': '02 · Sängkit och praktiskt',
      'omradet.kit.title': 'Glömt något <em>hemma</em>?',
      'omradet.kit.blurb': 'Båda butikerna ligger i Örnsköldsviks centrum. Cirka 10 minuter med bil.',
      'omradet.kit.jysk.title': 'Jysk',
      'omradet.kit.jysk.body': 'Sängkläder (örngott, lakan, påslakan), handdukar, kuddar och täcken. Hit hänvisar vi om du glömt sängkläder.',
      'omradet.kit.jysk.meta': 'Sängkläder · Handdukar',
      'omradet.kit.rusta.title': 'Rusta',
      'omradet.kit.rusta.body': 'Bredare hemartiklar — köksredskap, hushållssaker, småmöbler. Bra om du behöver något övrigt.',
      'omradet.kit.rusta.meta': 'Hem · Kök · Övrigt',

      'omradet.food.eyebrow': '03 · Restauranger & caféer',
      'omradet.food.title': 'Lokala <em>matställen</em>.',
      'omradet.food.placeholder.title': 'Listan fylls i löpande',
      'omradet.food.placeholder.body': 'Vi sammanställer 4–6 ställen i området med adress, kort beskrivning och öppettider. Hör av dig till oss om du har en favorit som borde vara med.',

      'omradet.walks.eyebrow': '04 · Promenader och natur',
      'omradet.walks.title': 'Stråk och <em>naturplatser</em>.',
      'omradet.walks.placeholder.title': '3–4 stråk planerade',
      'omradet.walks.placeholder.body': 'Vi lägger till promenadstråk med karta och uppskattad tid. Skogsstigen bakom huset är ett bra första val.',

      'omradet.hotels.eyebrow': '05 · Hotell',
      'omradet.hotels.title': 'Backup för <em>extranatt</em>.',
      'omradet.hotels.placeholder.title': 'Hotellista kommer',
      'omradet.hotels.placeholder.body': 'Lista på hotell i Örnsköldsvik (närmast först), om du av någon anledning behöver tillfällig övernattning utöver vistelsen i Domek.',
    },

    en: {
      // Navigation
      'nav.hem': 'Home',
      'nav.huset': 'The house',
      'nav.rummen': 'The rooms',
      'nav.inflytt': 'Arrival & departure',
      'nav.omradet': 'The area',
      'nav.menu': 'Menu',

      // Footer
      'foot.signoff': 'Domek — <em>little house</em>,<br>clear rules.',
      'foot.about': 'Domek is a 1959 single-family house at Solrosvägen 17 in Örnsköldsvik. Owned by Hugo and Vega Kjellsson, rented by Sanco for their workers.',
      'foot.contact': 'Contact',
      'foot.contact.house': 'The house',
      'foot.contact.work': 'The job',
      'foot.pages': 'Pages',
      'foot.lang': 'Language',
      'foot.updated': 'Updated',
      'foot.copy': 'Domek · Solrosvägen 17, Örnsköldsvik',

      // Common
      'common.kritisk': 'Critical',
      'common.observera': 'Note',
      'common.bra-att-veta': 'Good to know',
      'common.read-more': 'Read more',

      // INDEX
      'index.title': 'Domek — Solrosvägen 17',
      'index.eyebrow': 'Domek · a small house in Örnsköldsvik',
      'index.h1': 'Stay in a <em>small house</em> during your assignment.',
      'index.lede': 'A home for workers far from their own. Four bedrooms, one kitchen, fourteen wallpapers and clear rules.',
      'index.meta.address': 'Address',
      'index.meta.address.value': 'Solrosvägen 17, Örnsköldsvik',
      'index.meta.year': 'Built',
      'index.meta.year.value': '1959',
      'index.meta.cap': 'Sleeps',
      'index.meta.cap.value': '<em>4</em> people',
      'index.meta.owner': 'Owners',
      'index.meta.owner.value': 'Hugo & Vega Kjellsson',

      'index.principles.eyebrow': '01 · Four house principles',
      'index.principles.title': 'Four things that <em>apply to everyone</em>.',
      'index.principles.blurb': 'Domek is not a hotel. It is a home shared by people passing through. For this to work, four things are required of everyone who stays here.',
      'index.principle1.title': 'Prepare from home',
      'index.principle1.body': 'Bedlinen and towels are not provided. Bring them yourself.',
      'index.principle2.title': 'Leave it cleaner than you found it',
      'index.principle2.body': 'Wash up daily. Take out the rubbish when the bag is full.',
      'index.principle3.title': 'The rules apply to everyone',
      'index.principle3.body': 'No exceptions, no "just this once". Otherwise the system breaks down.',
      'index.principle4.title': 'Speak up about problems',
      'index.principle4.body': 'Something leaks, breaks or stops working — call us right away.',

      'index.before.eyebrow': '02 · Before you arrive',
      'index.before.title': 'Three things to <em>know before</em> the trip.',
      'index.before.blurb': 'This is the most important section on the site. If you read only one section, read this one.',
      'index.before.notice1.title': 'Bedlinen and towels are NOT in the house',
      'index.before.notice1.body': 'You bring them yourself. If you forget, we point you to Jysk in Örnsköldsvik. Beds without bedlinen are not used.',
      'index.before.notice2.title': 'The kitchen has no dishwasher',
      'index.before.notice2.body': 'Wash up by hand. It is quick if you do it right after the meal and do not let it sit.',
      'index.before.notice3.title': 'Key code and wifi come from Nicklas',
      'index.before.notice3.body': 'We who own the house do not handle bookings. Nicklas (Sanco) sends you the details before arrival.',

      'index.find.eyebrow': '03 · Find your way around',
      'index.find.title': 'What do you need <em>right now</em>?',
      'index.find.blurb': 'Four entry points — pick the one closest to your question. Everything is on the site, everything is short.',
      'index.find.huset.title': 'The house',
      'index.find.huset.body': 'Kitchen, laundry, waste, house rules and what to do if something leaks or stops working.',
      'index.find.huset.meta': 'Appliances · Waste · Emergencies · Rules',
      'index.find.rummen.title': 'The rooms',
      'index.find.rummen.body': 'Four bedrooms with wallpapers from different decades. Bed sizes and what is in each.',
      'index.find.rummen.meta': '4 rooms · Single beds',
      'index.find.inflytt.title': 'Arrival & departure',
      'index.find.inflytt.body': 'Steps on arrival, cleaning during the stay and the 9-point departure checklist.',
      'index.find.inflytt.meta': 'Arrival · Departure · Checklist',
      'index.find.omradet.title': 'The area',
      'index.find.omradet.body': 'Nearest grocery stores sorted by distance, and where to buy bedlinen if you forgot.',
      'index.find.omradet.meta': 'Food · Bedlinen · Walks',

      'index.contact.eyebrow': '04 · Contact',
      'index.contact.title': 'Who you <em>call</em> depends on the question.',
      'index.contact.blurb': 'Two separate contact paths. Call the right person directly — it is faster for everyone.',
      'index.contact.house.role': 'Owners of the house',
      'index.contact.house.title': 'Hugo & Vega <em>Kjellsson</em>',
      'index.contact.house.desc': 'For problems in the house — leaks, power cuts, broken appliances, anything that does not work.',
      'index.contact.house.phone': 'Phone',
      'index.contact.house.email': 'Email',
      'index.contact.house.lang': 'Language',
      'index.contact.house.lang.value': 'Swedish, English',
      'index.contact.work.role': 'Sanco — booking & job',
      'index.contact.work.title': 'Nicklas <em>Boström</em>',
      'index.contact.work.desc': 'For questions about the job, the schedule, the booking, key code or wifi details.',
      'index.contact.work.phone': 'Phone',
      'index.contact.work.email': 'Email',
      'index.contact.work.lang': 'Language',
      'index.contact.work.lang.value': 'Swedish, English, Polish',
      'index.contact.emergency.title': 'Emergency: 112',
      'index.contact.emergency.body': 'For fire, urgent illness or a crime in progress — call 112 before you call us. For non-urgent medical advice: 1177.',

      // HUSET
      'huset.title': 'The house — Domek',
      'huset.eyebrow': 'The house · Solrosvägen 17',
      'huset.h1': 'How the house <em>works</em>.',
      'huset.lede': 'Everything you need to know about the kitchen, laundry, waste and house rules. And what to do if something leaks or stops working.',
      'huset.meta.built': 'Built',
      'huset.meta.built.value': '1959',
      'huset.meta.style': 'Style',
      'huset.meta.style.value': '<em>Period</em> 1950s',
      'huset.meta.size': 'Floor area',
      'huset.meta.size.value': '110 m²',
      'huset.meta.heat': 'Heating',
      'huset.meta.heat.value': 'District heating',

      'huset.history.eyebrow': '01 · The history of the house',
      'huset.history.title': 'A house from <em>1959</em>.',
      'huset.history.p1': 'Solrosvägen 17 was built in 1959 as a family home. The original floor plan is largely preserved — kitchen, living room and four bedrooms are as they were. Wallpapers, flooring and some cabinets are from different decades of the house\'s history.',
      'huset.history.p2': 'An extension was added in the 1980s (bathroom and laundry area). The kitchen was renovated in 2010 — new appliances, old cabinets. It is a 1950s house, not a modern one. Things have a patina and creak from time to time.',

      'huset.kitchen.eyebrow': '02 · The kitchen',
      'huset.kitchen.title': 'What is in the <em>kitchen</em>?',
      'huset.kitchen.blurb': 'Three appliances that cover what you need for cooking. Nothing fancy — just what works.',
      'huset.kitchen.fridge.title': 'Fridge & freezer',
      'huset.kitchen.fridge.body': 'Combined unit, normal size for four people. The freezer holds about 90 litres.',
      'huset.kitchen.stove.title': 'Stove, oven & microwave',
      'huset.kitchen.stove.body': 'Induction hob with four zones, fan oven with grill function. Microwave next to the stove.',
      'huset.kitchen.kettle.title': 'Kettle & coffee',
      'huset.kitchen.kettle.body': 'Electric kettle and coffee maker. You buy filters yourself (Willys, two minutes away).',
      'huset.kitchen.notice.title': 'There is no dishwasher',
      'huset.kitchen.notice.body': 'Wash up by hand in the right-hand sink. Detergent and sponge are under the sink. Leave nothing in the sink overnight.',

      'huset.laundry.eyebrow': '03 · Laundry and bedlinen',
      'huset.laundry.title': 'What is <em>here</em> and what you <em>bring</em>.',
      'huset.laundry.in.eyebrow': 'In the house',
      'huset.laundry.in.title': 'Washing machine & drying room',
      'huset.laundry.in.body': 'Washing machine in the boiler room. Drying room with heated air — hanging on hangers is quick.',
      'huset.laundry.in.meta': 'No tumble dryer',
      'huset.laundry.bring.eyebrow': 'You bring',
      'huset.laundry.bring.title': 'Bedlinen & towels',
      'huset.laundry.bring.body': 'NOT in the house — you must bring your own. If you forget, we point you to <a href="omradet.html" class="link">Jysk in Örnsköldsvik</a>.',
      'huset.laundry.bring.meta': 'Forgot? → Jysk',

      'huset.waste.eyebrow': '04 · Waste and recycling',
      'huset.waste.title': 'What goes <em>where</em>?',
      'huset.waste.blurb': 'Two bins at the house — brown and green. Cardboard, glass and metal go to the recycling station 600 m away.',
      'huset.waste.brown.title': 'Brown bin',
      'huset.waste.brown.body': 'Food waste in brown bags (under the sink). Collected every other Wednesday.',
      'huset.waste.green.title': 'Green bin',
      'huset.waste.green.body': 'Other waste in regular bin bags. Collected every other Wednesday.',
      'huset.waste.cardboard.title': 'Cardboard',
      'huset.waste.cardboard.body': 'Fold flat and carry to the recycling station at the end of Solrosvägen.',
      'huset.waste.glass.title': 'Glass & metal',
      'huset.waste.glass.body': 'Same recycling station as cardboard. Two separate bins on site.',
      'huset.waste.notice.title': 'Collection dates verified against Miva',
      'huset.waste.notice.body': 'Check Miva\'s calendar for exact dates. The schedule above is general — exceptions occur on public holidays.',

      'huset.problem.eyebrow': '05 · When something goes wrong',
      'huset.problem.title': 'When something <em>breaks</em>.',
      'huset.problem.blurb': 'This section is written to be readable under stress. Big headings, short steps, phone visible.',
      'huset.problem.water.title': 'Water leak',
      'huset.problem.water.step1.title': 'Go to the boiler room',
      'huset.problem.water.step1.body': 'The boiler room is in the basement — door on the left at the bottom of the stairs.',
      'huset.problem.water.step2.title': 'Close the main valve',
      'huset.problem.water.step2.body': 'The main valve is mounted on the inlet pipe by the boiler — turn clockwise until it stops.',
      'huset.problem.water.step3.title': 'Call us immediately',
      'huset.problem.water.step3.body': 'Call Hugo at <a href="tel:+46700000000" class="link">+46 70 000 00 00</a>. No voicemail — keep ringing until someone answers.',
      'huset.problem.power.title': 'Power outage',
      'huset.problem.power.step1.title': 'Find the fuse box',
      'huset.problem.power.step1.body': 'The fuse box is in the hall by the front door — behind the panel in the cabinet above the right side of the shoe rack.',
      'huset.problem.power.step2.title': 'Take a spare fuse',
      'huset.problem.power.step2.body': 'Spare fuses are in the drawer below the fuse box. Four sizes — labelled by function.',
      'huset.problem.power.step3.title': 'Replace and test',
      'huset.problem.power.step3.body': 'Replace the blown fuse. If it blows again — call us before a third attempt.',
      'huset.problem.notice.title': 'Check the water meter regularly',
      'huset.problem.notice.body': 'The water meter sits in the boiler room next to the main valve. If it shows consumption when no water is being used = possible leak. Tell us.',

      'huset.rules.eyebrow': '06 · House rules',
      'huset.rules.title': 'Six <em>rules</em>.',
      'huset.rules.blurb': 'Three are non-negotiable (smoking, pets, fireplace). Three are note-rules. Severity is shown in the right margin.',
      'huset.rules.r1.title': 'No smoking indoors',
      'huset.rules.r1.body': 'Nobody smokes inside. There is a chair and ashtray outside at the back.',
      'huset.rules.r1.severity': 'Strict',
      'huset.rules.r2.title': 'No pets',
      'huset.rules.r2.body': 'No dogs, cats or other animals in the house. Allergies and wear.',
      'huset.rules.r2.severity': 'Strict',
      'huset.rules.r3.title': 'The fireplace must not be used',
      'huset.rules.r3.body': 'The open fireplace in the living room is decorative — it is not certified for burning.',
      'huset.rules.r3.severity': 'Strict',
      'huset.rules.r4.title': 'Max 5 residents at the same time',
      'huset.rules.r4.body': 'Four sleeping spots, plus one in the living room if needed. No more.',
      'huset.rules.r4.severity': 'Note',
      'huset.rules.r5.title': 'No building work',
      'huset.rules.r5.body': 'No screws, nails or tape on walls or furniture. Tell us if needed.',
      'huset.rules.r5.severity': 'Note',
      'huset.rules.r6.title': 'Garage & guesthouse not included',
      'huset.rules.r6.body': 'Both are locked and used by us for storage. Do not park in the driveway.',
      'huset.rules.r6.severity': 'Good to know',

      // RUMMEN
      'rum.title': 'The rooms — Domek',
      'rum.eyebrow': 'The rooms · 4 bedrooms',
      'rum.h1': 'Four <em>bedrooms</em>, four wallpapers.',
      'rum.lede': 'All beds are single beds. Total capacity is four people in four rooms, plus one spot in the living room if needed.',
      'rum.meta.cap': 'Capacity',
      'rum.meta.cap.value': '<em>4</em> people',
      'rum.meta.beds': 'Beds',
      'rum.meta.beds.value': 'Single beds',
      'rum.meta.bath': 'Bathroom',
      'rum.meta.bath.value': '1 (shared)',
      'rum.meta.linens': 'Bedlinen',
      'rum.meta.linens.value': 'You bring <em>your own</em>',

      'rum.gula.tag': 'Ground floor',
      'rum.gula.title': 'The <em>yellow</em> room',
      'rum.gula.bed': 'Bed · 105 × 200 cm — wide single',
      'rum.gula.desc': 'The largest bedroom in the house with mustard-yellow wallpaper with small flowers from the late 1960s. Wardrobe with sliding doors along one wall.',
      'rum.gula.size.key': 'Size',
      'rum.gula.size.val': '14 m²',
      'rum.gula.cap.key': 'Sleeps',
      'rum.gula.cap.val': '1 person',
      'rum.gula.extra.key': 'Extra',
      'rum.gula.extra.val': 'Wardrobe',

      'rum.roda.tag': 'Ground floor',
      'rum.roda.title': 'The <em>red</em> room',
      'rum.roda.bed': 'Bed · 90 × 200 cm — standard single',
      'rum.roda.desc': 'Smaller room with striped terracotta wallpaper from the 1970s. Closest to the bathroom — good for early risers.',
      'rum.roda.size.key': 'Size',
      'rum.roda.size.val': '9 m²',
      'rum.roda.cap.key': 'Sleeps',
      'rum.roda.cap.val': '1 person',
      'rum.roda.extra.key': 'Extra',
      'rum.roda.extra.val': 'Near bathroom',

      'rum.grona.tag': 'Upper floor',
      'rum.grona.title': 'The <em>green</em> room',
      'rum.grona.bed': 'Bed · 120 × 200 cm — wide single',
      'rum.grona.desc': 'The widest single bed is here. Dark green moss wallpaper with small gold and mustard details. Own balcony at the back.',
      'rum.grona.size.key': 'Size',
      'rum.grona.size.val': '12 m²',
      'rum.grona.cap.key': 'Sleeps',
      'rum.grona.cap.val': '1 person',
      'rum.grona.extra.key': 'Extra',
      'rum.grona.extra.val': 'Balcony',

      'rum.bruna.tag': 'Upper floor',
      'rum.bruna.title': 'The <em>brown</em> room',
      'rum.bruna.bed': 'Bed · 90 × 200 cm — standard single',
      'rum.bruna.desc': 'Also called the office. Brown bouquet wallpaper and a desk by the window. Good if you need to work in the evenings.',
      'rum.bruna.size.key': 'Size',
      'rum.bruna.size.val': '10 m²',
      'rum.bruna.cap.key': 'Sleeps',
      'rum.bruna.cap.val': '1 person',
      'rum.bruna.extra.key': 'Extra',
      'rum.bruna.extra.val': 'Desk',

      'rum.placeholder.pill': 'Coming later',
      'rum.placeholder.title': 'Fifth room being planned',
      'rum.placeholder.body': 'We are looking at furnishing the basement room next to the boiler room. When ready, it will appear here.',

      'rum.notice.title': 'Bedlinen NOT included — regardless of room',
      'rum.notice.body': 'Pillows and duvets are on the beds, but pillowcases, sheets, duvet covers and towels are brought by you. Forgot? → Jysk in Örnsköldsvik (see The area).',

      // INFLYTT-UTFLYTT
      'inflytt.title': 'Arrival & departure — Domek',
      'inflytt.eyebrow': 'Arrival · departure',
      'inflytt.h1': 'What you do <em>the first</em> evening — and <em>the last</em> day.',
      'inflytt.lede': 'Three steps on arrival. Three cleaning routines during the stay. Nine points on the departure checklist. Nothing more, nothing less.',
      'inflytt.meta.keys': 'Keys',
      'inflytt.meta.keys.value': 'Key box at the door',
      'inflytt.meta.wifi': 'WiFi',
      'inflytt.meta.wifi.value': 'Covers the whole house',
      'inflytt.meta.heat': 'Heating',
      'inflytt.meta.heat.value': 'District heating + radiators',
      'inflytt.meta.vent': 'Ventilation',
      'inflytt.meta.vent.value': 'Natural — <em>air daily</em>',

      'inflytt.arrival.eyebrow': '01 · On arrival',
      'inflytt.arrival.title': 'Three steps into the <em>house</em>.',
      'inflytt.arrival.blurb': 'You need: key box code, wifi password, and to know how to adjust the heating. All below.',
      'inflytt.arrival.s1.title': 'Key box at the door',
      'inflytt.arrival.s1.body': 'The key box is on the left of the front door. Enter the code, take the key, unlock.',
      'inflytt.arrival.s1.code.key': 'Code',
      'inflytt.arrival.s1.code.val': '[from Nicklas]',
      'inflytt.arrival.s1.note.key': 'NOTE',
      'inflytt.arrival.s1.note.val': 'Return the key on departure',
      'inflytt.arrival.s2.title': 'Connect to wifi',
      'inflytt.arrival.s2.body': 'The router is in the living room behind the TV. Network and password below.',
      'inflytt.arrival.s2.net.key': 'Network',
      'inflytt.arrival.s2.net.val': '[from Nicklas]',
      'inflytt.arrival.s2.pass.key': 'Password',
      'inflytt.arrival.s2.pass.val': '[from Nicklas]',
      'inflytt.arrival.s3.title': 'Adjust the heating',
      'inflytt.arrival.s3.body': 'Each radiator has a 1–5 dial. Default is 3. Adjust per room as needed.',
      'inflytt.arrival.s3.vent.key': 'Air',
      'inflytt.arrival.s3.vent.val': 'Cross-draft 5–10 min/day',
      'inflytt.arrival.s3.note.key': 'NOTE',
      'inflytt.arrival.s3.note.val': 'Do not block window vents',

      'inflytt.cleaning.eyebrow': '02 · Cleaning during the stay',
      'inflytt.cleaning.title': 'Three <em>routines</em>.',
      'inflytt.cleaning.blurb': 'Kitchen daily, bathroom weekly, floors as needed. Keeping it ongoing is much easier than doing everything on the last day.',
      'inflytt.cleaning.kitchen.title': 'Kitchen — daily',
      'inflytt.cleaning.kitchen.body': 'Wash up after meals. Wipe the counter. Take out the rubbish when the bag is full. No rest from the rules.',
      'inflytt.cleaning.bath.title': 'Bathroom — weekly',
      'inflytt.cleaning.bath.body': 'Scrub the toilet, wipe the basin, wash the floor. Cleaning supplies are under the kitchen sink.',
      'inflytt.cleaning.floor.title': 'Floors — as needed',
      'inflytt.cleaning.floor.body': 'Vacuum entrance and kitchen more often than other rooms. Mop damp — not wet. Wood floors do not handle large amounts of water.',

      'inflytt.exit.eyebrow': '03 · On departure',
      'inflytt.exit.title': 'Departure <em>checklist</em>.',
      'inflytt.exit.blurb': 'Nine points. Tick as you go — the progress bar fills up. The list does not save between visits.',
      'inflytt.check.1': 'Dishes washed and dried',
      'inflytt.check.2': 'Fridge and freezer emptied',
      'inflytt.check.3': 'Rubbish taken out',
      'inflytt.check.4': 'Laundry taken home',
      'inflytt.check.5': 'Bedlinen and towels taken home',
      'inflytt.check.6': 'All windows closed',
      'inflytt.check.7': 'Front doors locked',
      'inflytt.check.8': 'Basic clean done',
      'inflytt.check.9': 'Keys returned to the key box',
      'inflytt.exit.notice.title': 'Bedlinen ALWAYS goes home with you',
      'inflytt.exit.notice.body': 'Forgotten bedlinen and towels are thrown out at final cleaning. We do not store them or send them home.',

      // OMRÅDET
      'omradet.title': 'The area — Domek',
      'omradet.eyebrow': 'The area · Örnsköldsvik',
      'omradet.h1': 'What is <em>around</em> the house?',
      'omradet.lede': 'Solrosvägen 17 is in a residential area. Food, restaurants and nature are all within reasonable distance. Everything below is walking distance or a short drive.',
      'omradet.meta.shop': 'Nearest food',
      'omradet.meta.shop.value': 'Willys, <em>650 m</em>',
      'omradet.meta.center': 'To the centre',
      'omradet.meta.center.value': '8 minutes by car',
      'omradet.meta.train': 'Train station',
      'omradet.meta.train.value': 'Örnsköldsvik C, 12 min',

      'omradet.shops.eyebrow': '01 · Grocery stores',
      'omradet.shops.title': 'Five stores, <em>sorted by distance</em>.',
      'omradet.shops.blurb': 'Closest first. Willys covers most things. ICA Maxi has a wider selection if you need something specific.',
      'omradet.shops.col.store': 'Store',
      'omradet.shops.col.address': 'Address',
      'omradet.shops.col.distance': 'Distance',
      'omradet.shops.col.walk': 'Walk',
      'omradet.shops.col.drive': 'Drive',
      'omradet.shops.col.hours': 'Hours',

      'omradet.kit.eyebrow': '02 · Bedlinen kit and practical items',
      'omradet.kit.title': 'Forgot something at <em>home</em>?',
      'omradet.kit.blurb': 'Both stores are in the centre of Örnsköldsvik. About 10 minutes by car.',
      'omradet.kit.jysk.title': 'Jysk',
      'omradet.kit.jysk.body': 'Bedlinen (pillowcases, sheets, duvet covers), towels, pillows and duvets. We point here if you forgot bedlinen.',
      'omradet.kit.jysk.meta': 'Bedlinen · Towels',
      'omradet.kit.rusta.title': 'Rusta',
      'omradet.kit.rusta.body': 'Wider home goods — kitchen utensils, household items, small furniture. Good if you need something else.',
      'omradet.kit.rusta.meta': 'Home · Kitchen · Other',

      'omradet.food.eyebrow': '03 · Restaurants & cafés',
      'omradet.food.title': 'Local <em>places to eat</em>.',
      'omradet.food.placeholder.title': 'List being filled in',
      'omradet.food.placeholder.body': 'We are compiling 4–6 places in the area with address, short description and opening hours. Tell us if you have a favourite that should be on the list.',

      'omradet.walks.eyebrow': '04 · Walks and nature',
      'omradet.walks.title': 'Trails and <em>nature spots</em>.',
      'omradet.walks.placeholder.title': '3–4 trails planned',
      'omradet.walks.placeholder.body': 'We will add walking trails with map and estimated time. The forest path behind the house is a good first choice.',

      'omradet.hotels.eyebrow': '05 · Hotels',
      'omradet.hotels.title': 'Backup for an <em>extra night</em>.',
      'omradet.hotels.placeholder.title': 'Hotel list coming',
      'omradet.hotels.placeholder.body': 'List of hotels in Örnsköldsvik (closest first), if you for any reason need temporary accommodation outside your stay at Domek.',
    },

    pl: {
      // Polska — częściowa enligt spec. Endast nav, footer och nyckelmeddelanden.
      // Saknade nycklar faller tillbaka till engelska (sedan svenska).

      // Navigation
      'nav.hem': 'Strona główna',
      'nav.huset': 'Dom',
      'nav.rummen': 'Pokoje',
      'nav.inflytt': 'Przyjazd i wyjazd',
      'nav.omradet': 'Okolica',
      'nav.menu': 'Menu',

      // Footer
      'foot.signoff': 'Domek — <em>mały dom</em>,<br>jasne zasady.',
      'foot.about': 'Domek to dom jednorodzinny z 1959 roku przy Solrosvägen 17 w Örnsköldsvik. Właściciele: Hugo i Vega Kjellsson, wynajmuje Sanco dla swoich pracowników.',
      'foot.contact': 'Kontakt',
      'foot.contact.house': 'Dom',
      'foot.contact.work': 'Praca',
      'foot.pages': 'Strony',
      'foot.lang': 'Język',
      'foot.updated': 'Zaktualizowano',
      'foot.copy': 'Domek · Solrosvägen 17, Örnsköldsvik',

      // Common
      'common.kritisk': 'Krytyczne',
      'common.observera': 'Uwaga',
      'common.bra-att-veta': 'Warto wiedzieć',

      // Page titles
      'index.title': 'Domek — Solrosvägen 17',
      'huset.title': 'Dom — Domek',
      'rum.title': 'Pokoje — Domek',
      'inflytt.title': 'Przyjazd i wyjazd — Domek',
      'omradet.title': 'Okolica — Domek',

      // Key safety messages (translated to Polish since target audience is Polish workers)
      'index.eyebrow': 'Domek · mały dom w Örnsköldsvik',
      'index.h1': 'Mieszkaj w <em>małym domu</em> podczas zlecenia.',
      'index.lede': 'Dom dla pracowników z dala od własnego. Cztery sypialnie, jedna kuchnia, czternaście tapet i jasne zasady.',

      'index.before.notice1.title': 'Pościel i ręczniki NIE są w domu',
      'index.before.notice1.body': 'Przywieź je sam. Jeśli zapomnisz, wskazujemy Jysk w Örnsköldsvik. Łóżek bez pościeli się nie używa.',
      'index.before.notice2.title': 'W kuchni nie ma zmywarki',
      'index.before.notice2.body': 'Zmywaj ręcznie. Idzie szybko, jeśli robisz to od razu po posiłku.',
      'index.before.notice3.title': 'Kod do skrytki na klucze i wifi otrzymasz od Nicklasa',
      'index.before.notice3.body': 'My, właściciele domu, nie zajmujemy się rezerwacją. Nicklas (Sanco) wysyła dane przed przyjazdem.',

      'index.contact.emergency.title': 'Nagły wypadek: 112',
      'index.contact.emergency.body': 'W razie pożaru, nagłej choroby lub przestępstwa — dzwoń 112 zanim zadzwonisz do nas. Niepilne porady medyczne: 1177.',

      'rum.notice.title': 'Pościel NIE jest wliczona — niezależnie od pokoju',
      'rum.notice.body': 'Poduszki i kołdry leżą na łóżkach, ale poszewki, prześcieradła, poszwy i ręczniki przywozisz sam. Zapomniałeś? → Jysk w Örnsköldsvik.',

      'inflytt.exit.notice.title': 'Pościel ZAWSZE zabierasz do domu',
      'inflytt.exit.notice.body': 'Pozostawiona pościel i ręczniki są wyrzucane przy końcowym sprzątaniu. Nie przechowujemy ani nie wysyłamy do domu.',
    }
  };

  // Fallback chain: pl → en → sv
  function translate(key, lang) {
    const langChain = lang === 'pl' ? ['pl', 'en', 'sv']
                    : lang === 'en' ? ['en', 'sv']
                    : ['sv'];
    for (const l of langChain) {
      if (TRANSLATIONS[l] && TRANSLATIONS[l][key] !== undefined) {
        return TRANSLATIONS[l][key];
      }
    }
    return null; // not found at all — leave HTML default
  }

  function applyTranslations(lang) {
    document.documentElement.setAttribute('lang', lang);
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = translate(key, lang);
      if (text !== null) {
        el.innerHTML = text;
      }
    });
    // Also handle attribute-based translations: data-i18n-attr="title|aria-label|placeholder"
    const attrElements = document.querySelectorAll('[data-i18n-attr]');
    attrElements.forEach(el => {
      const spec = el.getAttribute('data-i18n-attr');
      // format: "attr:key,attr2:key2"
      spec.split(',').forEach(pair => {
        const [attr, key] = pair.split(':').map(s => s.trim());
        const text = translate(key, lang);
        if (text !== null) el.setAttribute(attr, text.replace(/<[^>]+>/g, ''));
      });
    });
    // Update <title> if it has data-i18n-title
    const titleEl = document.querySelector('title[data-i18n]');
    if (titleEl) {
      const key = titleEl.getAttribute('data-i18n');
      const text = translate(key, lang);
      if (text !== null) document.title = text.replace(/<[^>]+>/g, '');
    }
  }

  // ============================================================
  // 2. LANGUAGE SWITCHER
  // ============================================================
  const STORAGE_KEY = 'domek.lang';

  function getStoredLang() {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'sv';
    } catch (e) {
      return 'sv';
    }
  }

  function setStoredLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) { /* ignore */ }
  }

  function setLang(lang) {
    if (!['sv', 'en', 'pl'].includes(lang)) lang = 'sv';
    setStoredLang(lang);
    applyTranslations(lang);
    // Update all language switcher buttons
    document.querySelectorAll('.lang-switch button').forEach(btn => {
      btn.classList.toggle('is-active', btn.getAttribute('data-lang') === lang);
      btn.setAttribute('aria-pressed', btn.getAttribute('data-lang') === lang ? 'true' : 'false');
    });
  }

  function initLangSwitchers() {
    document.querySelectorAll('.lang-switch button').forEach(btn => {
      btn.addEventListener('click', () => {
        setLang(btn.getAttribute('data-lang'));
      });
    });
  }

  // ============================================================
  // 3. MOBILE NAV (HAMBURGER)
  // ============================================================
  function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const cluster = document.querySelector('.nav-cluster');
    if (!toggle || !cluster) return;

    const isOpen = () => cluster.classList.contains('is-open');
    function open() {
      cluster.classList.add('is-open');
      toggle.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Stäng meny');
    }
    function close() {
      cluster.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Öppna meny');
    }

    toggle.addEventListener('click', () => {
      isOpen() ? close() : open();
    });

    // Close when a link is clicked (mobile)
    cluster.querySelectorAll('.nav-links a').forEach(a => {
      a.addEventListener('click', () => {
        if (window.matchMedia('(max-width: 56.25rem)').matches) close();
      });
    });

    // Close on Escape (return focus to toggle for keyboard users)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen()) {
        close();
        toggle.focus();
      }
    });

    // Close on click outside the panel/toggle
    document.addEventListener('mousedown', (e) => {
      if (!isOpen()) return;
      if (toggle.contains(e.target) || cluster.contains(e.target)) return;
      close();
    });
  }

  // ============================================================
  // 4. CHECKLIST (departure)
  // ============================================================
  function initChecklist() {
    const list = document.querySelector('.check-list');
    if (!list) return;
    const items = list.querySelectorAll('.check-item input[type="checkbox"]');
    const fill = document.querySelector('.progress-bar-fill');
    const count = document.querySelector('.progress-count');
    const reward = document.querySelector('.checklist-reward');
    const resetBtn = document.querySelector('.checklist-reset');
    const total = items.length;
    const STORAGE_KEY = 'domek-checklist-v1';

    function loadState() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const saved = JSON.parse(raw);
        if (!Array.isArray(saved) || saved.length !== total) return;
        items.forEach((i, idx) => { i.checked = !!saved[idx]; });
      } catch (e) { /* ignore */ }
    }

    function saveState() {
      try {
        const state = Array.from(items).map(i => i.checked);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (e) { /* ignore */ }
    }

    function update() {
      const done = Array.from(items).filter(i => i.checked).length;
      const pct = total === 0 ? 0 : (done / total) * 100;
      if (fill) fill.style.width = pct + '%';
      if (count) {
        const strong = count.querySelector('strong');
        if (strong) strong.textContent = String(done);
        else count.innerHTML = `<strong>${done}</strong> / ${total}`;
      }
      items.forEach(i => {
        i.closest('.check-item').classList.toggle('is-done', i.checked);
      });
      if (reward) {
        const shouldShow = done === total && total > 0;
        reward.classList.toggle('hidden', !shouldShow);
        reward.classList.toggle('flex', shouldShow);
      }
    }

    function reset() {
      items.forEach(i => { i.checked = false; });
      saveState();
      update();
    }

    loadState();
    update();

    items.forEach(i => {
      i.addEventListener('change', () => {
        saveState();
        update();
      });
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', (e) => {
        e.preventDefault();
        reset();
      });
    }
  }

  // ============================================================
  // 5. REVEAL ON SCROLL
  // ============================================================
  function initReveal() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  }

  // ============================================================
  // 6. ACTIVE NAV LINK
  // ============================================================
  function initActiveNav() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(a => {
      const href = a.getAttribute('href');
      if (href === path || (path === '' && href === 'index.html')) {
        a.classList.add('is-active');
        a.setAttribute('aria-current', 'page');
      }
    });
  }

  // ============================================================
  // INIT
  // ============================================================
  function init() {
    initActiveNav();
    initMobileNav();
    initChecklist();
    initReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
