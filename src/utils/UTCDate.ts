const UTCDate = () => {
  const now = new Date();
  const now_utc = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds(),
    now.getUTCMilliseconds()
  );
  return new Date(now_utc).toISOString();
};

export { UTCDate };
