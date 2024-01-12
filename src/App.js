import "./App.css";
import Navbar from "./component/navbar/Navbar";
import SpinnerComponent from "./component/spinner/SpinnerComponent";

function App() {
  return (
    <div className="App">
      <div>
        <Navbar />
        <SpinnerComponent />
      </div>
    </div>
  );
}

export default App;
