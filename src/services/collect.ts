/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import ffi from 'ffi-napi';
import ref from 'ref-napi';

const getWindowsProcesses: Promise<string[]> = () => {
  return new Promise((resolve, reject) => {
    const Library = ffi.Library;
    /**
     * Importa a lib em c++, user32 do windows ->
     * Usada para acessar informações de janelas do windows
     */

    const user32 = new Library('user32.dll', {
      EnumWindows: ['bool', ['pointer', 'int32']],
      GetWindowTextA: ['long', ['long', 'char *', 'long']],
      IsWindowVisible: ['bool', ['int32']],
      GetWindowThreadProcessId: ['long', ['int32', 'pointer']]
    });

    /**
     * Importa a lib em c++, kernel32 do windows ->
     * Usada para informações de baixo nível, gerenciamento de memória, processos e threads
     */
    const kernel32 = new Library('kernel32.dll', {
      OpenProcess: ['pointer', ['int32', 'bool', 'int32']],
      QueryFullProcessImageNameA: [
        'bool',
        ['pointer', 'int32', 'char *', 'pointer']
      ]
    });

    /**
     * Importa a lib c++ do psapi ->
     * Usada para acessar informações de processos
     */
    const psapi = new Library('psapi.dll', {
      GetModuleBaseNameA: [
        'uint32',
        ['pointer', 'pointer', 'char *', 'uint32']
      ]
    });

    const MAPPROCESSES = new Map();
    /**
     * Callback da função EnumWindows
     */
    const windowProc = ffi.Callback(
      'bool',
      ['long', 'int32'],
      function (hwnd, lParam) {
        const PROCESS_QUERY_INFORMATION = 0x0400;
        const PROCESS_VM_READ = 0x0010;

        //Verifica se tem tela visível
        if (!user32.IsWindowVisible(hwnd)) return true;

        //Recupera o PID pela janela
        const pidBuf = Buffer.alloc(10);
        user32.GetWindowThreadProcessId(hwnd, pidBuf);
        const pid = ref.readInt64LE(pidBuf, 0);

        //Abre os dados do processo de acordo com o PID
        const processHandle = kernel32.OpenProcess(
          PROCESS_QUERY_INFORMATION | PROCESS_VM_READ,
          false,
          pid
        );
        if (processHandle.isNull()) return true;

        const MAX_PATH = 260;
        //Obtem o nome do processo
        const processNameBuffer = Buffer.alloc(MAX_PATH);
        psapi.GetModuleBaseNameA(
          processHandle,
          null,
          processNameBuffer,
          MAX_PATH
        );
        const process = processNameBuffer
          .toString()
          .replace(/\0/g, '')
          .toLowerCase();

        if (process.endsWith('.exe')) {
          MAPPROCESSES.set(process, pid);
        }

        return true;
      }
    );

    user32.EnumWindows.async(windowProc, 0, (error, value) => {
      if (error) reject(error);
      const processes: string[] = [...MAPPROCESSES.keys()];
      resolve(processes);
    });
  });
};

const collectProcesses = async () => {
  try {
    const processes = await getWindowsProcesses();
    return processes;
  } catch (e) {
    console.log(e);
  }
};

export default collectProcesses;
