import path from "path";
import fs from "fs";

export function getFileSizeAndResolvedPath(filePath) {
  const resolvedPath = path.resolve(filePath);
  const stat = fs.statSync(resolvedPath);
  return { fileSize: stat.size, resolvedPath: resolvedPath };
}

export function getChunkProps(range, fileSize) {
  const parts = range.replace(/bytes=/, "").split("-");
  const start = parseInt(parts[0], 10);
  const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
  const chunkSize = end - start + 1;
  return {
    start,
    end,
    chunkSize,
  };
}
