// shadow
export const shadow = {
    borderRadius: "8px",
    border: "0.3px solid rgba(0, 0, 0, 0.05)",
    boxShadow: "cardShadow",
}
// card card container 
export const cardContainer = {
    width: "100%",
    padding: { xs: 3, sm: 4 },
    display: "flex",
    flexDirection: "column",
    gap: 2,
   ...shadow
}