param(
    [Parameter(Mandatory = $true)]
    [string]$InputFile
)

$InputFile = $InputFile.Trim('"')

if (-not (Test-Path -LiteralPath $InputFile -PathType Leaf)) {
    Write-Error "File not found: $InputFile"
    exit 1
}

if ([System.IO.Path]::GetExtension($InputFile) -ne ".mp4") {
    Write-Error "Input file must be an MP4."
    exit 1
}

if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
    Write-Error "FFmpeg not found in PATH."
    exit 1
}

$file = Get-Item -LiteralPath $InputFile
$InputFolder = $file.DirectoryName

$outPath = Join-Path $InputFolder "chop"

if (-not (Test-Path -LiteralPath $outPath)) {
    New-Item -ItemType Directory -Path $outPath | Out-Null
}

# Avoid processing files created by this script
if ($file.BaseName -like "*_5sec") {
    Write-Host "Skipping already processed file: $($file.Name)" -ForegroundColor Yellow
    exit 0
}

$outputFile = Join-Path $outPath ($file.BaseName + "_5sec.mp4")

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
    exit 1
}

Write-Host "Finished processing." -ForegroundColor Green