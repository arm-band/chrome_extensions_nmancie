@echo off

pushd %~dp0

powershell -ExecutionPolicy RemoteSigned -NoLogo -NonInteractive -NoProfile -WindowStyle Hidden -File ".\revenant.ps1"
