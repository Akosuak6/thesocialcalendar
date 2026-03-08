import { useState, useRef, useEffect } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Cormorant+SC:wght@300;400;500&family=Jost:wght@200;300;400;500&display=swap');`;

const CSS = `
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0b1220;--surface:#0e1828;--card:#121f32;--card2:#16263d;
  --border:rgba(255,255,255,0.07);--border2:rgba(255,255,255,0.13);
  --gold:#b8956a;--gold-dim:rgba(184,149,106,0.1);--gold-glow:rgba(184,149,106,0.05);
  --red:#c0392b;--red-dim:rgba(192,57,43,0.12);
  --amber:#c9963a;--amber-dim:rgba(201,150,58,0.12);
  --sage:#5a8f75;--sage-dim:rgba(90,143,117,0.12);
  --blue:#4a7fa5;--blue-dim:rgba(74,127,165,0.12);
  --text:#d4dde8;--text2:#7a92a8;--text3:#3e5568;--white:#edf2f7;
  --serif:'Cormorant Garamond',serif;--sc:'Cormorant SC',serif;--sans:'Jost',sans-serif;
  --sidebar-w:220px;
}
body{font-family:var(--sans);background:var(--bg);color:var(--text);font-weight:300}
::selection{background:var(--gold-dim);color:var(--gold)}
::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:var(--bg)}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.08)}

/* ── NAV ── */
.nav{display:flex;align-items:center;justify-content:space-between;padding:0 1.5rem 0 0;height:60px;border-bottom:1px solid var(--border);background:rgba(11,18,32,0.97);backdrop-filter:blur(20px);position:sticky;top:0;z-index:200}
.nav-left{display:flex;align-items:center;height:100%}
.sidebar-toggle{width:60px;height:60px;display:flex;align-items:center;justify-content:center;background:none;border:none;border-right:1px solid var(--border);cursor:pointer;color:var(--text3);font-size:1rem;transition:all 0.2s;flex-shrink:0}
.sidebar-toggle:hover{color:var(--gold);background:var(--gold-glow)}
.logo{cursor:default;display:flex;align-items:center;height:60px;padding:0 1.5rem;border-right:1px solid var(--border)}
.logo-tsc{display:flex;align-items:center;white-space:nowrap}
.logo-letter{font-family:var(--sc);font-size:1.6rem;color:var(--white);font-weight:400;display:inline-block;transition:letter-spacing 0.6s cubic-bezier(0.4,0,0.2,1);letter-spacing:0.05em}
.logo-word{font-family:var(--sc);font-size:0.82rem;font-weight:300;max-width:0;overflow:hidden;opacity:0;white-space:nowrap;display:inline-block;transition:max-width 0.6s cubic-bezier(0.4,0,0.2,1),opacity 0.35s ease 0.2s;vertical-align:baseline;line-height:1}
.logo:hover .logo-word{max-width:100px;opacity:1}
.logo:hover .logo-letter{letter-spacing:0.28em}
.nav-tabs{display:flex;gap:0;height:60px;margin-left:0.5rem}
.ntab{background:none;border:none;color:var(--text3);font-family:var(--sc);font-size:0.72rem;letter-spacing:0.18em;padding:0 1.2rem;height:60px;cursor:pointer;border-bottom:2px solid transparent;transition:all 0.2s;font-weight:300;white-space:nowrap;margin-bottom:-1px}
.ntab:hover{color:var(--text2)}
.ntab.on{color:var(--white);border-bottom-color:var(--gold)}
.nav-right{display:flex;gap:0.5rem;align-items:center}
.nbtn{background:none;border:1px solid var(--border2);color:var(--text2);font-family:var(--sans);font-size:0.6rem;letter-spacing:0.15em;text-transform:uppercase;padding:0.38rem 0.9rem;cursor:pointer;transition:all 0.2s;font-weight:400}
.nbtn:hover{border-color:var(--gold);color:var(--gold)}
.nbtn.primary{background:var(--white);color:var(--bg);border-color:var(--white);font-weight:500}
.nbtn.primary:hover{background:var(--text);color:var(--bg)}

/* ── APP SHELL ── */
.app-shell{display:flex;min-height:calc(100vh - 60px)}
.sidebar{width:var(--sidebar-w);border-right:1px solid var(--border);background:var(--surface);flex-shrink:0;transition:width 0.3s cubic-bezier(0.4,0,0.2,1),opacity 0.25s;overflow:hidden;position:sticky;top:60px;height:calc(100vh - 60px);overflow-y:auto}
.sidebar.collapsed{width:0;opacity:0;border-right:none}
.sidebar-inner{width:var(--sidebar-w);padding:1.5rem 0}
.sidebar-trip-name{padding:0 1.25rem 1.25rem;border-bottom:1px solid var(--border);margin-bottom:0.75rem}
.sidebar-dest{font-family:var(--serif);font-size:1.4rem;color:var(--white);font-weight:300;font-style:italic;line-height:1}
.sidebar-dates{font-family:var(--sans);font-size:0.58rem;color:var(--text3);letter-spacing:0.1em;margin-top:0.35rem;font-weight:300}
.snav{padding:0.5rem 0}
.snav-item{display:flex;align-items:center;gap:0.65rem;padding:0.6rem 1.25rem;font-family:var(--sans);font-size:0.62rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--text3);cursor:pointer;border-left:2px solid transparent;transition:all 0.2s;font-weight:400;white-space:nowrap}
.snav-item:hover{color:var(--text2);background:var(--gold-glow)}
.snav-item.on{color:var(--white);border-left-color:var(--gold);background:var(--gold-glow)}
.snav-icon{font-size:0.85rem;width:16px;text-align:center;flex-shrink:0}
.main-content{flex:1;min-width:0;overflow-x:hidden}

/* ── DASHBOARD ── */
.dash{max-width:1200px;margin:0 auto;padding:3rem 2.5rem}
.dash-hero{display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:end;padding-bottom:3rem;border-bottom:1px solid var(--border);margin-bottom:3rem}
.dash-eyebrow{font-family:var(--sans);font-size:0.58rem;letter-spacing:0.35em;color:var(--gold);text-transform:uppercase;margin-bottom:1rem;font-weight:400}
.dash-title{font-family:var(--serif);font-size:clamp(2.5rem,5vw,4.5rem);line-height:0.92;color:var(--white);font-weight:300}
.dash-title em{font-style:italic;color:var(--gold)}
.dash-rule{width:50px;height:1px;background:var(--gold);margin:1.5rem 0;opacity:0.5}
.dash-sub{font-size:0.78rem;color:var(--text2);letter-spacing:0.1em;text-transform:uppercase;font-weight:300;line-height:1.9}
.stats-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--border)}
.stat-box{background:var(--card);padding:1.5rem;display:flex;flex-direction:column;gap:0.3rem}
.stat-n{font-family:var(--serif);font-size:3rem;color:var(--white);line-height:1;font-weight:300}
.stat-l{font-family:var(--sans);font-size:0.56rem;letter-spacing:0.22em;text-transform:uppercase;color:var(--text3);font-weight:400}
.trips-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1px;background:var(--border)}
.trip-tile{background:var(--card);cursor:pointer;transition:all 0.2s;position:relative;overflow:hidden}
.trip-tile::after{content:'';position:absolute;bottom:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--gold),transparent);opacity:0;transition:opacity 0.3s}
.trip-tile:hover::after{opacity:0.7}
.trip-tile:hover{background:var(--card2)}
.tile-top{padding:1.5rem 1.5rem 1rem;border-bottom:1px solid var(--border)}
.tile-dest{font-family:var(--serif);font-size:2rem;color:var(--white);line-height:1;font-weight:300}
.tile-country{font-family:var(--sans);font-size:0.56rem;color:var(--gold);letter-spacing:0.22em;text-transform:uppercase;margin-top:0.3rem;font-weight:400}
.tile-dates{font-family:var(--sans);font-size:0.65rem;color:var(--text3);margin-top:0.45rem;letter-spacing:0.05em;font-weight:300}
.tile-bot{padding:1rem 1.5rem 1.25rem;display:flex;justify-content:space-between;align-items:flex-end}
.tile-stat{display:flex;flex-direction:column;gap:0.2rem}
.tile-stat-n{font-family:var(--serif);font-size:1.3rem;color:var(--text);font-weight:300}
.tile-stat-l{font-family:var(--sans);font-size:0.5rem;color:var(--text3);letter-spacing:0.18em;text-transform:uppercase;font-weight:400}
.status-tag{font-family:var(--sans);font-size:0.5rem;letter-spacing:0.18em;text-transform:uppercase;padding:0.2rem 0.5rem;font-weight:400}
.st-upcoming{background:var(--gold-dim);color:var(--gold);border:1px solid rgba(184,149,106,0.25)}
.st-past{background:rgba(107,127,142,0.06);color:var(--text3);border:1px solid var(--border)}
.st-planning{background:var(--sage-dim);color:var(--sage);border:1px solid rgba(90,143,117,0.25)}

/* ── TAB CONTENT ── */
.tab-pad{padding:2rem 2.5rem 3rem}
.sh{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.75rem}
.sh-title{font-family:var(--sc);font-size:0.95rem;letter-spacing:0.25em;color:var(--white);font-weight:300}
.sh-line{flex:1;height:1px;background:var(--border);margin:0 1.5rem}
.sh-btn{background:none;border:1px solid var(--border2);color:var(--text2);font-family:var(--sans);font-size:0.58rem;letter-spacing:0.16em;text-transform:uppercase;padding:0.35rem 0.8rem;cursor:pointer;transition:all 0.2s;white-space:nowrap;font-weight:400}
.sh-btn:hover{border-color:var(--gold);color:var(--gold)}
.empty{text-align:center;padding:3rem 2rem;border:1px solid var(--border)}
.empty-icon{font-size:2rem;opacity:0.15;margin-bottom:0.75rem}
.empty-text{font-family:var(--sans);font-size:0.62rem;color:var(--text3);letter-spacing:0.15em;font-weight:300}

/* ── BOOKINGS ── */
.bk-list{display:flex;flex-direction:column;gap:1px;background:var(--border)}
.bk-card{background:var(--card);padding:1rem 1.35rem;display:flex;align-items:flex-start;gap:1rem;transition:background 0.2s}
.bk-card:hover{background:var(--card2)}
.bk-icon{font-size:1.2rem;min-width:24px;padding-top:0.15rem;opacity:0.8}
.bk-body{flex:1}
.bk-type{font-family:var(--sans);font-size:0.52rem;letter-spacing:0.22em;color:var(--gold);text-transform:uppercase;margin-bottom:0.25rem;font-weight:400}
.bk-title{font-family:var(--serif);font-size:1.05rem;color:var(--white);font-weight:400;margin-bottom:0.2rem}
.bk-detail{font-family:var(--sans);font-size:0.7rem;color:var(--text2);line-height:1.7;font-weight:300}
.bk-date{font-family:var(--sans);font-size:0.6rem;color:var(--gold);margin-top:0.3rem;letter-spacing:0.08em}
.del-btn{background:none;border:none;color:var(--text3);cursor:pointer;font-size:0.8rem;padding:0.2rem;transition:color 0.15s;flex-shrink:0}
.del-btn:hover{color:var(--red)}

/* ── SMART PANEL ── */
.smart-panel{background:var(--card);border:1px solid var(--border);border-top:1px solid var(--gold);padding:1.5rem;margin-bottom:2rem}
.smart-header{display:flex;align-items:center;gap:0.7rem;margin-bottom:1.25rem}
.smart-badge{font-family:var(--sans);font-size:0.52rem;letter-spacing:0.22em;background:var(--gold-dim);color:var(--gold);border:1px solid rgba(184,149,106,0.25);padding:0.18rem 0.55rem;font-weight:500}
.smart-title{font-family:var(--sc);font-size:0.78rem;color:var(--white);letter-spacing:0.18em;font-weight:300}
.smart-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1px;background:var(--border)}
.smart-card{background:var(--surface);padding:1rem 1.1rem}
.sc-label{font-family:var(--sans);font-size:0.52rem;letter-spacing:0.18em;text-transform:uppercase;color:var(--text3);margin-bottom:0.35rem;font-weight:400}
.sc-value{font-size:0.82rem;color:var(--text);line-height:1.6;font-weight:300}
.sc-saving{font-family:var(--sans);font-size:0.7rem;color:var(--sage);margin-top:0.35rem;font-weight:400}
.loading-shimmer{height:1px;background:linear-gradient(90deg,transparent,var(--gold),transparent);background-size:200%;animation:shimmer 2s infinite;opacity:0.5;margin-bottom:1rem}
@keyframes shimmer{0%{background-position:200%}100%{background-position:-200%}}

/* ── ITINERARY ── */
.day-block{margin-bottom:2.5rem}
.day-label{display:flex;align-items:center;gap:1rem;margin-bottom:0.85rem}
.day-num{font-family:var(--serif);font-size:3.5rem;color:rgba(255,255,255,0.05);line-height:1;min-width:3rem;font-weight:300;font-style:italic}
.day-name{font-family:var(--sc);font-size:0.78rem;letter-spacing:0.2em;color:var(--text);font-weight:400}
.day-date-sub{font-family:var(--sans);font-size:0.58rem;color:var(--text3);font-weight:300;letter-spacing:0.06em;margin-top:0.12rem}
.day-add{background:none;border:1px solid var(--border);color:var(--text3);font-family:var(--sans);font-size:0.55rem;letter-spacing:0.14em;text-transform:uppercase;padding:0.28rem 0.65rem;cursor:pointer;transition:all 0.2s;margin-left:auto;font-weight:400;white-space:nowrap}
.day-add:hover{border-color:var(--gold);color:var(--gold)}
.day-items{display:flex;flex-direction:column;gap:2px;margin-left:4.5rem}

/* agenda item with expand */
.agenda-item{background:var(--card);border:1px solid var(--border);border-left:2px solid var(--gold);transition:all 0.2s}
.agenda-row{padding:0.75rem 1rem;display:flex;align-items:center;gap:0.75rem;cursor:grab}
.agenda-row:active{cursor:grabbing}
.ai-time{font-family:var(--sans);font-size:0.66rem;color:var(--gold);min-width:40px;font-weight:400}
.ai-icon{font-size:0.85rem;opacity:0.8}
.ai-text{flex:1;font-size:0.82rem;color:var(--text);font-weight:300}
.ai-cost{font-family:var(--sans);font-size:0.65rem;color:var(--amber);background:var(--amber-dim);padding:0.12rem 0.4rem;font-weight:400;white-space:nowrap}
.ai-transport{font-family:var(--sans);font-size:0.58rem;color:var(--text3);background:var(--surface);padding:0.1rem 0.35rem;white-space:nowrap}
.drag-handle{color:var(--text3);font-size:0.65rem;cursor:grab;padding:0 0.15rem;opacity:0.35}
.ticket-toggle{background:none;border:none;color:var(--text3);font-size:0.6rem;cursor:pointer;padding:0.15rem 0.4rem;transition:all 0.2s;font-family:var(--sans);letter-spacing:0.08em;white-space:nowrap;border:1px solid var(--border);margin-left:0.25rem}
.ticket-toggle:hover{border-color:var(--gold);color:var(--gold)}
.ticket-toggle.has-ticket{color:var(--sage);border-color:rgba(90,143,117,0.4);background:var(--sage-dim)}
.agenda-ticket{border-top:1px solid var(--border);padding:0.85rem 1rem;background:var(--surface)}
.ticket-area{width:100%;background:var(--card);border:1px solid var(--border);color:var(--text);font-family:var(--sans);font-size:0.75rem;line-height:1.7;padding:0.65rem 0.85rem;resize:none;outline:none;min-height:60px;font-weight:300;transition:border-color 0.2s}
.ticket-area:focus{border-color:rgba(184,149,106,0.4)}
.ticket-area::placeholder{color:var(--text3);font-style:italic}
.ticket-img-strip{display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:0.5rem}
.ticket-img{width:80px;height:60px;object-fit:cover;border:1px solid var(--border);cursor:pointer;transition:opacity 0.2s}
.ticket-img:hover{opacity:0.8}
.ticket-add-img{width:80px;height:60px;border:1px dashed var(--border2);display:flex;align-items:center;justify-content:center;font-size:1.2rem;cursor:pointer;color:var(--text3);transition:all 0.2s;opacity:0.5}
.ticket-add-img:hover{border-color:var(--gold);opacity:1;color:var(--gold)}

.ai-panel{background:var(--card);border:1px solid var(--border);border-top:1px solid var(--gold);padding:1.25rem;margin-bottom:1.75rem}
.ai-panel-header{display:flex;align-items:center;gap:0.6rem;margin-bottom:1rem}
.ai-badge{font-family:var(--sans);font-size:0.52rem;letter-spacing:0.22em;background:var(--gold-dim);color:var(--gold);border:1px solid rgba(184,149,106,0.25);padding:0.18rem 0.5rem;font-weight:500}
.ai-panel-title{font-family:var(--sans);font-size:0.65rem;color:var(--text);letter-spacing:0.1em;font-weight:300}
.suggestion-list{display:flex;flex-direction:column;gap:0.4rem}
.suggestion{background:var(--surface);border:1px solid var(--border);padding:0.8rem 1rem;display:flex;align-items:flex-start;gap:0.75rem;font-size:0.8rem;color:var(--text2);line-height:1.6;font-weight:300}
.sug-add{background:none;border:1px solid var(--border2);color:var(--text2);font-family:var(--sans);font-size:0.55rem;letter-spacing:0.14em;text-transform:uppercase;padding:0.2rem 0.55rem;cursor:pointer;white-space:nowrap;transition:all 0.2s;margin-left:auto;font-weight:400}
.sug-add:hover{border-color:var(--gold);color:var(--gold)}

/* ── DAY WALLET ── */
.wallet-bar{background:var(--surface);border:1px solid var(--border);border-left:2px solid var(--amber);padding:1rem 1.25rem;margin-bottom:2rem;cursor:pointer;display:flex;align-items:center;justify-content:space-between;transition:background 0.2s}
.wallet-bar:hover{background:var(--card)}
.wallet-bar-title{font-family:var(--sc);font-size:0.78rem;letter-spacing:0.18em;color:var(--amber);font-weight:300}
.wallet-bar-sub{font-family:var(--sans);font-size:0.6rem;color:var(--text3);margin-top:0.2rem;font-weight:300}
.wallet-panel{background:var(--surface);border:1px solid var(--border);border-top:none;padding:1.25rem;margin-top:-2rem;margin-bottom:2rem}
.wallet-empty{font-family:var(--sans);font-size:0.65rem;color:var(--text3);text-align:center;padding:1.5rem;letter-spacing:0.1em}
.wallet-card{background:var(--card);border:1px solid var(--border);border-left:2px solid var(--amber);padding:0.85rem 1rem;margin-bottom:0.5rem;display:grid;grid-template-columns:auto 1fr auto;gap:0.75rem;align-items:start}
.wc-time{font-family:var(--sans);font-size:0.62rem;color:var(--amber);font-weight:400;white-space:nowrap;padding-top:0.15rem}
.wc-body{flex:1}
.wc-name{font-family:var(--serif);font-size:0.95rem;color:var(--white);font-weight:400}
.wc-ticket{font-family:var(--sans);font-size:0.7rem;color:var(--text2);margin-top:0.3rem;line-height:1.6;font-weight:300}
.wc-imgs{display:flex;gap:0.35rem;flex-wrap:wrap;margin-top:0.4rem}
.wc-img{width:60px;height:45px;object-fit:cover;border:1px solid var(--border)}

/* ── PLACES ── */
.places-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:1px;background:var(--border)}
.place-card{background:var(--card);padding:1.1rem 1.35rem;transition:background 0.2s}
.place-card:hover{background:var(--card2)}
.pc-header{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:0.45rem}
.pc-cat{font-family:var(--sans);font-size:0.52rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--gold);margin-bottom:0.25rem;font-weight:400}
.pc-name{font-family:var(--serif);font-size:1.05rem;color:var(--white);font-weight:400}
.pc-note{font-size:0.75rem;color:var(--text2);font-style:italic;line-height:1.5;font-family:var(--serif);margin-top:0.35rem}
.rating-bar{margin-top:0.75rem;display:flex;align-items:center;gap:0.65rem}
.rating-track{flex:1;height:2px;background:var(--border2);position:relative;cursor:pointer}
.rating-fill{height:100%;background:linear-gradient(90deg,var(--text3),var(--gold));transition:width 0.3s}
.rating-pct{font-family:var(--sans);font-size:0.6rem;color:var(--gold);font-weight:400;min-width:30px;text-align:right}
.rating-label{font-family:var(--sans);font-size:0.52rem;color:var(--text3);letter-spacing:0.1em;text-transform:uppercase;font-weight:400}

/* ── BUDGET ── */
.budget-layout{display:grid;grid-template-columns:1fr 300px;gap:2rem}
.budget-summary{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--border);margin-bottom:1.75rem}
.bc{background:var(--card);padding:1.35rem}
.bc-label{font-family:var(--sans);font-size:0.54rem;letter-spacing:0.2em;color:var(--text3);text-transform:uppercase;font-weight:400;margin-bottom:0.35rem}
.bc-value{font-family:var(--serif);font-size:2rem;letter-spacing:0.01em;line-height:1;font-weight:300}
.bc-sub{font-family:var(--sans);font-size:0.6rem;color:var(--text3);font-weight:300;margin-top:0.2rem}
.progress-bar{height:2px;background:var(--border);margin-top:0.85rem;overflow:hidden}
.progress-fill{height:100%;background:linear-gradient(90deg,var(--gold),var(--sage));transition:width 0.5s}
.cat-breakdown{background:var(--card);border:1px solid var(--border);padding:1.1rem;margin-bottom:1.75rem}
.cat-row{display:flex;align-items:center;gap:0.65rem;padding:0.45rem 0;border-bottom:1px solid var(--border)}
.cat-row:last-child{border-bottom:none}
.cat-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0}
.cat-name{font-family:var(--sans);font-size:0.7rem;color:var(--text);flex:1;font-weight:300}
.cat-bar-wrap{width:90px;height:2px;background:var(--border);overflow:hidden}
.cat-bar-fill{height:100%;transition:width 0.4s}
.cat-amt{font-family:var(--sans);font-size:0.7rem;color:var(--text2);min-width:48px;text-align:right;font-weight:400}
.savings-panel{background:var(--card);border:1px solid var(--border);border-top:1px solid var(--sage);padding:1.1rem;margin-bottom:1.75rem}
.savings-item{padding:0.7rem 0;border-bottom:1px solid var(--border);display:flex;gap:0.65rem;align-items:flex-start}
.savings-item:last-child{border-bottom:none}
.savings-text{font-size:0.78rem;color:var(--text2);line-height:1.6;font-weight:300;flex:1}
.savings-amount{font-family:var(--sans);font-size:0.75rem;color:var(--sage);font-weight:500;white-space:nowrap}
.exp-table{background:var(--card);border:1px solid var(--border)}
.exp-hdr{display:grid;grid-template-columns:1fr 85px 85px 75px 40px;padding:0.6rem 1.1rem;border-bottom:1px solid var(--border);background:var(--surface)}
.exp-hdr-cell{font-family:var(--sans);font-size:0.52rem;letter-spacing:0.18em;color:var(--text3);text-transform:uppercase;font-weight:400}
.exp-row{display:grid;grid-template-columns:1fr 85px 85px 75px 40px;padding:0.8rem 1.1rem;border-bottom:1px solid var(--border);align-items:center;transition:background 0.15s}
.exp-row:hover{background:var(--card2)}
.exp-row:last-child{border-bottom:none}
.exp-name{font-family:var(--serif);font-size:0.95rem;color:var(--text);font-weight:400}
.exp-cat{font-family:var(--sans);font-size:0.6rem;color:var(--text2);font-weight:300}
.exp-amt{font-family:var(--sans);font-size:0.82rem;color:var(--amber);font-weight:400}
.exp-who{font-family:var(--sans);font-size:0.65rem;color:var(--text2);font-weight:300}
.split-section{margin-top:2rem}
.split-people{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:1px;background:var(--border);margin-bottom:1.25rem}
.split-person{background:var(--card);padding:1.1rem}
.sp-name{font-family:var(--serif);font-size:1.2rem;color:var(--white);margin-bottom:0.35rem;font-weight:300;font-style:italic}
.sp-paid{font-family:var(--sans);font-size:0.58rem;color:var(--text3);letter-spacing:0.06em;font-weight:300}
.sp-balance{font-family:var(--sans);font-size:0.85rem;font-weight:400;letter-spacing:0.03em;margin-top:0.25rem}
.sp-pos{color:var(--sage)}.sp-neg{color:var(--red)}.sp-zero{color:var(--text3)}
.settlement-item{background:var(--card);border:1px solid var(--border);border-left:2px solid var(--amber);padding:0.75rem 1rem;margin-bottom:0.4rem;display:flex;align-items:center;justify-content:space-between}
.set-text{font-size:0.82rem;color:var(--text);font-weight:300}
.set-amt{font-family:var(--sans);font-size:0.82rem;color:var(--amber);font-weight:400}
.receipt-drop{border:1px solid var(--border);padding:2rem;text-align:center;cursor:pointer;transition:all 0.2s;margin-bottom:1.25rem}
.receipt-drop:hover,.receipt-drop.dov{border-color:rgba(184,149,106,0.4);background:var(--gold-glow)}
.receipt-drop-icon{font-size:1.8rem;opacity:0.2;margin-bottom:0.6rem}
.receipt-drop-text{font-family:var(--sans);font-size:0.65rem;color:var(--text3);letter-spacing:0.1em;font-weight:300;line-height:2}
.receipt-items{display:flex;flex-direction:column;gap:1px;background:var(--border);margin-bottom:1rem}
.receipt-item{background:var(--card);padding:0.75rem 1rem;display:grid;grid-template-columns:1fr 75px;gap:0.75rem;align-items:center}
.ri-name{font-family:var(--serif);font-size:0.9rem;color:var(--text);font-weight:400}
.ri-amount{font-family:var(--sans);font-size:0.78rem;color:var(--amber);font-weight:400;text-align:right}
.ri-who{grid-column:1/-1;display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:0.25rem}
.ri-person{font-family:var(--sans);font-size:0.58rem;letter-spacing:0.1em;text-transform:uppercase;padding:0.18rem 0.45rem;border:1px solid var(--border2);cursor:pointer;transition:all 0.15s;font-weight:400;background:none;color:var(--text3)}
.ri-person.sel{background:var(--gold-dim);border-color:var(--gold);color:var(--gold)}
.receipt-totals{background:var(--surface);border:1px solid var(--border);padding:0.85rem 1rem;display:grid;grid-template-columns:1fr 1fr 1fr;gap:0.75rem;margin-bottom:1rem}
.rt-item{display:flex;flex-direction:column;gap:0.2rem}
.rt-label{font-family:var(--sans);font-size:0.52rem;letter-spacing:0.18em;color:var(--text3);text-transform:uppercase;font-weight:400}
.rt-input{background:var(--card);border:1px solid var(--border);color:var(--white);font-family:var(--sans);font-size:0.82rem;padding:0.35rem 0.55rem;outline:none;width:100%;font-weight:300;transition:border-color 0.2s}
.rt-input:focus{border-color:rgba(184,149,106,0.4)}

/* ── TRAVEL INTEL ── */
.intel-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:1px;background:var(--border);margin-bottom:2rem}
.intel-card{background:var(--card);padding:1.5rem}
.ic-label{font-family:var(--sans);font-size:0.52rem;letter-spacing:0.22em;text-transform:uppercase;color:var(--gold);margin-bottom:0.6rem;font-weight:500;display:flex;align-items:center;gap:0.5rem}
.ic-title{font-family:var(--serif);font-size:1.5rem;color:var(--white);font-weight:300;margin-bottom:0.5rem;line-height:1.1}
.ic-body{font-size:0.8rem;color:var(--text2);line-height:1.75;font-weight:300}
.ic-body strong{color:var(--white);font-weight:400}
.ic-link{display:inline-flex;align-items:center;gap:0.35rem;font-family:var(--sans);font-size:0.62rem;color:var(--gold);border:1px solid rgba(184,149,106,0.3);padding:0.3rem 0.65rem;margin-top:0.75rem;cursor:pointer;text-decoration:none;transition:all 0.2s;font-weight:400;letter-spacing:0.1em}
.ic-link:hover{background:var(--gold-dim);border-color:var(--gold)}
.ic-tag{display:inline-block;font-family:var(--sans);font-size:0.6rem;padding:0.18rem 0.5rem;margin:0.15rem;font-weight:400;letter-spacing:0.08em}
.ic-tag-amber{background:var(--amber-dim);color:var(--amber);border:1px solid rgba(201,150,58,0.25)}
.ic-tag-sage{background:var(--sage-dim);color:var(--sage);border:1px solid rgba(90,143,117,0.25)}
.ic-tag-blue{background:var(--blue-dim);color:var(--blue);border:1px solid rgba(74,127,165,0.25)}
.ic-tag-red{background:var(--red-dim);color:#e57373;border:1px solid rgba(192,57,43,0.25)}
.intel-loading{display:flex;flex-direction:column;align-items:center;padding:4rem 2rem;gap:1rem}
.tl-spinner{width:24px;height:24px;border:1px solid var(--border);border-top-color:var(--gold);border-radius:50%;animation:spin 1.2s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.tl-msg{font-family:var(--sans);font-size:0.62rem;color:var(--text3);letter-spacing:0.15em;font-weight:300}
.weather-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(90px,1fr));gap:1px;background:var(--border);margin-top:0.75rem}
.weather-day{background:var(--surface);padding:0.65rem 0.5rem;text-align:center}
.wd-day{font-family:var(--sans);font-size:0.55rem;color:var(--text3);letter-spacing:0.12em;text-transform:uppercase;font-weight:400}
.wd-icon{font-size:1.2rem;margin:0.25rem 0}
.wd-temp{font-family:var(--serif);font-size:1rem;color:var(--white);font-weight:300}
.wd-desc{font-family:var(--sans);font-size:0.52rem;color:var(--text3);margin-top:0.15rem}
.phrase-table{width:100%;border-collapse:collapse}
.phrase-table tr{border-bottom:1px solid var(--border)}
.phrase-table tr:last-child{border-bottom:none}
.phrase-table td{padding:0.5rem 0.6rem;font-size:0.78rem}
.phrase-table td:first-child{color:var(--text2);width:55%;font-weight:300}
.phrase-table td:last-child{font-family:var(--serif);color:var(--gold);font-size:0.85rem;font-style:italic}
.section-label{font-family:var(--sans);font-size:0.56rem;letter-spacing:0.22em;text-transform:uppercase;color:var(--text3);margin-bottom:0.65rem;font-weight:400}

/* ── MEMORIES ── */
.memories-layout{display:grid;grid-template-columns:1fr 280px;gap:2rem}
.photo-drop{border:1px solid var(--border);padding:2.5rem;text-align:center;cursor:pointer;transition:all 0.2s;margin-bottom:1.25rem}
.photo-drop:hover,.photo-drop.dov{border-color:rgba(184,149,106,0.4);background:var(--gold-glow)}
.photo-drop-icon{font-size:1.8rem;opacity:0.18;margin-bottom:0.6rem}
.photo-drop-text{font-family:var(--sans);font-size:0.62rem;color:var(--text3);letter-spacing:0.1em;font-weight:300;line-height:2}
.photos-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:2px}
.photo-cell{aspect-ratio:1;background:var(--card);overflow:hidden;position:relative}
.photo-cell img{width:100%;height:100%;object-fit:cover;transition:transform 0.4s}
.photo-cell:hover img{transform:scale(1.05)}
.photo-loc{position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,rgba(0,0,0,0.75));padding:0.5rem 0.4rem 0.3rem;font-family:var(--sans);font-size:0.55rem;color:var(--text);opacity:0;transition:opacity 0.2s}
.photo-cell:hover .photo-loc{opacity:1}
.notes-area{width:100%;min-height:260px;background:var(--card);border:1px solid var(--border);color:var(--text);font-family:var(--serif);font-size:0.92rem;line-height:1.85;padding:1.25rem;resize:vertical;outline:none;transition:border-color 0.2s;font-weight:300;font-style:italic}
.notes-area:focus{border-color:rgba(184,149,106,0.35)}
.notes-area::placeholder{color:var(--text3)}

/* ── MODALS ── */
.overlay{position:fixed;inset:0;background:rgba(5,10,18,0.88);backdrop-filter:blur(10px);z-index:400;display:flex;align-items:center;justify-content:center;padding:1rem}
.modal{background:var(--surface);border:1px solid var(--border2);width:100%;max-width:540px;max-height:92vh;overflow-y:auto;animation:slideUp 0.22s}
.modal-wide{max-width:700px}
@keyframes slideUp{from{transform:translateY(18px);opacity:0}to{transform:translateY(0);opacity:1}}
.mh{display:flex;align-items:center;justify-content:space-between;padding:1.35rem 1.65rem 1.1rem;border-bottom:1px solid var(--border)}
.mh-title{font-family:var(--sc);font-size:0.95rem;letter-spacing:0.22em;color:var(--white);font-weight:400}
.mc{padding:1.65rem}
.mclose{background:none;border:none;color:var(--text3);font-size:1rem;cursor:pointer;transition:color 0.15s}
.mclose:hover{color:var(--text)}

/* ── FORMS ── */
.fg{margin-bottom:1.1rem}
.fl{display:block;font-family:var(--sans);font-size:0.54rem;letter-spacing:0.22em;text-transform:uppercase;color:var(--gold);margin-bottom:0.45rem;font-weight:400}
.fi{width:100%;background:var(--card);border:1px solid var(--border);color:var(--white);font-family:var(--sans);font-size:0.85rem;padding:0.65rem 0.9rem;outline:none;transition:border-color 0.2s;font-weight:300}
.fi:focus{border-color:rgba(184,149,106,0.45)}
.fi::placeholder{color:var(--text3)}
.fi-ta{min-height:100px;resize:vertical;font-family:var(--serif);font-size:0.88rem;line-height:1.7;font-style:italic}
.frow{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.fa{display:flex;gap:0.65rem;margin-top:1.65rem}
.btn-p{flex:1;background:var(--white);color:var(--bg);border:none;font-family:var(--sans);font-size:0.62rem;font-weight:500;letter-spacing:0.18em;text-transform:uppercase;padding:0.78rem;cursor:pointer;transition:all 0.2s}
.btn-p:hover{background:var(--text)}
.btn-p:disabled{opacity:0.3;cursor:not-allowed}
.btn-s{background:none;color:var(--text2);border:1px solid var(--border);font-family:var(--sans);font-size:0.62rem;letter-spacing:0.15em;text-transform:uppercase;padding:0.78rem 1.1rem;cursor:pointer;transition:all 0.2s;font-weight:300}
.btn-s:hover{color:var(--text);border-color:var(--border2)}
.parsing{display:flex;align-items:center;gap:0.5rem;font-family:var(--sans);font-size:0.62rem;color:var(--gold);padding:0.4rem 0;letter-spacing:0.1em;font-weight:300}
.pd{width:4px;height:4px;border-radius:50%;background:var(--gold);animation:blink 1s infinite}
.pd:nth-child(2){animation-delay:0.2s}.pd:nth-child(3){animation-delay:0.4s}
@keyframes blink{0%,100%{opacity:0.15}50%{opacity:1}}
select.fi option{background:var(--surface)}
`;

