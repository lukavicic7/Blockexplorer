import React, { useState, useEffect } from "react";
//use useParams 
import { useParams } from 'react-router-dom';
import convertTime from "../convertTime";
import '../App.css'



const BlockDetails = (props) => {
    const [block, setBlock] = useState({ "tx": [] });
    const params = useParams()

    useEffect(() => {
        const block_height = params.block_height;
        const fetchData = async () => {
            await fetch(`http://localhost:8000/block/${block_height}`)
                .then((response) => response.json())
                .then((block) => { setBlock(block); console.log(block) });
        }
        fetchData()
            .catch(console.error);

    },
        []);



    return (
        <div className="center">
            <h2>Block details</h2>
            <table>
                <tbody>
                    <tr><td><b>Hash</b></td><td>{block.hash}</td></tr><tr><td><b>Confirmations</b></td><td>{block.confirmations}</td></tr>
                    <tr><td><b>Timestamp</b></td><td>{convertTime(block.time)}</td></tr><tr><td><b>Height</b></td><td>{block.height}</td></tr>
                    <tr><td><b>Number of Transactions</b></td><td>{block.nTx}</td></tr><tr><td><b>Difficulty</b></td><td>{block.difficulty}</td></tr>
                    <tr><td><b>Merkle root</b></td><td>{block.merkleroot}</td></tr><tr><td><b>Version</b></td><td>{block.version}</td></tr>
                    <tr><td><b>Bits</b></td><td>{block.bits}</td></tr><tr><td><b>Weight</b></td><td>{block.weight}</td></tr>
                    <tr><td><b>Size</b></td><td>{block.size + " bytes"}</td></tr><tr><td><b>Nonce</b></td><td>{block.nonce}</td></tr>
                    <tr><td><b>Previous block hash</b></td><td>{block.previousblockhash}</td></tr>
                    <tr><td><b>Next block hash</b></td><td>{block.nextblockhash}</td></tr>
                    <tr><td><b>Transaction Volume</b></td><td>{block.total_out / 100000000 + " BTC"}</td></tr>
                    <tr><td><b>Total fee</b></td><td>{block.totalfee / 100000000 + " BTC"}</td></tr>
                    <tr><td><b>Block Reward</b></td><td>{block.subsidy / 100000000 + " BTC"}</td></tr>
                </tbody>
            </table>
            <h2>Transactions in block</h2>
            <div className="center">
                <table className="styled-table" style={{ width: "70%" }}>
                    <thead><tr><td>Hash</td></tr></thead>
                    <tbody>
                        {
                            block.tx.map((transaction) => (
                                <tr>
                                    <a href={`/transaction/${transaction[1]}`}><td>{transaction[0]}</td></a>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );

}

export default BlockDetails;
