type InvalidCountType = {actualCount: number, min: number, max: number};
type InvalidLengthType = {actualLength: number, requiredLength: number};
type ErrorTypes = InvalidCountType | InvalidLengthType;

export {
    InvalidCountType,
    InvalidLengthType,
    ErrorTypes
}
