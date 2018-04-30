export class WglShaderPrimitiveParser {

    public static parseBoolean(value: boolean): string {
        return String(value);
    }

    public static parseFloat(value: number): string {
        let parsedString = String(value);
        const containsDotRegex = /\./;
        if (!containsDotRegex.test(parsedString)) {
            parsedString += '.';
        }
        return parsedString;
    }

    public static parseInteger(value: number): string {
        return String(Math.floor(value));
    }

}
