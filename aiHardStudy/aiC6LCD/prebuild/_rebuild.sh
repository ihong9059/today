#!/bin/bash
ACLI="$HOME/bin/arduino-cli.exe"
FQBN="esp32:esp32:esp32c6:PartitionScheme=min_spiffs"
BD="ble_ota_c6_lcd"
FDB="firmware_db"
TPL="../firmware/ble_ota_c6_lcd/ble_ota_c6_lcd.ino"

for no in M03 M05 M06 N01 N03 N04 N05 N06 O01 O03 O04 O05 O06; do
  [ -f "$FDB/$no/firmware.bin" ] && { echo "[$no] SKIP"; continue; }
  [ -f "$FDB/$no/merged.ino" ] || { echo "[$no] NO MERGED"; continue; }
  cp "$FDB/$no/merged.ino" "$BD/ble_ota_c6_lcd.ino"
  rm -f "$BD/output/"*.bin "$BD/"*.ino.cpp
  echo -n "[$no] building... "
  START=$SECONDS
  "$ACLI" compile --fqbn "$FQBN" --output-dir "$BD/output" "$BD" > /dev/null 2>&1
  RC=$?
  DUR=$((SECONDS - START))
  if [ $RC -eq 0 ] && [ -f "$BD/output/ble_ota_c6_lcd.ino.bin" ]; then
    cp "$BD/output/ble_ota_c6_lcd.ino.bin" "$FDB/$no/firmware.bin"
    SZ=$(stat -c%s "$FDB/$no/firmware.bin" 2>/dev/null || stat -f%z "$FDB/$no/firmware.bin" 2>/dev/null)
    echo "OK (${SZ}B, ${DUR}s)"
  else
    echo "FAIL (${DUR}s)"
  fi
done
echo "REBUILD DONE"
