export const ncalcFunctions = [
    {
        label: "Abs",
        type: "function",
        detail: "Abs(number)",
        info: "Returns the absolute value of a specified number. Ex: Abs(-1) → 1",
    },
    {
        label: "Acos",
        type: "function",
        detail: "Acos(number)",
        info: "Returns the angle whose cosine is the specified number. Ex: Acos(1) → 0",
    },
    {
        label: "Asin",
        type: "function",
        detail: "Asin(number)",
        info: "Returns the angle whose sine is the specified number. Ex: Asin(0) → 0",
    },
    {
        label: "Atan",
        type: "function",
        detail: "Atan(number)",
        info: "Returns the angle whose tangent is the specified number. Ex: Atan(0) → 0",
    },
    {
        label: "Ceiling",
        type: "function",
        detail: "Ceiling(number)",
        info: "Returns the smallest integer greater than or equal to the specified number. Ex: Ceiling(1.5) → 2",
    },
    {
        label: "Cos",
        type: "function",
        detail: "Cos(angle)",
        info: "Returns the cosine of the specified angle. Ex: Cos(0) → 1",
    },
    {
        label: "Exp",
        type: "function",
        detail: "Exp(power)",
        info: "Returns e raised to the specified power. Ex: Exp(0) → 1",
    },
    {
        label: "Floor",
        type: "function",
        detail: "Floor(number)",
        info: "Returns the largest integer less than or equal to the specified number. Ex: Floor(1.5) → 1",
    },
    {
        label: "IEEERemainder",
        type: "function",
        detail: "IEEERemainder(dividend, divisor)",
        info: "Returns the remainder from division. Ex: IEEERemainder(3, 2) → -1",
    },
    {
        label: "Ln",
        type: "function",
        detail: "Ln(number)",
        info: "Returns the natural logarithm of a specified number. Ex: Ln(1) → 0",
    },
    {
        label: "Log",
        type: "function",
        detail: "Log(number, base)",
        info: "Returns the logarithm of a specified number in a specified base. Ex: Log(1, 10) → 0",
    },
    {
        label: "Log10",
        type: "function",
        detail: "Log10(number)",
        info: "Returns the base 10 logarithm of a specified number. Ex: Log10(1) → 0",
    },
    {
        label: "Max",
        type: "function",
        detail: "Max(a, b)",
        info: "Returns the larger of two numbers. Ex: Max(1, 2) → 2",
    },
    {
        label: "Min",
        type: "function",
        detail: "Min(a, b)",
        info: "Returns the smaller of two numbers. Ex: Min(1, 2) → 1",
    },
    {
        label: "Pow",
        type: "function",
        detail: "Pow(base, power)",
        info: "Returns a number raised to the specified power. Ex: Pow(3, 2) → 9",
    },
    {
        label: "Round",
        type: "function",
        detail: "Round(number, decimals)",
        info: "Rounds a value to the nearest integer or specified decimal places. Ex: Round(3.222, 2) → 3.22",
    },
    {
        label: "Sign",
        type: "function",
        detail: "Sign(number)",
        info: "Returns the sign of a number (-1, 0, 1). Ex: Sign(-10) → -1",
    },
    {
        label: "Sin",
        type: "function",
        detail: "Sin(angle)",
        info: "Returns the sine of the specified angle. Ex: Sin(0) → 0",
    },
    {
        label: "Sqrt",
        type: "function",
        detail: "Sqrt(number)",
        info: "Returns the square root of a specified number. Ex: Sqrt(4) → 2",
    },
    {
        label: "Tan",
        type: "function",
        detail: "Tan(angle)",
        info: "Returns the tangent of the specified angle. Ex: Tan(0) → 0",
    },
    {
        label: "Truncate",
        type: "function",
        detail: "Truncate(number)",
        info: "Returns the integral part of a number. Ex: Truncate(1.7) → 1",
    },
    {
        label: "in",
        type: "function",
        detail: "in(element, set)",
        info: "Checks if an element is in a set. Ex: in(1 + 1, 1, 2, 3) → true",
    },
    {
        label: "if",
        type: "function",
        detail: "if(condition, then, else)",
        info: "Returns a value based on a condition. Ex: if(3 % 2 = 1, 'true', 'false') → 'true'",
    },
    {
        label: "ifs",
        type: "function",
        detail: "ifs(condition1, value1, condition2, value2, ..., default)",
        info: 'Evaluates conditions in order, returns first true value or default. Ex: ifs(foo > 50, "bar", foo > 75, "baz", "quux")',
    },
];

export const keyWords = [
    { label: "and", type: "keyword", info: "Logical AND operator" },
    { label: "or", type: "keyword", info: "Logical OR operator" },
    { label: "not", type: "keyword", info: "Logical NOT operator" },
    { label: "true", type: "constant", info: "Boolean true" },
    { label: "false", type: "constant", info: "Boolean false" },
];

export const ReservedWords = [...ncalcFunctions, ...keyWords];