/* ── CONSTANTS ── */
const BICONS={flight:"✈️",hotel:"🏨",airbnb:"🏡",train:"🚆",car:"🚗",other:"📋"};
const PICONS={restaurant:"🍽️",cafe:"☕",shop:"🛍️",activity:"🎯",museum:"🏛️",bar:"🍸",nature:"🌿",other:"📍"};
const CATS=["restaurant","cafe","shop","activity","museum","bar","nature","other"];
const EXP_CATS=["food","accommodation","transport","activity","shopping","other"];
const CAT_COLORS={food:"#b8956a",accommodation:"#4a7fa5",transport:"#5a8f75",activity:"#9b7fb6",shopping:"#c9963a",other:"#6a8a9f"};

function uid(){return Math.random().toString(36).substr(2,9)}
function fmtDate(d){if(!d)return"";return new Date(d+"T12:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}
function fmtMoney(n){return n==null||n===""?"—":"$"+Number(n).toFixed(0)}
function getDays(s,e){if(!s||!e)return 0;return Math.max(1,Math.ceil((new Date(e)-new Date(s))/86400000)+1)}
function getTripDays(sd,n){const days=[];const b=new Date(sd+"T12:00:00");for(let i=0;i<n;i++){const d=new Date(b);d.setDate(d.getDate()+i);days.push(d.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}))}return days}
function tripStatus(s,e){if(!s)return"planning";const now=new Date();now.setHours(0,0,0,0);const sd=new Date(s+"T00:00:00"),ed=e?new Date(e+"T00:00:00"):sd;if(sd>now)return"upcoming";if(ed<now)return"past";return"upcoming"}

