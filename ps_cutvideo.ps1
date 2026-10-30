param(
    [Parameter(Mandatory = $true)]
    [string]$InputFolder
)

$InputFolder = $InputFolder.Trim('"')

if (-not (Test-Path -LiteralPath $InputFolder -PathType Container)) {
    Write-Error "Folder not found: $InputFolder"
    exit 1
}

if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
    Write-Error "FFmpeg not found in PATH."
    exit 1
}

$files = Get-ChildItem -LiteralPath $InputFolder -Filter "*.mp4" -File

if ($files.Count -eq 0) {
    Write-Host "No MP4 files found in $InputFolder" -ForegroundColor Yellow
    exit 0
}

foreach ($file in $files) {
    $outPath = $InputFolder + "\chop"
    $outputFile = Join-Path $outPath ($file.BaseName + "_5sec.mp4")

    # Avoid processing files created by this script
    if ($file.BaseName -like "*_5sec") {
        continue
    }

    Write-Host "Processing: $($file.Name)" -ForegroundColor Cyan

    & ffmpeg -hide_banner -loglevel error -y `
        -i $file.FullName `
        -t 5 `
        -map 0:v:0 -map '0:a?' `
        -c:v libx264 -preset medium -crf 18 `
        -c:a aac -b:a 192k `
        -movflags +faststart `
        $outputFile

    if ($LASTEXITCODE -eq 0) {
        Write-Host "Created: $outputFile" -ForegroundColor Green
    }
    else {
        Write-Host "FAILED: $($file.Name)" -ForegroundColor Red
    }
}

Write-Host "Finished processing all MP4 files." -ForegroundColor Green