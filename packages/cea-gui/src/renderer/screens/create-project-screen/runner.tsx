import React from 'react';
import path from 'path';
import * as pty from 'node-pty';

import { createCLICommand } from './utils';

import { platform } from 'os';
import treeKill from 'tree-kill';
import { FormValueTypes } from './schema';

export interface PtyOptions {
  shell: string;
  cols: number;
  rows: number;
  cwd?: string;
  env?: { [key: string]: string };
}
export const defaults = {
  shell: platform() === 'win32' ? 'bash.exe' : '/bin/bash',
  cols: 120,
  rows: 80
};

export function useRunner(options: Partial<PtyOptions> = {}) {
  const [ptyProcess, setPtyProcess] = React.useState<pty.IPty | null>(null);
  const settings = { ...defaults, ...options };

  function execute(values: FormValueTypes) {
    console.log('>> execute', createCLICommand(values, ['cwd']));

    if (ptyProcess) {
      kill(ptyProcess.pid);
    }
    const command = createCLICommand(values, ['cwd']);
    const cwd = path.resolve(values.cwd as string);

    const p = pty.spawn(settings.shell, [], {
      cols: settings.cols,
      rows: settings.rows,
      env: { ...(process.env as any), ...(values.env as any) },
      cwd
    });

    p.write(command);
    p.write('\n');
    // console.log({ command });
    setPtyProcess(p);
  }

  function kill(pid: number) {
    if (pid) {
      treeKill(pid, platform() === 'win32' ? undefined : 'SIGKILL');
    }
  }

  return { ptyProcess, execute, kill };
}
