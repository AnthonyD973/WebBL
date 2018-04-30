export class WglShaderConfig {

    /**
     * Minimum dimension for vectors and matrices.
     */
    public static readonly DIM_MIN = 2;

    /**
     * Maximum dimension for vectors and matrices.
     */
    public static readonly DIM_MAX = 4;

    /**
     * Regex matching all valid identifiers.
     */
    public static readonly IDENTIFIER_REGEX = /^[A-Za-z_][A-Za-z0-9_]*$/;

}
