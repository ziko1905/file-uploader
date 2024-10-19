module.exports = (name) => {
  const index = name.indexOf(".");
  if (index == -1) {
    return null;
  }
  return name.slice(name.indexOf("."));
};
