const WinnerList = ({ winnerList }) => {
  return (
    <div
      style={{
        width: "50%",
        display: "flex",
        flexDirection: "column",
        marginTop: "50px",
        alignItems: "flex-start",
        paddingLeft: "2rem",
      }}
    >
      <h2>Winner List</h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "100px",
          fontSize: "18px",
          fontWeight: "bold",
          backgroundColor: "#dae6f5",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          borderRadius: "5px",
        }}
      >
        {" "}
        <p>Name</p> <p>Email</p> <p>Discount</p>
      </div>
      {winnerList.map((winner, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "60px",
            paddingLeft: "10px",
          }}
        >
          <p>{winner.name}</p> <p>{winner.email}</p> <p>{winner.result}</p>{" "}
        </div>
      ))}
    </div>
  );
};

export default WinnerList;
