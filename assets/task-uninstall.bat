@ECHO OFF

SET TASK_NAME=%1
SET NSSM="%CD%\nssm\nssm.exe"

if "%1" == "" (
    ECHO usage: %~nx0 TASK_NAME
    exit /b 1
)


ECHO TENTATIVA DE PARAR E DELETAR A TASK %TASK_NAME%
schtasks /delete /tn %TASK_NAME% /f || ECHO TASK INEXISTENTE