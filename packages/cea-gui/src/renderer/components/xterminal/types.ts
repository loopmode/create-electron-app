export type KeyValueType = 'string' | 'text' | 'file' | 'folder';

export interface KeyValueItem {
  id: string;
  key: string;
  value: string;
  type: KeyValueType;
}

export interface Command {
  id: string;
  cwd: string;
  executable: string;
  args?: KeyValueItem[];
  env?: KeyValueItem[];
}
