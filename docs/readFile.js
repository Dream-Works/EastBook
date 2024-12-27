import fs from 'fs';
import path from 'path';

// 读取指定目录下的文件列表
export function getFilesInDirectory(file_path) {
    const directoryPath = path.join(__dirname, file_path);  // 修改为你想读取的目录路径
    // 确保路径存在
    if (!fs.existsSync(directoryPath)) {
        console.error('指定的目录不存在');
        return [];
    }

    // 读取目录内容
    const files = fs.readdirSync(directoryPath);

    // 过滤出文件名组成数组
    return files.filter(file => fs.statSync(path.join(directoryPath, file)).isFile());
}


