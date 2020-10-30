import { BindToClass } from "./BindThis";
import { Guid } from "guid-typescript";
import { WrappedGuid } from "./interfaces/WrappedGuid";
import { PossibleStrings } from "./interfaces/PossibleStrings";

@BindToClass()
export class StringHelper {
    /**
     * trims string. Whitespaces at start and end will be trimmed
     * @param value
     */
    trimWhitspaces(value: string): string {
        return this.trim(value, undefined);
    }

    /**
     * trims string => if no pattern has been passed, whitespaces will be trimmed
     * @param value
     * @param pattern
     */
    trim(value: string, pattern?: string | RegExp): string {
        return this.trimStart(this.trimEnd(value, pattern), pattern);
    }

    /**
     * trims start of string => if no pattern has been passed, whitespaces will be trimmed
     * @param value
     * @param pattern
     */
    trimStart(value: string, pattern?: string | RegExp): string {
        let result = value;
        if (
            pattern === "" ||
            pattern === undefined ||
            pattern instanceof RegExp
        ) {
            const searchPattern = pattern || /\s/;
            let match = searchPattern.exec(result);
            while (result && match && match.length > 0 && match.index === 0) {
                result = result.substring(match[0].length);
                match = searchPattern.exec(result);
            }
            return result;
        } else if (typeof pattern === "string") {
            while (!!result && result.indexOf(pattern) === 0) {
                result = result.substring(pattern.length);
            }
            return result;
        }

        throw Error(
            `Type of pattern is invalid: Please use only RegExp or string. Type is "${typeof pattern}".`
        );
    }

    findLastMatch(value: string, pattern: RegExp): RegExpExecArray | null {
        if (!pattern.global) {
            throw new Error(
                "Can not find last match: Global flag has to be set!"
            );
        }
        const interValue = value;
        // say "or" to adress iterations (?) Seems to work fine :)
        let lastMatch = pattern.exec(interValue) || pattern.exec(interValue);
        let result = lastMatch;
        while (
            lastMatch &&
            lastMatch.length > 0 &&
            lastMatch.index <= interValue.length - lastMatch[0].length
        ) {
            result = lastMatch;
            if (interValue && interValue.length === lastMatch.index + 1) {
                break;
            } else if (interValue) {
                // interValue = interValue.substr(lastMatch.index + 1);
                lastMatch = pattern.exec(interValue);
            }
        }
        return result;
    }

    /**
     * trims end of string => if no pattern has been passed, whitespaces will be trimmed
     * @param value
     * @param pattern
     */
    trimEnd(value: string, pattern?: string | RegExp): string {
        let result = value;
        if (
            pattern === "" ||
            pattern === undefined ||
            pattern instanceof RegExp
        ) {
            const searchPattern = pattern || /\s/g;

            let match = this.findLastMatch(result, searchPattern);
            while (
                result &&
                match &&
                match.length > 0 &&
                match.index === result.length - match[0].length
            ) {
                result = result.substring(0, result.length - match[0].length);
                match = this.findLastMatch(result, searchPattern);
            }
            return result;
        } else if (typeof pattern === "string") {
            while (
                !!result &&
                result.lastIndexOf(pattern) === result.length - pattern.length
            ) {
                result = result.substring(0, result.length - pattern.length);
            }
            return result;
        }

        throw Error(
            `Type of pattern is invalid: Please use only RegExp or string. Type is "${typeof pattern}".`
        );
    }

    /**
     * Combines with "" as separator
     * @param parts will not include null or undefined in resulting string
     */
    combine(
        ...parts: Array<string | boolean | number | undefined | null>
    ): string {
        return parts.filter((p) => p !== undefined && p !== null).join("");
    }

    toUpperCasedWithUnderscore(camelCasedString: string): string {
        if (typeof camelCasedString !== "string") {
            return camelCasedString;
        }

        if (camelCasedString.indexOf("_") >= 0) {
            throw new Error(
                'Failed to transform to UPPER_CASED_SNAKE_CASE. Parameter must not contain "_"'
            );
        }

        return (
            camelCasedString
                .replace(
                    /([a-z_])([A-Z]+)/g,
                    (mtch) => `${mtch[0]}_${mtch.substr(1).toUpperCase()}`
                )
                // .replace(/(?<!^)[A-Z]+/g, (mtch) => `_${mtch.toLowerCase()}`)
                .toUpperCase()
        );
    }

    toPascalCased(camelCasedString: string): string {
        if (typeof camelCasedString !== "string") {
            return camelCasedString;
        }

        if (camelCasedString.indexOf("_") >= 0) {
            throw new Error(
                'Failed to transform to PascalCased (yet...). Parameter must not contain "_"'
            );
        }
        // return camelCasedString.replace(/(?<=^)[a-z]{1}/, (mtch) =>
        return camelCasedString.replace(/(?:^)[a-z]{1}/, (mtch) =>
            mtch.toUpperCase()
        );
    }

    toCamelCased(PascalCasedString: string): string {
        if (PascalCasedString.indexOf("_") >= 0) {
            throw new Error(
                'Failed to transform to camelCased (yet...). Parameter must not contain "_"'
            );
        }
        // return PascalCasedString.replace(/(?<=^)[A-Z]{1}/g, (mtch) =>
        return PascalCasedString.replace(/(?:^)[A-Z]{1}/g, (mtch) =>
            mtch.toLowerCase()
        );
    }

    createGuid(): WrappedGuid {
        return Guid.create().toString();
    }

    createGuidString(): string {
        return Guid.create().toString();
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isNonEmptyGuid(possibleGuid: any): possibleGuid is WrappedGuid {
        try {
            const parsedGuid =
                Guid.isGuid(possibleGuid) && typeof possibleGuid !== "string"
                    ? possibleGuid
                    : Guid.parse(possibleGuid);
            return !parsedGuid.isEmpty() && Guid.isGuid(parsedGuid);
        } catch (err) {
            return false;
        }
    }

    isTypescriptGuid(possibleGuid: WrappedGuid): possibleGuid is Guid {
        try {
            return (
                typeof possibleGuid !== "string" && Guid.isGuid(possibleGuid)
            );
        } catch (err) {
            return false;
        }
    }

    asGuid(possibleGuid: WrappedGuid): Guid {
        if (this.isTypescriptGuid(possibleGuid)) {
            return possibleGuid;
        }
        return Guid.parse(possibleGuid);
    }

    isEqualGuids(guid1: WrappedGuid, guid2: WrappedGuid): boolean {
        const g1 = this.asGuid(guid1);
        const g2 = this.asGuid(guid2);
        return g1.equals(g2);
    }

    joinCssClasses(...classNames: PossibleStrings[]): string {
        return this.joinStringsAndNumbers(classNames, " ");
    }

    /**
     * Joines given strings and numbers into a string connected by separator
     * parts which are no numbers or strings will be ignored. Also empty strings will be ignored and skipped
     * @param parts
     * @param separator
     */
    joinStringsAndNumbers(parts: PossibleStrings[], separator = ","): string {
        return (parts || [])
            .filter(
                (cn) =>
                    (typeof cn === "string" && cn !== "") ||
                    typeof cn === "number"
            )
            .join(separator);
    }
}

export default StringHelper;
