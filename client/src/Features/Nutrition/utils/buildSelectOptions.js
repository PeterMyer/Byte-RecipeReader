export function buildSelectOptions(alloptions) {
  let options = alloptions.map((option, index) => {
    return {
      value: `${index}`,
      label: `${option.name}`,
    };
  });
  return options;
}
