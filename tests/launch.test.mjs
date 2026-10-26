import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {CATALOG, RECIPES, recipeProblems, DIET_SUPPORT, applyCurrencyChange, spendingSummary, seedState, assess, recipeById, requirements, groceries, consumeMeal, qtyAvailable, findIngredient, SAVINGS_MEANING} from '../lib/kitchen.mjs';
import {parseRecognitionLines, RECOGNITION_DISCLAIMER} from '../lib/recognition.mjs';
import {pushHistory, undo} from '../lib/history.mjs';
import {accountIdForToken, newDeviceToken, parseBearer, photoObjectKey, chooseKitchen, assertConsumerAccount} from '../lib/account.mjs';
import {createKitchenService, createMemoryStore} from '../lib/kitchen-api.mjs';
import {createMemoryKv, deviceAccount} from '../lib/device-store.mjs';
import {entitlementFromStore, paywallModel, PLUS_MONTHLY} from '../lib/entitlements.mjs';
import {verifyAppleIdentityToken, signTestIdentityToken, APPLE_AUDIENCE} from '../lib/apple-identity.mjs';
import {normalizeImport} from '../lib/kitchen-schema.mjs';

test('the launch library meets the proposed coverage bar and every recipe accounts', () => {
  assert.ok(CATALOG.length >= 100);
  assert.ok(RECIPES.length >= 100);
  assert.deepEqual(recipeProblems(), []);
  assert.ok(RECIPES.filter(recipe => recipe.imageTreatment === 'standard-dish').length >= 50);
  assert.ok(RECIPES.some(recipe => recipe.imageTreatment === 'photo' && recipe.image.endsWith('.webp')));
});

test('dietary swaps are explicit and unsupported medical diets are named', () => {
  const state = seedState();
  state.profiles[0].diets = ['vegetarian'];
  const beef = assess(recipeById('beef-pepper-skillet'), state);
  assert.equal(beef.ingredients.find(item => item.id === 'ground_beef').qty, 150);
  assert.equal(beef.ingredients.find(item => item.id === 'lentils').qty, 150);
  state.profiles[0].diets = ['vegan', 'gluten-free'];
  const oats = assess(recipeById('banana-oats'), state);
  assert.ok(oats.ingredients.some(item => item.id === 'gf_oats'));
  assert.ok(oats.ingredients.some(item => item.id === 'oat_milk'));
  assert.ok(oats.ingredients.some(item => item.id === 'sugar'));
  assert.ok(DIET_SUPPORT.unsupported.includes('peanut-free'));
  assert.match(DIET_SUPPORT.note, /not an allergen-safety guarantee/);
});

test('changing currency clears prices instead of relabeling dollars', () => {
  const state = seedState();
  state.prices.pasta = 3;
  const next = applyCurrencyChange(state, 'GBP');
  assert.deepEqual(next.prices, {});
  assert.equal(next.preferences.currency, 'GBP');
  next.plan = [{recipeId: 'tomato-rigatoni', servings: 2}];
  next.inventory.find(item => item.ingredientId === 'pasta').qty = 0;
  const line = groceries(next).find(item => item.id === 'pasta');
  assert.equal(line.cost, null);
  const summary = spendingSummary(next);
  assert.equal(summary.comparison, 'incomplete');
  assert.match(SAVINGS_MEANING, /does not show money saved/);
});

test('a locked recipe snapshot keeps the quantities the shopper accepted', () => {
  const state = seedState();
  state.plan = [{recipeId: 'tomato-rigatoni', servings: 2, recipeSnapshot: {revision: 99, ingredients: [{id: 'pasta', qty: 10}], baseServings: 2, equipment: ['Stove'], time: 25}}];
  assert.equal(requirements(state).find(item => item.id === 'pasta').qty, 10);
});

test('recognition text never invents a quantity and empty scans add nothing', () => {
  assert.deepEqual(parseRecognitionLines(''), []);
  assert.deepEqual(parseRecognitionLines('Here are the foods:\n- Pumpkin purée\n- pumpkin purée\n1. Lemon'), ['Pumpkin purée', 'Lemon']);
  assert.match(RECOGNITION_DISCLAIMER, /does not present recognition text as fact/);
  assert.equal(findIngredient('pumpkin pie filling'), null);
});

test('cooking never drives stock negative', () => {
  const state = seedState();
  const next = consumeMeal(state, recipeById('tomato-rigatoni'), 2);
  assert.ok([...new Set(next.inventory.map(item => item.ingredientId))].every(id => qtyAvailable(next, id) >= 0));
  const history = pushHistory([], state, 'before cook');
  const reverted = undo(history);
  assert.equal(reverted.snapshot, state);
  assert.equal(undo(reverted.history).snapshot, null);
});