/* ── AI ── */
const AI=async(prompt,maxTokens=1400)=>{
  const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:maxTokens,messages:[{role:"user",content:prompt}]})});
  const d=await r.json();
  const raw=d.content?.map(b=>b.text||"").join("")||"{}";
  return JSON.parse(raw.replace(/```json|```/g,"").trim());
};

async function aiParseBooking(text){
  return AI(`Parse this travel confirmation. Return ONLY valid JSON:\n{"type":"flight|hotel|airbnb|train|car|other","title":"short title","details":"one line","date":"YYYY-MM-DD","destination":"city"}\nText:"""${text}"""`);
}
async function aiSuggestActivities(dest,items,dayLabel){
  return AI(`Travel expert. ${dest}, suggest 4 geo-optimized activities for ${dayLabel}. Existing: ${items.map(i=>i.text).join(", ")||"none"}. Return ONLY JSON array:\n[{"text":"name + tip","time":"HH:MM","icon":"emoji","transport":"emoji mode","cost":25,"reason":"why this order"}]`,900);
}
async function aiParseReceipt(base64){
  const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:[{type:"image",source:{type:"base64",media_type:"image/jpeg",data:base64}},{type:"text",text:"Parse this receipt. Return ONLY JSON:\n{\"items\":[{\"name\":\"item\",\"amount\":0}],\"subtotal\":0,\"tax\":0,\"tip\":0,\"total\":0}"}]}]})});
  const d=await r.json();
  return JSON.parse(d.content?.map(b=>b.text||"").join("").replace(/```json|```/g,"").trim()||"{}");
}
async function aiTripPlanning(dest,country){
  return AI(`Smart trip planning insights for ${dest}, ${country}. Return ONLY JSON:\n{"bestMonths":[{"month":"Jan","score":8,"reason":"why","avgFlight":450}],"events":[{"name":"event","dates":"when","description":"brief"}],"savings":[{"tip":"saving tip","estimatedSaving":"$X-$Y","category":"transport|food|activity"}],"priceCalendar":"2-3 sentence summary of cheapest vs most expensive times"}`,1500);
}
async function aiTravelIntel(dest,country,startDate){
  return AI(`You are a comprehensive travel advisor. Give detailed, accurate, current information for ${dest}, ${country}. Travel dates around ${startDate||"upcoming months"}. Return ONLY valid JSON:
{
  "visa": {
    "requirement": "required|on-arrival|visa-free|e-visa",
    "cost": "$X USD or free",
    "processingTime": "X business days",
    "validity": "X days / single/multiple entry",
    "applicationUrl": "real official government URL for visa applications",
    "timeline": "Book X weeks before departure. Apply no later than X days before travel. Allow X days for processing.",
    "notes": "important notes about requirements, photos, documents needed",
    "documents": ["passport valid 6+ months","return ticket","hotel booking","bank statement"]
  },
  "currency": {
    "code": "EUR",
    "name": "Euro",
    "symbol": "€",
    "usdRate": "1 USD = X.XX EUR",
    "tips": ["Use ATMs over airport exchange","Notify bank before travel","Avoid dynamic currency conversion"],
    "cashVsCard": "brief note on cash vs card culture"
  },
  "weather": {
    "overview": "Brief overview for travel period",
    "forecast": [
      {"label":"Early trip","icon":"☀️","tempHigh":"22°C","tempLow":"14°C","desc":"Sunny"},
      {"label":"Mid trip","icon":"⛅","tempHigh":"20°C","tempLow":"13°C","desc":"Partly cloudy"},
      {"label":"Late trip","icon":"🌧️","tempHigh":"18°C","tempLow":"12°C","desc":"Rain possible"}
    ],
    "packingTips": ["Light layers","Rain jacket","Comfortable walking shoes"]
  },
  "transit": {
    "overview": "How to get around in 2-3 sentences",
    "modes": [
      {"name":"Metro","grade":"A","cost":"€1.73/trip","tip":"Buy carnet of 10 for savings","icon":"🚇"},
      {"name":"Taxi / Uber","grade":"B","cost":"€15-30 city center","tip":"Uber often cheaper than taxis","icon":"🚕"},
      {"name":"Walking","grade":"A","cost":"Free","tip":"Most attractions walkable in center","icon":"🚶"},
      {"name":"Vélib' Bikes","grade":"B","cost":"€5/day","tip":"Great for flat areas","icon":"🚲"}
    ],
    "apps": ["Citymapper","Google Maps","Local transit app name"],
    "airportTransfer": "How to get from airport to city center with cost and time"
  },
  "culture": {
    "dos": ["Greet shopkeepers when entering","Learn a few phrases","Tip 10-15% at restaurants"],
    "donts": ["Avoid loud conversations in public","Don't skip queue","Dress modestly at religious sites"],
    "customs": "2-3 sentences about local customs important for visitors",
    "tipping": "Tipping culture explanation",
    "language": "Any key language notes"
  },
  "emergency": {
    "police": "17",
    "ambulance": "15",
    "embassy": "US Embassy: +1-xxx-xxx-xxxx",
    "hospitalNote": "Note about healthcare system for visitors"
  }
}`,3000);
}

