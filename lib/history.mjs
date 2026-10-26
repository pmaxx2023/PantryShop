export function pushHistory(history, snapshot, label) {
  return [...(history || []), {label, snapshot}].slice(-20);
}
export function undo(history) {
  const list = history || [];
  if (!list.length) return {history: list, snapshot: null, label: null};
  const last = list[list.length - 1];
  return {history: list.slice(0, -1), snapshot: last.snapshot, label: last.label};
}
