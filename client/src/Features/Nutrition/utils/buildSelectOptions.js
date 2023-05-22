export function buildSelectOptions(alloptions) {
  const optionsSet = new Set();

  let options = alloptions.map((option, index) => {
    if (optionsSet.has(option.name)) {
      return {};
    }
    optionsSet.add(option.name);
    return { value: `${index}`, label: `${option.name}` };
  });
  options = options.filter((option) => Object.entries(option).length > 0);
  return options;
}
