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
