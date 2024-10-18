// shadow
export const shadow = {
  borderRadius: '8px',
  border: '1px solid #e0e0e0',
  boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
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
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};
