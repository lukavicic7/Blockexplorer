import React, { useState } from "react";
import '../App.css'
import { useNavigate } from 'react-router-dom';


const Layout = ({ children }) => {
    const [selectValue, setSelectValue] = useState("block");
    const [input, setInput] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setSelectValue(e.target.value)
    }
    return (
        <div>
            <ul>

                <li><a href="/"><b>BlockExplorer</b></a></li>
                <form onSubmit={() => navigate(`/${selectValue}/${input}`)}>
                    <li style={{ "float": "right" }}>

                        <input defaultValue={input} onChangeCapture={e => setInput(e.target.value)} type="text" name="tx_block_search" placeholder="Search TX or block"></input>
                    </li>
                </form>
                <li style={{ "float": "right" }}><select name="tx_or_block" value={selectValue} onChange={handleChange} >
                    <option value="transaction">Transaction</option>
                    <option value="block">Block</option>
                </select></li>

            </ul>
            <br></br><br></br>
            <main>{children}</main>
        </div>
    );

}

export default Layout;

