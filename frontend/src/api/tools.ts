export function objectToQueryString(obj: any): string {
  const params: string[] = [];
  
  for (let key of Object.keys(obj)) {
    if (Array.isArray(obj[key])) {
      params.push(`${key}=${obj[key].join(',')}`)
    } else {
      params.push(`${key}=${obj[key]}`);
    }
  }

  return Object.keys(obj).length ? '?' + params.join('&') : '';
}