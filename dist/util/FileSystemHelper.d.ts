import StringHelper from "./StringHelper";
declare type GetFoldersOptions = {
    includeNested?: boolean;
};
export declare class FileSystemHelper {
    private stringHelper;
    constructor(stringHelper?: StringHelper);
    readFile(path: string, encoding?: string): Promise<string>;
    writeFile(path: string, content: string, encoding?: string): Promise<void>;
    makeSureParentPathExists(path: string): Promise<void>;
    /**
     * find folders, which path's ends matching to given search pattern (may be exceeded over multiple folders)
     * @param path
     * @param searchPattern
     * @param options
     */
    findFolders(path: string, searchPattern: string | RegExp, options?: GetFoldersOptions): Promise<string[]>;
    /**
     * find files, which path's ends matching to given search pattern (may be exceeded over multiple folders)
     * @param path
     * @param searchPattern
     * @param options
     */
    findFiles(path: string, searchPattern: string | RegExp, options?: GetFoldersOptions): Promise<string[]>;
    /**
     * will return ./parent folder, read from path
     * @param path has already to contain parent in terms of "./parent/fileOrFolder"
     */
    getParentFolderFromFSObjectsPath(path: string): Promise<string>;
    getObjectNameFromFSObjectsPath(path: string): Promise<string>;
    getFiles(path: string, options?: GetFoldersOptions): Promise<string[]>;
    getFolders(path: string, options?: GetFoldersOptions): Promise<string[]>;
    pathExists(path: string): Promise<boolean>;
    isFile(path: string): Promise<boolean>;
    isDirectory(path: string): Promise<boolean>;
    combinePath(...path: Array<string | undefined>): string;
}
export default FileSystemHelper;
