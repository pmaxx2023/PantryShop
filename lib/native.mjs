export function capacitor() {
  return globalThis.Capacitor || null;
}

export async function hapticSelection() {
  const haptics = capacitor()?.Plugins?.Haptics;
  if (haptics?.impact) {
    await haptics.impact({style: 'LIGHT'});
    return 'native';
  }
  return 'unavailable';
}

export async function shareText({title, text}) {
  const share = capacitor()?.Plugins?.Share;
  if (share?.share) {
    await share.share({title, text, dialogTitle: title});
    return 'native';
  }
  if (typeof navigator !== 'undefined' && navigator.share) {
    await navigator.share({title, text});
    return 'web';
  }
  return 'copy';
}

export async function captureFromCamera() {
  const camera = capacitor()?.Plugins?.Camera;
  if (!camera?.getPhoto) return {ok: false, reason: 'camera-unavailable'};
  const photo = await camera.getPhoto({quality: 85, allowEditing: false, resultType: 'uri', source: 'CAMERA', correctOrientation: true, saveToGallery: false});
  return {ok: true, webPath: photo.webPath || photo.path || null};
}

export async function secureSet(key, value) {
  const secure = capacitor()?.Plugins?.SecureStoragePlugin;
  if (!secure?.set) return {ok: false, reason: 'keychain-plugin-missing'};
  await secure.set({key, value});
  return {ok: true, storage: 'keychain'};
}

export async function secureGet(key) {
  const secure = capacitor()?.Plugins?.SecureStoragePlugin;
  if (!secure?.get) return {ok: false, reason: 'keychain-plugin-missing'};
  const result = await secure.get({key});
  return {ok: true, value: result?.value ?? null};
}

export async function setKeepAwake(enabled) {
  if (typeof navigator === 'undefined' || !navigator.wakeLock) return {ok: false, reason: 'unsupported'};
  if (!enabled) return {ok: true, mode: 'off'};
  const sentinel = await navigator.wakeLock.request('screen');
  return {ok: true, mode: 'on', release: () => sentinel.release()};
}
