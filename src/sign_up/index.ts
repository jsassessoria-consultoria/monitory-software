import readlineSync from 'readline-sync';

export function signup() {
  let result: {
    name: string;
    token: number;
    local: string;
    register: string;
  };

  // eslint-disable-next-line prefer-const
  result = { name: '', token: 0, local: '', register: '' };
  result.name = readlineSync.question(
    'qual o nome do seu dispositivo? '
  );
  result.local = readlineSync.question(
    'digite o nome do local onde o dispositivo se encontra? '
  );

  result.token = Date.now();

  result.register = 'programas solicitados';

  console.log(result);
}
