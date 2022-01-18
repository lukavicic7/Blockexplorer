import React, { Component } from "react";

import convertTime from "../convertTime";
class LatestBlocksList extends Component {
    state = {
        latestBlocks: []
    };
    //every time new color is added, list updates
    static getDerivedStateFromProps(nextProps) {
        return {
            latestBlocks: nextProps.latestBlocks
        };
    }


    render() {
        return (
            < div >
                <h2 style={{ "margin": "10px 10px 10px 50px" }}>Latest blocks</h2>
                <p style={{ "margin": "10px 10px 10px 50px" }}>Last 10 blocks</p>
                <table style={{ "margin": "50px 10px 10px 50px" }} className="styled-table">
                    <thead><tr><td>Height</td><td>Number of transactions</td><td>Block time</td><td>Size</td></tr></thead>
                    <tbody>
                        {
                            this.props.latestBlocks.map((block) => (
                                <tr>
                                    <a href={`/block/${block.height}`}><td>{block.height}</td></a><td>{block.nTx}</td><td>{convertTime(block.time)}</td><td>{block.size + " bytes"}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div >
        );
    }
}
export default LatestBlocksList;

// import React, { Component } from "react";

// class ColorList extends Component {
//     state = {
//         colors: []
//     };
//     //every time new color is added, list updates
//     static getDerivedStateFromProps(nextProps) {
//         return {
//             colors: nextProps.colors
//         };
//     }
//     //change order in list of colors
//     changeOrder(indexOfColor, up) {
//         let fromIndex = indexOfColor;
//         let toIndex;
//         // toIndex depends on whether we move up or down
//         if (up) { toIndex = indexOfColor - 1 }
//         else { toIndex = indexOfColor + 1 }
//         let colors_copy = this.state.colors
//         //if we try to move up from first place or move down from last place colors_copy[toIndex] would throw error
//         if (colors_copy[toIndex]) {
//             let elementToMove = colors_copy[fromIndex];
//             colors_copy.splice(fromIndex, 1);
//             colors_copy.splice(toIndex, 0, elementToMove);
//             this.setState({ colors: colors_copy })
//         }
//     }
//     render() {
//         return (
//             < div >
            // {
            //     this.props.colors.map((color) => (
            //         <table style={{ textAlign: "center" }}>
            //             {color === this.props.currentColor &&
            //                 <tr>
            //                     <td style={{ color: color, fontWeight: "bold" }}>{color}</td>
            //                     <td><button type="button" name="up" onClick={() => this.changeOrder(this.props.colors.indexOf(color), true)}>
            //                         <i className="arrow up"></i>
            //                     </button>
            //                         <button type="button" name="down" onClick={() => this.changeOrder(this.props.colors.indexOf(color), false)}>
            //                             <i className="arrow down"></i>
            //                         </button>
            //                     </td>
            //                 </tr>}
            //             {color !== this.props.currentColor &&
            //                 <tr>
            //                     <td style={{ color: color }}>{color}</td>
            //                     <td><button type="button" name="up" onClick={() => this.changeOrder(this.props.colors.indexOf(color), true)}>
            //                         <i className="arrow up"></i>
            //                     </button>
            //                         <button type="button" name="down" onClick={() => this.changeOrder(this.props.colors.indexOf(color), false)}>
            //                             <i className="arrow down"></i>
            //                         </button>
            //                     </td>
            //                 </tr>}
            //         </table>
            //     ))
            // }
//             </div >
//         );
//     }
// }
// export default ColorList;