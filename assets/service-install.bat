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

@REM ALTERAR O LOCAL DA APLICAÇÃO DEPOIS

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