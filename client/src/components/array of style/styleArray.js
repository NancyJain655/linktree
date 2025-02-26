const stylesArray = [
    {
      name: "stack",
      styles: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        overflowY: "auto",
      },
    },
    {
      name: "grid",
      styles: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1rem",
        overflowY: "auto",
      },
    },
    {
      name: "carousel",
      styles: {
        display: "flex",
        flexDirection: "row",
        gap: "1rem",
        overflowX: "auto",
        maxWidth: "38%",
      },
    },
    ...[1, 2, 3, 4, 5, 6, 7].map((num) => ({
      name: `Themecont${num}`,
      styles: {
        height: "12rem",
        border: "1px solid #E0E2D9",
        backgroundColor: [
          "white",
          "#E0E2D9",
          "rgb(39,45,47)",
          "black",
          "rgb(228,245,254)",
          "rgb(229,249,239)",
          "rgb(252,239,227)",
        ][num - 1],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    })),
    ...[1, 2, 3].map((num) => ({
      name: `colopatlet${num}`,
      styles: {
        width: "9rem",
        height: "2rem",
        border: num === 3 ? "2px solid #F3F3F1" : "none",
        backgroundColor: "black",
        borderRadius: num === 2 ? "0.5rem" : num === 3 ? "1rem" : "0",
      },
    })),
    ...[4, 5, 6].map((num) => ({
      name: `colopatlet${num}`,
      styles: {
        width: "9rem",
        height: "2rem",
        border: "1px solid black",
        backgroundColor: "#f3f4f6",
        borderRadius: num === 5 ? "0.5rem" : num === 6 ? "1rem" : "0",
      },
    })),
    ...[7, 8, 9].map((num) => ({
      name: `colopatlet${num}`,
      styles: {
        width: "9rem",
        height: "2rem",
        border: "1px solid black",
        backgroundColor: "#f3f4f6",
        boxShadow: "6px 6px 0px rgba(0, 0, 0, 1)",
        borderRadius: num === 8 ? "0.5rem" : num === 9 ? "1rem" : "0",
      },
    })),
    ...[10, 11, 12].map((num) => ({
      name: `colopatlet${num}`,
      styles: {
        width: "9rem",
        height: "2rem",
        border: "none",
        backgroundColor: "#f3f4f6",
        boxShadow: "6px 6px 12px rgba(0, 0, 0, 0.3)",
        borderRadius: num === 11 ? "0.5rem" : num === 12 ? "1rem" : "0",
      },
    })),
    {
      name: "colopatlet13",
      styles: {
        width: "9rem",
        height: "2rem",
        backgroundColor: "black",
        clipPath:
          "polygon(0% 10%, 5% 0%, 10% 8%, 15% 2%, 20% 6%, 25% 0%, 30% 6%, 35% 2%, 40% 10%, 45% 4%, 50% 6%, 55% 2%, 60% 10%, 65% 0%, 70% 8%, 75% 2%, 80% 6%, 85% 0%, 90% 8%, 95% 2%, 100% 10%, 100% 90%, 95% 100%, 90% 92%, 85% 100%, 80% 94%, 75% 100%, 70% 92%, 65% 100%, 60% 94%, 55% 100%, 50% 92%, 45% 100%, 40% 94%, 35% 100%, 30% 92%, 25% 100%, 20% 94%, 15% 100%, 10% 92%, 5% 100%, 0% 90%)",
      },
    },
    {
      name: "colopatlet14",
      styles: {
        width: "9rem",
        height: "2rem",
        backgroundColor: "black",
        border: "none",
        color: "white",
        clipPath:
          "polygon(0% 8%, 5% 0%, 10% 6%, 15% 2%, 20% 6%, 25% 0%, 30% 6%, 35% 2%, 40% 8%, 45% 4%, 50% 6%, 55% 2%, 60% 8%, 65% 0%, 70% 6%, 75% 2%, 80% 6%, 85% 0%, 90% 6%, 95% 2%, 100% 8%, 100% 92%, 95% 100%, 90% 94%, 85% 98%, 80% 94%, 75% 100%, 70% 94%, 65% 98%, 60% 92%, 55% 96%, 50% 94%, 45% 98%, 40% 92%, 35% 100%, 30% 94%, 25% 98%, 20% 94%, 15% 100%, 10% 94%, 5% 98%, 0% 92%)",
      },
    },
    {
      name: "colopatlet15",
      styles: {
        width: "9rem",
        height: "2rem",
        border: "1px solid black",
        position: "relative",
      },
    },
    {
      name: "colopatlet16",
      styles: {
        width: "9rem",
        height: "2rem",
        backgroundColor: "black",
        color: "white",
        borderRadius: "20px",
        border: "none",
      },
    },
    {
      name: "colopatlet17",
      styles: {
        width: "9rem",
        height: "2px",
        position: "relative",
      },
    },
    {
      name: "colopatlet18",
      styles: {
        width: "9rem",
        height: "2rem",
        backgroundColor: "black",
        color: "white",
        borderRadius: "20px 0px 0px 20px",
        border: "none",
      },
    },
  ];
  
  export default stylesArray;