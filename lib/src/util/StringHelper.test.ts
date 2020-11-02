import StringHelper from "./StringHelper";
import { Guid } from "guid-typescript";
import { getBoundToThisDescriptor } from "./BindFunctional";

describe("StringHelper tests", () => {
    describe("trimStart tests", () => {
        test("trims starting values", () => {
            const helper = new StringHelper();
            const result = helper.trimStart("//value", "/");
            expect(result).toBe("value");
        });
        test("trims starting values", () => {
            const helper = new StringHelper();
            const result = helper.trimStart("a/a/avalue", "a/");
            expect(result).toBe("avalue");
        });
    });

    describe("findLastMatch tests", () => {
        test("finds last match with single char regexp", () => {
            const helper = new StringHelper();

            const result = helper.findLastMatch("value//", /\//g);
            expect(result).not.toBeNull();
            if (!result) {
                fail();
            } else {
                expect(result.index).toBe(6);
            }
        });
        test("finds last match with multiple char regexp", () => {
            const helper = new StringHelper();

            const result = helper.findLastMatch("value//a/a", /\/a/g);
            expect(result).not.toBeNull();
            if (!result) {
                fail();
            } else {
                expect(result.index).toBe(8);
            }
        });
        test("find fails in case of non global regexp", () => {
            const helper = new StringHelper();
            expect(() =>
                helper.findLastMatch("value//a/a", /\/a/)
            ).toThrowError(
                "Can not find last match: Global flag has to be set!"
            );
        });
    });

    describe("trimEnd tests", () => {
        test("trims ending values by string", () => {
            const helper = new StringHelper();

            const result = helper.trimEnd("value//", "/");
            expect(result).toBe("value");
        });
        test("trims ending values by longer string", () => {
            const helper = new StringHelper();

            const result = helper.trimEnd("value//a/a", "/a");
            expect(result).toBe("value/");
        });
        test("trims ending values by regexp", () => {
            const helper = new StringHelper();

            const result = helper.trimEnd("value//", /\//g);
            expect(result).toBe("value");
        });
        test("trims ending values by longer regexp", () => {
            const helper = new StringHelper();

            const result = helper.trimEnd("value//a/a", /\/a/g);
            expect(result).toBe("value/");
        });
        test("trims ending values fails in case of non global regexp", () => {
            const helper = new StringHelper();
            expect(() => helper.trimEnd("value//a/a", /\/a/)).toThrowError(
                "Can not find last match: Global flag has to be set!"
            );
        });
    });
    describe("trim tests", () => {
        test("trims end: values by string", () => {
            const helper = new StringHelper();

            const result = helper.trim("value//", "/");
            expect(result).toBe("value");
        });
        test("trims end: values by longer string", () => {
            const helper = new StringHelper();

            const result = helper.trim("value//a/a", "/a");
            expect(result).toBe("value/");
        });
        test("trims end: values by regexp", () => {
            const helper = new StringHelper();

            const result = helper.trim("value//", /\//g);
            expect(result).toBe("value");
        });
        test("trims end: values by longer regexp", () => {
            const helper = new StringHelper();

            const result = helper.trim("value//a/a", /\/a/g);
            expect(result).toBe("value/");
        });
        test("trims end: values fails in case of non global regexp", () => {
            const helper = new StringHelper();
            expect(() => helper.trim("value//a/a", /\/a/)).toThrowError(
                "Can not find last match: Global flag has to be set!"
            );
        });
    });
    describe("trimWhitspaces tests", () => {
        test("trimWhitspaces is bound to this", () => {
            const helper = new StringHelper();

            const values = [" /test/ ", "/test/ ", "/test/", " /test/"];
            const result = values.map(helper.trimWhitspaces);

            expect(result).toEqual(["/test/", "/test/", "/test/", "/test/"]);
        });
    });

    describe("isNonEmptyGuid tests", () => {
        test("isNonEmptyGuid false if seldom string", () => {
            const helper = new StringHelper();

            const testValue = "Teststring";
            const result = helper.isNonEmptyGuid(testValue);

            expect(result).toBe(false);
        });
        test("isNonEmptyGuid true if parameter is guid string", () => {
            const helper = new StringHelper();

            const testValue = "8563cb14-6da1-6daf-2d99-49164620f1b9";
            const result = helper.isNonEmptyGuid(testValue);

            expect(result).toBe(true);
        });
        test("isNonEmptyGuid false if parameter is empty guid string", () => {
            const helper = new StringHelper();

            const testValue = "00000000-0000-0000-0000-000000000000";
            const result = helper.isNonEmptyGuid(testValue);

            expect(result).toBe(false);
        });
        test("isNonEmptyGuid false if parameter is empty guid", () => {
            const helper = new StringHelper();

            const guidString = "00000000-0000-0000-0000-000000000000";
            const testValue = Guid.parse(guidString);
            const result = helper.isNonEmptyGuid(testValue);

            expect(result).toBe(false);
        });
        test("isNonEmptyGuid false if parameter is non empty guid", () => {
            const helper = new StringHelper();

            const guidString = "3d9e1bde-2d74-acd4-5d2a-f1dc52238eb9";
            const testValue = Guid.parse(guidString);
            const result = helper.isNonEmptyGuid(testValue);

            expect(result).toBe(true);
        });
    });

    describe("joinCssClasses tests", () => {
        test("joinCssClasses joins strings", () => {
            const helper = new StringHelper();

            const testValue1 = "Teststring";
            const testValue2 = "Teststring2";
            const result = helper.joinCssClasses(testValue1, testValue2);

            expect(result).toBe("Teststring Teststring2");
        });

        test("joinCssClasses ignores undefined", () => {
            const helper = new StringHelper();

            const testValue1 = "Teststring";
            const testValue2 = undefined;
            const testValue3 = "Teststring2";
            const result = helper.joinCssClasses(
                testValue1,
                testValue2,
                testValue3
            );

            expect(result).toBe("Teststring Teststring2");
        });

        test("joinCssClasses ignores null", () => {
            const helper = new StringHelper();

            const testValue1 = "Teststring";
            const testValue2 = null;
            const testValue3 = "Teststring2";
            const result = helper.joinCssClasses(
                testValue1,
                testValue2,
                testValue3
            );

            expect(result).toBe("Teststring Teststring2");
        });

        test("joinCssClasses uses numbers", () => {
            const helper = new StringHelper();

            const testValue1 = "Teststring";
            const testValue2 = 90;
            const testValue3 = "Teststring2";
            const result = helper.joinCssClasses(
                testValue1,
                testValue2,
                testValue3
            );

            expect(result).toBe("Teststring 90 Teststring2");
        });

        test("joinCssClasses ignores boolean values", () => {
            const helper = new StringHelper();

            const testValue1 = "Teststring";
            const testValue2 = false;
            const testValue25 = true;
            const testValue3 = "Teststring2";
            const result = helper.joinCssClasses(
                testValue1,
                testValue2,
                testValue25,
                testValue3
            );

            expect(result).toBe("Teststring Teststring2");
        });
    });

    describe("joinStringsAndNumbers tests", () => {
        it("joinStringsAndNumbers join string with dedicated separator", () => {
            const helper = new StringHelper();

            const testValues = ["e", "d"];
            const testSep = "-";
            const result = helper.joinStringsAndNumbers(testValues, testSep);

            expect(result).toBe("e-d");
        });
        it("joinStringsAndNumbers join strings and numbers", () => {
            const helper = new StringHelper();

            const testValues = ["e", 0, "d"];
            const testSep = "-";
            const result = helper.joinStringsAndNumbers(testValues, testSep);

            expect(result).toBe("e-0-d");
        });
        it("joinStringsAndNumbers ignores undefined and null and booleans", () => {
            const helper = new StringHelper();

            const testValues = [
                false,
                "e",
                undefined,
                "a",
                null,
                1,
                "",
                2,
                true,
                "d",
            ];
            const result = helper.joinStringsAndNumbers(testValues);

            expect(result).toBe("e,a,1,2,d");
        });
        it("joinStringsAndNumbers joins w auto selected separator", () => {
            const helper = new StringHelper();

            const testValues = ["e", "d"];
            const result = helper.joinStringsAndNumbers(testValues);

            expect(result).toBe("e,d");
        });
    });

    describe("toUpperCasedWithUnderscore tests", () => {
        test("toUpperCasedWithUnderscore transforms camel cased string", () => {
            const helper = new StringHelper();

            const testValue = "camelCasedString";
            const result = helper.toUpperCasedWithUnderscore(testValue);

            expect(result).toBe("CAMEL_CASED_STRING");
        });
        test("toUpperCasedWithUnderscore transforms pascal cased", () => {
            const helper = new StringHelper();

            const testValue = "PascalCasedString";
            const result = helper.toUpperCasedWithUnderscore(testValue);

            expect(result).toBe("PASCAL_CASED_STRING");
        });
        test("toUpperCasedWithUnderscore transforms double UpperCased letters cased", () => {
            const helper = new StringHelper();

            const testValue = "PPwithDoubleUpperCCase";
            const result = helper.toUpperCasedWithUnderscore(testValue);

            expect(result).toBe("PPWITH_DOUBLE_UPPER_CCASE");
        });
        test("toUpperCasedWithUnderscore throws if underscore exist", () => {
            const helper = new StringHelper();

            const testValue = "UPPER_CASED_SNAKED";
            const result = (): string =>
                helper.toUpperCasedWithUnderscore(testValue);

            expect(result).toThrowError(
                'Failed to transform to UPPER_CASED_SNAKE_CASE. Parameter must not contain "_"'
            );
        });
    });

    describe("toPascalCased tests", () => {
        test("toPascalCased transforms camel cased string", () => {
            const helper = new StringHelper();

            const testValue = "camelCasedString";
            const result = helper.toPascalCased(testValue);

            expect(result).toBe("CamelCasedString");
        });
        test("toPascalCased transforms pascal cased", () => {
            const helper = new StringHelper();

            const testValue = "PascalCasedString";
            const result = helper.toPascalCased(testValue);

            expect(result).toBe("PascalCasedString");
        });
        test("toPascalCased transforms double UpperCased letters cased", () => {
            const helper = new StringHelper();

            const testValue = "PPwithDoubleUpperCCase";
            const result = helper.toPascalCased(testValue);

            expect(result).toBe("PPwithDoubleUpperCCase");
        });
        test("toPascalCased throws if underscore exist", () => {
            const helper = new StringHelper();

            const testValue = "UPPER_CASED_SNAKED";
            const result = (): string => helper.toPascalCased(testValue);

            expect(result).toThrowError(
                'Failed to transform to PascalCased (yet...). Parameter must not contain "_"'
            );
        });
    });

    describe("toCamelCased tests", () => {
        test("toCamelCased transforms camel cased string", () => {
            const helper = new StringHelper();

            const testValue = "camelCasedString";
            const result = helper.toCamelCased(testValue);

            expect(result).toBe("camelCasedString");
        });
        test("toCamelCased transforms pascal cased", () => {
            const helper = new StringHelper();

            const testValue = "PascalCasedString";
            const result = helper.toCamelCased(testValue);

            expect(result).toBe("pascalCasedString");
        });
        test("toCamelCased transforms double UpperCased letters cased", () => {
            const helper = new StringHelper();

            const testValue = "PPwithDoubleUpperCCase";
            const result = helper.toCamelCased(testValue);

            expect(result).toBe("pPwithDoubleUpperCCase");
        });
        test("toCamelCased throws if underscore exist", () => {
            const helper = new StringHelper();

            const testValue = "UPPER_CASED_SNAKED";
            const result = (): string => helper.toCamelCased(testValue);

            expect(result).toThrowError(
                'Failed to transform to camelCased (yet...). Parameter must not contain "_"'
            );
        });
    });
});
