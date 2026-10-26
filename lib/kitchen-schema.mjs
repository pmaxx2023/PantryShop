const LOCATIONS = new Set(['Fridge', 'Freezer', 'Pantry']);
const DIETS = new Set(['vegetarian', 'vegan', 'gluten-free', 'dairy-free']);
const PORTIONS = new Set([0.5, 1, 1.5, 2]);

function bad(errors, message) { errors.push(message); }

export function validateKitchen(state) {
  const errors = [];
  if (!state || typeof state !== 'object' || Array.isArray(state)) return ['Kitchen data must be an object.'];
  if (state.version != null && state.version !== 1) bad(errors, 'Unsupported kitchen version.');
  if (!Array.isArray(state.inventory) || state.inventory.length > 1500) bad(errors, 'Inventory is missing or too large.');
  if (!Array.isArray(state.plan) || state.plan.length > 100) bad(errors, 'Plan is missing or too large.');
  if (!Array.isArray(state.profiles) || state.profiles.length < 1 || state.profiles.length > 12) bad(errors, 'Household must contain 1 to 12 people.');
  if (!state.preferences || typeof state.preferences !== 'object') bad(errors, 'Preferences are missing.');
  for (const item of state.inventory || []) {
    if (!item || typeof item.id !== 'string' || typeof item.ingredientId !== 'string') { bad(errors, 'An inventory row is missing its id.'); break; }
    if (item.qty != null && (!Number.isFinite(item.qty) || item.qty < 0)) { bad(errors, 'An inventory quantity is not a finite amount.'); break; }
    if (item.location && !LOCATIONS.has(item.location)) { bad(errors, 'An inventory location is not Fridge, Freezer or Pantry.'); break; }
  }
  for (const person of state.profiles || []) {
    if (!person || typeof person.name !== 'string' || person.name.length > 40) { bad(errors, 'A household name is missing or too long.'); break; }
    if (!PORTIONS.has(Number(person.portion))) { bad(errors, 'A portion size is not supported.'); break; }
    if ((person.diets || []).some(diet => !DIETS.has(diet))) { bad(errors, 'A dietary preference is not supported.'); break; }
  }
  if (state.prices && typeof state.prices === 'object') {
    for (const value of Object.values(state.prices)) {
      if (!Number.isFinite(value) || value < 0) { bad(errors, 'A package price is not a finite amount.'); break; }
    }
  }
  if (state.photos && !Array.isArray(state.photos)) bad(errors, 'Photos must be a list.');
  if ((state.photos || []).length > 400) bad(errors, 'Too many photo records.');
  return errors;
}

export function normalizeImport(raw) {
  let data = raw;
  if (typeof raw === 'string') {
    if (raw.length > 900000) return {ok: false, errors: ['That file is too large.']};
    try { data = JSON.parse(raw); } catch { return {ok: false, errors: ['That file is not valid JSON.']}; }
  }
  const errors = validateKitchen(data);
  if (errors.length) return {ok: false, errors};
  return {ok: true, state: data};
}
