import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./containers/Home";
import BlockDetails from "./containers/BlockDetails";
import TransactionDetails from "./containers/TransactionDetails";
const BaseRouter = () => (
    <div>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/block/:block_height" element={<BlockDetails />} />
            <Route exact path="/transaction/:transaction_id" element={<TransactionDetails />} />
        </Routes>
    </div>
);

export default BaseRouter;
