REG ADD "HKCU\Software\Google\Chrome\NativeMessagingHosts\transi.nmancie.revenant" /ve /t REG_SZ /d "%~dp0revenant.json" /f
REG ADD "HKLM\SOFTWARE\Policies\Microsoft\Edge" /ve /t REG_SZ /f
REG ADD "HKLM\SOFTWARE\Policies\Microsoft\Edge" /v "InternetExplorerIntegrationLevel" /t REG_DWORD /d 1 /f
REG ADD "HKLM\SOFTWARE\Policies\Microsoft\Edge" /v "InternetExplorerIntegrationSiteList" /t REG_SZ /d "%~dp0sites.xml" /f
