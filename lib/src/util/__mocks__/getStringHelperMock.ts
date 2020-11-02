/* eslint-disable @typescript-eslint/no-explicit-any */
import StringHelper from "../StringHelper";
import createMockService from "./createMockService";

jest.mock("../StringHelper");
export const getStringHelperMock = () => {
    return createMockService(new (StringHelper as any)() as StringHelper);
};

export default getStringHelperMock;
