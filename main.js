/* ครัวริมน้ำ — main.js (i18n · nav · เวลาเปิด · แท็บ · lightbox · reveal · FAB · ฟอร์ม · คุกกี้) */
(function () {
  'use strict';
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); return; } // async: รอ DOM ก่อน
  init();
  function init() {
  var COOKIE_BANNER = false; // true = แสดงแบนเนอร์คุกกี้ (เมื่อเพิ่มสคริปต์วิเคราะห์/โฆษณา)
  var LANG_KEY = 'krn-lang';
  var HOURS = { // 0=อาทิตย์…6=เสาร์ [เปิด, ปิด] เป็นนาที
    0: [630, 1350], 1: [660, 1290], 2: [660, 1290], 3: [660, 1290], 4: [660, 1290], 5: [660, 1350], 6: [630, 1350]
  };
  var TEL = '<a class="nowrap" href="tel:0812345678">081-234-5678</a>';
  var LINE = '<a class="nowrap" href="https://line.me/R/ti/p/@example" target="_blank" rel="noopener">@example</a>';

  /* ---------- EN dictionary (Thai lives in HTML) ---------- */
  var EN = {
    meta_title: 'Krua Rim Nam | Thai Riverside Restaurant, Nonthaburi',
    skip: 'Skip to main content',
    brand_top: 'back to top', brand_home: 'home',
    brand: 'Krua Rim Nam', brand_sub: 'THAI RIVERSIDE KITCHEN', /* สั้นพอไม่ล้นที่ ≥1240px */
    nav_aria: 'Main navigation', nav_menu: 'Menu', nav_story: 'Story', nav_gallery: 'Gallery', nav_reviews: 'Reviews',
    nav_events: 'Events', nav_visit: 'Location', nav_contact: 'Contact', lang_aria: 'Choose language',
    cta_line: 'Book a table on LINE', nav_open: 'Open menu', nav_close: 'Close menu', cta_call: 'Call 081-234-5678',
    hero_rating: '1,056 Google reviews',
    hero_eyebrow: 'Thai restaurant on the Chao Phraya · Nonthaburi Pier',
    hero_h1a: 'Bold Thai flavours,', hero_h1b: 'with the river right in front of you',
    hero_lede: 'Farm-fresh sea bass, giant river prawns and Grandma’s recipes, twelve years by the pier. Sit in the breeze and watch the boats go by.',
    h_default: 'Open daily from 11:00 (weekends 10:30)', h_default_s: 'Closing times in the table below',
    trust1_n: '40', trust1: 'riverside seats', trust1_s: 'Plus 60 air-conditioned seats for rainy days or big family gatherings',
    trust2_n: '12 yrs', trust2: 'by Nonthaburi Pier, recipes unchanged', trust2_s: 'Sea bass from Bang Kruai fish farms, river prawns from Ayutthaya, fresh every morning, no middlemen',
    trust3_n: '50', trust3: 'free parking spaces out front', trust3_s: 'Coming by boat? We have our own pier, just 400 m from Nonthaburi Pier',
    dish_eyebrow: 'Signature dishes', dish_title: 'What our regulars order at almost every table',
    dish_lede: 'Prices include tax, no service charge. Every dish can be made milder or spicier, just ask.',
    d1: 'Creamy River Prawn Tom Yum', d1_p: 'Giant river prawns with rich, buttery roe in a creamy broth of galangal, lemongrass and kaffir lime from our own garden',
    t_spicy2: 'Very spicy', t_spicy2b: 'Very spicy', t_spicy1: 'Medium spicy', t_spicy: 'Spicy', t_best: 'No. 1 best seller', t_share: 'Serves 3–4', t_kids: 'Kid-friendly', t_veg: 'Vegetarian',
    d2: 'Crispy Sea Bass with Fish Sauce', d2_p: 'Nearly a kilo of farm-fresh sea bass, fried crisp outside and tender inside, drizzled with fragrant fish sauce and topped with chopped chilli and garlic. Served with green mango salad',
    d3: 'Green Curry with Featherback Fish Balls', d3_p: 'Curry paste pounded fresh each morning, hand-pressed coconut milk and bouncy featherback fish balls. Great with rice or roti',
    d4: 'Pad Thai with Fresh Prawns', d4_p: 'Chewy Chanthaburi noodles wok-fried over high heat with five fresh prawns. Ask for it wrapped in egg if you like',
    d5: 'Thai Papaya Salad with Prawns', d5_p: 'Crisp green papaya pounded to order, real fish sauce and garden limes. Choose your heat level',
    d6: 'Mango Sticky Rice', d6_p: 'Golden Nam Dok Mai mangoes from Bang Kruai orchards, coconut-scented sticky rice, fresh coconut cream and toasted mung beans',
    scroll_hint: 'Swipe to see more dishes',
    fm_eyebrow: 'Full menu', fm_title: 'Browse by category', fm_lede: 'Seafood prices may change with the season. Ask our staff about today’s specials.',
    tabs_aria: 'Menu categories', tab_tom: 'Soups & curries', tab_yam: 'Salads', tab_pad: 'Wok & fried', tab_sweet: 'Desserts', tab_drink: 'Drinks',
    m_tom1: 'Creamy river prawn tom yum', m_tom2: 'Clear river prawn tom yum', m_tom3: 'Free-range chicken tom kha', m_tom4: 'Tom klong with crispy fish',
    m_tom5: 'Sour curry with acacia omelette & prawns', m_tom6: 'Green curry with featherback fish balls', m_tom7: 'River snail curry with wild betel', m_tom8: 'Clear tofu & minced pork soup',
    m_yam1: 'Thai papaya salad with prawns', m_yam2: 'Crispy catfish & green mango salad', m_yam3: 'Seafood glass noodle salad', m_yam4: 'Lemongrass salad with prawns',
    m_yam5: 'Spicy river prawn salad (pla kung)', m_yam6: 'Sea bass larb', m_yam7: 'Fiddlehead fern salad with prawns', m_yam8: 'Miang kham in wild betel leaves',
    m_pad1: 'Crispy sea bass with fish sauce', m_pad2: 'Grilled river prawn (each)', m_pad3: 'Pad Thai with fresh prawns', m_pad4: 'Holy basil minced beef with fried egg',
    m_pad5: 'Soft-shell crab in curry powder', m_pad6: 'Clams in roasted chilli paste', m_pad7: 'Spicy stir-fried mixed seafood', m_pad8: 'Flash-fried morning glory',
    m_pad9: 'Crab meat omelette', m_pad10: 'Fried tofu with Thai herbs',
    m_sw1: 'Mango sticky rice', m_sw2: 'Red rubies in coconut milk', m_sw3: 'Bua loi — rice balls in warm coconut milk with poached egg', m_sw4: 'Lod chong in coconut milk',
    m_sw5: 'Traditional kanom krok (10 pcs)', m_sw6: 'Nonthaburi durian with sticky rice (seasonal)',
    m_dr1: 'Thai iced tea', m_dr2: 'Fresh young coconut', m_dr3: 'Lemongrass & pandan cooler', m_dr4: 'Butterfly pea lemonade', m_dr5: 'Honey lime soda',
    m_dr6: 'Fruit smoothie (watermelon / pineapple / mango)', m_dr7: 'Jug of herbal drink (4–5 people)', m_dr8: 'Water / soda',
    fm_note: 'Allergies or vegetarian? Tell us when you book. Our kitchen can adapt almost every dish.',
    st_eyebrow: 'Our story', st_title: 'It started with Grandma’s six-table kitchen by the pier',
    st_p1: 'In 2014 Grandma Somsri opened a tiny place in front of her riverside home: six tables, two charcoal stoves, and the food she had cooked for her family all her life. Tom yum had to smell of real galangal and lemongrass, curry paste was pounded every morning, and only real fish sauce would do. Twelve years on we seat over a hundred, but every recipe is unchanged.',
    st_p2: 'No middlemen. Sea bass comes straight from Bang Kruai fish farms each morning, river prawns from Ayutthaya, vegetables from Nonthaburi market at five a.m., and the Nam Dok Mai mangoes and seasonal durian from our neighbours’ orchards in Bang Kruai.',
    st_ing_title: 'Things we never compromise on',
    st_ing1: 'Bang Kruai sea bass, delivered every morning', st_ing2: 'Ayutthaya river prawns, 300–400 g each', st_ing3: 'Curry paste pounded fresh daily',
    st_ing4: 'Hand-pressed coconut milk, never from a carton', st_ing5: 'Galangal, lemongrass and kaffir lime from our garden', st_ing6: 'Mangoes and durian from Nonthaburi orchards',
    st_fig1: 'Our high-heat kitchen', st_fig2: 'The market at 5 a.m.',
    ga_eyebrow: 'Gallery', ga_title: 'By the river, from noon till night', ga_lede: 'Tap a photo to enlarge',
    ga1: 'Riverside zone, ground floor', ga2: 'Sunset in front of the restaurant, around 6 p.m.', ga3: 'Lit-up boats pass by every evening', ga4: 'Thai houses across the river',
    ga5: 'A family table, ordered to the brim', ga6: 'Thai iced tea, brewed fresh per glass', ga7: 'Plated up for special tables', ga8: 'Outdoor zone under the rain tree',
    rv_eyebrow: 'Customer reviews', rv_title: 'What our guests say', rv_lede: 'Selected from Google reviews written by our guests', rv_note: 'Reviews and ratings are sample data for this demo',
    rv_google: 'Google rating', rv_count: 'From 1,056 reviews · updated September 2026', stars5: '5 out of 5 stars', stars4: '4 out of 5 stars',
    rv1: 'Been coming since it was a tiny place, and now I bring my kids. The creamy tom yum tastes exactly the same as ever. Never once disappointed.',
    rv1_n: 'Napatsorn', rv1_p: 'Nonthaburi · regular', rv1_av: 'N',
    rv2: 'Booking a riverside table on LINE was easy and it was ready when we arrived. The fried sea bass is huge and properly crispy. Come at dusk for the sunset.',
    rv2_n: 'Theerapat', rv2_p: 'Bangkok', rv2_av: 'T',
    rv3: 'Great food, lovely atmosphere. Saturdays are busy so we waited a little, but the staff looked after us well. The butterfly pea lemonade is so refreshing.',
    rv3_n: 'Orawan', rv3_p: 'Pathum Thani', rv3_av: 'O',
    rv4: 'We held Mum’s birthday here, three tables. They set up the riverside exactly as discussed and even brought a surprise cake. The whole family fell for the mango sticky rice.',
    rv4_n: 'Kittisak', rv4_p: 'Chiang Mai · private event', rv4_av: 'K',
    ev_eyebrow: 'Promotions & events', ev_title1: 'Come as a group, a family,', ev_title2: 'or book the whole place', ev_lede: 'Promotions change monthly. Follow our LINE and Facebook for the latest.',
    pr1_k: 'Monday–Thursday', pr1: '10% off when you book ahead on LINE', pr1_p: 'Book at least a day ahead with your name and arrival time and get 10% off food right away',
    pr1_s: 'Food only, excludes drinks · not combinable with other offers',
    pr2_k: 'Family set for 4–5', pr2: 'Riverside set ฿1,290, cheaper than ordering separately',
    pr2_p: 'River prawn tom yum, crispy sea bass with fish sauce, flash-fried morning glory, crab omelette, steamed rice and a jug of herbal drink',
    pr2_s: 'Available every day in every seating zone',
    ct_eyebrow: 'Events for 20–150 guests', ct_title: 'Company dinners, birthdays, engagements, client entertaining',
    ct_p: 'A 60-seat air-conditioned function room, or take over the whole riverside floor. We handle table setup, flowers and sound so you don’t have to. We also cater off-site in Nonthaburi and Bangkok.',
    ct1: 'Table set for 8 from ฿3,500 (8 dishes + dessert)', ct2: 'Book at least 7 days ahead, 30% deposit', ct3: 'Private pier, guests can arrive by boat',
    ct_cta: 'Talk to us about events on LINE',
    fq_eyebrow: 'FAQ', fq_title: 'Anything else you’d like to know before you come?',
    fq1: 'Do I need to book?', fq1_a1: 'On weekdays just walk in. On weekends and long holidays we recommend booking, especially for riverside tables. Message LINE', fq1_a2: 'or call', fq1_a3: 'with the date, time and party size. We confirm within 30 minutes during opening hours.',
    fq2: 'Is there parking?', fq2_a: 'Free parking for 50 cars in front. If it’s full, use the temple car park next door (2 minutes’ walk). Arriving by boat? Moor at our private pier.',
    fq3: 'Can I bring small children?', fq3_a: 'Of course. We have high chairs and an air-conditioned zone away from the water for families with little ones. Mild kids’ dishes such as omelette, fried rice and pad Thai are available at every table.',
    fq4: 'Do you cater events?', fq4_a: 'Yes, from 20 to 150 guests, in-house or off-site in Nonthaburi and Bangkok. Table sets for 8 start at ฿3,500. Please book at least 7 days ahead.',
    vs_eyebrow: 'Hours & location', vs_title: 'Find us at Nonthaburi Pier', vs_lede: 'Open every day except Songkran, 13–15 April. Last orders 30 minutes before closing.',
    vs_hours: 'Opening hours', vs_caption: 'Opening hours by day', day1: 'Monday', day2: 'Tuesday', day3: 'Wednesday', day4: 'Thursday', day5: 'Friday', day6: 'Saturday', day0: 'Sunday',
    vs_note: 'Public holidays follow weekend hours', vs_pay: 'Cash · PromptPay · credit cards (no minimum) · tax invoices available', map_title: 'Map to Krua Rim Nam',
    ad_title: 'Address', ad_addr: '88/12 Phibun Songkhram Road, Suan Yai, Mueang Nonthaburi, Nonthaburi 11000 (400 m past Nonthaburi Pier, in the lane beside the temple)',
    ad_maplink: 'Open in Google Maps', ad_park: 'Parking', ad_park_s: 'Free parking for 50 cars in front. Overflow parking at the temple next door, with staff to guide you',
    ad_train: 'By train', ad_train_s: 'MRT Purple Line to Yaek Nonthaburi 1, then a 5-minute motorbike taxi',
    ad_boat: 'By boat', ad_boat_s: 'Chao Phraya Express to Nonthaburi Pier (N30), then 5 minutes on foot, or moor your own boat at our pier',
    co_eyebrow: 'Book a table / contact', co_title: 'LINE is fastest, or just give us a call', co_lede: 'We reply within 30 minutes during opening hours, or the next morning after hours.',
    co_tel: 'Phone', co_fb: 'Krua Rim Nam Nonthaburi',
    co_note: 'Riverside tables seat up to 10 per booking. For larger groups we join tables together. Please arrive within 15 minutes of your booking time.',
    fo_title: 'Request a booking', fo_lede: 'We’ll message you back to confirm. Your table isn’t confirmed until you receive our reply.',
    fo_name: 'Your name', fo_name_ph: 'e.g. Somchai', fo_phone: 'Phone number', fo_phone_hint: 'e.g. 081-234-5678', fo_date: 'Date', fo_time: 'Time', fo_time_hint: 'Bookings until 21:00 (Mon–Thu) / 22:00 (Fri–Sun)', fo_guests: 'Guests', fo_zone: 'Seating zone',
    fo_zone1: 'Riverside (open air)', fo_zone2: 'Air-conditioned room', fo_zone3: 'Anywhere is fine',
    fo_note: 'Anything else? (optional)', fo_note_ph: 'e.g. one toddler, high chair please / birthday, cake please',
    fo_submit: 'Send booking request', fo_consent: 'By sending you agree to us storing your details to contact you, as described in our', fo_consent_link: 'privacy policy',
    fo_ok: 'Thank you! We’ve received your request and will message you to confirm within 30 minutes during opening hours.',
    fo_err: 'Sorry, something went wrong. Please message us on LINE ' + LINE + ' or call ' + TEL + '.',
    fo_invalid: 'Please fill in every required field.', fo_bad_phone: 'Please check the phone number, e.g. 081-234-5678', fo_bad_time: 'Please pick a time within opening hours, e.g. 18:00', fo_bad_date: 'Please pick a date from today onwards', fo_bad_guests: 'Guests: 1–150 (message us for larger groups)',
    ft_about: 'Thai riverside restaurant near Nonthaburi Pier, open since 2014. Grandma’s recipes with ingredients from Nonthaburi fish farms and orchards.',
    ft_addr: '88/12 Phibun Songkhram Rd, Suan Yai, Mueang Nonthaburi 11000', ft_maplink: 'Open map',
    ft_hours: 'Opening hours', ft_h1: 'Monday–Thursday 11:00–21:30', ft_h2: 'Friday 11:00–22:30', ft_h3: 'Saturday–Sunday 10:30–22:30',
    ft_contact: 'Contact', ft_links: 'Shortcuts', ft_faq: 'FAQ', ft_map: 'Map & parking', ft_privacy: 'Privacy policy',
    ft_copy: '© 2026 Krua Rim Nam, Nonthaburi', ft_demo: 'Demo website — a fictional business created to showcase web design',
    fab: 'Book', lb_aria: 'Enlarged photo', lb_prev: 'Previous photo', lb_next: 'Next photo', lb_close: 'Close',
    ck_aria: 'Cookie notice', ck_text: 'This website uses cookies to analyse traffic and improve our service. Details in our', ck_link: 'privacy policy', ck_no: 'Decline', ck_yes: 'Accept',
    h_today: 'Open today', h_open: 'Open now', h_before: 'Opens at', h_closed: 'Closed for today', h_kitchen: 'last orders'
  };

  var ex = window.KRN_EN || {}; for (var k in ex) EN[k] = ex[k]; // คำแปลเฉพาะหน้า privacy/404 ฝังในหน้านั้น
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var root = document.documentElement, lang = 'th', domLang = root.lang === 'en' ? 'en' : 'th';
  function setAttr(el, n, v) { if (el.getAttribute(n) !== v) el.setAttribute(n, v); }

  /* ---------- i18n (โหลดเป็นไทย = ไม่แตะ DOM) ---------- */
  function applyLang(next) {
    lang = next === 'en' ? 'en' : 'th';
    if (lang !== domLang) {
      $$('[data-i18n]').forEach(function (el) {
        var k = el.getAttribute('data-i18n');
        if (el.dataset.th === undefined) el.dataset.th = el.textContent;
        el.textContent = lang === 'en' && EN[k] !== undefined ? EN[k] : el.dataset.th;
      });
      [['data-i18n-ph', 'placeholder', 'thPh'], ['data-i18n-aria', 'aria-label', 'thAria'], ['data-i18n-title', 'title', 'thTitle']].forEach(function (d) {
        $$('[' + d[0] + ']').forEach(function (el) {
          var k = el.getAttribute(d[0]);
          if (el.dataset[d[2]] === undefined) el.dataset[d[2]] = el.getAttribute(d[1]) || '';
          el.setAttribute(d[1], lang === 'en' && EN[k] !== undefined ? EN[k] : el.dataset[d[2]]);
        });
      });
      root.lang = lang; domLang = lang;
      $$('.lang-switch button').forEach(function (b) { setAttr(b, 'aria-pressed', String(b.getAttribute('data-lang') === lang)); });
    }
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* private mode */ }
    renderHours();
    var tg = $('.nav-toggle'); if (tg) syncToggleLabel(tg);
  }
  function initialLang() {
    var q = new URLSearchParams(location.search).get('lang');
    if (q === 'en' || q === 'th') return q;
    try { var s = localStorage.getItem(LANG_KEY); if (s === 'en' || s === 'th') return s; } catch (e) { /* ignore */ }
    return 'th';
  }
  $$('.lang-switch button').forEach(function (b) {
    b.addEventListener('click', function () { applyLang(b.getAttribute('data-lang')); });
  });

  /* ---------- Header ---------- */
  var header = $('.site-header');
  function onScroll() { if (header) header.classList.toggle('is-scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  if (location.hash) window.addEventListener('load', onScroll);

  var toggle = $('.nav-toggle'), drawer = $('#mobile-nav');
  function syncToggleLabel(btn) {
    var open = btn.getAttribute('aria-expanded') === 'true';
    setAttr(btn, 'aria-label', open ? (lang === 'en' ? EN.nav_close : 'ปิดเมนู') : (lang === 'en' ? EN.nav_open : 'เปิดเมนู'));
  }
  function setDrawer(open) {
    if (!toggle || !drawer) return;
    toggle.setAttribute('aria-expanded', String(open));
    drawer.classList.toggle('is-open', open);
    syncToggleLabel(toggle);
  }
  if (toggle && drawer) {
    toggle.addEventListener('click', function () { setDrawer(toggle.getAttribute('aria-expanded') !== 'true'); });
    $$('a', drawer).forEach(function (a) { a.addEventListener('click', function () { setDrawer(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setDrawer(false); });
    document.addEventListener('click', function (e) { if (drawer.classList.contains('is-open') && !drawer.contains(e.target) && !toggle.contains(e.target)) setDrawer(false); });
  }

  var hasIO = 'IntersectionObserver' in window;
  /* active nav link */
  var navLinks = $$('.nav a[href^="#"]');
  if (navLinks.length && hasIO) {
    var map = {};
    navLinks.forEach(function (a) { var sec = $(a.getAttribute('href')); if (sec) map[sec.id] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { navLinks.forEach(function (a) { a.classList.remove('is-active'); }); if (map[en.target.id]) map[en.target.id].classList.add('is-active'); }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(map).forEach(function (id) { io.observe($('#' + id)); });
  }

  /* ปุ่ม LINE ลอย: โชว์เมื่อเลื่อนพ้น hero (หน้าที่ไม่มี hero โชว์ทันที) */
  var hero = $('.hero');
  if (hero && hasIO) {
    new IntersectionObserver(function (entries) {
      root.classList.toggle('past-hero', !entries[0].isIntersecting);
    }, { threshold: 0, rootMargin: '-56px 0px 0px 0px' }).observe(hero);
  } else root.classList.add('past-hero');

  /* ---------- เวลาเปิด-ปิดวันนี้ (เวลาไทย) ---------- */
  function bangkokNow() { // เวลาไทย = UTC+7 ไม่มี DST — คำนวณตรง ๆ (Intl.DateTimeFormat แบบ timeZone โหลดช้า ~15ms ตอนเปิดหน้า)
    var d = new Date(Date.now() + 7 * 3600000);
    return { day: d.getUTCDay(), min: d.getUTCHours() * 60 + d.getUTCMinutes(), iso: d.getUTCFullYear() + '-' + ('0' + (d.getUTCMonth() + 1)).slice(-2) + '-' + ('0' + d.getUTCDate()).slice(-2) };
  }
  function hhmm(m) { return ('0' + Math.floor(m / 60)).slice(-2) + ':' + ('0' + (m % 60)).slice(-2); }
  function renderHours() {
    var pill = $('#hours-pill'), today = $('#hours-today'), status = $('#hours-status');
    if (!pill || !today || !status) return;
    var now = bangkokNow(), h = HOURS[now.day], en = lang === 'en';
    today.textContent = (en ? EN.h_today : 'วันนี้เปิด') + ' ' + hhmm(h[0]) + '–' + hhmm(h[1]);
    var open = now.min >= h[0] && now.min < h[1];
    pill.classList.toggle('is-closed', !open);
    if (open) status.textContent = (en ? EN.h_open : 'เปิดอยู่') + ' · ' + (en ? EN.h_kitchen : 'ครัวปิดรับออเดอร์') + ' ' + hhmm(h[1] - 30);
    else if (now.min < h[0]) status.textContent = (en ? EN.h_before : 'จะเปิดเวลา') + ' ' + hhmm(h[0]);
    else status.textContent = en ? EN.h_closed : 'ปิดแล้ววันนี้';
    $$('#hours-table tr').forEach(function (tr) { tr.classList.toggle('is-today', parseInt(tr.getAttribute('data-day'), 10) === now.day); });
  }

  /* ---------- แท็บเมนู ---------- */
  var tabs = $$('[role="tab"]');
  if (tabs.length) {
    var selectTab = function (tab) {
      tabs.forEach(function (x) {
        var on = x === tab;
        x.setAttribute('aria-selected', String(on)); x.tabIndex = on ? 0 : -1;
        var panel = $('#' + x.getAttribute('aria-controls')); if (panel) panel.hidden = !on;
      });
    };
    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { selectTab(tab); });
      tab.addEventListener('keydown', function (e) {
        var n = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : null;
        if (n === null) return; e.preventDefault();
        var next = tabs[(n + tabs.length) % tabs.length]; selectTab(next); next.focus();
      });
    });
  }

  /* ---------- Lightbox ---------- */
  var lb = $('#lightbox'), lbImg = $('#lb-img'), lbCap = $('#lb-cap');
  var galButtons = $$('#gallery-grid button'), cur = 0;
  if (lb && lbImg && galButtons.length && typeof lb.showModal === 'function') {
    var show = function (i) {
      cur = (i + galButtons.length) % galButtons.length;
      var b = galButtons[cur], img = $('img', b), cap = $('span', b);
      lbImg.src = b.getAttribute('data-full'); lbImg.alt = img ? img.alt : '';
      lbCap.textContent = cap ? cap.textContent : '';
      [cur + 1, cur - 1].forEach(function (n) { var nb = galButtons[(n + galButtons.length) % galButtons.length]; new Image().src = nb.getAttribute('data-full'); });
    };
    galButtons.forEach(function (b, i) { b.addEventListener('click', function () { show(i); lb.showModal(); $('#lb-close').focus(); }); });
    $('#lb-prev').addEventListener('click', function () { show(cur - 1); });
    $('#lb-next').addEventListener('click', function () { show(cur + 1); });
    $('#lb-close').addEventListener('click', function () { lb.close(); });
    lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
    lb.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') show(cur + 1); if (e.key === 'ArrowLeft') show(cur - 1); });
    lb.addEventListener('close', function () { lbImg.src = ''; if (galButtons[cur]) galButtons[cur].focus(); });
    var sx = 0;
    lb.addEventListener('touchstart', function (e) { sx = e.changedTouches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) { var dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) show(dx < 0 ? cur + 1 : cur - 1); }, { passive: true });
  }

  /* ---------- Reveal on scroll (CSS ซ่อนเฉพาะเมื่อ html.js) ---------- */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var reveals = $$('.reveal');
  if (reveals.length) {
    if (reduce || !hasIO) reveals.forEach(function (el) { el.classList.add('in'); });
    else {
      var first = true; // callback แรก = โชว์ทันที
      var ro = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          if (first) en.target.style.transition = 'none';
          en.target.classList.add('in'); ro.unobserve(en.target);
        });
        if (first) { first = false; requestAnimationFrame(function () { requestAnimationFrame(function () { reveals.forEach(function (el) { el.style.transition = ''; }); }); }); }
      }, { rootMargin: '0px 0px -4% 0px', threshold: 0.05 });
      reveals.forEach(function (el) { ro.observe(el); });
    }
  }

  /* ---------- ฟอร์มจอง (Formspree ผ่าน fetch; ไม่มี JS = submit ปกติ + native validation) ---------- */
  var form = $('#booking-form'), statusBox = $('#form-status');
  if (form && statusBox && window.fetch) {
    form.noValidate = true;
    var dateInput = $('#f-date'), timeInput = $('#f-time');
    if (dateInput) {
      dateInput.min = bangkokNow().iso;
      var syncTime = function () { // ช่องเวลา = เปิด…ปิด-30 นาที ของวันที่เลือก
        if (!timeInput || !dateInput.value) return;
        var d = new Date(dateInput.value + 'T12:00:00'); if (isNaN(d)) return;
        var h = HOURS[d.getDay()]; timeInput.min = hhmm(h[0]); timeInput.max = hhmm(h[1] - 30);
      };
      dateInput.addEventListener('change', syncTime); syncTime();
    }
    var msgFor = function (el) {
      var v = el.validity, en = lang === 'en';
      if (v.valueMissing) return en ? EN.fo_invalid : 'กรุณากรอกข้อมูลที่จำเป็นให้ครบก่อนส่ง';
      if (el.id === 'f-phone') return en ? EN.fo_bad_phone : 'เบอร์โทรไม่ถูกต้อง ลองกรอกแบบนี้ 081-234-5678';
      if (el.id === 'f-time') return en ? EN.fo_bad_time : 'เลือกเวลาในช่วงที่ร้านเปิด เช่น 18:00 (' + el.min + '–' + el.max + ')';
      if (el.id === 'f-date') return en ? EN.fo_bad_date : 'เลือกวันที่ตั้งแต่วันนี้เป็นต้นไป';
      if (el.id === 'f-guests') return en ? EN.fo_bad_guests : 'จำนวนคน 1–150 ท่าน (มากกว่านี้ทัก LINE มาคุยได้)';
      return en ? EN.fo_invalid : 'กรุณาตรวจสอบข้อมูลอีกครั้ง';
    };
    $$('input,select,textarea', form).forEach(function (el) {
      el.addEventListener('input', function () { if (el.checkValidity()) el.removeAttribute('aria-invalid'); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      statusBox.className = 'form-status'; statusBox.textContent = '';
      if (!form.checkValidity()) {
        var bad = $(':invalid', form);
        $$(':invalid', form).forEach(function (el) { el.setAttribute('aria-invalid', 'true'); });
        statusBox.className = 'form-status err'; statusBox.textContent = msgFor(bad);
        if (bad) bad.focus(); return;
      }
      if ($('[name="_gotcha"]', form).value) return; // honeypot
      var btn = $('button[type="submit"]', form); btn.disabled = true;
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (r) { if (!r.ok) throw new Error(r.status); form.reset(); statusBox.className = 'form-status ok'; statusBox.textContent = lang === 'en' ? EN.fo_ok : 'ขอบคุณค่ะ ทางร้านได้รับคำขอแล้ว จะทักกลับเพื่อยืนยันโต๊ะภายใน 30 นาทีในเวลาทำการ'; })
        .catch(function () { statusBox.className = 'form-status err'; statusBox.innerHTML = lang === 'en' ? EN.fo_err : 'ขออภัย ส่งไม่สำเร็จ รบกวนทัก LINE ' + LINE + ' หรือโทร ' + TEL + ' แทนนะคะ'; })
        .then(function () { btn.disabled = false; statusBox.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'nearest' }); });
    });
  }

  /* ---------- แบนเนอร์คุกกี้ (เมื่อ COOKIE_BANNER = true) ---------- */
  var banner = $('#cookie-banner');
  if (banner && COOKIE_BANNER) {
    var answered = null; try { answered = localStorage.getItem('krn-cookie'); } catch (e) { /* ignore */ }
    if (!answered) banner.hidden = false;
    ['accept', 'decline'].forEach(function (v) {
      var b = $('#cookie-' + v); if (b) b.addEventListener('click', function () { try { localStorage.setItem('krn-cookie', v); } catch (e) { /* ignore */ } banner.hidden = true; });
    });
  }

  applyLang(initialLang());
  setInterval(renderHours, 60000);
  }
})();
