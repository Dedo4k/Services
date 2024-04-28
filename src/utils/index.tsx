export const getTimeZones = (): string[] => {
    // @ts-ignore
    return Intl.supportedValuesOf("timeZone");
}

export {};