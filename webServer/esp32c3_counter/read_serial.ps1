$port = New-Object System.IO.Ports.SerialPort("COM9", 115200)
$port.ReadTimeout = 3000
$port.Open()
Start-Sleep -Milliseconds 500
for ($i = 0; $i -lt 8; $i++) {
    $line = $port.ReadLine()
    Write-Host $line
}
$port.Close()
