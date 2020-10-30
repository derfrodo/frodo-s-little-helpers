import { Guid } from "guid-typescript";
import { WrappedGuid } from "./interfaces/WrappedGuid";
import { PossibleStrings } from "./interfaces/PossibleStrings";
export declare class StringHelper {
    /**
     * trims string. Whitespaces at start and end will be trimmed
     * @param value
     */
    trimWhitspaces(value: string): string;
    /**
     * trims string => if no pattern has been passed, whitespaces will be trimmed
     * @param value
     * @param pattern
     */
    trim(value: string, pattern?: string | RegExp): string;
    /**
     * trims start of string => if no pattern has been passed, whitespaces will be trimmed
     * @param value
     * @param pattern
     */
    trimStart(value: string, pattern?: string | RegExp): string;
    findLastMatch(value: string, pattern: RegExp): RegExpExecArray | null;
    /**
     * trims end of string => if no pattern has been passed, whitespaces will be trimmed
     * @param value
     * @param pattern
     */
    trimEnd(value: string, pattern?: string | RegExp): string;
    /**
     * Combines with "" as separator
     * @param parts will not include null or undefined in resulting string
     */
    combine(...parts: Array<string | boolean | number | undefined | null>): string;
    toUpperCasedWithUnderscore(camelCasedString: string): string;
    toPascalCased(camelCasedString: string): string;
    toCamelCased(PascalCasedString: string): string;
    createGuid(): WrappedGuid;
    createGuidString(): string;
    isNonEmptyGuid(possibleGuid: any): possibleGuid is WrappedGuid;
    isTypescriptGuid(possibleGuid: WrappedGuid): possibleGuid is Guid;
    asGuid(possibleGuid: WrappedGuid): Guid;
    isEqualGuids(guid1: WrappedGuid, guid2: WrappedGuid): boolean;
    joinCssClasses(...classNames: PossibleStrings[]): string;
    /**
     * Joines given strings and numbers into a string connected by separator
     * parts which are no numbers or strings will be ignored. Also empty strings will be ignored and skipped
     * @param parts
     * @param separator
     */
    joinStringsAndNumbers(parts: PossibleStrings[], separator?: string): string;
}
export default StringHelper;
