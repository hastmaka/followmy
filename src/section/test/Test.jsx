// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    height: 'calc(100vh - 60px)',
    justifyContent: 'center',
    alignItems: 'center'
}));

//----------------------------------------------------------------

export default function Test() {
    return (
        <RootStyle>
            test
        </RootStyle>
    );
}

// import './Test.css'
// import {useState} from "react";
// const CustomLi = ({text, onClick}) => {
//     const [isHover, setIsHover] = useState(false)
//     return (
//         <li
//             onClick={_ => onClick(text)}
//             onMouseEnter={_ => setIsHover(true)}
//             onMouseLeave={_ => setIsHover(false)}
//             style={{
//                 listStyle: 'none',
//                 borderBottom: `1px solid ${isHover ? 'white' : 'transparent'}`,
//                 cursor: 'pointer'
//             }}
//         >{text}</li>
//     )
// }
//
// const NavBar = () => {
//
//     const handleClick = (text) => {
//         // debugger
//         alert(`You Click ${text}`)
//     }
//
//     return (
//         <div
//             style={{
//                 height: '80px',
//                 backgroundColor: '#367e9c',
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 padding: '0 30px'
//             }}
//         >
//             <div>
//                 <ul
//                     style={{
//                         display: 'flex',
//                         flexDirection: 'row',
//                         gap: '20px'
//                     }}
//                 >
//                     {['Home', 'Test 1', 'Test 2'].map(item =>
//                         <CustomLi
//                             key={item}
//                             text={item}
//                             onClick={text => handleClick(text)}
//                         />
//                     )}
//                 </ul>
//             </div>
//
//             <div>
//                 <button className='button-17'>Log Out</button>
//             </div>
//         </div>
//     )
// }
// const Test = () => {
//     return (
//         <div
//             style={{
//                 height: 'calc(100vh - 60px)',
//                 // display: 'flex',
//                 // justifyContent: 'center',
//                 // alignItems: 'center'
//             }}
//         >
//             <NavBar/>
//         </div>
//     );
// }
//
// export default Test;

