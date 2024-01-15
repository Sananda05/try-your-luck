const WinnerDetails = ({ name, result }) => {
  return (
    <div className="modal" style={{ height: "200px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyItems: "center",
          gap: "25px",
          paddingTop: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#5E5EFB",
          }}
        >
          Congratulations!{" "}
          <div style={{ color: "#21375C", fontSize: "24px" }}>{name}</div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#21375C",
          }}
        >
          You won{" "}
          <div style={{ color: "#21375C", fontSize: "20px" }}>
            {result} Discount
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinnerDetails;
