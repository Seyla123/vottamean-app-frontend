// shadow
export const shadow = {
  borderRadius: '8px',
  border: '0.2px solid rgba(0, 0, 0, 0.05)',
  boxShadow: ' rgba(0, 0, 0, 0.16) 0px 1px 4px',
};
// card card container
export const cardContainer = {
    width: '100%',
    padding: { xs: 3, sm: 4 },
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    ...shadow,
};
export const tableShadow = {
    borderRadius: '4px',
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.16)',
};

export const longText = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
}