/* ── DEMO DATA ── */
const DEMO={
  id:"d1",destination:"Paris",country:"France",
  startDate:"2026-04-10",endDate:"2026-04-17",budget:3000,notes:"Golden hour at Sacré-Cœur.",
  bookings:[
    {id:"b1",type:"flight",title:"JFK → CDG",details:"Air France AF007 · Apr 10, 22:30 · Conf: XK4829",date:"2026-04-10"},
    {id:"b2",type:"hotel",title:"Hôtel du Petit Moulin",details:"Apr 11–17 · Le Marais · Conf: HTL-994421",date:"2026-04-11"},
  ],
  places:[
    {id:"p1",name:"Le Comptoir du Relais",category:"restaurant",note:"Classic bistro. Book ahead.",rating:95},
    {id:"p2",name:"Shakespeare & Company",category:"shop",note:"Iconic bookshop near Notre-Dame.",rating:80},
    {id:"p3",name:"Musée d'Orsay",category:"museum",note:"Buy tickets online. Go weekday AM.",rating:90},
    {id:"p4",name:"Septime",category:"restaurant",note:"Book 3 weeks out. Worth it.",rating:70},
  ],
  itinerary:[
    {dayIndex:0,items:[
      {id:"i1",time:"09:00",text:"Montmartre — Sacré-Cœur & Rue Lepic",icon:"⛪",transport:"🚇 Metro 12",cost:0,ticketNote:"Free entry",ticketImgs:[]},
      {id:"i2",time:"13:00",text:"Lunch at Café des Deux Moulins",icon:"🍽️",transport:"🚶 Walk",cost:22,ticketNote:"",ticketImgs:[]},
      {id:"i3",time:"15:30",text:"Musée de l'Orangerie",icon:"🎨",transport:"🚇 Metro",cost:12,ticketNote:"Ticket: ORA-8829142 · Timed 15:30",ticketImgs:[]},
    ]},
    {dayIndex:1,items:[
      {id:"i4",time:"10:00",text:"Musée d'Orsay",icon:"🏛️",transport:"🚶 Walk",cost:16,ticketNote:"Ticket: MO-20260411-A223 · Entry 10:00",ticketImgs:[]},
      {id:"i5",time:"14:00",text:"Le Marais — Marché des Enfants Rouges",icon:"🥖",transport:"🚶 Walk",cost:18,ticketNote:"",ticketImgs:[]},
    ]},
  ],
  expenses:[
    {id:"e1",name:"Hotel deposit",amount:420,category:"accommodation",paidBy:"You",splitWith:[],splitType:"equal",customSplits:{}},
    {id:"e2",name:"AF007 flights",amount:890,category:"transport",paidBy:"Alex",splitWith:["You","Sam"],splitType:"equal",customSplits:{}},
    {id:"e3",name:"Day 1 dinner",amount:165,category:"food",paidBy:"You",splitWith:["Alex","Sam"],splitType:"equal",customSplits:{}},
  ],
  travelers:["You","Alex","Sam"],
  photos:[],
};

