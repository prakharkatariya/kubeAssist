import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

export function stringAvatar(name = "", styleOverrideProps: any = {}) {
  let characters = "UU";
  if (name && name.trim()) {
    characters = `${name.charAt(0).toUpperCase()}${name
      .charAt((name.indexOf(" ") !== -1 ? name.indexOf(" ") : 0) + 1)
      ?.toUpperCase()}`;
  }
  return {
    style: {
      bgcolor: stringToColor(name),
      width: 36,
      height: 36,
      fontSize: 16,
      fontWeight: 600,
      ...styleOverrideProps,
    },
    text: characters,
  };
}

export const generateSessionId = () => `session_${uuidv4()}`;

export const formatDate = (
  dateString: string | number | Date,
  dateFormat = "MM/dd/yyyy"
) => {
  try {
    const date = new Date(dateString);
    return format(date, dateFormat);
  } catch (error) {
    console.log("error", dateString, error);
    return "Invalid Date";
  }
};

export const msToTime = (milliseconds: any) => {
  if (!milliseconds || Number.isNaN(milliseconds)) return "-";
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const remainingMsAfterHours = milliseconds % (1000 * 60 * 60);

  const minutes = Math.floor(remainingMsAfterHours / (1000 * 60));
  const remainingMsAfterMinutes = remainingMsAfterHours % (1000 * 60);
  const seconds = Math.floor(remainingMsAfterMinutes / 1000);

  let result = "";

  if (hours > 0) {
    result += `${hours}hr${hours > 1 ? "s" : ""} `;
  }
  if (minutes > 0) {
    result += `${minutes}min${minutes > 1 ? "s" : ""} `;
  }
  if (seconds > 0 || (!hours && !minutes)) {
    result += `${seconds}sec${seconds > 1 ? "s" : ""}`;
  }

  return result.trim();
};
