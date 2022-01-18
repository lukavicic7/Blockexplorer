import React, { Component } from "react";

import convertTime from "../convertTime";
class LatestTranscationsList extends Component {
    state = {
        latestTransactions: []
    };
    //every time new color is added, list updates
    static getDerivedStateFromProps(nextProps) {
        return {
            latestTransactions: nextProps.latestTransactions
        };
    }
    ellipsify(str) {
        if (str.length > 10) {
            console.log(this.state.latestTransactions)
            return (str.substring(0, 20) + "...");
        }
        else {
            return str;
        }
    }


    render() {
        return (
            < div >
                <h2>Latest transactions</h2>
                <p>Trasactions in mempool</p>
                <table className="styled-table">
                    <thead><tr><td>Hash</td><td>Time</td></tr></thead>
                    <tbody>
                        {
                            this.props.latestTransactions.map((transaction) => (
                                <tr>
                                    <a href={`/transaction/${transaction.txid}`}><td>{this.ellipsify(transaction.hash)}</td></a>
                                    <td>{convertTime(transaction.time)}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div >
        );
    }
}
export default LatestTranscationsList;
