@ECHO OFF

SET SERVICE_NAME=%1
SET NSSM="%CD%\nssm\nssm.exe"

if "%1" == "" (
    ECHO usage: %~nx0 SERVICE_NAME
    exit /b 1
)


ECHO REMOVING SERVICE %SERVICE_NAME%

%NSSM% stop %SERVICE_NAME%
%NSSM% remove %SERVICE_NAME% confirm