param(
    [string]$InputFolder = ".",
    [switch]$WhatIf
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  SEQUENTIAL FILE RENAMER" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

try {
    $InputFolder = (Resolve-Path -LiteralPath $InputFolder -ErrorAction Stop).Path
}
catch {
    Write-Host "[ERROR] Folder not found: $InputFolder" -ForegroundColor Red
    exit 1
}

$files = @(
    Get-ChildItem -LiteralPath $InputFolder -File |
    Where-Object {
        $_.Extension.ToLowerInvariant() -in @(".wav", ".webp", ".jpeg", ".jpg")
    } |
    Sort-Object Name
)

Write-Host "[INFO] Files found: $($files.Count)" -ForegroundColor Yellow

$counter = 1
$renamed = 0
$errors = 0

foreach ($file in $files) {

    $extension = $file.Extension.ToLowerInvariant()
    $newName = "$counter$extension"
    $newPath = Join-Path $InputFolder $newName

    Write-Host "[CHECK] $($file.Name) -> $newName" -ForegroundColor Gray

    if ($file.Name -eq $newName) {
        Write-Host "[SKIP] Already correctly named" -ForegroundColor DarkYellow
        $counter++
        continue
    }

    if (Test-Path -LiteralPath $newPath) {
        Write-Host "[ERROR] Destination exists: $newName" -ForegroundColor Red
        $errors++
        $counter++
        continue
    }

    if ($WhatIf) {
        Write-Host "[TEST] $($file.Name) -> $newName" -ForegroundColor Cyan
    }
    else {
        try {
            Rename-Item -LiteralPath $file.FullName -NewName $newName -ErrorAction Stop
            Write-Host "[RENAMED] $($file.Name) -> $newName" -ForegroundColor Green
            $renamed++
        }
        catch {
            Write-Host "[ERROR] $($_.Exception.Message)" -ForegroundColor Red
            $errors++
        }
    }

    $counter++
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "SUMMARY" -ForegroundColor Cyan
Write-Host "Files found: $($files.Count)"
Write-Host "Renamed: $renamed" -ForegroundColor Green
Write-Host "Errors: $errors" -ForegroundColor Red
Write-Host "========================================" -ForegroundColor Cyan