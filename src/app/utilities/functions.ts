export function deepCopy(source: any): any {
  if (typeof source !== 'object')
    return source;
  if (Array.isArray(source)) {
    let output: any[] = [];
    source.forEach(e => {
      output.push(deepCopy(e));
    });
    return output;
  }
  else {
    let output = Object.create(source);
    Object.getOwnPropertyNames(source).forEach(e => {
      let item = source[e];
      output[e] = deepCopy(item);
    });
    return output;
  }
}