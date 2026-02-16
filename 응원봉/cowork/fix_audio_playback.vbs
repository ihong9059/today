' fix_audio_playback.vbs
' Double-click to fix audio auto-play in PPT

Option Explicit

Dim pptApp, prs, slide, shape
Dim audioCount, slideCount
Dim fso, scriptDir, inputFile, outputFile
Dim msg, i, j, eff, folder, file, found
Dim mediaType

Set fso = CreateObject("Scripting.FileSystemObject")
scriptDir = fso.GetParentFolderName(WScript.ScriptFullName)

found = False
inputFile = ""
Set folder = fso.GetFolder(scriptDir)
For Each file In folder.Files
    If LCase(fso.GetExtensionName(file.Name)) = "pptx" Then
        If InStr(LCase(file.Name), "ai_fanstick") > 0 Then
            inputFile = file.Path
            found = True
            Exit For
        End If
    End If
Next

If Not found Then
    MsgBox "AI_FanStick pptx not found in:" & vbCrLf & scriptDir, vbExclamation, "Error"
    WScript.Quit
End If

On Error Resume Next
Set pptApp = GetObject(, "PowerPoint.Application")
If Err.Number <> 0 Then
    Err.Clear
    Set pptApp = CreateObject("PowerPoint.Application")
End If
On Error GoTo 0

pptApp.Visible = True

Set prs = pptApp.Presentations.Open(inputFile)
WScript.Sleep 2000

slideCount = prs.Slides.Count
audioCount = 0

For i = 1 To slideCount
    Set slide = prs.Slides(i)

    For j = 1 To slide.Shapes.Count
        Set shape = slide.Shapes(j)

        mediaType = -1
        On Error Resume Next
        mediaType = shape.MediaType
        On Error GoTo 0

        If mediaType = 14 Then
            On Error Resume Next
            Do While slide.TimeLine.MainSequence.Count > 0
                slide.TimeLine.MainSequence(1).Delete
            Loop
            On Error GoTo 0

            On Error Resume Next
            Set eff = slide.TimeLine.MainSequence.AddEffect(shape, 1, 0, 1)
            If Not eff Is Nothing Then
                eff.Timing.TriggerType = 1
            End If
            On Error GoTo 0

            audioCount = audioCount + 1
        End If
    Next
Next

outputFile = fso.BuildPath(scriptDir, "AI_FanStick_final.pptx")
prs.SaveAs outputFile
prs.Close

msg = "Done!" & vbCrLf & vbCrLf
msg = msg & "Slides: " & slideCount & vbCrLf
msg = msg & "Audio fixed: " & audioCount & vbCrLf & vbCrLf
msg = msg & "Saved: AI_FanStick_final.pptx" & vbCrLf & vbCrLf
msg = msg & "Press F5 to start slideshow!"

MsgBox msg, vbInformation, "Complete"
