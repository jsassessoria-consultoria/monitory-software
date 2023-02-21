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