import fs from "fs-extra";
import StringHelper from "./StringHelper";
import { BindToClass } from "./BindThis";

type GetFoldersOptions = { includeNested?: boolean };

@BindToClass()
export class FileSystemHelper {
    private stringHelper: StringHelper;

    constructor(stringHelper: StringHelper = new StringHelper()) {
        this.stringHelper = stringHelper;
    }

    async readFile(path: string, encoding = "utf-8"): Promise<string> {
        if (!this.isFile(path)) {
            throw new Error("No file has been passed");
        }
        return fs.readFile(path, encoding);
    }

    async writeFile(
        path: string,
        content: string,
        encoding = "utf-8"
    ): Promise<void> {
        await this.makeSureParentPathExists(path);
        return fs.writeFile(path, content, { encoding: encoding, flag: "w" });
    }

    async makeSureParentPathExists(path: string): Promise<void> {
        let parent = await this.getParentFolderFromFSObjectsPath(path);

        const pathsToCreate: string[] = [];

        while (!(await this.pathExists(parent))) {
            pathsToCreate.push(parent);
            parent = await this.getParentFolderFromFSObjectsPath(parent);
        }

        for (const pathToCreate of pathsToCreate.reverse()) {
            await fs.mkdir(pathToCreate);
        }

        return;
    }

    /**
     * find folders, which path's ends matching to given search pattern (may be exceeded over multiple folders)
     * @param path
     * @param searchPattern
     * @param options
     */
    async findFolders(
        path: string,
        searchPattern: string | RegExp,
        options?: GetFoldersOptions
    ): Promise<string[]> {
        const stringHelper = this.stringHelper;
        if (
            typeof searchPattern !== "string" &&
            searchPattern instanceof RegExp === false
        ) {
            throw new Error(
                "You must enter a string or Regular Expression with global flag as search pattern"
            );
        }
        if (searchPattern instanceof RegExp && !searchPattern.global) {
            throw new Error(
                'Regular Expressions have to set global to true ("/pattern/g")'
            );
        }

        const folders = await this.getFolders(path, options);
        if (typeof searchPattern === "string") {
            return folders.filter(
                (f) =>
                    typeof f === "string" &&
                    f.length >= searchPattern.length &&
                    f.lastIndexOf(searchPattern) ===
                        f.length - searchPattern.length
            );
        } else {
            return folders.filter((f) => {
                const lastMatch =
                    typeof f === "string"
                        ? stringHelper.findLastMatch(f, searchPattern)
                        : null;
                return (
                    lastMatch &&
                    f.length > lastMatch.index &&
                    lastMatch.index === f.length - lastMatch[0].length
                );
            });
        }
    }

    /**
     * find files, which path's ends matching to given search pattern (may be exceeded over multiple folders)
     * @param path
     * @param searchPattern
     * @param options
     */
    async findFiles(
        path: string,
        searchPattern: string | RegExp,
        options?: GetFoldersOptions
    ): Promise<string[]> {
        const stringHelper = this.stringHelper;
        if (
            typeof searchPattern !== "string" &&
            searchPattern instanceof RegExp === false
        ) {
            throw new Error(
                "You must enter a string or Regular Expression with global flag as search pattern"
            );
        }
        if (searchPattern instanceof RegExp && !searchPattern.global) {
            throw new Error(
                'Regular Expressions have to set global to true ("/pattern/g")'
            );
        }

        const files = await this.getFiles(path, options);
        if (typeof searchPattern === "string") {
            return files.filter(
                (f) =>
                    typeof f === "string" &&
                    f.length >= searchPattern.length &&
                    f.lastIndexOf(searchPattern) ===
                        f.length - searchPattern.length
            );
        } else {
            return files.filter((f) => {
                const lastMatch =
                    typeof f === "string"
                        ? stringHelper.findLastMatch(f, searchPattern)
                        : null;
                return (
                    lastMatch &&
                    f.length > lastMatch.index &&
                    lastMatch.index === f.length - lastMatch[0].length
                );
            });
        }
    }

    /**
     * will return ./parent folder, read from path
     * @param path has already to contain parent in terms of "./parent/fileOrFolder"
     */
    async getParentFolderFromFSObjectsPath(path: string): Promise<string> {
        const stringHelper = this.stringHelper;
        const cleanedPath = stringHelper.trimEnd(path, "/");
        const lastMatch = await stringHelper.findLastMatch(cleanedPath, /\//g);
        if (
            lastMatch === null ||
            lastMatch.index === 0 ||
            lastMatch.index < 0
        ) {
            throw new Error("Path must contain parent object/folder already.");
        }

        const parentFolderPath = cleanedPath.substring(0, lastMatch.index);
        return parentFolderPath;
    }

    async getObjectNameFromFSObjectsPath(path: string): Promise<string> {
        const stringHelper = this.stringHelper;

        const cleanedPath = stringHelper.trimEnd(path, "/");
        const lastMatch = await stringHelper.findLastMatch(cleanedPath, /\//g);
        if (
            lastMatch === null ||
            lastMatch.index === 0 ||
            lastMatch.index < 0
        ) {
            return cleanedPath;
        }

        const objectName = cleanedPath.substring(lastMatch.index + 1);
        return objectName;
    }

    async getFiles(
        path: string,
        options?: GetFoldersOptions
    ): Promise<string[]> {
        const optionsWithDefaults: GetFoldersOptions = {
            includeNested: false,
            ...(options || {}),
        };
        const { includeNested } = optionsWithDefaults;

        const result: string[] = [];

        const content = await fs.readdir(path);
        for await (const entry of content) {
            const combinedPath = this.combinePath(path, entry);
            if (await this.isDirectory(combinedPath)) {
                if (includeNested) {
                    result.push(
                        ...(await this.getFiles(combinedPath, options))
                    );
                }
            } else if (this.isFile(combinedPath)) {
                result.push(combinedPath);
            }
        }

        return result;
    }

    async getFolders(
        path: string,
        options?: GetFoldersOptions
    ): Promise<string[]> {
        const optionsWithDefaults: GetFoldersOptions = {
            includeNested: false,
            ...(options || {}),
        };
        const { includeNested } = optionsWithDefaults;

        const result: string[] = [];

        const content = await fs.readdir(path);
        for await (const entry of content) {
            const combinedPath = this.combinePath(path, entry);
            if (await this.isDirectory(combinedPath)) {
                result.push(combinedPath);
                if (includeNested) {
                    result.push(
                        ...(await this.getFolders(combinedPath, options))
                    );
                }
            }
        }

        return result;
    }

    async pathExists(path: string): Promise<boolean> {
        return new Promise((r) => fs.exists(path, (exists) => r(exists)));
    }

    async isFile(path: string): Promise<boolean> {
        if (await this.pathExists(path)) {
            const stats = await fs.stat(path);
            return stats.isFile();
        }
        return false;
    }

    async isDirectory(path: string): Promise<boolean> {
        if (await this.pathExists(path)) {
            const stats = await fs.stat(path);
            return stats.isDirectory();
        }
        return false;
    }

    combinePath(...path: Array<string | undefined>): string {
        let result = "";
        const stringHelper = this.stringHelper;
        for (const subPath of path.filter(
            (sp) => typeof sp === "string" && sp !== ""
        )) {
            if (typeof subPath === "string") {
                const base =
                    result === "/"
                        ? "/"
                        : stringHelper.trimEnd(result, /\/|\\/g);
                result = `${base}${
                    base !== "" ? "/" : ""
                }${stringHelper.trimStart(subPath, /\/|\\/g)}`;
            }
        }

        return result;
    }
}

export default FileSystemHelper;
