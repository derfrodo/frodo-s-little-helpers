import StringHelper from "../StringHelper";
export declare const getStringHelperMock: () => {
    service: StringHelper;
    mock: import("./createMockService").MockedType<StringHelper>;
};
export default getStringHelperMock;
