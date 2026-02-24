@echo off
set CHROME_PATH="C:\Program Files\Google\Chrome\Application\chrome.exe"
if not exist %CHROME_PATH% (
    set CHROME_PATH="C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
)

if not exist %CHROME_PATH% (
    echo Chrome not found. Please install Chrome or print from browser manually.
    pause
    exit /b
)

echo Generating PDF...
%CHROME_PATH% --headless --disable-gpu --print-to-pdf="%~dp0Muhammad_Tahir_CV.pdf" "file:///%~dp0index.html"
echo Export Complete: Muhammad_Tahir_CV.pdf
pause
