(function(){
  var LOGO = '<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="12.5" fill="none" stroke="currentColor" stroke-width="2.4"/><rect x="12.6" y="9.5" width="6.8" height="13" rx="2" fill="#FFC857"/><path d="M16 2v3M16 27v3M2 16h3M27 16h3" stroke="#FFC857" stroke-width="2.4" stroke-linecap="round"/></svg>';
  var LANGS = [['en','EN'],['uk','UA'],['de','DE'],['es','ES']];
  var D = window.I18N || {};
  var lang = 'en';
  try { lang = localStorage.getItem('ox-lang') || ''; } catch(e){}
  if (!lang) { var h = location.hash.replace('#',''); if (/^(uk|de|es|en)$/.test(h)) lang = h; }
  if (!D[lang] && lang !== 'en') lang = 'en';
  if (!lang) lang = 'en';

  function T(key){ var d = D[lang] || {}; if (d[key] != null) return d[key]; return (D.en||{})[key] != null ? D.en[key] : key; }
  window.T = T;

  var NAV = [
    ['product.html','nav.product'],['technology.html','nav.technology'],['pricing.html','nav.pricing'],['demo.html','nav.demo'],['trust.html','nav.trust'],['roadmap.html','nav.roadmap'],['about.html','nav.about']
  ];
  var here = (location.pathname.split('/').pop() || 'index.html'); if (!here) here = 'index.html';

  function header(){
    var links = NAV.map(function(l){ return '<a href="'+l[0]+'"'+(l[0]===here?' aria-current="page"':'')+' data-i18n="'+l[1]+'">'+T(l[1])+'</a>'; }).join('');
    var sel = '<div class="lang"><select id="lang-sel" aria-label="Language" data-i18n-aria="a11y.lang">'+LANGS.map(function(l){ return '<option value="'+l[0]+'"'+(l[0]===lang?' selected':'')+'>'+l[1]+'</option>'; }).join('')+'</select></div>';
    return '<div class="wrap"><a class="logo" href="index.html" aria-label="Oxlume home" data-i18n-aria="a11y.home">'+LOGO+'Oxlume</a>'+
      '<button class="nav-toggle" aria-expanded="false" aria-controls="mainnav" aria-label="Menu" data-i18n-aria="a11y.menu"><span></span><span></span><span></span></button>'+
      '<nav class="nav" id="mainnav" aria-label="Main" data-i18n-aria="a11y.main">'+links+sel+'<a class="btn btn-primary btn-sm" href="contact.html" data-i18n="nav.cta">'+T('nav.cta')+'</a></nav></div>';
  }
  function footer(){
    return '<div class="wrap"><div class="cols">'+
      '<div><a class="logo" href="index.html">'+LOGO+'Oxlume</a><p class="muted" style="margin-top:12px;max-width:36ch" data-i18n="footer.tag">'+T('footer.tag')+'</p><p class="mono muted" style="font-size:.8rem">hello@oxlume.com</p></div>'+
      '<div><h4 data-i18n="footer.product">'+T('footer.product')+'</h4><ul><li><a href="product.html" data-i18n="nav.product">'+T('nav.product')+'</a></li><li><a href="technology.html" data-i18n="nav.technology">'+T('nav.technology')+'</a></li><li><a href="pricing.html" data-i18n="nav.pricing">'+T('nav.pricing')+'</a></li><li><a href="demo.html" data-i18n="nav.demo">'+T('nav.demo')+'</a></li><li><a href="faq.html" data-i18n="nav.faq">'+T('nav.faq')+'</a></li></ul></div>'+
      '<div><h4 data-i18n="footer.company">'+T('footer.company')+'</h4><ul><li><a href="about.html" data-i18n="nav.about">'+T('nav.about')+'</a></li><li><a href="roadmap.html" data-i18n="nav.roadmap">'+T('nav.roadmap')+'</a></li><li><a href="trust.html" data-i18n="nav.trust">'+T('nav.trust')+'</a></li><li><a href="contact.html" data-i18n="nav.contact">'+T('nav.contact')+'</a></li></ul></div>'+
      '<div><h4 data-i18n="footer.legal">'+T('footer.legal')+'</h4><ul><li><a href="privacy.html" data-i18n="nav.privacy">'+T('nav.privacy')+'</a></li><li><a href="terms.html" data-i18n="nav.terms">'+T('nav.terms')+'</a></li></ul></div>'+
      '</div><div class="bottom"><span>© 2026 Oxlume · oxlume.com</span><span data-i18n="footer.ai">'+T('footer.ai')+'</span></div></div>';
  }
  var hd = document.getElementById('site-header'); if (hd) hd.innerHTML = header();
  var ft = document.getElementById('site-footer'); if (ft) ft.innerHTML = footer();

  /* i18n apply */
  function apply(){
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function(el){
      var k = el.getAttribute('data-i18n');
      var v = (D[lang]||{})[k], en = (D.en||{})[k];
      if (el.dataset.i18nOrig == null) el.dataset.i18nOrig = (en!=null ? en : el.innerHTML);
      el.innerHTML = (lang!=='en' && v!=null) ? v : el.dataset.i18nOrig;
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function(el){
      var k = el.getAttribute('data-i18n-ph');
      if (el.dataset.i18nOrig == null) el.dataset.i18nOrig = el.getAttribute('placeholder')||'';
      var v = (D[lang]||{})[k]; el.setAttribute('placeholder', (lang==='en'||v==null) ? el.dataset.i18nOrig : v);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function(el){
      var k = el.getAttribute('data-i18n-aria');
      if (el.dataset.ariaOrig == null) el.dataset.ariaOrig = el.getAttribute('aria-label')||'';
      var v = (D[lang]||{})[k]; el.setAttribute('aria-label', (lang==='en'||v==null) ? el.dataset.ariaOrig : v);
    });
    var t = document.querySelector('title');
    if (t){ if (t.dataset.orig==null) t.dataset.orig = t.textContent; var k = t.getAttribute('data-i18n'); var v = k && (D[lang]||{})[k]; t.textContent = (lang==='en'||!v) ? t.dataset.orig : v; }
    document.dispatchEvent(new CustomEvent('ox:lang',{detail:lang}));
  }
  apply();
  document.addEventListener('change', function(e){
    if (e.target && e.target.id === 'lang-sel'){
      lang = e.target.value; try { localStorage.setItem('ox-lang', lang); } catch(err){}
      apply();
    }
  });

  document.addEventListener('click', function(e){
    var t = e.target.closest('.nav-toggle');
    if (t){ var nav = document.getElementById('mainnav'); var open = nav.classList.toggle('open'); t.setAttribute('aria-expanded', open?'true':'false'); }
  });

  /* reveal */
  if ('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(es){ es.forEach(function(en){ if (en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } }); },{threshold:.12});
    document.querySelectorAll('.rv').forEach(function(el){ io.observe(el); });
  }

  /* hero canvas: lume field */
  var cv = document.getElementById('hero-canvas');
  if (cv && cv.getContext && !matchMedia('(prefers-reduced-motion: reduce)').matches){
    var ctx = cv.getContext('2d'), W, H, pts = [], dpr = Math.min(2, window.devicePixelRatio||1);
    function size(){ var r = cv.parentElement.getBoundingClientRect(); W = r.width; H = r.height; cv.width = W*dpr; cv.height = H*dpr; ctx.setTransform(dpr,0,0,dpr,0,0); }
    size(); window.addEventListener('resize', size);
    for (var i=0;i<70;i++) pts.push({x:Math.random(),y:Math.random(),vx:(Math.random()-.5)*.0006,vy:(Math.random()-.5)*.0006,r:Math.random()*1.6+.6,p:Math.random()*6.28});
    var dark = true;
    function isDark(){ var th = document.documentElement.getAttribute('data-theme'); if (th) return th==='dark'; return matchMedia('(prefers-color-scheme: dark)').matches; }
    var t0 = performance.now();
    function frame(now){
      dark = isDark(); ctx.clearRect(0,0,W,H);
      var t = (now-t0)/1000;
      for (var i=0;i<pts.length;i++){ var p = pts[i]; p.x+=p.vx; p.y+=p.vy; if(p.x<0||p.x>1)p.vx*=-1; if(p.y<0||p.y>1)p.vy*=-1; }
      ctx.lineWidth = 1;
      for (var a=0;a<pts.length;a++) for (var b=a+1;b<pts.length;b++){
        var dx=(pts[a].x-pts[b].x)*W, dy=(pts[a].y-pts[b].y)*H, d=Math.sqrt(dx*dx+dy*dy);
        if (d<140){ ctx.strokeStyle = (dark?'rgba(43,217,200,':'rgba(14,143,132,')+(0.18*(1-d/140))+')'; ctx.beginPath(); ctx.moveTo(pts[a].x*W,pts[a].y*H); ctx.lineTo(pts[b].x*W,pts[b].y*H); ctx.stroke(); }
      }
      for (var i=0;i<pts.length;i++){ var p=pts[i]; var g = .5+.5*Math.sin(t*1.3+p.p); ctx.fillStyle = (i%9===0) ? 'rgba(255,200,87,'+(0.5+0.5*g)+')' : (dark?'rgba(43,217,200,':'rgba(14,143,132,')+(0.35+0.5*g)+')'; ctx.beginPath(); ctx.arc(p.x*W,p.y*H,p.r*(i%9===0?1.6:1),0,6.28); ctx.fill(); }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* phone reels */
  function bindReels(){
    document.querySelectorAll('[data-captions]').forEach(function(reel){
      if (reel._bound) return; reel._bound = true;
      var el = reel.querySelector('.cap'); if (!el) return;
      var i = 0;
      function caps(){ var k = reel.getAttribute('data-captions'); var v = (D[lang]||{})[k] || (D.en||{})[k]; if (v) return v; try { return JSON.parse(k); } catch(e){ return []; } }
      function show(){ var c = caps(); if(!c.length) return; i = i % c.length; el.innerHTML = '<small>'+c[i][0]+'</small>'+c[i][1]; i++; }
      var slidesAttr = reel.getAttribute('data-slides');
      var slides = [], si = 0, reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (slidesAttr){
        var list = slidesAttr.split(',');
        var wrap = document.createElement('div'); wrap.className = 'slides';
        list.forEach(function(src, n){ var d = document.createElement('div'); d.className = 'slide'+(n===0?' on':''); d.style.backgroundImage = 'url('+src+')'; wrap.appendChild(d); slides.push(d); });
        reel.insertBefore(wrap, reel.firstChild);
        var sc = document.createElement('div'); sc.className = 'scrim'; reel.insertBefore(sc, wrap.nextSibling);
        var pi = reel.querySelector('.progress i'); if (pi) pi.style.animationDuration = (list.length*3)+'s';
      }
      show();
      document.addEventListener('ox:lang', function(){ i=Math.max(0,i-1); show(); });
      if (!reduce){
        if (slides.length){
          setInterval(function(){ slides[si].classList.remove('on'); si = (si+1)%slides.length; slides[si].classList.add('on'); i = si; show(); }, 3000);
        } else setInterval(show, 6000);
      }
    });
  }
  bindReels();
  document.querySelectorAll('.phone .approve').forEach(function(box){
    box.addEventListener('click', function(e){
      var b = e.target.closest('button'); if (!b) return;
      var handle = box.getAttribute('data-handle') || '@your_business';
      if (b.classList.contains('yes')) box.innerHTML = '<div class="done">'+T('demo.published').replace('{h}',handle)+' · '+timeLabel()+'</div>';
      else box.innerHTML = '<div class="done" style="background:#2C2A14;color:#F3DC9A">'+T('demo.revise')+'</div>';
    });
  });
  function timeLabel(){ var d=new Date(); return ('0'+d.getHours()).slice(-2)+':'+('0'+d.getMinutes()).slice(-2); }

  /* forms: no backend yet, so the request is handed to the visitor's email app, addressed to hello@oxlume.com */
  document.querySelectorAll('form.lead-form').forEach(function(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var name = (form.querySelector('[name=business]')||form.querySelector('[name=name]')||{}).value || '';
      var lines = []; Array.prototype.forEach.call(form.elements, function(el){
        if (!el.name || el.type==='submit' || el.type==='button' || el.type==='checkbox' && !el.checked) return;
        var v = (el.value||'').trim(); if (v) lines.push(el.name + ': ' + v);
      });
      var out = form.querySelector('.form-result') || document.createElement('div');
      out.className = 'notice ok form-result'; out.textContent = T('form.ok').replace('{n}', name || T('form.you'));
      form.appendChild(out); form.querySelector('button[type=submit]').disabled = true;
      var href = 'mailto:hello@oxlume.com?subject=' + encodeURIComponent('Oxlume beta request' + (name ? ': ' + name : '')) + '&body=' + encodeURIComponent(lines.join('\n'));
      setTimeout(function(){ window.location.href = href; }, 400);
    });
  });
  document.querySelectorAll('.chips').forEach(function(g){
    g.addEventListener('click', function(e){ var c = e.target.closest('.chip'); if(!c) return; g.querySelectorAll('.chip').forEach(function(x){ x.setAttribute('aria-pressed','false'); }); c.setAttribute('aria-pressed','true'); var inp = g.parentElement.querySelector('input[type=hidden]'); if (inp) inp.value = c.getAttribute('data-v')||c.textContent; });
  });

  /* copy */
  document.querySelectorAll('[data-copy]').forEach(function(b){
    b.addEventListener('click', function(){
      var v = b.getAttribute('data-copy'); var done=function(){ b.textContent=T('copy.done'); setTimeout(function(){ b.textContent=T('copy.btn'); },1800); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(v).then(done).catch(function(){ fallback(v); done(); }); else { fallback(v); done(); }
    });
  });
  function fallback(v){ var t=document.createElement('textarea'); t.value=v; document.body.appendChild(t); t.select(); try{document.execCommand('copy');}catch(e){} document.body.removeChild(t); }

  /* money / units per language */
  var LOC = {en:'en-GB',uk:'uk-UA',de:'de-DE',es:'es-ES'};
  function eur(n){ var s; try { s = new Intl.NumberFormat(LOC[lang]||'en-GB',{maximumFractionDigits:0}).format(n); } catch(e){ s = String(n); } return lang==='en' ? '€'+s : s+'\u00a0€'; }

  function paintEur(){ document.querySelectorAll('[data-eur]').forEach(function(el){ var p = el.getAttribute('data-eur').split('-'); if (p.length===1){ el.textContent = eur(+p[0]); return; } var f = function(n){ try { return new Intl.NumberFormat(LOC[lang]||'en-GB').format(n); } catch(e){ return n; } }; el.textContent = lang==='en' ? '€'+f(+p[0])+'–'+f(+p[1]) : f(+p[0])+'–'+f(+p[1])+'\u00a0€'; }); }
  document.addEventListener('ox:lang', paintEur); paintEur();
  function paintNum(){ document.querySelectorAll('[data-num]').forEach(function(el){ try { el.textContent = new Intl.NumberFormat(LOC[lang]||'en-GB',{useGrouping:true}).format(+el.getAttribute('data-num')); } catch(e){} }); }
  document.addEventListener('ox:lang', paintNum); paintNum();

  /* pricing toggle */
  var tg = document.getElementById('bill-toggle');
  if (tg){
    var yearly = false;
    var paintPrices = function(){
      document.querySelectorAll('[data-month]').forEach(function(p){ p.querySelector('.v').textContent = eur(+(yearly ? p.getAttribute('data-year') : p.getAttribute('data-month'))); });
      document.querySelectorAll('.per').forEach(function(s){ s.textContent = yearly ? T('price.perYear') : T('price.perMonth'); });
    };
    tg.addEventListener('click', function(e){
      var b = e.target.closest('button'); if(!b) return;
      tg.querySelectorAll('button').forEach(function(x){ x.setAttribute('aria-pressed','false'); }); b.setAttribute('aria-pressed','true');
      yearly = b.getAttribute('data-period')==='year'; paintPrices();
    });
    document.addEventListener('ox:lang', paintPrices); paintPrices();
  }

  /* savings calc */
  var calc = document.getElementById('calc');
  if (calc){
    var upd = function(){
      var cur = parseFloat(calc.querySelector('[name=current]').value)||0, hours = parseFloat(calc.querySelector('[name=hours]').value)||0;
      var ox = 79, rate = 20; var sm = Math.max(0,cur-ox), st = Math.max(0,hours*4.3-0.5);
      document.querySelector('[data-out=money]').textContent = eur(sm);
      document.querySelector('[data-out=time]').textContent = st.toFixed(0)+' '+T('unit.h');
      document.querySelector('[data-out=total]').textContent = eur(Math.round(sm*12+st*12*rate));
    };
    calc.addEventListener('input', upd); document.addEventListener('ox:lang', upd); upd();
  }

  /* live demo */
  var demo = document.getElementById('live-demo');
  if (demo){
    var type = 'cafe', sel = {};
    var typeSel = demo.querySelector('#demo-type'); var thumbs = demo.querySelector('.thumbs'); var log = demo.querySelector('.log'); var out = demo.querySelector('.out'); var run = demo.querySelector('#demo-run');
    var PH = {cafe:['#f0a35e','#6b3b1c','#e8d3b0','#3a2412'],salon:['#d9a4c2','#3a2238','#f1e4ec','#7a4e6b'],shop:['#9bd2c9','#1a3a3a','#e2f2ef','#4d7a74'],gym:['#7aa0ff','#1a2347','#d6e0ff','#3b4a8a']};
    function renderThumbs(){ var c = PH[type]; thumbs.innerHTML = c.map(function(col,i){ return '<button type="button" class="thumb" aria-pressed="true" data-i="'+i+'" style="background:url(img/'+type+'-'+(i+1)+'.jpg) center/cover no-repeat,linear-gradient(145deg,'+col+','+c[(i+1)%4]+')"><i>IMG_'+(1021+i*7)+'</i></button>'; }).join(''); sel={0:1,1:1,2:1,3:1}; }
    renderThumbs();
    if (typeSel) typeSel.addEventListener('change', function(){ type = typeSel.value; renderThumbs(); out.innerHTML=''; log.innerHTML=''; });
    thumbs.addEventListener('click', function(e){ var b=e.target.closest('.thumb'); if(!b) return; var on = b.getAttribute('aria-pressed')!=='true'; b.setAttribute('aria-pressed',on?'true':'false'); sel[b.getAttribute('data-i')] = on?1:0; });
    run.addEventListener('click', function(){
      var n = Object.keys(sel).filter(function(k){return sel[k];}).length; if (!n) n = 1;
      var lines = [T('demo.l1').replace('{n}',n), T('demo.l2'), T('demo.l3'), T('demo.l4'), T('demo.l5'), T('demo.l6')];
      log.innerHTML = lines.map(function(l){ return '<div class="l">'+l+'</div>'; }).join(''); out.innerHTML=''; run.disabled = true;
      var ls = log.querySelectorAll('.l'); var i=0;
      (function step(){ if (i>0) { ls[i-1].classList.remove('on'); ls[i-1].classList.add('ok'); } if (i<ls.length){ ls[i].classList.add('on'); i++; setTimeout(step, 550+Math.random()*350); } else { showPlan(); run.disabled=false; } })();
    });
    document.addEventListener('ox:lang', function(){ if (out.innerHTML) showPlan(true); if (log.innerHTML && !run.disabled){ var n = Object.keys(sel).filter(function(k){return sel[k];}).length||1; var ls=[T('demo.l1').replace('{n}',n), T('demo.l2'), T('demo.l3'), T('demo.l4'), T('demo.l5'), T('demo.l6')]; log.innerHTML = ls.map(function(l){ return '<div class="l ok">'+l+'</div>'; }).join(''); } });
    function showPlan(quiet){
      var plan = (D[lang]||{})['plan.'+type] || (D.en||{})['plan.'+type] || [];
      var name = (demo.querySelector('#demo-name')||{}).value || T('demo.yourBiz');
      out.innerHTML = '<p class="eyebrow lume" style="margin:0">'+T('demo.planFor')+' '+esc(name)+'</p>'+plan.map(function(p){ return '<div class="item rv in"><b class="day">'+p[0]+'</b><div><div class="kind">'+p[1]+'</div>'+esc(p[2])+'</div></div>'; }).join('')+'<p class="muted" style="font-size:.85rem;margin:4px 0 0">'+T('demo.note')+'</p>';
      if (!quiet) out.scrollIntoView({behavior:'smooth',block:'nearest'});
    }
  }
  function esc(s){ return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }

  /* roadmap votes (per-viewer only) */
  var vote = document.getElementById('vote');
  if (vote){
    var counts = {}; try { counts = JSON.parse(localStorage.getItem('ox-votes')||'{}'); } catch(e){}
    var base = {a:128,b:96,c:74,d:51};
    function paint(){ var tot=0; Object.keys(base).forEach(function(k){ tot += base[k]+(counts[k]||0); }); vote.querySelectorAll('.row').forEach(function(r){ var k=r.getAttribute('data-k'); var v=base[k]+(counts[k]||0); r.querySelector('.n').textContent=v; r.querySelector('.bar i').style.width=Math.round(100*v/tot*1.6)+'%'; r.querySelector('button').disabled=!!counts[k]; }); }
    vote.addEventListener('click', function(e){ var b=e.target.closest('button'); if(!b) return; var k=b.closest('.row').getAttribute('data-k'); counts[k]=1; try{ localStorage.setItem('ox-votes',JSON.stringify(counts)); }catch(err){} paint(); });
    paint();
  }
})();
