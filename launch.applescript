#!/usr/bin/osascript
tell application "Safari"
    activate
    tell application "System Events"
        keystroke "n" using {command down, shift down}
    end tell
end tell