import test from 'node:test';
import assert from 'node:assert/strict';
import {seedState,RECIPES,recipeById,assess,groceries,requirements,consumeMeal,addInventory,generatePlan,lockDelta,qtyAvailable,findIngredient,normalizeKitchen,confirmPhotoIngredients,specialsForKitchen,foodsWithoutRecipes} from '../lib/kitchen.mjs';

test('an unknown quantity cannot qualify a meal as fully on hand',()=>{
 const s=seedState();s.inventory.find(x=>x.ingredientId==='pasta').qty=null;
 const a=assess(recipeById('tomato-rigatoni'),s);
 assert(a.missing.some(x=>x.id==='pasta'));assert(a.unknown.some(x=>x.id==='pasta'));
});
test('additional spending buys whole packs rather than pricing only consumed grams',()=>{
 const s=seedState();s.inventory.find(x=>x.ingredientId==='pasta').qty=100;
 s.plan=[{recipeId:'tomato-rigatoni',servings:2,cooked:false}];
 const pasta=groceries(s).find(x=>x.id==='pasta');
 assert.equal(pasta.missing,80);assert.equal(pasta.packages,1);assert.equal(pasta.buyQty,500);assert.equal(pasta.cost,1.19);
});
test('two dinners compete for the same stock and combined requirements are counted once',()=>{
 const s=seedState();s.plan=[{recipeId:'tomato-rigatoni',servings:2},{recipeId:'tomato-rigatoni',servings:2},{recipeId:'tomato-rigatoni',servings:2}];
 const pasta=groceries(s).find(x=>x.id==='pasta');assert.equal(pasta.missing,40);assert.equal(pasta.packages,1);
 const tomato=requirements(s).find(x=>x.id==='tomatoes');assert.equal(tomato.qty,1200);
});
test('mixed households preserve meat servings and substitute only the vegetarian share',()=>{
 const s=seedState();s.profiles[0].diets=['vegetarian'];
 const a=assess(recipeById('chicken-rice'),s);
 assert.equal(a.ingredients.find(x=>x.id==='chicken').qty,200);assert.equal(a.ingredients.find(x=>x.id==='chickpeas').qty,200);
 assert.equal(a.adaptations.length,1);assert.equal(a.adaptations[0].person,'Adult 1');
});
test('diet combinations are respected for each person',()=>{
 const s=seedState();s.profiles[0].diets=['vegan','gluten-free'];
 const a=assess(recipeById('tomato-rigatoni'),s);
 assert(a.ingredients.some(x=>x.id==='gf_pasta'));assert(a.ingredients.some(x=>x.id==='yeast'));
 assert.equal(a.ingredients.find(x=>x.id==='pasta').qty,90);assert.equal(a.ingredients.find(x=>x.id==='parmesan').qty,15);
});
test('larger portions increase requirements rather than redistribute fixed food',()=>{
 const s=seedState();s.profiles[0].portion=1.5;
 const a=assess(recipeById('tomato-rigatoni'),s);assert.equal(a.ingredients.find(x=>x.id==='pasta').qty,225);
});
test('cooking consumes exact stock and refuses missing ingredients without mutating state',()=>{
 const s=seedState();const r=recipeById('tomato-rigatoni');const n=consumeMeal(s,r,2);
 assert.equal(qtyAvailable(n,'pasta'),320);assert.equal(qtyAvailable(s,'pasta'),500);assert.equal(n.cooked.length,1);
 const before=JSON.stringify(s);assert.throws(()=>consumeMeal(s,recipeById('white-beans'),2));assert.equal(JSON.stringify(s),before);
});
test('buying missing items clears the grocery requirement',()=>{
 const s=seedState();s.plan=[{recipeId:'chicken-rice',servings:2}];const item=groceries(s).find(x=>x.id==='lemon');
 const n=addInventory(s,item.id,item.buyQty,'Fridge','shopping');assert.equal(groceries(n).length,0);
});
test('the generated week respects selected cooking days and available equipment',()=>{
 const s=seedState();s.preferences.cookingDays=[0,2,5,6];s.preferences.equipment=['Stove'];
 const plan=generatePlan(s);assert.deepEqual(plan.map(x=>x.day),[0,2,5,6]);assert(plan.every(x=>x.recipeId!=='chicken-rice'));
});
test('locked-week changes include household-driven ingredient substitutions',()=>{
 const s=seedState();s.plan=[{recipeId:'chicken-rice',servings:2}];s.lock={plan:structuredClone(s.plan),profiles:structuredClone(s.profiles)};
 const next=structuredClone(s);next.profiles[0].diets=['vegetarian'];const delta=lockDelta(s,next.plan,next);
 assert.equal(delta.find(x=>x.id==='chicken').after,200);assert.equal(delta.find(x=>x.id==='chickpeas').after,200);
});

