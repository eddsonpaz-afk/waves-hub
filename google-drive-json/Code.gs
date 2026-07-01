const FOLDER_ID = "1C25vlmE4LJS3LAPLN49fYKhwZg98dx0d";

function doGet() {
  const folder = DriveApp.getFolderById(FOLDER_ID);
  const files = folder.getFiles();
  const output = {};

  while (files.hasNext()) {
    const file = files.next();
    const name = file.getName();
    const code = name.split(".")[0].trim();
    output[code] = "https://drive.google.com/thumbnail?id=" + file.getId() + "&sz=w1000";
  }

  return ContentService
    .createTextOutput(JSON.stringify(output))
    .setMimeType(ContentService.MimeType.JSON);
}
