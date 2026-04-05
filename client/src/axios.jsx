import axios from "axios";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/hello")
      .then((res) => console.log(res.data));
  }, []);

  return <div>Test</div>;
}

export default App;
