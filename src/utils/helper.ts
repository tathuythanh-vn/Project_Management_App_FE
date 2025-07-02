export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const formarDateTime = (date: Date) => {
    return Intl.DateTimeFormat('en-US', {
        dateStyle: "full",
    }).format(date)
}

export function formatSnakeToTitle (string: string): string {
    const splitted = string.split('_');
    return splitted.map(word => capitalize(word)).join(' ');
}

export function formatToMonthWeekDay(firstDate: Date, secondDate: Date): string {
    const ms = Math.abs(secondDate.getTime() - firstDate.getTime());

    const daysTotal = Math.floor(ms / (1000 * 60 * 60 * 24));
    const months = Math.floor(daysTotal / 30);          // Approximate 30 days per month
    const weeks = Math.floor((daysTotal % 30) / 7);
    const days = (daysTotal % 30) % 7;

    // Pad with zero if needed
    const pad = (n: number) => n.toString().padStart(1, '0');

    return `${pad(months)}M : ${pad(weeks)}W : ${pad(days)}D`;
}

export function formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes";
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const formatted = (bytes / Math.pow(1024, i)).toFixed(2);
    return `${formatted} ${sizes[i]}`;
}