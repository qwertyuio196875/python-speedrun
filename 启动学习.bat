@echo off
chcp 936 >nul
cd /d "%~dp0"
title Python 速通 - 学习平台

rem ============================================================
rem  双击本文件即可启动「Python 速通」学习平台并自动打开浏览器。
rem  停止服务：关闭本窗口，或按 Ctrl+C。
rem ============================================================

rem 1) 本地服务已在运行：直接打开浏览器，避免重复启动
netstat -ano | findstr /C:":5173" | findstr /C:"LISTENING" >nul 2>&1
if not errorlevel 1 (
  echo [Python 速通] 本地服务已在运行，正在打开浏览器...
  start "" "http://127.0.0.1:5173"
  exit /b 0
)

rem 2) 首次运行自动安装依赖
if not exist "node_modules" (
  echo [Python 速通] 首次运行，正在安装依赖，请稍候...
  call npm install
  if errorlevel 1 (
    echo.
    echo [!] 依赖安装失败。请确认已安装 Node.js 18+ : https://nodejs.org
    echo.
    pause
    exit /b 1
  )
)

rem 3) 启动开发服务器（--open 会在服务就绪后自动打开浏览器）
echo.
echo ============================================================
echo     Python 速通 - 面向 Java 开发者的 5~10 小时过关路线
echo.
echo     正在启动本地服务，就绪后会自动打开浏览器...
echo     若未自动打开，请手动访问 http://127.0.0.1:5173
echo.
echo     停止服务：关闭本窗口，或按 Ctrl+C
echo ============================================================
echo.

call npm run dev -- --open

echo.
echo 服务已停止。按任意键关闭窗口。
pause >nul
