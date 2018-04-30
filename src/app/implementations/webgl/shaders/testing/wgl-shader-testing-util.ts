export class WglShaderTestingUtil {

    public static escapeRegexCharacters(str: string): string {
        return str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
    }

}
