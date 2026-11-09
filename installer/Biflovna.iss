; Instalátor Biflovny pro Windows (Inno Setup 6)
; Instaluje jen pro aktuálního uživatele – nepotřebuje administrátora.
#define AppName "Biflovna"
#ifndef AppVersion
  #define AppVersion "1.0.0"
#endif
#define Root ".."

[Setup]
AppId={{6B7E2C1A-4F3D-4C8E-9B1A-B1F10A7A2026}
AppName={#AppName}
AppVersion={#AppVersion}
AppVerName={#AppName} {#AppVersion}
AppPublisher=Biflovna
DefaultDirName={localappdata}\Programs\{#AppName}
DefaultGroupName={#AppName}
PrivilegesRequired=lowest
DisableDirPage=yes
DisableProgramGroupPage=yes
DisableReadyPage=yes
DisableWelcomePage=no
WizardStyle=modern
SetupIconFile={#Root}\build\icons\icon.ico
WizardImageFile={#Root}\build\icons\wizard-164.bmp,{#Root}\build\icons\wizard-328.bmp
WizardSmallImageFile={#Root}\build\icons\wizsmall-55.bmp,{#Root}\build\icons\wizsmall-110.bmp
UninstallDisplayIcon={app}\Biflovna.exe
UninstallDisplayName={#AppName}
OutputDir={#Root}\Instalace\PC
OutputBaseFilename=Biflovna-Setup
Compression=lzma2/ultra64
SolidCompression=yes
ArchitecturesAllowed=x64compatible
ArchitecturesInstallIn64BitMode=x64compatible
CloseApplications=yes

[Languages]
Name: "cs"; MessagesFile: "compiler:Languages\Czech.isl"

[Tasks]
Name: "desktopicon"; Description: "Vytvořit zástupce na ploše"; GroupDescription: "Zástupci:"

[Files]
Source: "{#Root}\dist\desktop\Biflovna\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs

[Icons]
Name: "{userprograms}\{#AppName}"; Filename: "{app}\Biflovna.exe"
Name: "{userdesktop}\{#AppName}"; Filename: "{app}\Biflovna.exe"; Tasks: desktopicon

[Run]
Filename: "{app}\Biflovna.exe"; Description: "Spustit Biflovnu"; Flags: nowait postinstall skipifsilent
; po tiché aktualizaci („Restartovat teď“) ji znovu otevři; při aktualizaci po zavření aplikace (/NORELAUNCH) ne
Filename: "{app}\Biflovna.exe"; Flags: nowait; Check: ShouldRelaunch

[Code]
function ShouldRelaunch: Boolean;
begin
  Result := WizardSilent and (Pos('/NORELAUNCH', UpperCase(GetCmdTail)) = 0);
end;
