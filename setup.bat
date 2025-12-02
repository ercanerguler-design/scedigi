@echo off
echo.
echo ================================
echo SCE Digital Platform - Development Setup
echo ================================
echo.

echo [1/4] Installing dependencies...
call npm install

echo.
echo [2/4] Creating environment file...
if not exist .env.local (
    copy .env.local.example .env.local
    echo Created .env.local file. Please configure your environment variables.
) else (
    echo .env.local already exists.
)

echo.
echo [3/4] Setting up database...
call npm run migrate

echo.
echo [4/4] Starting development server...
call npm run dev
