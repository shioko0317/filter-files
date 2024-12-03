const fs = require("fs");
const path = require("path");
const database = {
    "Compressed": [".zip", ".rar", ".7z", ".gz", ".tar", ".iso", ".bz2", ".xz", ".img", ".dmg", ".jar"],
    "Documents": [".doc", ".docx", ".xls", ".xlsx", ".pdf", ".txt", ".psd"],
	"Music": [".mp3", ".m4a", ".wav", ".ogg"],
    "Pictures": [".jpg", ".jpeg", ".png", ".webp", ".tiff", ".svg", ".bmp", ".raw", ".heif", ".ai", ".gif"],
    "Programs": [".exe", ".apk", ".ipa", ".msi"],
	"Videos": [".mp4", ".mkv", ".avi", ".mov", ".quicktime"]
};

var files = fs.readdirSync(__dirname).filter(file => (file != "." && file != ".." && !fs.statSync(`${__dirname}/${file}`).isDirectory()));
var databaseArr = Object.entries(database), moved = 0;
for (var i = 0; i < databaseArr.length; i++) {
    var folder = `${__dirname}/${databaseArr[i][0]}`;
    if (!fs.existsSync(folder)) fs.mkdirSync(folder, {recursive: true});
}
files.forEach(file => {
    var folderName = "",
        extension = path.extname(file);
    for (var i = 0; i < databaseArr.length; i++) {
        if (databaseArr[i][1].includes(extension.toLowerCase())) {
            folderName = `${databaseArr[i][0]}/`;
            break;
        }
    }
    if (folderName) {
        fs.renameSync(`${__dirname}/${file}`, `${__dirname}/${folderName}${file}`);
        moved++;
        console.log(`${__dirname}/${file} -> ${__dirname}/${folderName}${file}`);
    }
});
console.log(`Successfully moved ${moved} files`);