import * as fs from 'fs';
import * as path from 'path';


function getContents(dirs: string[]): any[] {
    const files = fs.readdirSync(path.resolve(...dirs))
    const tree = files.map(file => {
        const stats = fs.statSync(path.resolve(...dirs, file))
        if (stats.isDirectory()) {
            const dire = {
                dirName: file,
                path: [...dirs, file],
                mtime: stats.mtime,
                contents: []
            }
            dire.contents = getContents([...dirs, file])
            return dire;
        } else {
            return {
                fileName: file,
                path: [...dirs, file],
                mtime: stats.mtime,
                size: stats.size
            }
        }

    })
    return tree;
}

console.log("Generating File Tree...")
const content = getContents(['data'])
fs.writeFileSync('tree.json', JSON.stringify(content, null, 4))
console.log("Done!")