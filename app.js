let currentFilter='全部', searchValue='', breakdownSearch='';
const main=document.querySelector('#main');
const notes={
'夫妻本是同林鸟':'原表关注女反自作孽、自己打脸自己的情绪，以及信息差的运用。',
'你要骑行自由':'原表与《夫妻本是同林鸟》归为一组，关注反方选择如何带来反噬。',
'觉醒当天，我当上全国状元':'原表强调被逐出家门、亲儿子与养子的信任偏差，以及亲人后悔。',
'皎皎月色落孤星':'原表标注“判亲的设计”；具体人物关系和一卡位置待核片。',
'天才少女归来':'原表标注“判亲的设计”；具体人物关系和一卡位置待核片。',
'长风踏歌':'原表强调：讨厌男主本人，却爱慕男主的真实高身份；另有家国情怀元素。',
'天归':'原表归为寻亲与逆袭打脸，并特别指出孩子的付出是亮点。',
'师姐风华绝代，少爷隐龙归来':'原表组合：离婚、装逼打脸、隐藏身份、失忆男主。',
'大夏武魂':'原表组合：战神、爱国情怀、父女解开误会。',
'蛟龙出海':'原表组合：战神、迪化、退婚。',
'真千金她是学霸':'公开拉片将女主的升学目标与独立选择视为追看动力；此处记录作者观点，尚未逐集核验。'};
const groups=['全部',...new Set(frameworks.map(f=>f.group))];
const e=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const total=new Set(frameworks.flatMap(f=>f.works)).size;
const dramaLink=title=>'#/drama/'+encodeURIComponent(title);
function route(){
 const id=decodeURIComponent(location.hash.replace(/^#\/?/,''));
 document.querySelectorAll('[data-nav]').forEach(a=>a.classList.toggle('active',a.dataset.nav===(id==='guide'?'guide':id==='sources'?'sources':id==='breakdowns'||id.startsWith('drama/')?'breakdowns':'catalog')));
 if(id.startsWith('framework/')){const f=frameworks.find(f=>f.id===id.slice(10));if(f)detail(f);else{catalog();}}
 else if(id.startsWith('drama/')){const d=dramaBreakdowns.find(d=>d.title===id.slice(6));if(d)dramaDetail(d);else breakdownCatalog();}
 else if(id==='breakdowns')breakdownCatalog();else if(id==='guide')guide();else if(id==='sources')sources();else catalog();
 window.scrollTo(0,0);
}
function catalog(){
 document.title='一卡研究室 · 短剧框架库';document.querySelector('#breadcrumb').textContent='框架目录';
 main.innerHTML=`<div class="page-head"><div><p class="eyebrow">FRAMEWORK LIBRARY</p><h1>短剧一卡框架库</h1><p class="intro">先找到框架，再看代表作。按核心期待整理，逐步补充每部作品的一卡分析。</p></div><div class="stats"><div><b>${frameworks.length-1}</b><span>已归纳框架</span></div><div><b>${total}</b><span>收录作品</span></div><div><b>${frameworks.find(f=>f.id==='pending').works.length}</b><span>待归类</span></div></div></div><div class="toolbar"><div class="tabs" role="group" aria-label="筛选框架">${groups.map(g=>`<button class="tab ${g===currentFilter?'active':''}" aria-pressed="${g===currentFilter}" data-filter="${g}">${g}</button>`).join('')}</div><label class="search"><span aria-hidden="true">⌕</span><input id="search" type="search" placeholder="搜索框架或剧名" aria-label="搜索框架或剧名" value="${e(searchValue)}"></label></div><div id="table-area"></div><div class="table-caption"><span>点击框架名称，查看代表作与拆解要点。</span><a href="#/breakdowns">已有 ${dramaBreakdowns.length} 部剧集拆解，进入查看 ↗</a></div>`;
 renderTable();
 main.querySelector('#search').addEventListener('input',ev=>{searchValue=ev.target.value;renderTable();});
 main.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{currentFilter=b.dataset.filter;main.querySelectorAll('[data-filter]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b));});renderTable();}));
}
function renderTable(){
 const query=searchValue.trim().toLowerCase();
 const list=frameworks.filter(f=>(currentFilter==='全部'||f.group===currentFilter)&&(!query||[f.name,f.desc,...f.works].join(' ').toLowerCase().includes(query)));
 document.querySelector('#table-area').innerHTML=`<div class="table-wrap">${list.length?`<table class="catalog"><thead><tr><th scope="col">框架</th><th scope="col">代表作</th><th scope="col">核心期待</th><th scope="col">作品</th></tr></thead><tbody>${list.map(f=>`<tr data-id="${f.id}"><td><a class="framework-link" href="#/framework/${f.id}"><span class="row-index">${String(frameworks.indexOf(f)+1).padStart(2,'0')}</span>${e(f.name)}</a><span class="row-meta">${f.group} · ${f.source}</span></td><td><div class="work-preview">${(query?[...f.works].sort((a,b)=>Number(b.toLowerCase().includes(query))-Number(a.toLowerCase().includes(query))):f.works).slice(0,3).map(w=>'《'+e(w)+'》').join('、')}${f.works.length>3?` <span class="row-meta">另有 ${f.works.length-3} 部，进入查看</span>`:''}</div></td><td><div class="expectation-preview">${e(f.want||'原表尚未填写，待逐集核验')}</div></td><td><a class="count-link" href="#/framework/${f.id}" aria-label="查看${e(f.name)}的${f.works.length}部作品">${f.works.length} ↗</a></td></tr>`).join('')}</tbody></table>`:`<div class="empty">没有找到相关框架或作品。试试完整剧名或更短的关键词。</div>`}</div>`;
 document.querySelectorAll('tr[data-id]').forEach(row=>row.addEventListener('click',ev=>{if(!ev.target.closest('a'))location.hash='/framework/'+row.dataset.id;}));
}
function detail(f){
 document.title=f.name+' · 一卡研究室';document.querySelector('#breadcrumb').textContent=f.name;
 main.innerHTML=`<a class="back" href="#/">← 返回框架目录</a><div class="page-head"><div><span class="pill">${f.group}</span><h1>${e(f.name)}</h1><p class="intro">${e(f.desc)}</p></div><div class="stats"><div><b>${f.works.length}</b><span>代表作</span></div></div></div><div class="detail-layout"><section class="panel"><div class="panel-head"><h2>${f.id==='pending'?'待归类作品':'代表作品'}</h2><small>${f.source}</small></div>${f.works.map((w,i)=>{const v=f.evidence?.[w],u=v?.url||f.url;return `<article class="work-row"><h3><span class="row-index">${String(i+1).padStart(2,'0')}</span>《${e(w)}》</h3><p>${f.id==='pending'?'旧表保留 · 新版未归类':v?(v.origin==='用户新版表'?'用户新版表归类 · 已补公开剧情':'公开资料支持 · 框架为本站归纳'):f.id==='self-goal'?'公开拉片观点':'用户新版表归类'} · 一卡集数待核验</p><p class="note">${e(v?.note||notes[w]||(f.id==='pending'?'保留旧表题名，确认剧情后再归类。':'用户新版表将本作归为“'+f.name+'”；尚无逐集拆解记录。'))}</p>${v?.version?`<p class="note">版本线索：${e(v.version)}</p>`:''}${u?`<a href="${e(u)}" target="_blank" rel="noopener">${e(v?.label||'公开拉片')} ↗</a>`:''}${(v?.references||[]).map(r=>`<br><a href="${e(r.url)}" target="_blank" rel="noopener">${e(r.label)} ↗</a>`).join('')}${v?.checked?`<p class="note">资料查阅：${e(v.checked)}</p>`:''}${dramaBreakdowns.some(d=>d.title===w)?`<a class="breakdown-link" href="${dramaLink(w)}">查看《${e(w)}》的事件链拆解 →</a>`:''}</article>`;}).join('')}</section><aside class="detail-aside"><h2>${f.id==='pending'?'下一步核验什么':'框架拆解 · 工作推演'}</h2>${f.id==='pending'?`<div class="analysis-item"><h3>先确认具体作品</h3><p>核实同名版本、主要人物与剧情简介。</p></div><div class="analysis-item"><h3>再判断观众期待</h3><p>找到开场建立的主期待，以及第一个阶段性卡点。</p></div><div class="analysis-item"><h3>最后归类</h3><p>按剧情证据归类，不仅凭“萌宝”“球神”等题名词判断。</p></div>`:[['观众最想看什么',f.want],['谁知道，谁不知道',f.gap],['一卡前如何推进',f.advance],['可以观察的卡点',f.cut]].map(([h,p])=>`<div class="analysis-item"><h3>${h}</h3><p>${e(p)}</p></div>`).join('')}</aside></div><div class="note-box">${f.id==='pending'?'此处保留旧表中尚未确认具体版本与归类的作品。':'阅读提示：代表作归属依据用户新版表、公开剧情或拉片分析；右侧拆解是框架层面的学习推演，不代表这些作品实际采用了同一事件或相同一卡集数。'}</div>`;
}
function guide(){
 document.title='阅读方法 · 一卡研究室';document.querySelector('#breadcrumb').textContent='阅读方法';
 main.innerHTML=`<div class="page-head"><div><p class="eyebrow">READING GUIDE</p><h1>怎样读懂一个框架</h1><p class="intro">先把观众正在等的结果说清楚，再判断事件是否把这个结果推近。</p></div></div><div class="guide-grid">${[['01','确定核心期待','用一句具体的话回答：观众最想看谁获得什么、失去什么，或知道什么？“打脸”还需要进一步说明对象与代价。'],['02','记录信息分配','分别写下观众、主角与关键配角知道什么。信息差决定了期待来自担忧、揭晓、后悔，还是自食其果。'],['03','检查每集推进','观察行动、证据、损失和关系是否发生变化。小兑现让观众收到回报，新的阻碍继续抬高主期待。'],['04','找到一卡动作','关键人物、证据或决定到达现场，结果进入临界时刻。卡后需要回应前面建立的具体期待。']].map(([n,h,p])=>`<article class="guide-card"><small>${n}</small><h2>${h}</h2><p>${p}</p></article>`).join('')}</div><h2>公开案例中的观察方法</h2><div class="guide-grid">${publicReadings.map(r=>`<article class="guide-card"><h2>${e(r.title)}</h2><p>${e(r.note)}</p><a href="${e(r.url)}" target="_blank" rel="noopener">${e(r.label)} ↗</a></article>`).join('')}</div><div class="note-box">框架可以由“主机制＋身份、关系或能力”组合而成。依据用户这张表，“战神”也可理解为强者模板，延伸到厨神、球神和能力型萌宝；“判出家门”与“判亲的设计”分别保留。<br>“一卡”是阶段性的内容组织概念。实际集数随剧集时长、付费模式和平台策略变化，不能固定套成第十集。</div>`;
}
function sources(){
 document.title='资料来源 · 一卡研究室';document.querySelector('#breadcrumb').textContent='资料来源';
 const links=[['红果短剧创作课程 · 节奏设计','前十集主线、实质推进与免费平台留存。华语剧本网转载。','https://www.juben.pro/a/1-1783.html'],['红果短剧创作课程 · 期待与悬念','大期待、小期待与信息差。GitHub 课程存档。','https://github.com/kunhai-88/hongguo-shortdrama-screenwriting-course/blob/main/lessons/lesson-06/article.md'],['《夫妻本是同林鸟》一卡讨论','公开创作者对“卡住观众期待”的分析。','https://www.xiaohongshu.com/explore/671b711f000000001600c5dd'],['《真千金她是学霸》一卡拉片','关于主角个人目标与家庭关系的拉片观点。','https://www.xiaohongshu.com/explore/68d2427a000000000e0259f1']];
 publicReadings.forEach(r=>links.push([r.title,r.label+' · '+r.note,r.url]));
 frameworks.forEach(f=>Object.entries(f.evidence||{}).forEach(([w,v])=>{links.push(['《'+w+'》',v.label+' · '+v.note,v.url]);(v.references||[]).forEach(r=>links.push(['《'+w+'》补充分析',r.label,r.url]));}));
 dramaBreakdowns.forEach(d=>d.sources.forEach(v=>{if(!links.some(x=>x[2]===v.url))links.push(['《'+d.title+'》拆解依据',v.label+' · '+d.scope,v.url]);}));
 main.innerHTML=`<div class="page-head"><div><p class="eyebrow">REFERENCE DESK</p><h1>资料来源</h1><p class="intro">目录以用户新版剧目表为基础，补充公开剧情资料与创作者分析。具体版本、剧集事件与一卡集数仍需核片。</p></div></div><div class="panel">${links.map(([h,p,u])=>`<a class="source-row" href="${u}" target="_blank" rel="noopener"><h2>${h} ↗</h2><p>${p}</p></a>`).join('')}</div><div class="note-box">小红书链接可能需要登录。本站概括分析观点；旧表作品依据公开资料逐步归类，尚未接入 DataEye 样本数据。</div>`;
}
function breakdownCatalog(){
 document.title='剧集拆解 · 一卡研究室';document.querySelector('#breadcrumb').textContent='剧集拆解';
 main.innerHTML=`<div class="page-head"><div><p class="eyebrow">DRAMA STUDIES</p><h1>剧集拆解</h1><p class="intro">跟着具体事件读框架：谁做了什么，信息怎样变化，观众在等什么结果。</p></div><div class="stats"><div><b>${dramaBreakdowns.length}</b><span>结构拆解</span></div></div></div><div class="toolbar"><span class="intro">公开拆剧、主创访谈、平台简介与素材分析</span><label class="search"><span aria-hidden="true">⌕</span><input id="drama-search" type="search" placeholder="搜索拆解剧名或机制" aria-label="搜索拆解剧名或机制" value="${e(breakdownSearch)}"></label></div><div id="drama-list"></div><div class="note-box">每份拆解注明资料覆盖范围。“来源事件”是公开资料所述，“结构作用”是本站判断。平台分集文案与广告片段分别标明；实际一卡集数须核对正片。</div>`;
 renderDramaCards();main.querySelector('#drama-search').addEventListener('input',ev=>{breakdownSearch=ev.target.value;renderDramaCards();});
}
function renderDramaCards(){
 const q=breakdownSearch.trim().toLowerCase();
 const list=dramaBreakdowns.filter(d=>[d.title,d.kind,d.promise,frameworks.find(f=>f.id===d.framework)?.name].join(' ').toLowerCase().includes(q));
 document.querySelector('#drama-list').innerHTML=list.length?`<div class="drama-grid">${list.map(d=>{const f=frameworks.find(f=>f.id===d.framework);return `<a class="drama-card" href="${dramaLink(d.title)}"><span class="pill">${e(d.kind)}</span><h2>《${e(d.title)}》</h2><p class="drama-frame">${e(f.name)}</p><p>${e(d.promise)}</p><div class="beat-preview">${d.beats.map(b=>e(b.title)).join(' → ')}</div><span class="drama-cta">展开事件链与卡点观察 ↗</span></a>`;}).join('')}</div>`:`<div class="empty">暂时没有这部剧的拆解。可以返回框架目录查看已有剧情资料。</div>`;
}
function dramaDetail(d){
 const f=frameworks.find(f=>f.id===d.framework);
 document.title=d.title+' · 剧集拆解';document.querySelector('#breadcrumb').textContent='剧集拆解 / '+d.title;
 main.innerHTML=`<a class="back" href="#/breakdowns">← 返回剧集拆解</a><div class="page-head"><div><span class="pill">${e(d.kind)}</span><h1>《${e(d.title)}》</h1><p class="intro">${e(d.promise)}</p></div></div><div class="study-context"><a href="#/framework/${f.id}">所属框架：${e(f.name)} ↗</a><p><b>资料覆盖</b>${e(d.scope)}</p>${d.version?`<p><b>版本线索</b>${e(d.version)}</p>`:''}<p><b>查阅日期</b>${e(d.checked)}</p></div><div class="study-layout"><section class="panel"><div class="panel-head"><h2>事件链与期待变化</h2><small>来源事件 / 本站判断</small></div><ol class="beat-list">${d.beats.map((b,i)=>`<li><div class="beat-title"><span>${String(i+1).padStart(2,'0')}</span><h2>${e(b.title)}</h2></div><p><b>来源事件</b>${e(b.event)}</p><p class="beat-analysis"><b>结构作用 · 本站判断</b>${e(b.analysis)}</p></li>`).join('')}</ol></section><aside class="study-aside"><div class="study-note"><h2>信息怎样分配</h2><p>${e(d.knowledge)}</p></div><div class="study-note"><h2>来源描述的兑现</h2><p>${e(d.payoff)}</p></div><div class="study-note"><h2>卡点观察 · 本站推演</h2><p>${e(d.cut)}</p></div></aside></div><section class="lesson-box"><h2>可迁移的结构方法</h2><p>${e(d.lesson)}</p></section><section class="study-sources"><h2>这份拆解的依据</h2>${d.sources.map(v=>`<a href="${e(v.url)}" target="_blank" rel="noopener">${e(v.label)} ↗</a>`).join('')}<p>${e(d.caveat)}</p></section>`;
}
window.addEventListener('hashchange',route);route();
