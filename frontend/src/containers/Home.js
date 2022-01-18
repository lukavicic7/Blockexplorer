import React, { useState, useEffect } from "react";
import '../App.css'
import LatestBlocksList from "../components/LatestBlocksList"
import LatestTranscationsList from "../components/LatestTransactionsList";
import axios from "axios"
const Home = () => {
    const [latestBlocks, setlatestBlocks] = useState([]);
    const [latestTransactions, setlatestTransactions] = useState([]);

    useEffect(() => {
        const fetchBlocks = async () => {
            await axios.get("http://localhost:8000/lastblocks")
                .then((response) => response.data)
                .then((last_five_blocks) => setlatestBlocks(last_five_blocks));

        }
        const fetchTransactions = async () => {
            await axios.get("http://localhost:8000/mempool")
                .then((response) => response.data)
                .then((transactions_in_mempool) => setlatestTransactions(transactions_in_mempool));
        }
        fetchBlocks()
            .catch(console.error);
        fetchTransactions()
            .catch(console.error);


        const interval1 = setInterval(() => {
            fetchBlocks().catch(console.error);

        }, 60000);

        const interval2 = setInterval(() => {
            fetchTransactions().catch(console.error);
        }, 5000);
        return () => { clearInterval(interval1); clearInterval(interval2) };
    },
        []);

    return (
        <div className="grid-container">
            <div className="one">
                <LatestBlocksList latestBlocks={latestBlocks} />
            </div>
            <div className="two">
                <LatestTranscationsList latestTransactions={latestTransactions} />
            </div>
        </div>
    );

}

export default Home;

/*
import React, {useState, useEffect, useContext} from "react";
import Results from "./Result";
import ThemeContext from "./ThemeContext";



const SearchParams = () =>{
    const [location, setLocation] = useState("Split");
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("Monitors");
    const [moviesData, setMovies] = useState([]);
    const [theme, setTheme] = useContext(ThemeContext);

    useEffect(()=>{
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};
        fetch("http://localhost:4000/api/categories", options)
        .then((response)=>response.json())
        .then((categories)=>setCategories(categories));
    },

    []);

    function getMovies(){
        fetch(`http://localhost:4000/api/movies?genre=${category}`)
        .then((response)=> response.json())
        .then((movies)=>(setMovies(movies)));
    }

    return(
        <div className="search-params">
            <label htmlFor="location">
            <h1>{location}</h1>
            <input onChange={(e)=>setLocation(e.target.value)}/>
            </label>
            Theme
            <select
            value={theme}
            onChange={e=>(setTheme(e.target.value))}
            >
            <option value="Red">red</option>
            <option value="Aquamarine">blue</option>
            <option value="BlueViolet">pink</option>
            <option value="Chartreuse">green</option>
            </select>

            <form onSubmit={
        (e)=>{e.preventDefault();
            getMovies();}
            }>
                <select id="category" onChange={(e)=>setCategory(e.target.value)}>
    {categories.map((item)=>{return <option value={item}>{item}</option>})}
            </select>
            <button style={{backgroundColor:theme}}>Klikni!</button>
            </form>
            <Results category={category} movies={moviesData}/>



        </div>
    );
}

export default SearchParams; */
// import React from "react";
// import './App.css'
// import ColorList from "./ColorList"

// class Task extends React.Component {
//     state = {
//         colors: [],
//         currentColor: ""
//     };

//     updateColors(newColor) {
//         //regular expression for valid hex color
//         var reg = new RegExp("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$")
//         if (!reg.test(newColor)) { alert("Not a color"); }
//         else {
//             if (this.state.colors.includes(newColor)) { alert("Color already in list") }
//             else {
//                 this.setState({
//                     colors: [...this.state.colors, newColor],
//                     currentColor: newColor
//                 });
//             }
//         }
//     }

//     async changeColor() {
//         await fetch("https://www.colr.org/json/color/random", { cache: 'no-cache' }).then(response => response.json())
//             .then(data => {
//                 if (data.new_color) { //if not empty
//                     this.updateColors(`#${data.new_color}`)
//                 }
//             })

//     }

//     render() {
//         return (
//             <div className="center">
//                 <button name="changeColor" type="button" style={{ color: this.state.currentColor, fontSize: "large" }}
//                     onClick={(e) => this.changeColor()}>Change color</button>
//                 <p></p>
//                 <ColorList colors={this.state.colors} currentColor={this.state.currentColor} />
//                 <input placeholder="Enter a new color" onKeyUp={(e) => {
//                     if (e.key === "Enter") { this.updateColors(e.target.value) }
//                 }}></input>
//             </div>
//         );
//     }
// }

// export default Task;