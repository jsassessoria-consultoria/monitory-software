!include "getProcessInfo.nsh"
!include "nsProcess.nsh"
Var pid

;Custom init to add the files in ProgramFiles\ODSSauron
!macro preInit
  SetRegView 64
  WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation $PROGRAMFILES64\${PRODUCT_NAME}
  WriteRegExpandStr HKCU "${INSTALL_REGISTRY_KEY}" InstallLocation $PROGRAMFILES64\${PRODUCT_NAME}
  SetRegView 32
  WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation $PROGRAMFILES64\${PRODUCT_NAME}
  WriteRegExpandStr HKCU "${INSTALL_REGISTRY_KEY}" InstallLocation $PROGRAMFILES64\${PRODUCT_NAME}
!macroend


;Custom install to create the task in task scheduler
!macro customInstall
  File /oname=$PLUGINSDIR\task.xml "${BUILD_RESOURCES_DIR}\task.xml"
  !define TASK_XML_FILE "$PLUGINSDIR\task.xml"
  nsExec::Exec 'cmd /c schtasks.exe /delete /TN "${PRODUCT_NAME}" /f'
  nsExec::Exec 'cmd /c schtasks.exe /create /TN "${PRODUCT_NAME}" /XML "${TASK_XML_FILE}"'
  nsExec::Exec 'cmd /c schtasks.exe /run /TN "${PRODUCT_NAME}"'
!macroend


;Custom uninstall function to stop and delete ODSSauron task before uninstall 

!macro customCheckAppRunning
${GetProcessInfo} 0 $pid $1 $2 $3 $4
  ${if} $3 != "${APP_EXECUTABLE_FILENAME}"
    ${if} ${isUpdated}
      # allow app to exit without explicit kill
      Sleep 300
    ${endIf}

    !insertmacro FIND_PROCESS "${APP_EXECUTABLE_FILENAME}" $R0
    ${if} $R0 == 0
      ${if} ${isUpdated}
        # allow app to exit without explicit kill
        Sleep 1000
        Goto doStopProcess
      ${endIf}
      MessageBox MB_OKCANCEL|MB_ICONEXCLAMATION "$(appRunning)" /SD IDOK IDOK doStopProcess
      Quit

      doStopProcess:

      DetailPrint `Closing running "${PRODUCT_NAME}"...`

      # https://github.com/electron-userland/electron-builder/issues/2516#issuecomment-372009092
      !ifdef INSTALL_MODE_PER_ALL_USERS
        nsExec::Exec 'cmd /c schtasks.exe /end /TN "${PRODUCT_NAME}"'
        nsExec::Exec 'cmd /c schtasks.exe /delete /TN "${PRODUCT_NAME}" /f'
        nsExec::Exec `taskkill /im "${APP_EXECUTABLE_FILENAME}" /fi "PID ne $pid"`
      !else
        nsExec::Exec 'cmd /c schtasks.exe /end /TN "${PRODUCT_NAME}"'
        nsExec::Exec 'cmd /c schtasks.exe /delete /TN "${PRODUCT_NAME}" /f'
        nsExec::Exec `cmd /c taskkill /im "${APP_EXECUTABLE_FILENAME}" /fi "PID ne $pid" /fi "USERNAME eq %USERNAME%"`
      !endif
      # to ensure that files are not "in-use"
      Sleep 300

      # Retry counter
      StrCpy $R1 0

      loop:
        IntOp $R1 $R1 + 1

        !insertmacro FIND_PROCESS "${APP_EXECUTABLE_FILENAME}" $R0
        ${if} $R0 == 0
          # wait to give a chance to exit gracefully
          Sleep 1000
          !ifdef INSTALL_MODE_PER_ALL_USERS
            nsExec::Exec 'cmd /c schtasks.exe /end /TN "${PRODUCT_NAME}"'
            nsExec::Exec 'cmd /c schtasks.exe /delete /TN "${PRODUCT_NAME}" /f'
            nsExec::Exec `taskkill /f /im "${APP_EXECUTABLE_FILENAME}" /fi "PID ne $pid"`
          !else
            nsExec::Exec 'cmd /c schtasks.exe /end /TN "${PRODUCT_NAME}"'
            nsExec::Exec 'cmd /c schtasks.exe /delete /TN "${PRODUCT_NAME}" /f'
            nsExec::Exec `cmd /c taskkill /f /im "${APP_EXECUTABLE_FILENAME}" /fi "PID ne $pid" /fi "USERNAME eq %USERNAME%"`
          !endif
          !insertmacro FIND_PROCESS "${APP_EXECUTABLE_FILENAME}" $R0
          ${If} $R0 == 0
            DetailPrint `Waiting for "${PRODUCT_NAME}" to close.`
            Sleep 2000
          ${else}
            Goto not_running
          ${endIf}
        ${else}
          Goto not_running
        ${endIf}

        # App likely running with elevated permissions.
        # Ask user to close it manually
        ${if} $R1 > 1
          MessageBox MB_RETRYCANCEL|MB_ICONEXCLAMATION "$(appCannotBeClosed)" /SD IDCANCEL IDRETRY loop
          Quit
        ${else}
          Goto loop
        ${endIf}
      not_running:
    ${endIf}
  ${endIf}
!macroend
