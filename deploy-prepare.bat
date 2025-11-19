@echo off
echo 🚀 Preparando proyecto para deploy...
echo.

REM Verificar si Git está instalado
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git no está instalado. Instálalo primero.
    pause
    exit /b 1
)

echo 📦 Instalando dependencias del backend...
cd backend
call npm install
cd ..

echo.
echo ✅ Proyecto listo para deploy
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 📝 Próximos pasos:
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo 1. Sube el proyecto a GitHub:
echo    git init
echo    git add .
echo    git commit -m "Initial commit - Tacos Victius"
echo    git branch -M main
echo    git remote add origin https://github.com/TU_USUARIO/tacos-victius.git
echo    git push -u origin main
echo.
echo 2. Deploy en Render:
echo    - Ve a: https://render.com/
echo    - New + → Web Service
echo    - Conecta tu repo de GitHub
echo    - Root Directory: backend
echo    - Build Command: npm install
echo    - Start Command: npm start
echo.
echo 3. Agrega variables de entorno en Render:
echo    MONGODB_URI=mongodb+srv://datalex:datalex@servicioperron.g4uxjj6.mongodb.net/tacos-victius
echo    JWT_SECRET=tacos_victius_jwt_secret_2025_super_seguro
echo    NODE_ENV=production
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo ✅ ¡Listo para deploy!
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
pause
