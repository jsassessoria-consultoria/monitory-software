# Tudo que precisa saber sobre o código de serviço

Created time: January 30, 2023 10:52 AM

# 👀 Tipo de arquivo

> É um arquivo `.bat` que será executado no windows. Arquivos `.bat` funcionam através de processamentos em lotes, ou seja, realizam script individualmente, geralmente usados para comandos repetitivos.
> 

---

# 💭 Funcionamento

> Para rodar os scripts, abra o terminal de comando do windows `cmd` navegue até a pasta onde o arquivo se encontra e passe os seguintes parâmetros
> 

```js
service-install.bat APPLICATION_NAME SERVICE_NAME LOCAL_URL
```

- **service-install.bat**: O nome arquivo do seu `.bat`
- **APPLICATION_NAME**: O nome da aplicação desejada
- **SERVICE_NAME**: O nome do serviço que você queira que seja exibido
- **LOCAL_URL**: A URL que irá abrir a página de registro do dispositivo

> Essa maneira de criar serviços utiliza um executável externo chamado NSSM, o nssm habilita criação de serviços através de linha de comando de forma rápida e prática.
> 

- Link de referência a criação de serviço:
    - [NodeJs: Criando um Windows Service (sem pacotes npm)](https://medium.com/filipececcon/nodejs-criando-um-windows-service-sem-pacotes-npm-7d25cc68efcf)
    
    <aside>
    💡 O código final foi alterado para receber como variáveis o nome da aplicação e serviço.
    
    </aside>
    

---

# 🛫 Código

Código atual é este:

```jsx
@ECHO OFF

SET APPLICATION_NAME=%1
SET SERVICE_NAME=%2
SET LOCAL_URL=%3

SET APP_DIR=%ProgramData%\%APPLICATION_NAME%\
SET NSSM="%APP_DIR%\nssm\nssm.exe"

if "%1" == "" (
    ECHO usage: %~nx0 APPLICATION_NAME SERVICE_NAME LOCAL_URL
    exit /b 1
)

if "%2" == "" (
    ECHO usage: %~nx0 APPLICATION_NAME SERVICE_NAME LOCAL_URL
    exit /b 1
)

if "%3" == "" (
    ECHO usage: %~nx0 APPLICATION_NAME SERVICE_NAME LOCAL_URL
    exit /b 1
)


ECHO TENTATIVA DE PARAR O SERVIÇO %SERVICE_NAME%
%NSSM% stop %SERVICE_NAME%

ECHO TENTATIVA DE REMOVER O SERVIÇO %SERVICE_NAME%
%NSSM% remove %SERVICE_NAME% confirm

ECHO INICIANDO INSTALACAO DO SERVIÇO %SERVICE_NAME%
%NSSM% install %SERVICE_NAME% %SERVICE_NAME%

@REM ALTERAR O LOCAL DA APLICAÇÃO DEPOIS

%NSSM% set %SERVICE_NAME% Application %APP_DIR%\build.exe
%NSSM% set %SERVICE_NAME% AppDirectory %APP_DIR%
%NSSM% set %SERVICE_NAME% Description "Node Windows Service test"
%NSSM% set %SERVICE_NAME% Start SERVICE_AUTO_START
%NSSM% set %SERVICE_NAME% AppStopMethodSkip 0
%NSSM% set %SERVICE_NAME% AppStopMethodConsole 0
%NSSM% set %SERVICE_NAME% AppStopMethodWindow 0
%NSSM% set %SERVICE_NAME% AppStopMethodThreads 0
%NSSM% set %SERVICE_NAME% AppThrottle 0
%NSSM% set %SERVICE_NAME% AppExit Default Ignore
%NSSM% set %SERVICE_NAME% AppRestartDelay 0
%NSSM% set %SERVICE_NAME% AppStdout %APP_DIR%\logs\%SERVICE_NAME%.log
%NSSM% set %SERVICE_NAME% AppStderr %APP_DIR%\logs\%SERVICE_NAME%.log
%NSSM% set %SERVICE_NAME% AppStdoutCreationDisposition 4
%NSSM% set %SERVICE_NAME% AppStderrCreationDisposition 4
%NSSM% set %SERVICE_NAME% AppRotateFiles 1
%NSSM% set %SERVICE_NAME% AppRotateOnline 0
%NSSM% set %SERVICE_NAME% AppRotateSeconds 3600
%NSSM% set %SERVICE_NAME% AppRotateBytes 524288
%NSSM% set %SERVICE_NAME% AppNoConsole  1

%NSSM% start %SERVICE_NAME% confirm
START %LOCAL_URL%
```

Timeline:

- `APPLICATION_NAME`, `SERVICE_NAME` e `LOCAL_URL` são variáveis que recebem valor através do comando externo passado pelo usuário
- Define o diretório da aplicação como: `C:\ProgramData\<applicationName>`
- Para o serviço (se existir)
- Remove o serviço  (se existir)
- Instala o serviço
- Define o script que o serviço irá rodar → `Application`
- Define o diretório de inicialização do serviço → `AppDirectory`
- Define uma descrição do serviço → `description`
- Define modos de inicialização ( nesse caso como iniciar automaticamente ) → `Start`
- Algumas configurações de tempo e metodos de parada → `AppStop..` , `AppRestart..`
- Define a pasta que irá colocar os logs que nossa aplicação gerar → `AppStdout` e `AppSderr`
- `START %LOCAL_URL%` chama o navegador padrão do usuário abrindo o valor da variável `LOCAL_URL` -> Se `LOCAL_URL` = `www.google.com`, o navegador abrirá no Google