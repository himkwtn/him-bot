// check the message starts with the correct prefix and trim it off
export const checkMessagePrefix = (prefix: string, message: string) => {
  const hasPrefix = message.startsWith(prefix);
  if (!hasPrefix) throw new Error('Incorrect Prefix');
  return message.replace(prefix, '').trim();
};