test('the saved pumpkin photo label becomes usable without reuploading or inventing a can weight',()=>{
 const s=seedState(true);s.menuOffset=1;s.photos=[{id:'saved-photo',url:'/api/photos/saved-photo',location:'Fridge'}];
 s.inventory=[{id:'saved-item',ingredientId:'custom__pure_pumpkin_',qty:1,location:'Fridge',source:'photo',name:'% Pure Pumpkin.',unit:'each'}];
 const n=normalizeKitchen(s);assert.equal(n.inventory[0].ingredientId,'pumpkin_puree');assert.equal(n.inventory[0].qty,null);assert.match(n.inventory[0].quantityNote,/Previously entered as 1 each/);
 assert.deepEqual(n.photos,s.photos);assert.equal(s.inventory[0].qty,1);assert.equal(normalizeKitchen(n),n);
 const specials=specialsForKitchen(n);assert.equal(specials.length,9);assert(specials.slice(0,3).every(x=>x.r.pantryIngredient==='pumpkin_puree'));
 assert(specials.slice(0,3).every(x=>x.a.unknown.some(i=>i.id==='pumpkin_puree')));assert.equal(foodsWithoutRecipes(n).length,0);
 assert(!specialsForKitchen(n,'onhand').some(x=>x.r.pantryIngredient==='pumpkin_puree'));
});
test('pumpkin labels match plain purée separately from fresh pumpkin and sweetened pie filling',()=>{
 for(const label of ['% Pure Pumpkin.','100% Pure Pumpkin','Canned Pumpkin','Pumpkin Purée','Libby’s 100% Pure Pumpkin'])assert.equal(findIngredient(label),'pumpkin_puree',label);
 assert.equal(findIngredient('Pumpkin'),'pumpkin');assert.equal(findIngredient('pumpkin pie filling'),null);assert.equal(findIngredient('sweetened pumpkin purée'),null);
});
test('confirming photo ingredients immediately refreshes specials while overlapping photos do not double stock',()=>{
 let s=seedState();const before=specialsForKitchen(s);assert(!before.some(x=>x.r.pantryIngredient==='pumpkin_puree'));
 const row={include:true,ingredientId:'pumpkin_puree',name:'100% Pure Pumpkin',qty:'425',location:'Pantry'};
 const n=confirmPhotoIngredients(s,[row]);assert.equal(qtyAvailable(n,'pumpkin_puree'),425);assert.equal(specialsForKitchen(n)[0].r.pantryIngredient,'pumpkin_puree');
 assert(specialsForKitchen(n,'onhand').some(x=>x.r.id==='pumpkin-pasta'));assert(!specialsForKitchen(n,'onhand').some(x=>x.r.id==='pumpkin-soup'));
 const repeated=confirmPhotoIngredients(n,[row]);assert.equal(qtyAvailable(repeated,'pumpkin_puree'),425);assert.equal(repeated.inventory.filter(x=>x.ingredientId==='pumpkin_puree').length,1);
 const planned={...n,plan:[{recipeId:'pumpkin-pasta',servings:2}]};assert(!groceries(planned).some(x=>x.id==='pumpkin_puree'));const cooked=consumeMeal(n,recipeById('pumpkin-pasta'),2);assert.equal(qtyAvailable(cooked,'pumpkin_puree'),175);
});
test('unconfirmed pantry amounts are checks rather than instructions to buy the food again',()=>{
 const s=seedState(true);s.inventory=[{id:'pumpkin',ingredientId:'pumpkin_puree',qty:null,location:'Pantry'}];s.plan=[{recipeId:'pumpkin-soup',servings:2}];
 const line=groceries(s).find(x=>x.id==='pumpkin_puree');assert.equal(line.needsConfirmation,true);assert.equal(line.buyQty,0);assert.equal(line.cost,0);assert.throws(()=>consumeMeal(s,recipeById('pumpkin-soup'),2));
});
test('fresh pumpkin gets the correct preparation and unsupported foods are explicitly discoverable',()=>{
 const s=seedState(true);s.inventory=[{id:'pumpkin',ingredientId:'pumpkin',qty:800,location:'Pantry',source:'photo'}];
 const specials=specialsForKitchen(s);assert(specials.slice(0,3).every(x=>x.r.pantryIngredient==='pumpkin'));assert.match(specials[0].r.steps[0],/Peel and deseed/);
 s.inventory.push({id:'unknown',ingredientId:'custom_kohlrabi',name:'Kohlrabi',qty:1,unit:'each',location:'Fridge'});assert.equal(foodsWithoutRecipes(s)[0].name,'Kohlrabi');
});
