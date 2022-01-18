import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from "./routes";
import Layout from "./components/Layout"
class App extends Component {
  render() {
    return (

      <div>

        <Router>
          <Layout>
            <BaseRouter />
          </Layout>
        </Router>

      </div>

    );
  }
}
export default App;