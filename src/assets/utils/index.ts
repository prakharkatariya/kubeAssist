export const getCurrentDateFormatted = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export function stringAvatar(name: string, color: string) {
  return {
    sx: {
      bgcolor: color,
      width: 32,
      height: 32,
      mr: '8px',
      fontSize: 16,
      fontWeight: 600,
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}
