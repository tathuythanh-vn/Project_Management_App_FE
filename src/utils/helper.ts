export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const formarDateTime = (date: Date) => {
    return Intl.DateTimeFormat('en-US', {
        dateStyle: "full",
    }).format(date)
}