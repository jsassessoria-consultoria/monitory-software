# Tudo que precisa saber sobre o código de serviço

Created time: January 30, 2023 10:52 AM

# 👀 Tipo de arquivo

> É um arquivo `.bat` que será executado no windows. Arquivos `.bat` funcionam através de processamentos em lotes, ou seja, realizam script individualmente, geralmente usados para comandos repetitivos.
> 

---

# 💭 Funcionamento

> Para rodar os scripts, abra o terminal de comando do windows `cmd` navegue até a pasta onde o arquivo se encontra e passe os seguintes parâmetros
> 

```jsx
service-install.bat applicationName serviceName
```

- **service-install.bat**: O nome arquivo do seu `.bat`
- **applicationName**: O nome da aplicação desejada
- **serviceName**: O nome do serviço que você queira que seja exibido

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

SET applicationName: %1
SET ServiceName: %2

if "%1" == "" (
    ECHO usage: %~nx0 applicationName ServiceName
    exit /b 1
)

if "%2" == "" (
    ECHO usage: %~nx0 applicationName ServiceName
    exit /b 1
)

SET APP_DIR=%ProgramData%\%1\
SET SERVICENAME=%2
SET NSSM="%APP_DIR%\nssm\nssm.exe"

ECHO INSTALLING SERVICE %SERVICENAME%

%NSSM% stop %SERVICENAME%
%NSSM% remove %SERVICENAME% confirm
%NSSM% install %SERVICENAME% %SERVICENAME%

%NSSM% set %SERVICENAME% Application %APP_DIR%\build.exe
%NSSM% set %SERVICENAME% AppDirectory %APP_DIR%
%NSSM% set %SERVICENAME% Description "Node Windows Service test"
%NSSM% set %SERVICENAME% Start SERVICE_AUTO_START
%NSSM% set %SERVICENAME% AppStopMethodSkip 0
%NSSM% set %SERVICENAME% AppStopMethodConsole 0
%NSSM% set %SERVICENAME% AppStopMethodWindow 0
%NSSM% set %SERVICENAME% AppStopMethodThreads 0
%NSSM% set %SERVICENAME% AppThrottle 0
%NSSM% set %SERVICENAME% AppExit Default Ignore
%NSSM% set %SERVICENAME% AppRestartDelay 0
%NSSM% set %SERVICENAME% AppStdout %APP_DIR%\logs\%SERVICENAME%.log
%NSSM% set %SERVICENAME% AppStderr %APP_DIR%\logs\%SERVICENAME%.log

%NSSM% start %SERVICENAME% confirm
```

Timeline:

- `applicationName` e `ServiceName` são variáveis que recebem valor através do comando externo passado pelo usuário
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