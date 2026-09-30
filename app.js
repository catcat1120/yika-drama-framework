let currentFilter='全部', searchValue='';
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
const groups=['全部','后悔情绪','身份反转','亲情寻人','强者归来','逆袭成长','待归类'];
const e=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const total=frameworks.reduce((n,f)=>n+f.works.length,0);
function route(){
 const id=decodeURIComponent(location.hash.replace(/^#\/?/,''));
 document.querySelectorAll('[data-nav]').forEach(a=>a.classList.toggle('active',a.dataset.nav===(id==='guide'?'guide':id==='sources'?'sources':'catalog')));
 if(id.startsWith('framework/')){const f=frameworks.find(f=>f.id===id.slice(10));if(f)detail(f);else{catalog();}}
 else if(id==='guide')guide();else if(id==='sources')sources();else catalog();
 window.scrollTo(0,0);
}
function catalog(){
 document.title='一卡研究室 · 短剧框架库';document.querySelector('#breadcrumb').textContent='框架目录';
 main.innerHTML=`<div class="page-head"><div><p class="eyebrow">FRAMEWORK LIBRARY</p><h1>短剧一卡框架库</h1><p class="intro">先找到框架，再看代表作。按核心期待整理，逐步补充每部作品的一卡分析。</p></div><div class="stats"><div><b>${frameworks.length-1}</b><span>已归纳框架</span></div><div><b>${total}</b><span>收录作品</span></div><div><b>${frameworks.find(f=>f.id==='pending').works.length}</b><span>待归类</span></div></div></div><div class="toolbar"><div class="tabs" role="group" aria-label="筛选框架">${groups.map(g=>`<button class="tab ${g===currentFilter?'active':''}" aria-pressed="${g===currentFilter}" data-filter="${g}">${g}</button>`).join('')}</div><label class="search"><span aria-hidden="true">⌕</span><input id="search" type="search" placeholder="搜索框架或剧名" aria-label="搜索框架或剧名" value="${e(searchValue)}"></label></div><div id="table-area"></div><div class="table-caption"><span>点击框架名称，查看代表作与拆解要点。</span><span>资料基础：原始剧目表 + 公开拉片观点</span></div>`;
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
 main.innerHTML=`<a class="back" href="#/">← 返回框架目录</a><div class="page-head"><div><span class="pill">${f.group}</span><h1>${e(f.name)}</h1><p class="intro">${e(f.desc)}</p></div><div class="stats"><div><b>${f.works.length}</b><span>代表作</span></div></div></div><div class="detail-layout"><section class="panel"><div class="panel-head"><h2>${f.id==='pending'?'待归类作品':'代表作品'}</h2><small>${f.source}</small></div>${f.works.map((w,i)=>`<article class="work-row"><h3><span class="row-index">${String(i+1).padStart(2,'0')}</span>《${e(w)}》</h3><p>${f.id==='pending'?'原表未填写框架':'框架归纳已收录'} · 具体版本与一卡集数待核验</p><p class="note">${e(notes[w]||(f.id==='pending'?'先保留原始题名，确认剧情后再归入框架。':'原始剧目表将本作归为“'+f.name+'”；尚无逐集拆解记录。'))}</p>${f.url?`<a href="${f.url}" target="_blank" rel="noopener">阅读公开拉片 ↗</a>`:''}</article>`).join('')}</section><aside class="detail-aside"><h2>${f.id==='pending'?'下一步核验什么':'框架拆解 · 工作推演'}</h2>${f.id==='pending'?`<div class="analysis-item"><h3>先确认具体作品</h3><p>核实同名版本、主要人物与剧情简介。</p></div><div class="analysis-item"><h3>再判断观众期待</h3><p>找到开场建立的主期待，以及第一个阶段性卡点。</p></div><div class="analysis-item"><h3>最后归类</h3><p>按剧情证据归类，不仅凭“萌宝”“球神”等题名词判断。</p></div>`:[['观众最想看什么',f.want],['谁知道，谁不知道',f.gap],['一卡前如何推进',f.advance],['可以观察的卡点',f.cut]].map(([h,p])=>`<div class="analysis-item"><h3>${h}</h3><p>${e(p)}</p></div>`).join('')}</aside></div><div class="note-box">${f.id==='pending'?'这些作品来自原表的空白框架栏，已完整保留，等待补充资料。':'阅读提示：代表作归属依据原表或公开拉片；右侧拆解是框架层面的学习推演，不代表这些作品实际采用了同一事件或相同一卡集数。'}</div>`;
}
function guide(){
 document.title='阅读方法 · 一卡研究室';document.querySelector('#breadcrumb').textContent='阅读方法';
 main.innerHTML=`<div class="page-head"><div><p class="eyebrow">READING GUIDE</p><h1>怎样读懂一个框架</h1><p class="intro">先把观众正在等的结果说清楚，再判断事件是否把这个结果推近。</p></div></div><div class="guide-grid">${[['01','确定核心期待','用一句具体的话回答：观众最想看谁获得什么、失去什么，或知道什么？“打脸”还需要进一步说明对象与代价。'],['02','记录信息分配','分别写下观众、主角与关键配角知道什么。信息差决定了期待来自担忧、揭晓、后悔，还是自食其果。'],['03','检查每集推进','观察行动、证据、损失和关系是否发生变化。小兑现让观众收到回报，新的阻碍继续抬高主期待。'],['04','找到一卡动作','关键人物、证据或决定到达现场，结果进入临界时刻。卡后需要回应前面建立的具体期待。']].map(([n,h,p])=>`<article class="guide-card"><small>${n}</small><h2>${h}</h2><p>${p}</p></article>`).join('')}</div><div class="note-box">“一卡”是阶段性的内容组织概念。实际集数随剧集时长、付费模式和平台策略变化，不能固定套成第十集。</div>`;
}
function sources(){
 document.title='资料来源 · 一卡研究室';document.querySelector('#breadcrumb').textContent='资料来源';
 const links=[['红果短剧创作课程 · 节奏设计','前十集主线、实质推进与免费平台留存。华语剧本网转载。','https://www.juben.pro/a/1-1783.html'],['红果短剧创作课程 · 期待与悬念','大期待、小期待与信息差。GitHub 课程存档。','https://github.com/kunhai-88/hongguo-shortdrama-screenwriting-course/blob/main/lessons/lesson-06/article.md'],['《夫妻本是同林鸟》一卡讨论','公开创作者对“卡住观众期待”的分析。','https://www.xiaohongshu.com/explore/671b711f000000001600c5dd'],['《真千金她是学霸》一卡拉片','关于主角个人目标与家庭关系的拉片观点。','https://www.xiaohongshu.com/explore/68d2427a000000000e0259f1']];
 main.innerHTML=`<div class="page-head"><div><p class="eyebrow">REFERENCE DESK</p><h1>资料来源</h1><p class="intro">目录以原始剧目表为基础，补充公开创作者分析。具体版本、剧集事件与一卡集数仍需核片。</p></div></div><div class="panel">${links.map(([h,p,u])=>`<a class="source-row" href="${u}" target="_blank" rel="noopener"><h2>${h} ↗</h2><p>${p}</p></a>`).join('')}</div><div class="note-box">小红书链接可能需要登录。本站概括分析观点；原表中的空白框架保留为待归类，尚未接入 DataEye 样本数据。</div>`;
}
window.addEventListener('hashchange',route);route();
