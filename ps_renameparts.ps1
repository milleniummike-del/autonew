param(
    [string]$InputFolder = ".",
    [switch]$WhatIf
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  RENAME AUDIO AND IMAGE PART FILES" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

try {
    $InputFolder = (Resolve-Path -LiteralPath $InputFolder -ErrorAction Stop).Path
}
catch {
    Write-Host "[ERROR] Folder not found: $InputFolder" -ForegroundColor Red
    exit 1
}

Write-Host "[INFO] Input folder: $InputFolder" -ForegroundColor Yellow

$files = @(Get-ChildItem -LiteralPath $InputFolder -File -ErrorAction Stop)

Write-Host "[INFO] Files found: $($files.Count)" -ForegroundColor Yellow

$renamed = 0
$skipped = 0
$unmatched = 0
$errors = 0

foreach ($file in $files) {

    Write-Host "`n[CHECK] $($file.Name)" -ForegroundColor Gray

    if ($file.Name -match '_part(\d+)(?:_|\.|$)') {

        $partNumber = [int]$Matches[1]
        $extension = $file.Extension.ToLowerInvariant()

        if ($extension -notin @(".wav", ".webp", ".jpeg", ".jpg")) {
            Write-Host "[SKIP] Unsupported extension: $extension" -ForegroundColor DarkYellow
            $skipped++
            continue
        }

        $newName = "$partNumber$extension"
        $newPath = Join-Path $file.DirectoryName $newName

        if ($file.Name -eq $newName) {
            Write-Host "[SKIP] Already correctly named" -ForegroundColor DarkYellow
            $skipped++
            continue
        }

        if (Test-Path -LiteralPath $newPath) {
            Write-Host "[SKIP] Destination already exists: $newName" -ForegroundColor Yellow
            $skipped++
            continue
        }

        if ($WhatIf) {
            Write-Host "[TEST] $($file.Name) -> $newName" -ForegroundColor Cyan
            continue
        }

        try {
            Rename-Item -LiteralPath $file.FullName -NewName $newName -ErrorAction Stop
            Write-Host "[RENAMED] $($file.Name) -> $newName" -ForegroundColor Green
            $renamed++
        }
        catch {
            Write-Host "[ERROR] $($file.Name): $($_.Exception.Message)" -ForegroundColor Red
            $errors++
        }
    }
    else {
        Write-Host "[NO MATCH] Filename does not contain _part followed by a number" -ForegroundColor DarkGray
        $unmatched++
    }
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "SUMMARY" -ForegroundColor Cyan
Write-Host "Renamed:   $renamed" -ForegroundColor Green
Write-Host "Skipped:   $skipped" -ForegroundColor Yellow
Write-Host "Unmatched: $unmatched" -ForegroundColor Gray
Write-Host "Errors:    $errors" -ForegroundColor Red
Write-Host "========================================" -ForegroundColor Cyan