/**
 * Checks if variable is set
 * @param item
 * @returns {boolean}
 */
export function isSet(item) {
    return typeof item !== "undefined";
}

/**
 * Checks if variable is empty
 * @param item
 * @returns {boolean}
 */
export function isNotEmpty(item) {
    return typeof item !== "undefined" && item !== null && item !== "" && item !== false;
}