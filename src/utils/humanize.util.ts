
const units: Record<string, number> = {
    million: 1e6,
    billion: 1e9,
    trillion: 1e12,
    quadrillion: 1e15,
    quintillion: 1e18,
    septillion: 1e24
}

export function dehumanize(humanizedValue: string): number {
    if (isJustNumber(humanizedValue)) {
        return parseFloat(cleanNumberString(humanizedValue));
    }

    const regex = /([\d.,]+)\s*(billion|trillion|quadrillion|quintillion|septillion)/i;
    const match = humanizedValue.toLowerCase().match(regex);

    if (!match) {
        throw new Error(`Invalid input format: "${humanizedValue}"`);
    }

    const number = parseFloat(match[1].replace(/,/g, ''));
    const unit = match[2].toLowerCase();
    const multiplier = units[unit];

    return number * multiplier;
}

function isJustNumber(string: string): boolean {
  return /^[0-9]+$/.test(cleanNumberString(string));
}

function cleanNumberString(stringNumber: string): string {
   return stringNumber.replace(/[.\s]/g, '');
}