@echo off
chcp 65001 >nul
cd /d "%~dp0"
title Python Zero-Basis Course Launcher

rem ============================================================
rem  Python Zero-Basis Course - local learning platform launcher.
rem  Double-click this file to start the dev server and open the browser.
rem  Stop the server: close this window, or press Ctrl+C.
rem ============================================================

set "PORT=5173"

rem 1) If a server is already running on the port, just open the browser
>nul 2>&1 netstat -ano | findstr /C:":%PORT%" | findstr /C:"LISTENING"
if not errorlevel 1 goto open

rem 2) Install deps on first run
if exist "node_modules" goto start
echo [Setup] First run - installing dependencies, please wait...
call npm install
if errorlevel 1 goto installdie

:start
echo.
echo ============================================================
echo    Python Zero-Basis Course
echo    Starting local server... browser will open automatically.
echo    If it does not, visit  http://127.0.0.1:%PORT%
echo    Phone access: scan the QR code shown below.
echo    Stop server: close this window or press Ctrl+C.
echo ============================================================
echo.

call npm run dev -- --open
goto done

:open
echo [Launcher] Server already running - opening browser...
start "" "http://127.0.0.1:%PORT%"
goto done

:installdie
echo.
echo [!] Dependency install failed. Make sure Node.js 18+ is installed:
echo    https://nodejs.org
echo.
pause
exit /b 1

:done
echo.
echo Server stopped. Press any key to close this window.
pause >nul