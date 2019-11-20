import { KeyValueItem } from './types';

export function kv2obj(...items: KeyValueItem[]): { [key: string]: string } {
  return items.reduce((result, kv) => Object.assign(result, { [kv.key]: kv.value }), {});
}
