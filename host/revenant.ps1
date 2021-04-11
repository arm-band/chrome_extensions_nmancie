function Respond($response) {
    $msg = $response | ConvertTo-Json

    try {
        $writer = New-Object System.IO.BinaryWriter([System.Console]::OpenStandardOutput())
        $writer.Write([int]$msg.Length)
        $buf = [System.Text.Encoding]::UTF8.GetBytes($msg)
        $writer.Write($buf)
        $writer.Close()
    } finally {
        $writer.Dispose()
    }
}

try {
    $reader = New-Object System.IO.BinaryReader([System.Console]::OpenStandardInput())
    $len = $reader.ReadInt32()
    $buf = $reader.ReadBytes($len)
    $msg = [System.Text.Encoding]::UTF8.GetString($buf)

    $obj = $msg | ConvertFrom-Json

    $url = $obj.args # 引数をURLに指定
    $shell = New-Object -ComObject Shell.Application
    $ie = New-Object -ComObject InternetExplorer.Application # IE起動
    $ie = $objShell.Windows() | ? {$_.Name -eq "Internet Explorer"} | Select-Object -First 1
    $ie.Visible = $true
    $ie.Navigate($url, 4)

    return Respond @{message="ok"}
} catch [Exception] {
    return Respond @{message=$_.Exception.Message}
} finally {
    $reader.Dispose()
}
