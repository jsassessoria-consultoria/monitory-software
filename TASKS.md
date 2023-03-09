# Tudo que precisa saber sobre o código de task

Created time: January 30, 2023 10:52 AM

# 👀 Tipo de arquivo

> É um arquivo `.bat` que será executado no windows. Arquivos `.bat` funcionam através de processamentos em lotes, ou seja, realizam script individualmente, geralmente usados para comandos repetitivos.
> 

---

# 💭 Funcionamento

> Para rodar os scripts, abra o terminal de comando do windows `cmd` navegue até a pasta onde o arquivo se encontra e passe os seguintes parâmetros
> 

```js
task-install.bat APPLICATION_NAME TASK_NAME LOCAL_URL
```

- **task-install.bat**: O nome arquivo do seu `.bat`
- **APPLICATION_NAME**: O nome da aplicação desejada
- **TASK_NAME**: O nome da task que você queira que seja exibido
- **LOCAL_URL**: A URL que irá abrir a página de registro do dispositivo

- Link de referência a criação de tarefas do windows:
    - [Comandos schtasks (criação/deleção/pesquisa/execução de tarefas windows)](https://learn.microsoft.com/pt-br/windows-server/administration/windows-commands/schtasks)

---

# 🛫 Código

Código atual é este:

```jsx
@ECHO OFF

SET APPLICATION_NAME=%1
SET TASK_NAME=%2
SET LOCAL_URL=%3

SET APP_DIR=%ProgramData%\%APPLICATION_NAME%\
SET NSSM="%APP_DIR%\nssm\nssm.exe"

if "%1" == "" (
    ECHO missing APPLICATION_NAME
    ECHO usage: %~nx0 APPLICATION_NAME TASK_NAME LOCAL_URL
    exit /b 1
)

if "%2" == "" (
    ECHO missing TASK_NAME
    ECHO usage: %~nx0 APPLICATION_NAME TASK_NAME LOCAL_URL
    exit /b 1
)

if "%3" == "" (
    ECHO missing LOCAL_URL
    ECHO usage: %~nx0 APPLICATION_NAME TASK_NAME LOCAL_URL
    exit /b 1
)


ECHO TENTATIVA DE PARAR E DELETAR A TASK %TASK_NAME%
schtasks /delete /tn %TASK_NAME% /f || ECHO TASK INEXISTENTE


ECHO TENTATIVA DE CRIAR A TASK %TASK_NAME%
schtasks /create /xml %APP_DIR%\task.xml /tn %TASK_NAME%

ECHO INICIANDO INICIAR A TASK %TASK_NAME%
schtasks /run /tn %TASK_NAME%
```

Timeline:

- `APPLICATION_NAME`, `TASK_NAME` e `LOCAL_URL` são variáveis que recebem valor através do comando externo passado pelo usuário
- Define o diretório da aplicação como: `C:\ProgramData\<applicationName>`
- Para a task (se existir)
- Remove a task  (se existir)
- Cria a task
- Executa a task