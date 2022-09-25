export function objectToQueryString(obj: any): string {
  const params: string[] = [];
  
  for (let key of Object.keys(obj)) {
    params.push(`${key}=${obj[key]}`);
  }

  return Object.keys(obj).length ? '?' + params.join('&') : '';
}