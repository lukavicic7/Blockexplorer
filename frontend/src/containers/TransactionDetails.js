import React, { useState, useEffect } from "react";
//use useParams 
import { useParams } from 'react-router-dom';
import convertTime from "../convertTime";
import '../App.css'

const transaction_empty = {
    "vin": [],
    "vout": [],
    "value_in_usd": 0,
    "value_in_eur": 0,
}

const TransactionDetails = (props) => {
    const [transaction, setTransaction] = useState(transaction_empty);
    const params = useParams()

    useEffect(() => {
        const transaction_id = params.transaction_id;
        const fetchData = async () => {
            await fetch(`http://localhost:8000/transaction/${transaction_id}`)
                .then((response) => response.json())
                .then((transaction) => { setTransaction(transaction); console.log(transaction) });
        }
        fetchData()
            .catch(console.error);

    },
        []);

    return (
        <div className="center">
            <h2>Transaction details</h2>
            <table>
                <tbody>
                    <tr><td><b>Hash</b></td><td>{transaction.hash}</td></tr><tr><td><b>Status</b></td><td>{transaction.status}</td></tr>
                    <tr><td><b>Time</b></td><td>{convertTime(transaction.time)}</td></tr><tr><td><b>Size</b></td><td>{transaction.size + " bytes"}</td></tr>
                    <tr><td><b>Weight</b></td><td>{transaction.weight}</td></tr><tr><td><b>Confirmations</b></td><td>{transaction.confirmations}</td></tr>
                    {
                        (transaction.hasOwnProperty('block'))
                            ? <tr><td><b>Block</b></td><td><a href={`/block/${transaction.block}`}>{transaction.block}</a></td></tr>
                            : <tr><td><b>Block</b></td><td>Not yet included in the block</td></tr>
                    }

                    <tr><td><b>Total input</b></td><td>{`${transaction.total_input} BTC`}</td></tr>
                    <tr><td><b>Total output</b></td><td>{`${transaction.total_output} BTC`}</td></tr>
                    <tr><td><b>Fee</b></td><td>{`${transaction.fee / 100000000} BTC`}</td></tr>
                    <tr><td><b>Value in USD</b></td><td>{`${transaction.value_in_usd.toLocaleString()} $`}</td></tr>
                    <tr><td><b>Value in EUR</b></td><td>{`${transaction.value_in_eur.toLocaleString()} €`}</td></tr>
                </tbody>
            </table>
            <h2>Inputs</h2>
            <table>
                <tbody>
                    {
                        transaction.vin.map((input) => (
                            <React.Fragment>

                                {
                                    (input.coinbase !== undefined)
                                        ? <h3 style={{ color: "green" }}>COINBASE (Newly generated coins)</h3>
                                        :
                                        <React.Fragment>
                                            {
                                                (input.hasOwnProperty('scriptPubKey'))
                                                    ? <tr><td><b>Address</b></td><td>{input.scriptPubKey.addresses[0]}</td></tr>
                                                    : <tr><td><b>Address</b></td><td></td></tr>
                                            }

                                            <tr><td><b>Script</b></td><td>{input.scriptPubKey.asm}</td></tr>
                                            <tr><td><b>Value</b></td><td>{input.value + " BTC"}</td></tr>
                                            <tr><td><b>Signature script</b></td><td>{input.scriptSig.asm}</td></tr>
                                            <hr style={{ width: "900px", border: "2px dashed black" }}></hr>
                                            <br></br>
                                        </React.Fragment>}
                            </React.Fragment>
                        ))
                    }
                </tbody>
            </table>
            <h2>Outputs</h2>
            <table>
                <tbody>
                    {
                        transaction.vout.map((output) => (
                            <React.Fragment>
                                {
                                    (output.scriptPubKey.addresses === undefined)
                                        ? <tr><td><b>Address</b></td><td></td></tr>
                                        : <tr><td><b>Address</b></td><td>{output.scriptPubKey.addresses[0]}</td></tr>
                                }
                                <tr><td><b>Script</b></td><td>{output.scriptPubKey.asm}</td></tr>
                                <tr ><td><b>Value</b></td><td>{output.value + " BTC"}</td></tr>
                                <hr style={{ width: "900px", border: "2px dashed black" }}></hr>
                                <br></br>
                            </React.Fragment>
                        ))
                    }
                </tbody>
            </table>

        </div>
    );

}

export default TransactionDetails;
