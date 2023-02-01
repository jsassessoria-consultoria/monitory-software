@ECHO OFF

SET ServiceName: %1

if "%1" == "" (
    ECHO usage: %~nx0 ServiceName
    exit /b 1
)

SET SERVICENAME=%1
SET NSSM="%CD%\nssm\nssm.exe"

ECHO REMOVING SERVICE %SERVICENAME%

%NSSM% stop %SERVICENAME%
%NSSM% remove %SERVICENAME% confirm