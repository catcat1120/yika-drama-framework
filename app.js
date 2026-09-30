const cases = [
  {id:'birds',category:'regret',categoryName:'后悔 · 自作孽',title:'《夫妻本是同林鸟》',status:'公开分析观点',brief:'误判病情后的真相与反噬',expectation:'妻子何时发现自己才是病人，并面对亲手阻断治疗的后果。',gap:'观众掌握关键真相，妻子仍按错误判断行动。',progress:'每次拒绝治疗或伤害关系，都让真相揭晓的代价变大。',card:'检查报告、医生或当事人将要当面揭开真相时截断；这是一卡推演，不声称实剧如此拍摄。'},
  {id:'champion',category:'regret',categoryName:'后悔 · 判亲',title:'《觉醒当天，我当上全国状元》',status:'待逐集核验',brief:'亲子不被信任后的证明与后悔',expectation:'亲儿子证明自己，偏信养子的家人面对误判。',gap:'家人对主角能力与品性的认知落后于观众。',progress:'主角每取得一步成绩，家人的旧判断就受到更直接的挑战。',card:'家人将亲眼看见无法否认的成绩，或仍选择站在养子一边的决定前。'},
  {id:'tian',category:'reunion',categoryName:'寻亲 · 逆袭',title:'《天归》',status:'待逐集核验',brief:'寻找亲人，孩子的付出增加关系重量',expectation:'亲人能否相认，孩子的牺牲会否被真正看见。',gap:'亲缘真相与孩子付出可分别掌握在不同人物手中。',progress:'每条寻亲线索都缩短距离，也让相认后的情感代价更明确。',card:'关键亲人即将确认身份时，孩子的处境或付出形成新的选择。'},
  {id:'longfeng',category:'identity',categoryName:'身份 · 错认',title:'《长风踏歌》',status:'待逐集核验',brief:'讨厌眼前人，却仰慕他的真实身份',expectation:'女主何时发现她厌恶的人正是自己仰慕的那个人。',gap:'男主和观众知道身份，女主不知道。',progress:'女主每一次褒奖“高身份”和贬低“眼前人”，都加深揭晓时的自我打脸。',card:'两个身份即将同场对质，女主不得不表态的瞬间。'},
  {id:'warrior',category:'identity',categoryName:'身份 · 战神',title:'《蛟龙出海》',status:'待逐集核验',brief:'退婚与低估叠加隐藏战力',expectation:'轻视主角的人何时见到其真实实力并承担后果。',gap:'主角和观众知道能力，退婚方不知道。',progress:'对手的每次加码都应带来更大的公开失脸风险。',card:'公开挑战、命令或证据即将使身份无法再隐藏时。'},
  {id:'scholar',category:'goal',categoryName:'自我目标 · 真千金',title:'《真千金她是学霸》',status:'公开拉片观点',brief:'升学目标比获得家人认可更牵引追看',expectation:'女主能否守住升学与离开原生家庭的目标。',gap:'家人按自己的价值判断女主，观众更清楚她的行动目标。',progress:'每次家庭干扰都检验女主是否仍按目标行动。',card:'女主的关键选择将决定是否偏离目标时；这是按拉片观点做的框架推演。'}
];
const grid=document.querySelector('#case-grid');
const detail=document.querySelector('#case-detail');
function renderCases(filter='all'){
  const list=cases.filter(item=>filter==='all'||item.category===filter);
  grid.innerHTML=list.map(item=>`<button class="case-card" data-id="${item.id}" aria-label="查看${item.title}的框架推演"><small>${item.categoryName} · ${item.status}</small><h3>${item.title}</h3><p>${item.brief}</p><span class="open">查看拆解 ↗</span></button>`).join('');
  showCase(list[0].id);
}
function showCase(id){
  const item=cases.find(x=>x.id===id);
  if(!item)return;
  document.querySelectorAll('.case-card').forEach(card=>card.classList.toggle('active',card.dataset.id===id));
  detail.innerHTML=`<div><span class="tag">${item.categoryName} / ${item.status}</span><h3>${item.title}</h3><p>${item.brief}</p></div><dl><div><dt>观众期待</dt><dd>${item.expectation}</dd></div><div><dt>信息差</dt><dd>${item.gap}</dd></div><div><dt>一卡前如何推进</dt><dd>${item.progress}</dd></div><div><dt>可以怎样卡 · 推演</dt><dd>${item.card}</dd></div></dl>`;
}
document.querySelectorAll('.chip').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.chip').forEach(x=>{x.classList.toggle('active',x===button);x.setAttribute('aria-pressed',String(x===button));});renderCases(button.dataset.filter);}));
grid.addEventListener('click',event=>{const card=event.target.closest('.case-card');if(card)showCase(card.dataset.id);});
const feedback={a:'A 有新的压力，但“被开除”没有直接逼近妻子误判病情所欠下的真相。若前情没有把职场线接入主期待，它是较弱的一卡。',b:'B 更贴近已建立的期待：关键证据到达，错误认知即将被纠正，观众要看的自我打脸进入临界动作。下一集也应及时回应报告。',c:'C 突然开出新身世线，容易转移原本的情绪方向；除非此前早已铺设，否则不能替代这一卡。'};
document.querySelectorAll('.quiz-option').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.quiz-option').forEach(x=>x.classList.toggle('selected',x===button));document.querySelector('#quiz-feedback').textContent=feedback[button.dataset.answer];}));
renderCases();
