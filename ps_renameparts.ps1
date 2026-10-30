param(
    [string]$InputFolder = "."
)

Get-ChildItem -Path $InputFolder -File | ForEach-Object {
    if ($_.Name -match '_part(\d+)_') {
        $partNumber = [int]$Matches[1]

        if ($_.Extension -eq ".wav") {
            $newName = "$partNumber.wav"
        }
        elseif ($_.Extension -eq ".webp") {
            $newName = "$partNumber.webp"
        }
        elseif ($_.Extension -eq ".jpeg") {
            $newName = "$partNumber.jpeg"
        }
        else {
            return
        }

        $newPath = Join-Path $_.DirectoryName $newName

        if (Test-Path $newPath) {
            Write-Warning "Skipping '$($_.Name)' - '$newName' already exists."
        }
        else {
            Rename-Item -LiteralPath $_.FullName -NewName $newName
            Write-Host "$($_.Name) -> $newName"
        }
    }
}