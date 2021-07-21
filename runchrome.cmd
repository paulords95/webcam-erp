
@echo off

set CHROME_EXE=c:\Program Files (x86)\Google\Chrome\Application\chrome.exe

set CHROME_SETTINGS=
set CHROME_SETTINGS=%CHROME_SETTINGS% --window-position=-1928,-40
set CHROME_SETTINGS=%CHROME_SETTINGS% --window-size=658,600
set CHROME_SETTINGS=%CHROME_SETTINGS% --app=http://localhost:3000/%1

start "" "%CHROME_EXE%" %CHROME_SETTINGS%