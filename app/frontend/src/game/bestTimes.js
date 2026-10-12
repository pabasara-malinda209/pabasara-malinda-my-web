const KEY = "drive-best-times";

export const getBest = (vehicleId) => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}")?.[vehicleId] ?? null;
  } catch {
    return null;
  }
};

export const saveBest = (vehicleId, time) => {
  const prev = getBest(vehicleId);
  if (prev !== null && prev <= time) return false;
  try {
    const all = JSON.parse(localStorage.getItem(KEY) || "{}");
    localStorage.setItem(KEY, JSON.stringify({ ...all, [vehicleId]: time }));
  } catch {
    return false;
  }
  return true;
};
