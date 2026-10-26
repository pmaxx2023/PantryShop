const ingredient=(id,name,unit,size,price,aisle,extra={})=>({id,name,unit,packageSize:size,packagePrice:price,aisle,...extra});
export const CATALOG=[
 ingredient('chicken','Chicken thighs','g',500,5.49,'Meat & fish'),
 ingredient('rice','Rice','g',1000,2.29,'Pantry'),
 ingredient('broccoli','Broccoli','g',500,1.89,'Produce'),
 ingredient('lemon','Lemon','each',1,.59,'Produce'),
 ingredient('olive_oil','Olive oil','ml',500,5.49,'Pantry'),
 ingredient('salt','Salt','g',500,.79,'Pantry'),
 ingredient('pepper','Black pepper','g',50,1.29,'Pantry'),
 ingredient('pasta','Rigatoni','g',500,1.19,'Pantry'),
 ingredient('tomatoes','Canned tomatoes','g',400,.89,'Pantry'),
 ingredient('spinach','Spinach','g',250,1.69,'Produce'),
 ingredient('parmesan','Parmesan','g',150,2.49,'Dairy & chilled'),
 ingredient('garlic','Garlic cloves','each',10,.69,'Produce'),
 ingredient('tortillas','Flour tortillas','each',8,1.49,'Bread & bakery'),
 ingredient('black_beans','Black beans, drained','g',240,.79,'Pantry'),
 ingredient('corn','Sweetcorn','g',300,.79,'Pantry'),
 ingredient('cheddar','Cheddar','g',250,1.99,'Dairy & chilled'),
 ingredient('cabbage','Cabbage','g',800,1.19,'Produce'),
 ingredient('lime','Lime','each',1,.49,'Produce'),
 ingredient('dumplings','Frozen dumplings','g',500,3.49,'Frozen'),
 ingredient('carrots','Carrots','g',1000,.79,'Produce'),
 ingredient('soy_sauce','Soy sauce','ml',150,1.29,'Pantry'),
 ingredient('rice_vinegar','Rice vinegar','ml',150,1.39,'Pantry'),
 ingredient('sesame_oil','Sesame oil','ml',150,1.99,'Pantry'),
 ingredient('spring_onion','Spring onions','g',100,.79,'Produce'),
 ingredient('chickpeas','Chickpeas, drained','g',240,.79,'Pantry'),
 ingredient('potatoes','Potatoes','g',1000,1.49,'Produce'),
 ingredient('coconut_milk','Coconut milk','ml',400,1.19,'Pantry'),
 ingredient('curry_powder','Curry powder','g',80,.99,'Pantry'),
 ingredient('pumpkin_puree','Pumpkin purée','g',425,1.69,'Pantry'),
 ingredient('pumpkin','Fresh pumpkin flesh','g',1000,2.49,'Produce'),
 ingredient('white_beans','Cannellini beans, drained','g',240,.79,'Pantry'),
 ingredient('bread','Crusty bread','g',400,1.49,'Bread & bakery'),
 ingredient('gf_pasta','Gluten-free pasta','g',500,2.19,'Pantry'),
 ingredient('corn_tortillas','Corn tortillas','each',8,1.79,'Bread & bakery'),
 ingredient('vegan_cheese','Plant-based cheese','g',200,2.49,'Dairy & chilled'),
 ingredient('yeast','Nutritional yeast','g',100,2.49,'Pantry'),
 ingredient('veg_dumplings','Vegetable dumplings','g',500,3.49,'Frozen'),
 ingredient('gf_dumplings','Gluten-free vegetable dumplings','g',400,4.49,'Frozen'),
 ingredient('tamari','Gluten-free tamari','ml',150,2.19,'Pantry')
];
export const ingredientById=(id)=>CATALOG.find(x=>x.id===id);
const R=(id,name,description,cuisine,time,image,ingredients,steps,nutrition,equipment,tags=[])=>({id,name,description,cuisine,time,image:'/food/'+image+'.webp',ingredients:ingredients.map(([id,qty])=>({id,qty})),steps,nutrition,equipment,tags,baseServings:2});
const PUMPKIN_RECIPES=[
 R('pumpkin-pasta','Silky pumpkin rigatoni','A glossy golden pumpkin sauce, warm garlic and Parmesan tucked into every pasta ridge.','Italian',25,'pumpkin-pasta',[['pumpkin_puree',250],['pasta',180],['garlic',2],['parmesan',30],['olive_oil',15],['salt',2],['pepper',1]],[
 'Use plain, unsweetened pumpkin purée, not pumpkin pie filling. Bring a large pan of water to the boil. Add the salt and cook the pasta according to its package. Reserve a mug of pasta water before draining.',
 'Thinly slice the garlic. Warm the olive oil in a wide pan over medium-low heat and cook the garlic for 30 seconds without browning.',
 'Stir in the pumpkin purée, black pepper and a splash of pasta water. Simmer gently for 4–5 minutes, stirring, until silky and hot throughout. Add more pasta water a little at a time if needed.',
 'Toss the pasta through the sauce. Stir in half the grated Parmesan, then divide between warm bowls and finish with the rest. Keep any household replacement portions separate.'
 ],{calories:490,protein:17,carbs:77,fat:14},['Stove'],['vegetarian']),
 R('pumpkin-soup','Velvety coconut pumpkin soup','Deep golden pumpkin, mellow garlic and coconut milk, with crisp toast for dipping.','Comfort food',20,'pumpkin-soup',[['pumpkin_puree',400],['coconut_milk',200],['garlic',2],['olive_oil',10],['bread',150],['salt',2],['pepper',1]],[
 'Use plain, unsweetened pumpkin purée, not pumpkin pie filling. Finely chop the garlic. Warm the olive oil in a saucepan over medium-low heat and cook the garlic for 30 seconds.',
 'Add the pumpkin purée, coconut milk, salt, pepper and enough water for your preferred soup consistency. Stir until smooth and bring to a gentle simmer.',
 'Cook gently for 10–12 minutes, stirring occasionally, until hot throughout. Adjust the thickness with a little more water if needed.',
 'Toast the bread in a dry frying pan, turning until golden. Divide the soup between bowls and serve the toast alongside. For a gluten-free rice adaptation, cook the rice separately according to its package and serve it with the soup.'
 ],{calories:500,protein:10,carbs:62,fat:24},['Stove'],['vegan','vegetarian','dairy-free']),
 R('pumpkin-curry','Pumpkin & chickpea coconut curry','Chickpeas and wilted greens in a rich pumpkin-coconut sauce, spooned beside fluffy rice.','Indian',25,'pumpkin-curry',[['pumpkin_puree',250],['chickpeas',240],['spinach',100],['coconut_milk',200],['curry_powder',8],['garlic',2],['rice',120],['olive_oil',10],['salt',2]],[
 'Use plain, unsweetened pumpkin purée, not pumpkin pie filling. Rinse the rice and cook it according to its package instructions. Drain the chickpeas and finely chop the garlic.',
 'Warm the olive oil in a saucepan over medium heat. Stir in the garlic and curry powder for 30 seconds.',
 'Add the pumpkin purée, coconut milk, chickpeas and salt. Stir in a splash of water if needed and simmer gently for 10–12 minutes, stirring occasionally.',
 'Stir in the spinach and cook for 2 minutes until wilted and the curry is hot throughout. Fluff the rice and serve alongside the curry.'
 ],{calories:620,protein:17,carbs:88,fat:24},['Stove'],['vegan','vegetarian','gluten-free','dairy-free'])
].map(r=>({...r,pantryIngredient:'pumpkin_puree',family:r.id}));
export const RECIPES=[
 R('chicken-rice','Golden chicken & lemon rice','Crisp-edged chicken, roasted broccoli and fluffy rice with a bright squeeze of lemon.','Mediterranean',35,'chicken-rice',[['chicken',400],['rice',150],['broccoli',250],['lemon',1],['olive_oil',20],['salt',2],['pepper',1]],[
 'Heat the oven to 425°F / 220°C. Cut the broccoli into bite-size florets. Pat the chicken dry.',
 'Toss the broccoli with half the olive oil and half the salt. Rub the chicken with the remaining oil, salt and black pepper. Spread on a roasting tray, keeping chicken and broccoli in separate areas.',
 'Roast for 25–30 minutes, turning the broccoli after 15 minutes. Check the chicken reaches 165°F / 74°C at its thickest point; allow extra time if needed.',
 'While the tray roasts, rinse the rice. Cook in the water quantity and for the time on its package, then rest covered for 5 minutes.',
 'Rest the chicken for 5 minutes. Divide the rice and broccoli between bowls, add chicken and finish with the lemon.'
 ],{calories:640,protein:45,carbs:67,fat:22},['Oven','Stove'],['gluten-free','dairy-free']),
 R('tomato-rigatoni','Tomato & spinach rigatoni','Ridged pasta catches a rich garlic-tomato sauce, finished with spinach and Parmesan.','Italian',25,'tomato-rigatoni',[['pasta',180],['tomatoes',400],['spinach',100],['parmesan',30],['garlic',2],['olive_oil',15],['salt',2],['pepper',1]],[
 'Bring a large pan of water to the boil. Add the salt and cook the rigatoni for the time on its package. Reserve a cup of cooking water before draining.',
 'Meanwhile, thinly slice the garlic. Warm the olive oil in a wide pan over medium heat and cook the garlic for 30 seconds without browning.',
 'Add the tomatoes and black pepper. Simmer for 12–15 minutes, stirring occasionally and breaking up large pieces.',
 'Stir in the spinach until wilted, about 2 minutes. Add the drained pasta and a splash of its cooking water. Toss until the sauce coats the ridges.',
 'Divide between bowls and finish with the grated Parmesan.'
 ],{calories:520,protein:21,carbs:75,fat:15},['Stove'],['vegetarian']),
 R('black-bean-quesadilla','Crispy black bean quesadillas','Golden tortillas with melted cheddar, sweetcorn and black beans. Cool cabbage and lime alongside.','Mexican',20,'black-bean-quesadilla',[['tortillas',4],['black_beans',240],['corn',100],['cheddar',100],['cabbage',150],['lime',1],['olive_oil',10],['salt',1],['pepper',1]],[
 'Drain the beans and sweetcorn. Mash half the beans with the salt and pepper, then stir in the remaining beans and corn. Grate the cheddar.',
 'Divide the filling and cheese over one half of each tortilla, then fold closed.',
 'Warm half the oil in a frying pan over medium heat. Cook the quesadillas in batches for 2–3 minutes per side until crisp and the cheese has melted, adding the remaining oil as needed.',
 'Finely shred the cabbage and dress with half the lime juice. Cut each quesadilla into wedges and serve with the cabbage and remaining lime.'
 ],{calories:690,protein:30,carbs:86,fat:25},['Stove'],['vegetarian']),
 R('dumpling-bowl','Crispy dumpling bowls','Golden dumplings over crunchy cabbage and carrot, with a soy-sesame dressing.','Asian',20,'dumpling-bowl',[['dumplings',350],['cabbage',150],['carrots',100],['soy_sauce',20],['rice_vinegar',15],['sesame_oil',10],['spring_onion',20]],[
 'Finely shred the cabbage, grate the carrots and slice the spring onions.',
 'Whisk the soy sauce, rice vinegar and half the sesame oil together. Toss the cabbage and carrots with half the dressing.',
 'Cook the dumplings according to their package instructions, using the remaining sesame oil for the pan if appropriate. Make sure the filling is thoroughly cooked.',
 'Divide the dressed vegetables between bowls. Add the dumplings, drizzle over the remaining dressing and scatter with the spring onions.'
 ],{calories:510,protein:19,carbs:65,fat:18},['Stove'],['dairy-free']),
 R('chickpea-curry','Coconut chickpea & potato curry','Soft potatoes and chickpeas in a warm tomato-coconut sauce, with spinach and rice.','Indian',35,'chickpea-curry',[['chickpeas',240],['potatoes',250],['spinach',100],['tomatoes',200],['coconut_milk',200],['curry_powder',8],['garlic',2],['rice',120],['olive_oil',10],['salt',2]],[
 'Cut the potatoes into 1.5 cm pieces and finely chop the garlic. Rinse the rice and start cooking it according to its package instructions.',
 'Heat the oil in a saucepan over medium heat. Add the garlic and curry powder and stir for 30 seconds.',
 'Add the tomatoes, coconut milk, potatoes and salt. Bring to a simmer, cover and cook gently for 15 minutes, stirring occasionally. Add a little water if the sauce becomes too thick.',
 'Add the drained chickpeas. Cook for another 8–10 minutes, until the potatoes are tender all the way through. Stir in the spinach for the final 2 minutes.',
 'Fluff the rice and divide between bowls. Spoon the curry alongside.'
 ],{calories:650,protein:18,carbs:99,fat:21},['Stove'],['vegan','vegetarian','gluten-free','dairy-free']),
 R('white-beans','Creamy tomato & white beans','Tender cannellini beans, silky tomato and wilted greens. Made for a piece of crusty bread.','Italian',25,'white-beans',[['white_beans',480],['tomatoes',400],['spinach',100],['garlic',2],['olive_oil',20],['bread',150],['salt',2],['pepper',1]],[
 'Drain the beans, reserving a few spoonfuls of their liquid. Thinly slice the garlic.',
 'Heat the olive oil in a wide pan over medium heat. Add the garlic and cook for 30 seconds.',
 'Add the tomatoes, salt and pepper. Simmer for 10–12 minutes until slightly thickened.',
 'Stir in the beans and a little reserved liquid. Mash a few beans into the sauce to make it creamy, then simmer for 5 minutes. Stir in the spinach until wilted.',
 'Toast or warm the bread. Serve the beans in shallow bowls with bread alongside.'
 ],{calories:540,protein:25,carbs:77,fat:17},['Stove'],['vegan','vegetarian','dairy-free']),
 ...PUMPKIN_RECIPES,
 ...PUMPKIN_RECIPES.map(r=>({...r,id:r.id+'-fresh',name:r.name+' · fresh pumpkin',time:r.time+20,pantryIngredient:'pumpkin',ingredients:r.ingredients.map(x=>x.id==='pumpkin_puree'?{...x,id:'pumpkin'}:x),steps:['Peel and deseed a cooking pumpkin. Weigh the prepared flesh using the ingredient list. Cut into small cubes and simmer in water for 15–20 minutes until very tender. Drain and mash smooth; this replaces the canned purée in the remaining steps.',...r.steps]}))
];
export const recipeById=id=>RECIPES.find(x=>x.id===id);
export const uid=()=>globalThis.crypto?.randomUUID?.()||Math.random().toString(36).slice(2)+Date.now();
export function seedState(personal=false){
 const sample=[['chicken',600,'Freezer'],['rice',800,'Pantry'],['broccoli',400,'Freezer'],['olive_oil',300,'Pantry'],['salt',250,'Pantry'],['pepper',40,'Pantry'],['pasta',500,'Pantry'],['tomatoes',1200,'Pantry'],['spinach',200,'Fridge'],['parmesan',75,'Fridge'],['garlic',7,'Pantry'],['tortillas',6,'Pantry'],['black_beans',480,'Pantry'],['corn',300,'Freezer'],['cheddar',180,'Fridge'],['cabbage',500,'Fridge'],['dumplings',500,'Freezer'],['carrots',300,'Fridge'],['soy_sauce',100,'Pantry'],['rice_vinegar',100,'Pantry'],['sesame_oil',100,'Pantry'],['chickpeas',480,'Pantry'],['potatoes',500,'Pantry'],['coconut_milk',400,'Pantry'],['curry_powder',50,'Pantry']];
 return {version:1,mode:personal?'personal':'sample',inventory:personal?[]:sample.map(([ingredientId,qty,location])=>({id:uid(),ingredientId,qty,location,useSoon:['spinach','cabbage'].includes(ingredientId),source:'sample'})),profiles:[{id:uid(),name:'Adult 1',diets:[],portion:1},{id:uid(),name:'Adult 2',diets:[],portion:1}],preferences:{country:'United States',retailer:'Aldi',currency:'USD',budget:70,cookingDays:[0,1,2,3,4],equipment:['Stove','Oven'],maxTime:60,excluded:[]},plan:[],lock:null,extras:[],bought:{},photos:[],favorites:[],ratings:{},cooked:[],prices:{},menuOffset:0};
}
export function qtyAvailable(state,id){return state.inventory.filter(x=>x.ingredientId===id&&Number.isFinite(x.qty)).reduce((n,x)=>n+Math.max(0,x.qty),0);}
export function amount(qty,unit){if(qty===null||!Number.isFinite(qty))return 'Confirm quantity';if(unit==='each')return String(Math.round(qty*10)/10);return (qty>=1000?(Math.round(qty/10)/100)+(unit==='g'?' kg':' l'):(Math.round(qty*10)/10)+' '+unit);}
export function priceFor(state,id){return Number.isFinite(state.prices?.[id])?state.prices[id]:ingredientById(id)?.packagePrice||0;}
export function effectiveIngredients(recipe,state,servings=state.profiles.length){
 const profiles=state.profiles.length?state.profiles:[{name:'You',diets:[],portion:1}];
 const weights=profiles.map(p=>Number(p.portion)||1);const sum=weights.reduce((a,b)=>a+b,0);
 const total=new Map();const adaptations=[];
 for(let idx=0;idx<profiles.length;idx++){
  const p=profiles[idx];const diets=p.diets||[];const vegan=diets.includes('vegan');const veggie=vegan||diets.includes('vegetarian');const gf=diets.includes('gluten-free');const df=vegan||diets.includes('dairy-free');
  for(const line of recipe.ingredients){
   let id=line.id;
   if(id==='chicken'&&veggie)id='chickpeas';
   if(id==='pasta'&&gf)id='gf_pasta';
   if(id==='tortillas'&&gf)id='corn_tortillas';
   if((id==='cheddar')&&df)id='vegan_cheese';
   if(id==='parmesan'&&df)id='yeast';
   if(id==='dumplings'&&(veggie||gf))id=gf?'gf_dumplings':'veg_dumplings';
   if(id==='soy_sauce'&&gf)id='tamari';
   if(id==='bread'&&gf){id='rice';}
   const factor=id==='yeast'?.5:id==='rice'&&line.id==='bread'?.4:1;
   const qty=line.qty*(servings/recipe.baseServings)*(weights[idx]/profiles.length)*factor;
   total.set(id,(total.get(id)||0)+qty);
   if(id!==line.id)adaptations.push({person:p.name,from:line.id,to:id,qty});
  }
 }
 return {ingredients:[...total].map(([id,qty])=>({id,qty})),adaptations};
}
export function requirements(state,plan=state.plan){
 const sums=new Map();for(const slot of plan){if(slot.cooked)continue;const r=recipeById(slot.recipeId);if(!r)continue;for(const x of effectiveIngredients(r,state,slot.servings).ingredients)sums.set(x.id,(sums.get(x.id)||0)+x.qty);}
 return [...sums].map(([id,qty])=>({id,qty}));
}
export function groceries(state,plan=state.plan){
 return requirements(state,plan).map(line=>{const c=ingredientById(line.id);const missing=Math.max(0,line.qty-qtyAvailable(state,line.id));const needsConfirmation=missing>0&&state.inventory.some(x=>x.ingredientId===line.id&&!Number.isFinite(x.qty));const packs=missing>0&&!needsConfirmation?Math.ceil((missing-1e-7)/c.packageSize):0;return {...line,missing,needsConfirmation,packages:packs,buyQty:packs*c.packageSize,cost:packs*priceFor(state,line.id),catalog:c};}).filter(x=>x.missing>.00001);
}
export function assess(recipe,state,servings=state.profiles.length){
 const {ingredients,adaptations}=effectiveIngredients(recipe,state,servings);const missing=ingredients.map(x=>{const c=ingredientById(x.id);const gap=Math.max(0,x.qty-qtyAvailable(state,x.id));const needsConfirmation=gap>0&&state.inventory.some(i=>i.ingredientId===x.id&&!Number.isFinite(i.qty));const packs=gap>0&&!needsConfirmation?Math.ceil((gap-1e-7)/c.packageSize):0;return {...x,gap,needsConfirmation,cost:packs*priceFor(state,x.id),packages:packs};}).filter(x=>x.gap>.00001);
 const unknown=ingredients.filter(x=>state.inventory.some(i=>i.ingredientId===x.id&&!Number.isFinite(i.qty))&&qtyAvailable(state,x.id)<x.qty);
 const useSoon=ingredients.some(x=>state.inventory.some(i=>i.ingredientId===x.id&&i.useSoon&&i.qty>0));
 const eligible=recipe.equipment.every(x=>state.preferences.equipment.includes(x))&&recipe.time<=state.preferences.maxTime&&!ingredients.some(x=>(state.preferences.excluded||[]).includes(x.id));
 return {ingredients,adaptations,missing,unknown,useSoon,eligible,onHand:ingredients.length-missing.length,cost:missing.reduce((n,x)=>n+x.cost,0)};
}
export function addInventory(state,ingredientId,qty,location='Pantry',source='manual'){
 const next=structuredClone(state);const existing=next.inventory.find(x=>x.ingredientId===ingredientId&&x.location===location&&Number.isFinite(x.qty));
 if(existing&&Number.isFinite(qty))existing.qty+=qty;else next.inventory.push({id:uid(),ingredientId,qty,location,useSoon:false,source});return next;
}
export function consumeMeal(state,recipe,servings){
 const a=assess(recipe,state,servings);if(a.missing.length)throw new Error('Confirm enough ingredients are on hand before marking this meal cooked.');
 const next=structuredClone(state);for(const x of a.ingredients){let left=x.qty;for(const item of next.inventory.filter(i=>i.ingredientId===x.id&&Number.isFinite(i.qty)).sort((a,b)=>Number(b.useSoon)-Number(a.useSoon))){const use=Math.min(item.qty,left);item.qty-=use;left-=use;if(left<=.00001)break;}}
 next.cooked.push({id:uid(),recipeId:recipe.id,servings,date:new Date().toISOString()});return next;
}
export function lockDelta(state,newPlan,nextState=state){
 const oldReq=requirements({...state,profiles:state.lock?.profiles||state.profiles},state.lock?.plan||state.plan);const newReq=requirements(nextState,newPlan);const ids=new Set([...oldReq,...newReq].map(x=>x.id));return [...ids].map(id=>({id,before:oldReq.find(x=>x.id===id)?.qty||0,after:newReq.find(x=>x.id===id)?.qty||0})).filter(x=>Math.abs(x.after-x.before)>.001);
}
const normalizeFoodName=name=>String(name||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\b\d+(?:\.\d+)?\s*%/g,' ').replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
export function findIngredient(name){
 const normalized=normalizeFoodName(name);
 const aliases={chicken:'chicken','chicken thighs':'chicken','white rice':'rice',rice:'rice',broccoli:'broccoli',lemons:'lemon',lemon:'lemon','olive oil':'olive_oil',salt:'salt','black pepper':'pepper',rigatoni:'pasta',pasta:'pasta','canned tomatoes':'tomatoes',tomatoes:'tomatoes',spinach:'spinach',parmesan:'parmesan',garlic:'garlic',tortillas:'tortillas','black beans':'black_beans',corn:'corn',sweetcorn:'corn',cheddar:'cheddar',cabbage:'cabbage',limes:'lime',lime:'lime',dumplings:'dumplings',carrots:'carrots',carrot:'carrots','soy sauce':'soy_sauce','rice vinegar':'rice_vinegar','sesame oil':'sesame_oil','spring onions':'spring_onion',scallions:'spring_onion',chickpeas:'chickpeas','garbanzo beans':'chickpeas',potatoes:'potatoes',potato:'potatoes','coconut milk':'coconut_milk','curry powder':'curry_powder','cannellini beans':'white_beans','white beans':'white_beans',bread:'bread','pumpkin puree':'pumpkin_puree','pure pumpkin':'pumpkin_puree','canned pumpkin':'pumpkin_puree','pumpkin':'pumpkin','fresh pumpkin':'pumpkin','fresh pumpkin flesh':'pumpkin'};
 // Sweetened pie filling is a different product and must never become plain purée.
 if(/\bpumpkin\b/.test(normalized)&&/\b(pie|sweetened|spiced)\b/.test(normalized))return null;
 if(aliases[normalized])return aliases[normalized];
 const exact=CATALOG.find(x=>normalizeFoodName(x.name)===normalized);if(exact)return exact.id;
 const phrase=Object.keys(aliases).filter(x=>x.split(' ').length>1).sort((a,b)=>b.length-a.length).find(x=>(' '+normalized+' ').includes(' '+x+' '));
 return phrase?aliases[phrase]:null;
}
export function normalizeKitchen(state){
 let changed=false;const migrated=[];
 const inventory=state.inventory.map(item=>{
  if(ingredientById(item.ingredientId))return item;
  const id=findIngredient(item.name);if(!id)return item;
  changed=true;migrated.push(id);const catalog=ingredientById(id);
  const compatible=item.unit===catalog.unit;
  return {...item,ingredientId:id,unit:catalog.unit,qty:compatible||item.qty===0?item.qty:null,...(!compatible&&Number.isFinite(item.qty)?{quantityNote:`Previously entered as ${item.qty} ${item.unit||'item'}. Confirm the net amount in ${catalog.unit} from the package; no package weight has been assumed.`}:{} )};
 });
 return changed?{...state,inventory,menuOffset:0,menuIngredientIds:[...new Set(migrated)]}:state;
}
export function confirmPhotoIngredients(state,rows){
 const next=structuredClone(normalizeKitchen(state));const ids=[];
 for(const row of rows.filter(x=>x.include&&x.ingredientId)){
  const qty=row.qty===''||row.qty==null?null:Number(row.qty);
  if(qty!==null&&(!Number.isFinite(qty)||qty<0))throw new Error('Enter valid quantities or leave them unknown.');
  const id=ingredientById(row.ingredientId)?.id||findIngredient(row.name)||row.ingredientId;
  const item={ingredientId:id,qty,location:row.location,source:'photo',name:row.name,unit:ingredientById(id)?.unit||'each'};
  const duplicate=next.inventory.find(x=>x.ingredientId===id&&x.location===row.location);
  if(duplicate){if(qty!==null){duplicate.qty=qty;delete duplicate.quantityNote;}duplicate.source='photo';}else next.inventory.push({...item,id:uid(),useSoon:false});
  ids.push(id);
 }
 return {...next,menuOffset:0,menuIngredientIds:[...new Set(ids)]};
}
const present=(state,id)=>state.inventory.some(x=>x.ingredientId===id&&(x.qty===null||!Number.isFinite(x.qty)||x.qty>0));
export function recipesForKitchen(state){
 const candidates=RECIPES.filter(r=>!r.pantryIngredient||present(state,r.pantryIngredient));
 // Choose the best available preparation when both fresh and canned pumpkin exist.
 const families=new Map();for(const r of candidates){const old=families.get(r.family||r.id);const a=assess(r,state),b=old&&assess(old,state);if(!old||(a.eligible&&!b.eligible)||(a.eligible===b.eligible&&a.cost<b.cost))families.set(r.family||r.id,r);}
 return [...families.values()];
}
export function specialsForKitchen(state,filter='all'){
 const focus=new Set(state.menuIngredientIds||state.inventory.filter(x=>x.source==='photo').map(x=>x.ingredientId));
 return recipesForKitchen(state).map(r=>({r,a:assess(r,state)})).map(x=>({...x,highlights:x.a.ingredients.filter(i=>focus.has(i.id)&&present(state,i.id)).map(i=>i.id)})).filter(({r,a})=>a.eligible&&(filter!=='onhand'||!a.missing.length)&&(filter!=='one'||a.missing.length===1)&&(filter!=='soon'||a.useSoon)&&(filter!=='favorites'||state.favorites.includes(r.id))).sort((A,B)=>Number(!!B.highlights.length)-Number(!!A.highlights.length)||A.a.cost-B.a.cost||Number(B.a.useSoon)-Number(A.a.useSoon));
}
export function foodsWithoutRecipes(state){
 const used=new Set(RECIPES.flatMap(r=>effectiveIngredients(r,state).ingredients.map(x=>x.id)));
 return state.inventory.filter(x=>present(state,x.ingredientId)&&!used.has(x.ingredientId));
}
export function generatePlan(state){
 const available=recipesForKitchen(state).filter(r=>assess(r,state).eligible).sort((a,b)=>{const A=assess(a,state),B=assess(b,state);return Number(B.useSoon)-Number(A.useSoon)||A.cost-B.cost;});
 if(!available.length)return [];
 let remaining=structuredClone(state);const plan=[];for(const [idx,day] of state.preferences.cookingDays.entries()){
  const rotated=[...available.slice(idx%available.length),...available.slice(0,idx%available.length)];
  rotated.sort((a,b)=>assess(a,remaining).cost-assess(b,remaining).cost);
  const r=rotated[0];const servings=state.profiles.length;plan.push({id:uid(),day,recipeId:r.id,servings,cooked:false});
  for(const line of effectiveIngredients(r,state,servings).ingredients){let qty=line.qty;for(const item of remaining.inventory.filter(x=>x.ingredientId===line.id&&Number.isFinite(x.qty))){const n=Math.min(item.qty,qty);item.qty-=n;qty-=n;}}
 }return plan;
}