/* ══════════════════════════════════════════════════════════════════════ */
export default function TSC(){
  const [page,setPage]=useState("dashboard");
  const [activeTripId,setActiveTripId]=useState(null);
  const [mainTab,setMainTab]=useState("bookings");
  const [trips,setTrips]=useState([DEMO]);
  const [sidebarOpen,setSidebarOpen]=useState(true);
  const [modals,setModals]=useState({});
  const [bookingText,setBookingText]=useState("");
  const [isParsing,setIsParsing]=useState(false);
  const [newTrip,setNewTrip]=useState({destination:"",country:"",startDate:"",endDate:"",budget:""});
  const [newPlace,setNewPlace]=useState({name:"",category:"restaurant",note:"",rating:80});
  const [newExpense,setNewExpense]=useState({name:"",amount:"",category:"food",paidBy:"",splitWith:[],splitType:"equal",customSplits:{}});
  const [newAgenda,setNewAgenda]=useState({time:"09:00",text:"",icon:"📍",transport:"🚶 Walk",cost:"",dayIndex:0});
  const [expandedTickets,setExpandedTickets]=useState({});
  const [walletOpen,setWalletOpen]=useState({});
  const [suggestions,setSuggestions]=useState([]);
  const [loadingSugs,setLoadingSugs]=useState(false);
  const [sugDay,setSugDay]=useState(null);
  const [intelData,setIntelData]=useState({});
  const [intelLoading,setIntelLoading]=useState(false);
  const [planningData,setPlanningData]=useState({});
  const [planningLoading,setPlanningLoading]=useState(false);
  const [newTraveler,setNewTraveler]=useState("");
  const [receipt,setReceipt]=useState(null);
  const [receiptLoading,setReceiptLoading]=useState(false);
  const photoRef=useRef();
  const receiptRef=useRef();
  const ticketImgRefs=useRef({});

  const trip=trips.find(t=>t.id===activeTripId);
  const openTrip=(id)=>{setActiveTripId(id);setPage("trip");setMainTab("bookings");setSidebarOpen(true)};
  const goBack=()=>{setPage("dashboard");setActiveTripId(null)};
  const om=(k)=>setModals(m=>({...m,[k]:true}));
  const cm=(k)=>setModals(m=>({...m,[k]:false}));
  const ut=(fn)=>setTrips(ts=>ts.map(t=>t.id===activeTripId?fn(t):t));

  const numDays=trip?getDays(trip.startDate,trip.endDate):0;
  const dayLabels=trip&&trip.startDate?getTripDays(trip.startDate,numDays):[];

  /* ── BOOKINGS ── */
  async function addBooking(){
    if(!bookingText.trim())return;
    setIsParsing(true);
    try{const p=await aiParseBooking(bookingText);ut(t=>({...t,bookings:[...t.bookings,{id:uid(),type:p.type||"other",title:p.title||"Reservation",details:p.details||bookingText.substring(0,120),date:p.date||""}]}));}
    catch{ut(t=>({...t,bookings:[...t.bookings,{id:uid(),type:"other",title:"Reservation",details:bookingText.substring(0,120),date:""}]}))}
    setIsParsing(false);setBookingText("");cm("booking");
  }

  /* ── PLACES ── */
  function addPlace(){
    if(!newPlace.name)return;
    ut(t=>({...t,places:[...t.places,{id:uid(),...newPlace,rating:Number(newPlace.rating)||80}]}));
    setNewPlace({name:"",category:"restaurant",note:"",rating:80});cm("place");
  }

  /* ── AGENDA ── */
  function addAgendaItem(){
    if(!newAgenda.text)return;
    const item={id:uid(),...newAgenda,cost:newAgenda.cost?Number(newAgenda.cost):0,ticketNote:"",ticketImgs:[]};
    ut(t=>{
      const itin=[...t.itinerary];let day=itin.find(d=>d.dayIndex===item.dayIndex);
      if(!day){itin.push({dayIndex:item.dayIndex,items:[item]});itin.sort((a,b)=>a.dayIndex-b.dayIndex)}
      else itin[itin.indexOf(day)]={...day,items:[...day.items,item]};
      return {...t,itinerary:itin};
    });
    setNewAgenda({time:"09:00",text:"",icon:"📍",transport:"🚶 Walk",cost:"",dayIndex:0});cm("agenda");
  }

  function updateItemTicket(di,itemId,field,val){
    ut(t=>({...t,itinerary:t.itinerary.map(d=>d.dayIndex!==di?d:{...d,items:d.items.map(i=>i.id!==itemId?i:{...i,[field]:val})})}));
  }

  function addTicketImg(di,itemId,src){
    ut(t=>({...t,itinerary:t.itinerary.map(d=>d.dayIndex!==di?d:{...d,items:d.items.map(i=>i.id!==itemId?i:{...i,ticketImgs:[...(i.ticketImgs||[]),src]})})}));
  }

  function reorderAgenda(di,from,to){
    ut(t=>({...t,itinerary:t.itinerary.map(d=>d.dayIndex!==di?d:{...d,items:(()=>{const arr=[...d.items];const[m]=arr.splice(from,1);arr.splice(to,0,m);return arr})()})}));
  }

  /* ── AI SUGGEST ── */
  async function getSuggestions(di,dl){
    setSugDay(di);setLoadingSugs(true);setSuggestions([]);
    try{const d=trip.itinerary.find(d=>d.dayIndex===di);const s=await aiSuggestActivities(trip.destination,d?.items||[],dl);setSuggestions(s)}
    catch{setSuggestions([])}
    setLoadingSugs(false);
  }
  function addSuggestion(s){
    const item={id:uid(),time:s.time||"10:00",text:s.text,icon:s.icon||"📍",transport:s.transport||"",cost:s.cost||0,dayIndex:sugDay,ticketNote:"",ticketImgs:[]};
    ut(t=>{
      const itin=[...t.itinerary];let day=itin.find(d=>d.dayIndex===sugDay);
      if(!day){itin.push({dayIndex:sugDay,items:[item]});itin.sort((a,b)=>a.dayIndex-b.dayIndex)}
      else itin[itin.indexOf(day)]={...day,items:[...day.items,item]};
      return {...t,itinerary:itin};
    });
    setSuggestions(s2=>s2.filter(x=>x!==s));
  }

  /* ── EXPENSES ── */
  function addExpense(){
    if(!newExpense.name||!newExpense.amount)return;
    ut(t=>({...t,expenses:[...t.expenses,{id:uid(),...newExpense,amount:Number(newExpense.amount)}]}));
    setNewExpense({name:"",amount:"",category:"food",paidBy:"",splitWith:[],splitType:"equal",customSplits:{}});cm("expense");
  }

  /* ── RECEIPT ── */
  async function handleReceiptUpload(e){
    const file=Array.from(e.target?.files||e.dataTransfer?.files||[])[0];
    if(!file||!file.type.startsWith("image/"))return;
    setReceiptLoading(true);
    const reader=new FileReader();
    reader.onload=async(ev)=>{
      const b64=ev.target.result.split(",")[1];
      try{const p=await aiParseReceipt(b64);setReceipt({...p,src:ev.target.result,taggedBy:{}});}
      catch{setReceipt({items:[],subtotal:0,tax:0,tip:0,total:0,src:ev.target.result,taggedBy:{}});}
      setReceiptLoading(false);
    };
    reader.readAsDataURL(file);
  }
  function toggleReceiptTag(idx,person){
    setReceipt(r=>{const tb={...r.taggedBy};if(!tb[idx])tb[idx]=[];tb[idx]=tb[idx].includes(person)?tb[idx].filter(p=>p!==person):[...tb[idx],person];return {...r,taggedBy:tb}});
  }
  function saveReceiptAsSplit(){
    if(!receipt||!trip)return;
    const subtotal=Number(receipt.subtotal)||0,tax=Number(receipt.tax)||0,tip=Number(receipt.tip)||0,total=subtotal+tax+tip;
    const travelers=trip.travelers||["You"];
    const perPerson={};travelers.forEach(p=>perPerson[p]=0);
    receipt.items.forEach((item,idx)=>{const tagged=receipt.taggedBy[idx]||[];if(tagged.length>0){const share=item.amount/tagged.length;tagged.forEach(p=>{if(perPerson[p]!==undefined)perPerson[p]+=share})}});
    if(subtotal>0)Object.keys(perPerson).forEach(p=>{perPerson[p]*=(1+(tax+tip)/subtotal)});
    const exp={id:uid(),name:"Receipt split",amount:total,category:"food",paidBy:travelers[0]||"You",splitWith:travelers.filter((_,i)=>i>0),splitType:"custom",customSplits:perPerson};
    ut(t=>({...t,expenses:[...t.expenses,exp]}));
    setReceipt(null);cm("receipt");
  }

  /* ── BUDGET CALC ── */
  function calcBudget(){
    if(!trip)return{total:0,budget:0,remaining:0,pct:0,byCategory:{}};
    const all=[...(trip.expenses||[]),...((trip.itinerary||[]).flatMap(d=>d.items).map(i=>({amount:i.cost||0,category:"activity"})))];
    const total=all.reduce((s,e)=>s+Number(e.amount||0),0);
    const byCategory={};EXP_CATS.forEach(c=>byCategory[c]=0);
    all.forEach(e=>{const c=e.category||"other";if(byCategory[c]!==undefined)byCategory[c]+=Number(e.amount||0)});
    const budget=Number(trip.budget||0);
    return{total,budget,remaining:budget-total,pct:budget?Math.min(100,(total/budget)*100):0,byCategory};
  }

  /* ── SPLIT CALC ── */
  function calcSplit(){
    if(!trip)return{balances:{},settlements:[]};
    const travelers=trip.travelers||["You"];
    const balances=Object.fromEntries(travelers.map(t=>[t,0]));
    for(const e of trip.expenses||[]){
      const amt=Number(e.amount||0);
      if(e.splitType==="custom"&&e.customSplits&&Object.keys(e.customSplits).length>0){
        if(balances[e.paidBy]!==undefined)balances[e.paidBy]+=amt;
        Object.entries(e.customSplits).forEach(([p,share])=>{if(balances[p]!==undefined)balances[p]-=Number(share)});
      } else {
        const splitters=e.splitWith||[];const allP=splitters.includes(e.paidBy)?splitters:[e.paidBy,...splitters];
        const share=allP.length>0?amt/allP.length:amt;
        if(balances[e.paidBy]!==undefined)balances[e.paidBy]+=amt;
        allP.forEach(p=>{if(balances[p]!==undefined)balances[p]-=share});
      }
    }
    const pos=[],neg=[];
    Object.entries(balances).forEach(([p,b])=>{if(b>0.5)pos.push({p,b});else if(b<-0.5)neg.push({p,b:Math.abs(b)})});
    const settlements=[];let pi=0,ni=0;
    while(pi<pos.length&&ni<neg.length){
      const pay=Math.min(pos[pi].b,neg[ni].b);settlements.push({from:neg[ni].p,to:pos[pi].p,amount:pay});
      pos[pi].b-=pay;neg[ni].b-=pay;if(pos[pi].b<0.5)pi++;if(neg[ni].b<0.5)ni++;
    }
    return{balances,settlements};
  }

  /* ── INTEL LOAD ── */
  useEffect(()=>{
    if(mainTab==="intel"&&trip){
      const key=trip.id;
      if(!intelData[key]&&!intelLoading){
        setIntelLoading(true);
        aiTravelIntel(trip.destination,trip.country||"",trip.startDate)
          .then(d=>setIntelData(p=>({...p,[key]:d})))
          .catch(()=>setIntelData(p=>({...p,[trip.id]:{error:true}})))
          .finally(()=>setIntelLoading(false));
      }
    }
  },[mainTab,activeTripId]);

  /* ── PLANNING LOAD ── */
  useEffect(()=>{
    if(mainTab==="bookings"&&trip&&page==="trip"){
      const key=trip.id;
      if(!planningData[key]&&!planningLoading){
        setPlanningLoading(true);
        aiTripPlanning(trip.destination,trip.country||"")
          .then(d=>setPlanningData(pd=>({...pd,[key]:d})))
          .catch(()=>{}).finally(()=>setPlanningLoading(false));
      }
    }
  },[mainTab,activeTripId]);

  /* ── PHOTOS ── */
  function handlePhotos(e){
    const files=Array.from(e.dataTransfer?.files||e.target?.files||[]).filter(f=>f.type.startsWith("image/"));
    files.forEach(f=>{const r=new FileReader();r.onload=ev=>ut(t=>({...t,photos:[...t.photos,{id:uid(),src:ev.target.result,name:f.name,location:"GPS: Locating..."}]}));r.readAsDataURL(f)});
  }

  const {total,budget:budgetAmt,remaining,pct,byCategory}=trip?calcBudget():{total:0,budget:0,remaining:0,pct:0,byCategory:{}};
  const {balances,settlements}=trip?calcSplit():{balances:{},settlements:[]};
  const pd=trip?planningData[trip.id]:null;
  const intel=trip?intelData[trip.id]:null;

  const TRIP_TABS=[
    ["bookings","Bookings"],["itinerary","Itinerary"],["places","Places"],
    ["budget","Budget"],["memories","Memories"],["intel","Travel Intel"],
  ];
  const SIDEBAR_ITEMS=TRIP_TABS;

  /* ── RENDER ── */
  return(
    <>
      <style>{FONTS}{CSS}</style>
      <div style={{background:"var(--bg)",minHeight:"100vh"}}>

        {/* NAV */}
        <nav className="nav">
          <div className="nav-left">
            {page==="trip"&&(
              <button className="sidebar-toggle" onClick={()=>setSidebarOpen(o=>!o)} title={sidebarOpen?"Collapse sidebar":"Expand sidebar"}>
                {sidebarOpen?"◂":"▸"}
              </button>
            )}
            <div className="logo">
              <div className="logo-tsc">
                <span className="logo-letter">T</span>
                <span className="logo-word" style={{color:"var(--gold)"}}>HE </span>
                <span className="logo-letter">S</span>
                <span className="logo-word" style={{color:"var(--gold)"}}>OCIAL </span>
                <span className="logo-letter">C</span>
                <span className="logo-word" style={{color:"var(--text2)"}}>ALENDAR</span>
              </div>
            </div>
          </div>

          {page==="trip"&&trip&&(
            <div className="nav-tabs">
              {TRIP_TABS.map(([k,lb])=>(
                <button key={k} className={`ntab${mainTab===k?" on":""}`} onClick={()=>setMainTab(k)}>{lb}</button>
              ))}
            </div>
          )}

          <div className="nav-right">
            {page==="trip"&&<button className="nbtn" onClick={goBack}>← Trips</button>}
            {page==="dashboard"&&<button className="nbtn primary" onClick={()=>om("newtrip")}>+ New Trip</button>}
          </div>
        </nav>

        {/* ══ DASHBOARD ══ */}
        {page==="dashboard"&&(
          <div className="dash">
            <div className="dash-hero">
              <div>
                <div className="dash-eyebrow">Your personal travel intelligence</div>
                <div className="dash-title">Plan. Explore.<br/><em>Remember.</em></div>
                <div className="dash-rule"/>
                <div className="dash-sub">Bookings · Itineraries · Budget<br/>Splits · Memories · Travel Intel</div>
              </div>
              <div className="stats-grid">
                <div className="stat-box"><div className="stat-n">{trips.length}</div><div className="stat-l">Trips</div></div>
                <div className="stat-box"><div className="stat-n">{[...new Set(trips.map(t=>t.country).filter(Boolean))].length}</div><div className="stat-l">Countries</div></div>
                <div className="stat-box"><div className="stat-n">{trips.filter(t=>t.startDate&&tripStatus(t.startDate,t.endDate)==="upcoming").length}</div><div className="stat-l">Upcoming</div></div>
              </div>
            </div>
            {trips.length===0?(
              <div className="empty"><div className="empty-icon">🌍</div><div className="empty-text">No trips yet. Create your first.</div></div>
            ):(
              <div className="trips-grid">
                {trips.map(t=>{
                  const s=t.startDate?tripStatus(t.startDate,t.endDate):"planning";
                  return(
                    <div key={t.id} className="trip-tile" onClick={()=>openTrip(t.id)}>
                      <div className="tile-top">
                        <div className="tile-dest">{t.destination}</div>
                        <div className="tile-country">{t.country}</div>
                        <div className="tile-dates">{t.startDate?`${fmtDate(t.startDate)} → ${fmtDate(t.endDate)}`:"Dates TBD"}</div>
                      </div>
                      <div className="tile-bot">
                        <div style={{display:"flex",gap:"1.5rem"}}>
                          <div className="tile-stat"><div className="tile-stat-n">{t.bookings.length}</div><div className="tile-stat-l">Bookings</div></div>
                          <div className="tile-stat"><div className="tile-stat-n">{t.places.length}</div><div className="tile-stat-l">Places</div></div>
                          <div className="tile-stat"><div className="tile-stat-n">{(t.itinerary||[]).flatMap(d=>d.items).length}</div><div className="tile-stat-l">Activities</div></div>
                        </div>
                        <div className={`status-tag st-${s}`}>{s}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ══ TRIP PAGE ══ */}
        {page==="trip"&&trip&&(
          <div className="app-shell">

            {/* SIDEBAR */}
            <div className={`sidebar${sidebarOpen?"":" collapsed"}`}>
              <div className="sidebar-inner">
                <div className="sidebar-trip-name">
                  <div className="sidebar-dest">{trip.destination}</div>
                  <div className="sidebar-dates">{trip.startDate?`${fmtDate(trip.startDate)} – ${fmtDate(trip.endDate)}`:"Dates TBD"} · {numDays}d</div>
                </div>
                <div className="snav">
                  {SIDEBAR_ITEMS.map(([k,lb])=>(
                    <div key={k} className={`snav-item${mainTab===k?" on":""}`} onClick={()=>setMainTab(k)}>
                      <span className="snav-icon">{k==="bookings"?"✈":k==="itinerary"?"📅":k==="places"?"📍":k==="budget"?"💰":k==="memories"?"📷":"🌐"}</span>
                      {lb}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* MAIN */}
            <div className="main-content">

              {/* ── BOOKINGS ── */}
              {mainTab==="bookings"&&(
                <div className="tab-pad">
                  {(planningLoading||pd)&&(
                    <div className="smart-panel" style={{marginBottom:"2rem"}}>
                      <div className="smart-header"><span className="smart-badge">AI INSIGHTS</span><span className="smart-title">Smart Planning · {trip.destination}</span></div>
                      {planningLoading&&!pd&&<div className="loading-shimmer"/>}
                      {pd&&(
                        <div className="smart-grid">
                          {pd.priceCalendar&&<div className="smart-card"><div className="sc-label">Flight Pricing</div><div className="sc-value">{pd.priceCalendar}</div></div>}
                          {pd.bestMonths?.slice(0,2).map((m,i)=>(
                            <div key={i} className="smart-card"><div className="sc-label">Best Month to Visit</div><div className="sc-value"><strong style={{color:"var(--white)",fontFamily:"var(--serif)",fontSize:"1.05rem"}}>{m.month}</strong> — {m.reason}</div>{m.avgFlight&&<div className="sc-saving">✈ Avg. ~${m.avgFlight}</div>}</div>
                          ))}
                          {pd.events?.slice(0,2).map((ev,i)=>(
                            <div key={i} className="smart-card"><div className="sc-label">Event During Your Trip</div><div className="sc-value"><strong style={{color:"var(--white)"}}>{ev.name}</strong> · {ev.dates}</div><div className="sc-saving">📅 {ev.description}</div></div>
                          ))}
                          {pd.savings?.slice(0,1).map((s,i)=>(
                            <div key={i} className="smart-card"><div className="sc-label">💰 Money Tip</div><div className="sc-value">{s.tip}</div><div className="sc-saving">Save {s.estimatedSaving}</div></div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  <div className="sh"><div className="sh-title">Bookings</div><div className="sh-line"/><button className="sh-btn" onClick={()=>om("booking")}>+ Paste Confirmation</button></div>
                  {trip.bookings.length===0?(
                    <div className="empty"><div className="empty-icon">✈️</div><div className="empty-text">Paste a confirmation email to auto-parse it.</div></div>
                  ):(
                    <div className="bk-list">
                      {trip.bookings.map(b=>(
                        <div key={b.id} className="bk-card">
                          <div className="bk-icon">{BICONS[b.type]||"📋"}</div>
                          <div className="bk-body">
                            <div className="bk-type">{b.type}</div>
                            <div className="bk-title">{b.title}</div>
                            <div className="bk-detail">{b.details}</div>
                            {b.date&&<div className="bk-date">📅 {fmtDate(b.date)}</div>}
                          </div>
                          <button className="del-btn" onClick={()=>ut(t=>({...t,bookings:t.bookings.filter(x=>x.id!==b.id)}))}>✕</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ── ITINERARY ── */}
              {mainTab==="itinerary"&&(
                <div className="tab-pad">
                  <div className="sh"><div className="sh-title">Itinerary</div><div className="sh-line"/><button className="sh-btn" onClick={()=>om("agenda")}>+ Add Item</button></div>
                  {(loadingSugs||suggestions.length>0)&&sugDay!==null&&(
                    <div className="ai-panel" style={{marginBottom:"1.75rem"}}>
                      <div className="ai-panel-header"><span className="ai-badge">AI</span><span className="ai-panel-title">Suggestions for Day {sugDay+1}</span></div>
                      {loadingSugs&&<div className="loading-shimmer"/>}
                      <div className="suggestion-list">
                        {suggestions.map((s,i)=>(
                          <div key={i} className="suggestion">
                            <span style={{fontSize:"0.9rem",opacity:0.8}}>{s.icon}</span>
                            <div style={{flex:1}}><div style={{color:"var(--white)",marginBottom:"0.15rem"}}>{s.time} · {s.text}</div><div style={{fontSize:"0.72rem",color:"var(--text3)"}}>{s.transport} · {s.reason}</div></div>
                            {s.cost>0&&<span style={{fontFamily:"var(--sans)",fontSize:"0.68rem",color:"var(--amber)",marginRight:"0.5rem"}}>${s.cost}</span>}
                            <button className="sug-add" onClick={()=>addSuggestion(s)}>+ Add</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {Array.from({length:Math.max(numDays,1)},(_,i)=>i).map(di=>{
                    const dayData=trip.itinerary.find(d=>d.dayIndex===di)||{dayIndex:di,items:[]};
                    const dl=dayLabels[di]||`Day ${di+1}`;
                    const dayTicketItems=dayData.items.filter(i=>(i.ticketNote&&i.ticketNote.trim())||(i.ticketImgs&&i.ticketImgs.length>0));
                    const wOpen=walletOpen[di];
                    return(
                      <div key={di} className="day-block">
                        <div className="day-label">
                          <div className="day-num">{String(di+1).padStart(2,"0")}</div>
                          <div>
                            <div className="day-name">{dl}</div>
                            <div className="day-date-sub">{dayData.items.length} activities · ${dayData.items.reduce((s,i)=>s+(i.cost||0),0)}</div>
                          </div>
                          <button className="day-add" onClick={()=>{setNewAgenda(a=>({...a,dayIndex:di}));om("agenda")}}>+ Item</button>
                          <button className="day-add" style={{borderColor:"rgba(184,149,106,0.4)",color:"var(--gold)"}} onClick={()=>getSuggestions(di,dl)}>✦ AI Suggest</button>
                        </div>

                        {/* Day Wallet */}
                        {dayTicketItems.length>0&&(
                          <>
                            <div className="wallet-bar" style={{marginLeft:"4.5rem"}} onClick={()=>setWalletOpen(w=>({...w,[di]:!w[di]}))}>
                              <div><div className="wallet-bar-title">🎫 Day Wallet — {dayTicketItems.length} ticket{dayTicketItems.length!==1?"s":""}</div><div className="wallet-bar-sub">Tap to {wOpen?"hide":"show"} all tickets & reservations for {dl}</div></div>
                              <span style={{fontFamily:"var(--sans)",fontSize:"0.7rem",color:"var(--text3)"}}>{wOpen?"▲":"▼"}</span>
                            </div>
                            {wOpen&&(
                              <div className="wallet-panel" style={{marginLeft:"4.5rem"}}>
                                {dayTicketItems.map(item=>(
                                  <div key={item.id} className="wallet-card">
                                    <div className="wc-time">{item.time}</div>
                                    <div className="wc-body">
                                      <div className="wc-name">{item.icon} {item.text}</div>
                                      {item.ticketNote&&<div className="wc-ticket">{item.ticketNote}</div>}
                                      {item.ticketImgs&&item.ticketImgs.length>0&&(
                                        <div className="wc-imgs">{item.ticketImgs.map((src,i)=><img key={i} src={src} className="wc-img" alt="ticket"/>)}</div>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </>
                        )}

                        {dayData.items.length===0?(
                          <div style={{marginLeft:"4.5rem",padding:"0.6rem 1rem",border:"1px dashed var(--border)"}}><span style={{fontFamily:"var(--sans)",fontSize:"0.6rem",color:"var(--text3)",letterSpacing:"0.1em"}}>No items yet</span></div>
                        ):(
                          <div className="day-items">
                            {dayData.items.map((item,idx)=>{
                              const tickExpanded=expandedTickets[item.id];
                              const hasTicket=(item.ticketNote&&item.ticketNote.trim())||(item.ticketImgs&&item.ticketImgs.length>0);
                              return(
                                <div key={item.id} className="agenda-item"
                                  draggable onDragStart={e=>{e.dataTransfer.setData("fromIdx",String(idx));e.dataTransfer.setData("dayIndex",String(di))}}
                                  onDragOver={e=>e.preventDefault()}
                                  onDrop={e=>{e.preventDefault();const from=Number(e.dataTransfer.getData("fromIdx"));const fd=Number(e.dataTransfer.getData("dayIndex"));if(fd===di)reorderAgenda(di,from,idx)}}>
                                  <div className="agenda-row">
                                    <span className="drag-handle">⠿</span>
                                    <span className="ai-time">{item.time}</span>
                                    <span className="ai-icon">{item.icon}</span>
                                    <span className="ai-text">{item.text}</span>
                                    {item.transport&&<span className="ai-transport">{item.transport}</span>}
                                    {item.cost>0&&<span className="ai-cost">${item.cost}</span>}
                                    <button className={`ticket-toggle${hasTicket?" has-ticket":""}`} onClick={()=>setExpandedTickets(et=>({...et,[item.id]:!et[item.id]}))}>
                                      {hasTicket?"🎫 Ticket":"+ Ticket"}
                                    </button>
                                    <button className="del-btn" onClick={()=>ut(t=>({...t,itinerary:t.itinerary.map(d=>d.dayIndex===di?{...d,items:d.items.filter(x=>x.id!==item.id)}:d)}))}>✕</button>
                                  </div>
                                  {tickExpanded&&(
                                    <div className="agenda-ticket">
                                      <div style={{fontFamily:"var(--sans)",fontSize:"0.55rem",letterSpacing:"0.18em",color:"var(--text3)",textTransform:"uppercase",marginBottom:"0.45rem",fontWeight:400}}>Ticket / Reservation Details</div>
                                      <textarea className="ticket-area" placeholder="Booking ref, confirmation number, seat, entry time, QR info..." rows={2}
                                        value={item.ticketNote||""}
                                        onChange={e=>updateItemTicket(di,item.id,"ticketNote",e.target.value)}/>
                                      <div className="ticket-img-strip">
                                        {(item.ticketImgs||[]).map((src,i)=>(
                                          <img key={i} src={src} className="ticket-img" alt="ticket" title="Click to remove" onClick={()=>updateItemTicket(di,item.id,"ticketImgs",(item.ticketImgs||[]).filter((_,j)=>j!==i))}/>
                                        ))}
                                        <div className="ticket-add-img" onClick={()=>{const ref=ticketImgRefs.current[item.id]||(ticketImgRefs.current[item.id]=document.createElement("input"));ref.type="file";ref.accept="image/*";ref.onchange=ev=>{const f=ev.target.files[0];if(!f)return;const r=new FileReader();r.onload=e2=>addTicketImg(di,item.id,e2.target.result);r.readAsDataURL(f)};ref.click()}} title="Add ticket photo">📎</div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* ── PLACES ── */}
              {mainTab==="places"&&(
                <div className="tab-pad">
                  <div className="sh"><div className="sh-title">Places</div><div className="sh-line"/><button className="sh-btn" onClick={()=>om("place")}>+ Pin Place</button></div>
                  {trip.places.length===0?(
                    <div className="empty"><div className="empty-icon">📍</div><div className="empty-text">No places pinned yet.</div></div>
                  ):(
                    <div className="places-grid">
                      {[...trip.places].sort((a,b)=>(b.rating||0)-(a.rating||0)).map(p=>(
                        <div key={p.id} className="place-card">
                          <div className="pc-header">
                            <div><div className="pc-cat">{p.category}</div><div className="pc-name">{p.name}</div></div>
                            <div style={{display:"flex",gap:"0.35rem",alignItems:"center"}}>
                              <span style={{fontSize:"1rem",opacity:0.7}}>{PICONS[p.category]||"📍"}</span>
                              <button className="del-btn" onClick={()=>ut(t=>({...t,places:t.places.filter(x=>x.id!==p.id)}))}>✕</button>
                            </div>
                          </div>
                          {p.note&&<div className="pc-note">{p.note}</div>}
                          <div className="rating-bar">
                            <span className="rating-label">Want</span>
                            <div className="rating-track" onClick={e=>{const rect=e.currentTarget.getBoundingClientRect();const val=Math.round(((e.clientX-rect.left)/rect.width)*100);ut(t=>({...t,places:t.places.map(x=>x.id===p.id?{...x,rating:Math.max(0,Math.min(100,val))}:x)}));}}>
                              <div className="rating-fill" style={{width:`${p.rating||0}%`}}/>
                            </div>
                            <span className="rating-pct">{p.rating||0}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ── BUDGET ── */}
              {mainTab==="budget"&&(()=>{
                return(
                  <div className="tab-pad">
                    <div style={{display:"grid",gridTemplateColumns:"1fr 280px",gap:"2rem"}}>
                      <div>
                        <div className="budget-summary">
                          <div className="bc"><div className="bc-label">Budget</div><div className="bc-value" style={{color:"var(--white)"}}>{fmtMoney(budgetAmt)}</div></div>
                          <div className="bc"><div className="bc-label">Spent</div><div className="bc-value" style={{color:"var(--amber)"}}>{fmtMoney(total)}</div><div className="progress-bar"><div className="progress-fill" style={{width:`${pct}%`}}/></div></div>
                          <div className="bc"><div className="bc-label">Remaining</div><div className="bc-value" style={{color:remaining>=0?"var(--sage)":"var(--red)"}}>{fmtMoney(remaining)}</div><div className="bc-sub">{remaining>=0?"on track":"over budget"}</div></div>
                        </div>
                        <div className="sh"><div className="sh-title">By Category</div><div className="sh-line"/></div>
                        <div className="cat-breakdown">
                          {EXP_CATS.map(c=>{const amt=byCategory[c]||0;const pctC=total>0?(amt/total)*100:0;return amt>0?(<div key={c} className="cat-row"><div className="cat-dot" style={{background:CAT_COLORS[c]}}/><div className="cat-name">{c}</div><div className="cat-bar-wrap"><div className="cat-bar-fill" style={{width:`${pctC}%`,background:CAT_COLORS[c]}}/></div><div className="cat-amt">{fmtMoney(amt)}</div></div>):null})}
                        </div>
                        <div className="sh"><div className="sh-title">Expenses</div><div className="sh-line"/><button className="sh-btn" onClick={()=>om("expense")}>+ Add</button></div>
                        {(trip.expenses||[]).length===0?<div className="empty"><div className="empty-icon">💸</div><div className="empty-text">No expenses yet.</div></div>:(
                          <div className="exp-table">
                            <div className="exp-hdr"><div className="exp-hdr-cell">Expense</div><div className="exp-hdr-cell">Category</div><div className="exp-hdr-cell">Paid By</div><div className="exp-hdr-cell">Amount</div><div/></div>
                            {(trip.expenses||[]).map(e=>(<div key={e.id} className="exp-row"><div><div className="exp-name">{e.name}</div></div><div className="exp-cat">{e.category}</div><div className="exp-who">{e.paidBy||"—"}</div><div className="exp-amt">{fmtMoney(e.amount)}</div><div><button className="del-btn" onClick={()=>ut(t=>({...t,expenses:t.expenses.filter(x=>x.id!==e.id)}))}>✕</button></div></div>))}
                          </div>
                        )}
                        {/* Split */}
                        <div className="split-section">
                          <div className="sh">
                            <div className="sh-title">Split</div><div className="sh-line"/>
                            <div style={{display:"flex",gap:"0.4rem",alignItems:"center"}}>
                              <input className="fi" style={{width:"130px",padding:"0.32rem 0.65rem",fontSize:"0.75rem"}} placeholder="Add traveler" value={newTraveler} onChange={e=>setNewTraveler(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&newTraveler.trim()){ut(t=>({...t,travelers:[...(t.travelers||[]),newTraveler.trim()]}));setNewTraveler("")}}}/>
                              <button className="sh-btn" onClick={()=>om("receipt")}>📷 Receipt</button>
                              <button className="sh-btn" onClick={()=>om("expense")}>+ Expense</button>
                            </div>
                          </div>
                          <div className="split-people">
                            {(trip.travelers||[]).map(person=>{const bal=balances[person]||0;return(<div key={person} className="split-person"><div className="sp-name">{person}</div><div className="sp-paid">Paid: ${(trip.expenses||[]).filter(e=>e.paidBy===person).reduce((s,e)=>s+e.amount,0).toFixed(0)}</div><div className={`sp-balance ${bal>0.5?"sp-pos":bal<-0.5?"sp-neg":"sp-zero"}`}>{bal>0.5?`Gets back $${bal.toFixed(0)}`:bal<-0.5?`Owes $${Math.abs(bal).toFixed(0)}`:"Settled ✓"}</div></div>);})}
                          </div>
                          {settlements.length>0&&(<div><div className="section-label" style={{marginTop:"1.25rem"}}>Settlements</div>{settlements.map((s,i)=><div key={i} className="settlement-item"><span className="set-text">{s.from} → {s.to}</span><span className="set-amt">${s.amount.toFixed(2)}</span></div>)}</div>)}
                        </div>
                      </div>
                      {/* Aside */}
                      <div>
                        {pd?.savings&&pd.savings.length>0&&(
                          <div className="savings-panel">
                            <div className="section-label" style={{color:"var(--sage)",marginBottom:"0.75rem"}}>💡 Savings Opportunities</div>
                            {pd.savings.map((s,i)=><div key={i} className="savings-item"><span style={{color:"var(--sage)",fontSize:"0.9rem"}}>↓</span><div className="savings-text">{s.tip}</div><div className="savings-amount">{s.estimatedSaving}</div></div>)}
                          </div>
                        )}
                        {pd?.events&&pd.events.length>0&&(
                          <div style={{background:"var(--card)",border:"1px solid var(--border)",padding:"1.1rem"}}>
                            <div className="section-label" style={{marginBottom:"0.75rem"}}>Events in {trip.destination}</div>
                            {pd.events.map((ev,i)=>(
                              <div key={i} style={{paddingBottom:"0.75rem",marginBottom:"0.75rem",borderBottom:i<pd.events.length-1?"1px solid var(--border)":"none"}}>
                                <div style={{fontFamily:"var(--serif)",fontSize:"0.9rem",color:"var(--white)",fontWeight:400}}>{ev.name}</div>
                                <div style={{fontFamily:"var(--sans)",fontSize:"0.6rem",color:"var(--text3)",marginTop:"0.15rem",letterSpacing:"0.08em"}}>{ev.dates}</div>
                                <div style={{fontSize:"0.75rem",color:"var(--text2)",marginTop:"0.25rem",fontWeight:300}}>{ev.description}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* ── MEMORIES ── */}
              {mainTab==="memories"&&(
                <div className="tab-pad">
                  <div className="memories-layout">
                    <div>
                      <div className="sh"><div className="sh-title">Photos</div><div className="sh-line"/></div>
                      <div className="photo-drop" onClick={()=>photoRef.current?.click()} onDragOver={e=>{e.preventDefault();e.currentTarget.classList.add("dov")}} onDragLeave={e=>e.currentTarget.classList.remove("dov")} onDrop={e=>{e.preventDefault();e.currentTarget.classList.remove("dov");handlePhotos(e)}}>
                        <div className="photo-drop-icon">📷</div>
                        <div className="photo-drop-text">Drop photos or click to upload<br/><span style={{opacity:0.5,fontSize:"0.58rem"}}>GPS metadata auto-links to trip</span></div>
                        <input ref={photoRef} type="file" accept="image/*" multiple style={{display:"none"}} onChange={handlePhotos}/>
                      </div>
                      {trip.photos.length>0?(<div className="photos-grid">{trip.photos.map(ph=><div key={ph.id} className="photo-cell"><img src={ph.src} alt={ph.name}/><div className="photo-loc">📍 {ph.location}</div></div>)}</div>):<div className="empty"><div className="empty-icon">🏙️</div><div className="empty-text">No photos yet.</div></div>}
                    </div>
                    <div>
                      <div className="sh"><div className="sh-title">Notes</div></div>
                      <textarea className="notes-area" placeholder="Trip notes, reflections, things to remember..." value={trip.notes||""} onChange={e=>ut(t=>({...t,notes:e.target.value}))}/>
                      <div style={{fontFamily:"var(--sans)",fontSize:"0.54rem",color:"var(--text3)",marginTop:"0.4rem",letterSpacing:"0.15em",textTransform:"uppercase"}}>Auto-saved</div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── TRAVEL INTEL ── */}
              {mainTab==="intel"&&(()=>{
                const key=trip.id;
                return(
                  <div className="tab-pad">
                    <div className="sh">
                      <div className="sh-title">Travel Intelligence · {trip.destination}</div><div className="sh-line"/>
                      <button className="sh-btn" disabled={intelLoading} onClick={()=>{setIntelData(d=>{const n={...d};delete n[key];return n});setIntelLoading(true);aiTravelIntel(trip.destination,trip.country||"",trip.startDate).then(d=>setIntelData(p=>({...p,[key]:d}))).catch(()=>{}).finally(()=>setIntelLoading(false));}}>
                        {intelLoading?"Loading...":"↺ Refresh"}
                      </button>
                    </div>

                    {intelLoading&&!intel&&(
                      <div className="intel-loading"><div className="tl-spinner"/><div className="tl-msg">Researching {trip.destination}...</div></div>
                    )}

                    {intel&&!intel.error&&(()=>{
                      const {visa,currency,weather,transit,culture,emergency}=intel;
                      return(
                        <>
                          {/* VISA */}
                          {visa&&(
                            <div style={{marginBottom:"2rem"}}>
                              <div className="sh" style={{marginBottom:"1rem"}}><div className="sh-title">Visa</div><div className="sh-line"/></div>
                              <div className="intel-grid">
                                <div className="intel-card">
                                  <div className="ic-label">🛂 Requirement</div>
                                  <div className="ic-title">{visa.requirement}</div>
                                  <div className="ic-body">
                                    <strong>Cost:</strong> {visa.cost}<br/>
                                    <strong>Processing:</strong> {visa.processingTime}<br/>
                                    <strong>Validity:</strong> {visa.validity}
                                  </div>
                                  {visa.applicationUrl&&<a className="ic-link" href={visa.applicationUrl} target="_blank" rel="noopener noreferrer">↗ Official Application</a>}
                                </div>
                                <div className="intel-card">
                                  <div className="ic-label">📅 Timeline</div>
                                  <div className="ic-body" style={{fontSize:"0.85rem",lineHeight:1.9}}>{visa.timeline}</div>
                                  {visa.documents&&<div style={{marginTop:"0.75rem"}}>{visa.documents.map((d,i)=><div key={i} className="ic-tag ic-tag-blue">✓ {d}</div>)}</div>}
                                </div>
                                {visa.notes&&(
                                  <div className="intel-card">
                                    <div className="ic-label">📋 Notes</div>
                                    <div className="ic-body">{visa.notes}</div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* CURRENCY */}
                          {currency&&(
                            <div style={{marginBottom:"2rem"}}>
                              <div className="sh" style={{marginBottom:"1rem"}}><div className="sh-title">Currency</div><div className="sh-line"/></div>
                              <div className="intel-grid">
                                <div className="intel-card">
                                  <div className="ic-label">💱 Exchange Rate</div>
                                  <div className="ic-title">{currency.symbol} {currency.code}</div>
                                  <div className="ic-body"><strong style={{fontSize:"1.1rem",fontFamily:"var(--serif)"}}>{currency.usdRate}</strong><br/>{currency.cashVsCard}</div>
                                </div>
                                <div className="intel-card">
                                  <div className="ic-label">💡 Money Tips</div>
                                  <div className="ic-body">{(currency.tips||[]).map((tip,i)=><div key={i} style={{marginBottom:"0.4rem"}}>• {tip}</div>)}</div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* WEATHER */}
                          {weather&&(
                            <div style={{marginBottom:"2rem"}}>
                              <div className="sh" style={{marginBottom:"1rem"}}><div className="sh-title">Weather</div><div className="sh-line"/></div>
                              <div className="intel-card" style={{marginBottom:"1rem"}}>
                                <div className="ic-label">🌤 Overview</div>
                                <div className="ic-body">{weather.overview}</div>
                                {weather.forecast&&(
                                  <div className="weather-grid" style={{marginTop:"1rem"}}>
                                    {weather.forecast.map((f,i)=>(
                                      <div key={i} className="weather-day">
                                        <div className="wd-day">{f.label}</div>
                                        <div className="wd-icon">{f.icon}</div>
                                        <div className="wd-temp">{f.tempHigh}</div>
                                        <div className="wd-desc">{f.desc}</div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                                {weather.packingTips&&<div style={{marginTop:"0.85rem"}}>{weather.packingTips.map((t,i)=><span key={i} className="ic-tag ic-tag-blue">👜 {t}</span>)}</div>}
                              </div>
                            </div>
                          )}

                          {/* TRANSIT */}
                          {transit&&(
                            <div style={{marginBottom:"2rem"}}>
                              <div className="sh" style={{marginBottom:"1rem"}}><div className="sh-title">Getting Around</div><div className="sh-line"/></div>
                              {transit.overview&&<div style={{fontFamily:"var(--sans)",fontSize:"0.82rem",color:"var(--text2)",lineHeight:1.7,fontWeight:300,marginBottom:"1rem"}}>{transit.overview}</div>}
                              {transit.airportTransfer&&<div style={{background:"var(--card)",border:"1px solid var(--border)",borderLeft:"2px solid var(--gold)",padding:"0.85rem 1.1rem",marginBottom:"1rem",fontSize:"0.8rem",color:"var(--text2)",fontWeight:300}}><span style={{fontFamily:"var(--sans)",fontSize:"0.52rem",letterSpacing:"0.2em",color:"var(--gold)",textTransform:"uppercase",display:"block",marginBottom:"0.3rem",fontWeight:400}}>✈ Airport Transfer</span>{transit.airportTransfer}</div>}
                              <div className="intel-grid">
                                {(transit.modes||[]).map((m,i)=>(
                                  <div key={i} className="intel-card">
                                    <div className="ic-label">{m.icon} {m.name} <span style={{marginLeft:"auto",fontFamily:"var(--serif)",fontSize:"1.1rem",color:m.grade==="A"?"var(--sage)":m.grade==="B"?"var(--gold)":m.grade==="C"?"var(--amber)":"var(--red)"}}>{m.grade}</span></div>
                                    <div className="ic-body"><strong>Cost:</strong> {m.cost}<br/>{m.tip}</div>
                                  </div>
                                ))}
                              </div>
                              {transit.apps&&<div style={{marginTop:"0.75rem"}}>{transit.apps.map((a,i)=><span key={i} className="ic-tag ic-tag-sage">📱 {a}</span>)}</div>}
                            </div>
                          )}

                          {/* CULTURE */}
                          {culture&&(
                            <div style={{marginBottom:"2rem"}}>
                              <div className="sh" style={{marginBottom:"1rem"}}><div className="sh-title">Culture & Customs</div><div className="sh-line"/></div>
                              <div className="intel-grid">
                                {culture.customs&&<div className="intel-card"><div className="ic-label">🏛 Local Culture</div><div className="ic-body">{culture.customs}</div>{culture.tipping&&<div style={{marginTop:"0.65rem",borderTop:"1px solid var(--border)",paddingTop:"0.65rem"}}><span style={{fontFamily:"var(--sans)",fontSize:"0.52rem",letterSpacing:"0.18em",color:"var(--text3)",textTransform:"uppercase",fontWeight:400}}>Tipping</span><div className="ic-body" style={{marginTop:"0.25rem"}}>{culture.tipping}</div></div>}</div>}
                                {culture.dos&&<div className="intel-card"><div className="ic-label" style={{color:"var(--sage)"}}>✓ Do</div><div className="ic-body">{culture.dos.map((d,i)=><div key={i} style={{marginBottom:"0.35rem"}}>• {d}</div>)}</div></div>}
                                {culture.donts&&<div className="intel-card"><div className="ic-label" style={{color:"var(--red)"}}>✗ Don't</div><div className="ic-body">{culture.donts.map((d,i)=><div key={i} style={{marginBottom:"0.35rem"}}>• {d}</div>)}</div></div>}
                              </div>
                            </div>
                          )}

                          {/* EMERGENCY */}
                          {emergency&&(
                            <div style={{marginBottom:"2rem"}}>
                              <div className="sh" style={{marginBottom:"1rem"}}><div className="sh-title">Emergency Info</div><div className="sh-line"/></div>
                              <div style={{background:"var(--card)",border:"1px solid var(--border)",borderTop:"1px solid var(--red)",padding:"1.25rem",display:"flex",gap:"2rem",flexWrap:"wrap"}}>
                                {[["🚔 Police",emergency.police],["🚑 Ambulance",emergency.ambulance],["🏛 Embassy",emergency.embassy]].map(([label,val])=>val&&(
                                  <div key={label}><div style={{fontFamily:"var(--sans)",fontSize:"0.52rem",letterSpacing:"0.18em",color:"var(--text3)",textTransform:"uppercase",fontWeight:400,marginBottom:"0.25rem"}}>{label}</div><div style={{fontFamily:"var(--serif)",fontSize:"1.1rem",color:"var(--white)",fontWeight:300}}>{val}</div></div>
                                ))}
                                {emergency.hospitalNote&&<div style={{width:"100%",fontSize:"0.78rem",color:"var(--text2)",fontWeight:300,borderTop:"1px solid var(--border)",paddingTop:"0.75rem",marginTop:"0.25rem"}}>{emergency.hospitalNote}</div>}
                              </div>
                            </div>
                          )}
                        </>
                      );
                    })()}
                    {intel?.error&&<div className="empty"><div className="empty-icon">⚡</div><div className="empty-text">Could not load. Try refreshing.</div></div>}
                  </div>
                );
              })()}

            </div>{/* end main-content */}
          </div>
        )}

        {/* ══ MODALS ══ */}

        {modals.newtrip&&(
          <div className="overlay" onClick={e=>e.target===e.currentTarget&&cm("newtrip")}>
            <div className="modal">
              <div className="mh"><div className="mh-title">New Trip</div><button className="mclose" onClick={()=>cm("newtrip")}>✕</button></div>
              <div className="mc">
                <div className="frow">
                  <div className="fg"><label className="fl">Destination *</label><input className="fi" placeholder="Tokyo" value={newTrip.destination} onChange={e=>setNewTrip(p=>({...p,destination:e.target.value}))}/></div>
                  <div className="fg"><label className="fl">Country</label><input className="fi" placeholder="Japan" value={newTrip.country} onChange={e=>setNewTrip(p=>({...p,country:e.target.value}))}/></div>
                </div>
                <div className="frow">
                  <div className="fg"><label className="fl">Start Date</label><input type="date" className="fi" value={newTrip.startDate} onChange={e=>setNewTrip(p=>({...p,startDate:e.target.value}))}/></div>
                  <div className="fg"><label className="fl">End Date</label><input type="date" className="fi" value={newTrip.endDate} onChange={e=>setNewTrip(p=>({...p,endDate:e.target.value}))}/></div>
                </div>
                <div className="fg"><label className="fl">Budget ($)</label><input type="number" className="fi" placeholder="3000" value={newTrip.budget} onChange={e=>setNewTrip(p=>({...p,budget:e.target.value}))}/></div>
                <div className="fa">
                  <button className="btn-s" onClick={()=>cm("newtrip")}>Cancel</button>
                  <button className="btn-p" disabled={!newTrip.destination} onClick={()=>{const t={id:uid(),...newTrip,budget:Number(newTrip.budget)||0,bookings:[],places:[],itinerary:[],expenses:[],travelers:["You"],photos:[],notes:""};setTrips(ts=>[t,...ts]);setNewTrip({destination:"",country:"",startDate:"",endDate:"",budget:""});cm("newtrip")}}>Create Trip</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {modals.booking&&(
          <div className="overlay" onClick={e=>e.target===e.currentTarget&&cm("booking")}>
            <div className="modal">
              <div className="mh"><div className="mh-title">Paste Confirmation</div><button className="mclose" onClick={()=>cm("booking")}>✕</button></div>
              <div className="mc">
                <div className="fg"><label className="fl">Confirmation Email / Booking Text</label><textarea className="fi fi-ta" style={{minHeight:"150px"}} placeholder="Paste your confirmation — Claude will auto-extract type, title, date, and details." value={bookingText} onChange={e=>setBookingText(e.target.value)}/></div>
                {isParsing&&<div className="parsing"><div className="pd"/><div className="pd"/><div className="pd"/><span>Parsing...</span></div>}
                <div className="fa"><button className="btn-s" onClick={()=>cm("booking")}>Cancel</button><button className="btn-p" disabled={!bookingText.trim()||isParsing} onClick={addBooking}>{isParsing?"Parsing...":"Add Booking"}</button></div>
              </div>
            </div>
          </div>
        )}

        {modals.place&&(
          <div className="overlay" onClick={e=>e.target===e.currentTarget&&cm("place")}>
            <div className="modal">
              <div className="mh"><div className="mh-title">Pin a Place</div><button className="mclose" onClick={()=>cm("place")}>✕</button></div>
              <div className="mc">
                <div className="fg"><label className="fl">Name *</label><input className="fi" placeholder="Septime" value={newPlace.name} onChange={e=>setNewPlace(p=>({...p,name:e.target.value}))}/></div>
                <div className="frow">
                  <div className="fg"><label className="fl">Category</label><select className="fi" value={newPlace.category} onChange={e=>setNewPlace(p=>({...p,category:e.target.value}))}>{CATS.map(c=><option key={c} value={c}>{PICONS[c]} {c}</option>)}</select></div>
                  <div className="fg"><label className="fl">Want to Go ({newPlace.rating}%)</label><input type="range" min="0" max="100" style={{width:"100%",padding:"0.5rem 0",background:"none",cursor:"pointer"}} value={newPlace.rating} onChange={e=>setNewPlace(p=>({...p,rating:Number(e.target.value)}))}/></div>
                </div>
                <div className="fg"><label className="fl">Notes</label><input className="fi" placeholder="Any tips or reminders..." value={newPlace.note} onChange={e=>setNewPlace(p=>({...p,note:e.target.value}))}/></div>
                <div className="fa"><button className="btn-s" onClick={()=>cm("place")}>Cancel</button><button className="btn-p" disabled={!newPlace.name} onClick={addPlace}>Pin Place</button></div>
              </div>
            </div>
          </div>
        )}

        {modals.expense&&(
          <div className="overlay" onClick={e=>e.target===e.currentTarget&&cm("expense")}>
            <div className="modal">
              <div className="mh"><div className="mh-title">Add Expense</div><button className="mclose" onClick={()=>cm("expense")}>✕</button></div>
              <div className="mc">
                <div className="frow">
                  <div className="fg"><label className="fl">Description *</label><input className="fi" placeholder="Hotel deposit" value={newExpense.name} onChange={e=>setNewExpense(p=>({...p,name:e.target.value}))}/></div>
                  <div className="fg"><label className="fl">Amount ($) *</label><input type="number" className="fi" placeholder="200" value={newExpense.amount} onChange={e=>setNewExpense(p=>({...p,amount:e.target.value}))}/></div>
                </div>
                <div className="frow">
                  <div className="fg"><label className="fl">Category</label><select className="fi" value={newExpense.category} onChange={e=>setNewExpense(p=>({...p,category:e.target.value}))}>{EXP_CATS.map(c=><option key={c} value={c}>{c}</option>)}</select></div>
                  <div className="fg"><label className="fl">Paid By</label><select className="fi" value={newExpense.paidBy} onChange={e=>setNewExpense(p=>({...p,paidBy:e.target.value}))}><option value="">Select...</option>{(trip?.travelers||["You"]).map(t=><option key={t} value={t}>{t}</option>)}</select></div>
                </div>
                <div className="fg"><label className="fl">Split With</label>
                  <div style={{display:"flex",flexWrap:"wrap",gap:"0.45rem",marginTop:"0.25rem"}}>
                    {(trip?.travelers||["You"]).filter(t=>t!==newExpense.paidBy).map(t=>(<label key={t} style={{display:"flex",alignItems:"center",gap:"0.3rem",fontFamily:"var(--sans)",fontSize:"0.7rem",color:"var(--text2)",cursor:"pointer"}}><input type="checkbox" checked={newExpense.splitWith.includes(t)} onChange={e=>setNewExpense(p=>({...p,splitWith:e.target.checked?[...p.splitWith,t]:p.splitWith.filter(x=>x!==t)}))}/>{t}</label>))}
                  </div>
                </div>
                <div className="fg"><label className="fl">Split Type</label>
                  <div style={{display:"flex",gap:"0.4rem"}}>
                    {["equal","custom"].map(type=>(<button key={type} onClick={()=>setNewExpense(p=>({...p,splitType:type}))} style={{background:newExpense.splitType===type?"var(--gold-dim)":"none",border:`1px solid ${newExpense.splitType===type?"var(--gold)":"var(--border)"}`,color:newExpense.splitType===type?"var(--gold)":"var(--text3)",fontFamily:"var(--sans)",fontSize:"0.62rem",letterSpacing:"0.14em",textTransform:"uppercase",padding:"0.38rem 0.8rem",cursor:"pointer",transition:"all 0.2s"}}>{type}</button>))}
                  </div>
                </div>
                {newExpense.splitType==="custom"&&newExpense.splitWith.length>0&&(
                  <div className="fg"><label className="fl">Custom Amounts ($)</label>
                    {[newExpense.paidBy,...newExpense.splitWith].filter(Boolean).map(person=>(<div key={person} style={{display:"flex",alignItems:"center",gap:"0.65rem",marginBottom:"0.45rem"}}><span style={{fontFamily:"var(--sans)",fontSize:"0.75rem",color:"var(--text2)",width:"75px",fontWeight:300}}>{person}</span><input type="number" className="fi" style={{flex:1,padding:"0.38rem 0.6rem"}} placeholder="0" value={newExpense.customSplits[person]||""} onChange={e=>setNewExpense(p=>({...p,customSplits:{...p.customSplits,[person]:e.target.value}}))}/></div>))}
                  </div>
                )}
                <div className="fa"><button className="btn-s" onClick={()=>cm("expense")}>Cancel</button><button className="btn-p" disabled={!newExpense.name||!newExpense.amount} onClick={addExpense}>Add Expense</button></div>
              </div>
            </div>
          </div>
        )}

        {modals.agenda&&(
          <div className="overlay" onClick={e=>e.target===e.currentTarget&&cm("agenda")}>
            <div className="modal">
              <div className="mh"><div className="mh-title">Add Agenda Item</div><button className="mclose" onClick={()=>cm("agenda")}>✕</button></div>
              <div className="mc">
                <div className="frow">
                  <div className="fg"><label className="fl">Day</label><select className="fi" value={newAgenda.dayIndex} onChange={e=>setNewAgenda(p=>({...p,dayIndex:Number(e.target.value)}))}>{Array.from({length:Math.max(numDays,1)},(_,i)=>i).map(i=><option key={i} value={i}>{dayLabels[i]||`Day ${i+1}`}</option>)}</select></div>
                  <div className="fg"><label className="fl">Time</label><input type="time" className="fi" value={newAgenda.time} onChange={e=>setNewAgenda(p=>({...p,time:e.target.value}))}/></div>
                </div>
                <div className="fg"><label className="fl">Activity *</label><input className="fi" placeholder="Visit Sacré-Cœur" value={newAgenda.text} onChange={e=>setNewAgenda(p=>({...p,text:e.target.value}))}/></div>
                <div className="frow">
                  <div className="fg"><label className="fl">Icon</label><input className="fi" placeholder="⛪" value={newAgenda.icon} onChange={e=>setNewAgenda(p=>({...p,icon:e.target.value}))}/></div>
                  <div className="fg"><label className="fl">Cost ($)</label><input type="number" className="fi" placeholder="0" value={newAgenda.cost} onChange={e=>setNewAgenda(p=>({...p,cost:e.target.value}))}/></div>
                </div>
                <div className="fg"><label className="fl">Transport</label><select className="fi" value={newAgenda.transport} onChange={e=>setNewAgenda(p=>({...p,transport:e.target.value}))}>{["🚶 Walk","🚇 Metro","🚕 Taxi","🚲 Bike","🚌 Bus","🚗 Car","🚤 Boat","✈️ Flight"].map(t=><option key={t} value={t}>{t}</option>)}</select></div>
                <div className="fa"><button className="btn-s" onClick={()=>cm("agenda")}>Cancel</button><button className="btn-p" disabled={!newAgenda.text} onClick={addAgendaItem}>Add to Itinerary</button></div>
              </div>
            </div>
          </div>
        )}

        {modals.receipt&&(
          <div className="overlay" onClick={e=>e.target===e.currentTarget&&cm("receipt")}>
            <div className="modal modal-wide">
              <div className="mh"><div className="mh-title">Upload Receipt</div><button className="mclose" onClick={()=>cm("receipt")}>✕</button></div>
              <div className="mc">
                {!receipt&&!receiptLoading&&(
                  <div className="receipt-drop" onClick={()=>receiptRef.current?.click()} onDragOver={e=>{e.preventDefault();e.currentTarget.classList.add("dov")}} onDragLeave={e=>e.currentTarget.classList.remove("dov")} onDrop={e=>{e.preventDefault();e.currentTarget.classList.remove("dov");handleReceiptUpload(e)}}>
                    <div className="receipt-drop-icon">🧾</div>
                    <div className="receipt-drop-text">Drop receipt photo or click to upload<br/><span style={{opacity:0.5,fontSize:"0.58rem"}}>Claude will scan and extract all line items</span></div>
                    <input ref={receiptRef} type="file" accept="image/*" style={{display:"none"}} onChange={handleReceiptUpload}/>
                  </div>
                )}
                {receiptLoading&&<div style={{textAlign:"center",padding:"2rem"}}><div className="parsing" style={{justifyContent:"center"}}><div className="pd"/><div className="pd"/><div className="pd"/><span>Scanning receipt...</span></div></div>}
                {receipt&&!receiptLoading&&(
                  <>
                    <div style={{display:"grid",gridTemplateColumns:"130px 1fr",gap:"1rem",marginBottom:"1rem"}}>
                      <img src={receipt.src} alt="receipt" style={{width:"100%",objectFit:"cover",border:"1px solid var(--border)"}}/>
                      <div>
                        <div style={{fontFamily:"var(--sans)",fontSize:"0.56rem",letterSpacing:"0.18em",color:"var(--text3)",textTransform:"uppercase",marginBottom:"0.65rem"}}>Tag who ordered what</div>
                        <div className="receipt-items">
                          {(receipt.items||[]).map((item,idx)=>(
                            <div key={idx} className="receipt-item">
                              <div className="ri-name">{item.name}</div>
                              <div className="ri-amount">${Number(item.amount||0).toFixed(2)}</div>
                              <div className="ri-who">{(trip?.travelers||["You"]).map(person=>(<button key={person} className={`ri-person${(receipt.taggedBy[idx]||[]).includes(person)?" sel":""}`} onClick={()=>toggleReceiptTag(idx,person)}>{person}</button>))}</div>
                            </div>
                          ))}
                        </div>
                        <div className="receipt-totals">
                          <div className="rt-item"><div className="rt-label">Subtotal</div><input className="rt-input" type="number" value={receipt.subtotal||""} onChange={e=>setReceipt(r=>({...r,subtotal:e.target.value}))}/></div>
                          <div className="rt-item"><div className="rt-label">Tax ($)</div><input className="rt-input" type="number" value={receipt.tax||""} onChange={e=>setReceipt(r=>({...r,tax:e.target.value}))}/></div>
                          <div className="rt-item"><div className="rt-label">Tip ($)</div><input className="rt-input" type="number" value={receipt.tip||""} onChange={e=>setReceipt(r=>({...r,tip:e.target.value}))}/></div>
                        </div>
                        <div style={{fontFamily:"var(--sans)",fontSize:"0.68rem",color:"var(--text2)"}}>Total: <strong style={{color:"var(--amber)"}}>${(Number(receipt.subtotal||0)+Number(receipt.tax||0)+Number(receipt.tip||0)).toFixed(2)}</strong></div>
                      </div>
                    </div>
                    <div className="fa"><button className="btn-s" onClick={()=>setReceipt(null)}>← Re-upload</button><button className="btn-p" onClick={saveReceiptAsSplit}>Save Split</button></div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
