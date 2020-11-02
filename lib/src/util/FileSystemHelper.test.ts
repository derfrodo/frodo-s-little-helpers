import FileSystemHelper from "./FileSystemHelper";

const pathToMockFolders = "./src/test/mock/mockFolders";

describe("FileSystemHelper tests", () => {
    describe("getObjectNameFromFSObjectsPath tests", () => {
        test("finds name of pathToMockFolders/subfolder", async () => {
            const helper = new FileSystemHelper();
            const result = await helper.getObjectNameFromFSObjectsPath(
                `${pathToMockFolders}/subfolder`
            );

            expect(result).toBe("subfolder");
        });
        test("Ignores trailing slash to find name", async () => {
            const helper = new FileSystemHelper();
            const result = await helper.getObjectNameFromFSObjectsPath(
                `${pathToMockFolders}/subfolder/`
            );

            expect(result).toBe("subfolder");
        });

        test("finds name if name is only part of path", async () => {
            const helper = new FileSystemHelper();
            const result = await helper.getObjectNameFromFSObjectsPath(
                "subfolder"
            );
            expect(result).toBe("subfolder");
        });
    });

    describe("getParentFolderFromFSObjectsPath tests", () => {
        test("finds parent of ${pathToMockFolders}/subfolder", async () => {
            const helper = new FileSystemHelper();
            const result = await helper.getParentFolderFromFSObjectsPath(
                `${pathToMockFolders}/subfolder`
            );

            expect(result).toBe(pathToMockFolders);
        });
        test("to find parent: Ignores trailing slash", async () => {
            const helper = new FileSystemHelper();
            const result = await helper.getParentFolderFromFSObjectsPath(
                `${pathToMockFolders}/subfolder/`
            );

            expect(result).toBe(pathToMockFolders);
        });

        test("fails if parent not in path", async () => {
            const helper = new FileSystemHelper();
            const result = helper.getParentFolderFromFSObjectsPath("subfolder");

            await result
                .then(() => {
                    fail("Reject ecepted");
                })
                .catch((rejected) => {
                    expect(rejected).toEqual(
                        new Error(
                            "Path must contain parent object/folder already."
                        )
                    );
                });
        });
    });

    describe("getFolders tests", () => {
        test("finds nested of pathToMockFolders, ignores files", async () => {
            const helper = new FileSystemHelper();
            const result = await helper.getFolders(pathToMockFolders, {
                includeNested: true,
            });

            expect(result).toEqual([
                `${pathToMockFolders}/subfolder`,
                `${pathToMockFolders}/subfolder/nestedSubfolder`,
                `${pathToMockFolders}/subfolder/nestedSubfolder2`,
            ]);
        });

        test("ignores nested of pathToMockFolders, ignores files", async () => {
            const helper = new FileSystemHelper();
            const result = await helper.getFolders(pathToMockFolders, {
                includeNested: false,
            });

            expect(result).toEqual([`${pathToMockFolders}/subfolder`]);
        });
    });

    describe("getFiles tests", () => {
        test("finds nested files in ./src/redux/test/mock/mockFolders, ignores folders", async () => {
            const helper = new FileSystemHelper();
            const result = await helper.getFiles(pathToMockFolders, {
                includeNested: true,
            });

            expect(result).toEqual([
                `${pathToMockFolders}/file.txt`,
                `${pathToMockFolders}/subfolder/file2.txt`,
                `${pathToMockFolders}/subfolder/nestedSubfolder/file3.txt`,
                `${pathToMockFolders}/subfolder/nestedSubfolder2/nestedSubfolder`,
            ]);
        });

        test("ignores nested files in ./src/redux/test/mock/mockFolders, ignores folders", async () => {
            const helper = new FileSystemHelper();
            const result = await helper.getFiles(pathToMockFolders, {
                includeNested: false,
            });

            expect(result).toEqual([`${pathToMockFolders}/file.txt`]);
        });
    });

    describe("findFolders tests", () => {
        test("finds nestedSubfolder2 of ./src/redux/test/mock/mockFolders, ignores files", async () => {
            const helper = new FileSystemHelper();
            const result = await helper.findFolders(
                pathToMockFolders,
                "nestedSubfolder2",
                { includeNested: true }
            );

            expect(result).toEqual([
                `${pathToMockFolders}/subfolder/nestedSubfolder2`,
            ]);
        });
        test("finds subfolder/nestedSubfolder2 of ./src/redux/test/mock/mockFolders, ignores files", async () => {
            const helper = new FileSystemHelper();
            const result = await helper.findFolders(
                pathToMockFolders,
                "subfolder/nestedSubfolder2",
                { includeNested: true }
            );

            expect(result).toEqual([
                `${pathToMockFolders}/subfolder/nestedSubfolder2`,
            ]);
        });
        test("misses nestedSubfolder2 since it is nested", async () => {
            const helper = new FileSystemHelper();
            const result = await helper.findFolders(
                pathToMockFolders,
                "nestedSubfolder2",
                { includeNested: false }
            );

            expect(result).toEqual([]);
        });
    });

    describe("findFiles tests", () => {
        test("finds nestedSubfolder of ./src/redux/test/mock/mockFolders, ignores files", async () => {
            const helper = new FileSystemHelper();
            const result = await helper.findFiles(
                pathToMockFolders,
                "nestedSubfolder",
                { includeNested: true }
            );

            expect(result).toEqual([
                `${pathToMockFolders}/subfolder/nestedSubfolder2/nestedSubfolder`,
            ]);
        });
        test("finds nestedSubfolder2/nestedSubfolder of ./src/redux/test/mock/mockFolders, ignores files", async () => {
            const helper = new FileSystemHelper();
            const result = await helper.findFiles(
                pathToMockFolders,
                "nestedSubfolder2/nestedSubfolder",
                { includeNested: true }
            );

            expect(result).toEqual([
                `${pathToMockFolders}/subfolder/nestedSubfolder2/nestedSubfolder`,
            ]);
        });
        test("misses nestedSubfolder since it is nested", async () => {
            const helper = new FileSystemHelper();
            const result = await helper.findFiles(
                pathToMockFolders,
                "nestedSubfolder",
                { includeNested: false }
            );

            expect(result).toEqual([]);
        });
    });

    describe("pathExists tests", () => {
        test("finds existing file", async () => {
            const helper = new FileSystemHelper();
            const result = await helper.pathExists(
                `${pathToMockFolders}/file.txt`
            );
            expect(result).toBe(true);
        });

        test("returns false if file not existing", async () => {
            const helper = new FileSystemHelper();
            const result = await helper.pathExists(
                `${pathToMockFolders}/fileMissing.txt`
            );
            expect(result).toBe(false);
        });
        test("finds existing folder", async () => {
            const helper = new FileSystemHelper();
            const result = await helper.pathExists(
                `${pathToMockFolders}/subfolder`
            );
            expect(result).toBe(true);
        });

        test("returns false if folder not existing", async () => {
            const helper = new FileSystemHelper();
            const result = await helper.pathExists(
                `${pathToMockFolders}/folderMissing`
            );
            expect(result).toBe(false);
        });
    });
});
