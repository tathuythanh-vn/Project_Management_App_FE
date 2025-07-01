interface GreetingResult {
    text: string;
    emoji: string;
    combined: string;
}

export const getDynamicGreeting = (): GreetingResult => {
    const now = new Date();
    const hour = now.getHours();

    let text: string;
    let emoji: string;

    if (hour >= 5 && hour < 12) {
        text = "Good Morning";
        emoji = "🌅";
    } else if (hour >= 12 && hour < 17) {
        text = "Good Afternoon";
        emoji = "☀️";
    } else if (hour >= 17 && hour < 21) {
        text = "Good Evening";
        emoji = "🌆";
    } else {
        text = "Good Night";
        emoji = "🌙";
    }

    return {
        text,
        emoji,
        combined: `${text} ${emoji}`
    };
};

// Simple version that just returns the combined string
export const getGreeting = (): string => {
    const {combined} = getDynamicGreeting();
    return combined;
};

// Usage examples:
// const greeting = getGreeting(); // "Good Morning! 🌅"
// const { text, emoji } = getDynamicGreeting(); // { text: "Good Morning!", emoji: "🌅", combined: "Good Morning! 🌅" }