test('two accounts cannot read or delete each other’s kitchen or photos', async () => {
  const service = createKitchenService(createMemoryStore());
  const first = await accountIdForToken(newDeviceToken());
  const second = await accountIdForToken(newDeviceToken());
  const alpha = seedState(true);
  alpha.inventory = [{id: 'a', ingredientId: 'rice', qty: 10, location: 'Pantry'}];
  const bravo = seedState(true);
  bravo.inventory = [{id: 'b', ingredientId: 'pasta', qty: 10, location: 'Pantry'}];
  assert.equal((await service.putKitchen(first, {state: alpha, revision: 0}, 'save-1')).revision, 1);
  assert.equal((await service.putKitchen(first, {state: alpha, revision: 0}, 'save-1')).revision, 1);
  assert.equal((await service.putKitchen(second, {state: bravo, revision: 0})).revision, 1);
  assert.equal((await service.getKitchen(first)).state.inventory[0].ingredientId, 'rice');
  assert.equal((await service.getKitchen(second)).state.inventory[0].ingredientId, 'pasta');
  const photo = await service.addPhoto(first, {bytes: new TextEncoder().encode('first-household'), type: 'image/jpeg', location: 'Fridge'});
  assert.equal((await service.readPhoto(second, photo.photo.id)).status, 404);
  assert.equal((await service.removePhoto(second, photo.photo.id)).status, 404);
  assert.equal((await service.readPhoto(first, photo.photo.id)).status, 200);
  assert.throws(() => photoObjectKey('owner-kitchen', photo.photo.id));
  assert.throws(() => assertConsumerAccount('owner-kitchen'));
});

test('account deletion removes the kitchen and a replay does not restore it', async () => {
  const service = createKitchenService(createMemoryStore());
  const account = await accountIdForToken(newDeviceToken());
  await service.putKitchen(account, {state: seedState(true), revision: 0});
  await service.addPhoto(account, {bytes: new Uint8Array([1, 2, 3, 4]), type: 'image/png', location: 'Pantry'});
  assert.equal((await service.deleteAccount(account)).deleted, true);
  assert.equal((await service.getKitchen(account)).status, 410);
  assert.equal((await service.putKitchen(account, {state: seedState(true), revision: 0})).status, 410);
});

test('device storage keeps a dirty local kitchen ahead of an older account copy', async () => {
  const account = deviceAccount(createMemoryKv());
  const token = await account.token();
  assert.equal(parseBearer('Bearer ' + token), token);
  assert.equal(await account.token(), token);
  const local = {state: seedState(true), revision: 2, dirty: true};
  const choice = chooseKitchen({local, remote: {state: seedState(), revision: 9}});
  assert.equal(choice.source, 'device');
  const round = normalizeImport(JSON.stringify(seedState()));
  assert.equal(round.ok, true);
  assert.equal(normalizeImport('{"inventory":[]}').ok, false);
  await account.clearAccount();
  assert.notEqual(await account.token(), token);
});

test('StoreKit entitlements ignore a client-side paid flag', () => {
  assert.equal(entitlementFromStore([{paid: true, productId: PLUS_MONTHLY}]).plus, false);
  const future = Date.now() + 60_000;
  assert.equal(entitlementFromStore([{verified: true, productId: PLUS_MONTHLY, expiresAt: future}]).plus, true);
  assert.equal(entitlementFromStore([{verified: true, productId: PLUS_MONTHLY, expiresAt: Date.now() - 1000}]).plus, false);
  assert.equal(paywallModel([]).available, false);
  assert.match(paywallModel([{productId: PLUS_MONTHLY, displayPrice: '$2.99', period: 'month'}]).message, /does not stop billing/);
});

test('Sign in with Apple tokens are checked for signature, audience and nonce', async () => {
  const pair = await crypto.subtle.generateKey({name: 'ECDSA', namedCurve: 'P-256'}, true, ['sign', 'verify']);
  const privateJwk = await crypto.subtle.exportKey('jwk', pair.privateKey);
  const publicJwk = await crypto.subtle.exportKey('jwk', pair.publicKey);
  publicJwk.kid = 'test-key';
  const nonce = 'kitchen-nonce';
  const token = await signTestIdentityToken({privateJwk, kid: 'test-key', sub: 'apple-subject', nonce});
  const good = await verifyAppleIdentityToken(token, {keys: [publicJwk], nonce});
  assert.equal(good.ok, true);
  assert.equal(good.sub, 'apple-subject');
  const wrongAudience = await signTestIdentityToken({privateJwk, kid: 'test-key', sub: 'apple-subject', audience: 'com.example.other'});
  assert.equal((await verifyAppleIdentityToken(wrongAudience, {keys: [publicJwk]})).ok, false);
  assert.equal(APPLE_AUDIENCE, 'com.cagefreecapital.pshop');
});

test('the recognition worker does not import executable code from a CDN', () => {
  const worker = readFileSync(new URL('../public/inventory-worker.js', import.meta.url), 'utf8');
  assert.doesNotMatch(worker, /jsdelivr|cdn\.jsdelivr|huggingface\.co\/HuggingFaceTB/);
  assert.match(worker, /allowRemoteModels\s*=\s*false/);
  assert.match(worker, /\/vendor\/transformers\/transformers\.js/);
  assert.match(worker, /wasmPaths = '\/vendor\/transformers\/'/);
});
