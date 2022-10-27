// import React, { Component, useEffect, useRef, useState } from 'react'
// import Icon from '@mdi/react'
// import { mdiChevronDown } from '@mdi/js';

// function Distance() {

//     const [distances, setDistances] = useState([]);

//     const [placeholder, setPlaceholder] = useState("Select Distance...");

//     const dropdown = useRef();

//     useEffect(() => {
//         fetch("http://localhost:37234/api/distances")
//             .then(response => response.json())
//             .then(data => setDistances(data))
//     }, []);

//     const handleDropdown = () => {
//         const drp = dropdown.current.classList;
//         drp.contains('show_dropdown') ? drp.remove('show_dropdown') : drp.add('show_dropdown')
//     }

//     const handlePlaceholder = (selectedValue) => {
//         setPlaceholder(selectedValue);
//         dropdown.current.classList.remove('show_dropdown');
//     }

//     return (
//         <>
//             <div className='dropdownkeeper col-lg-3-8 col-3-8'>
//                 <div className='col-lg-12 col-12 dropdown_main' onClick={handleDropdown}>
//                     <span className='col-lg-10 col-10'>
//                         {placeholder}
//                     </span>
//                     <span className='col-lg-2 col-2'>
//                         <Icon path={mdiChevronDown} size='20px' />
//                     </span>
//                 </div>
//                 <div className='col-lg-12 col-12 dropdown_menu' ref={dropdown}>
//                     <ul>
//                         <li onClick={() => handlePlaceholder("Select Distance...")}>
//                             Select Distance...
//                         </li>
//                         {distances.map(d => {
//                             return <li
//                                 key={d.id}
//                                 onClick={() => handlePlaceholder(d.name)}
//                             >
//                                 <input type="radio" name="dist" className='radio_inps' />
//                                 {d.name} m
//                             </li>
//                         })}
//                     </ul>
//                 </div>
//             </div>
//         </>
//     );

// }

// export default Distance;





export function Dropdown() {
    return (<h1 className="mt-5">salam ya poseredineeeeeedddddddddddddddddddddddddd sda sd as dasdgnrhg rugh dfiu ghdfuig hdfiu ghdfiug hdfiu ghdfiug hdfiu gh sa dsad asd sad as a               ssssssss ddddeee</h1>);
}











// import React, { Component, useEffect, useRef, useState } from 'react'
// import Distance from './Distance';
// import Frequency from './Frequency';
// import Weight from './Weight';


// function Dropdown() {

//     const need = useRef();
//     const noNeed = useRef();
//     const formEl = useRef();

//     const handleFormSubmit = (e) => {
//         e.preventDefault();

//         const formdata = new FormData(formEl.current);

//         console.log(formdata.values)

//         if (document.activeElement == need.current) {

//         }
//         else if (document.activeElement == noNeed.current) {

//         }
//     }

//     return (
//         <section id='dropdownkeeper'>
//             <div className='container'>
//                 <form method='post' ref={formEl} className='row all col-lg-12 col-12' onSubmit={(e) => handleFormSubmit(e)}>
//                     <Frequency />
//                     <Distance />
//                     <Weight />
//                     <button ref={need} type="submit" className='col-lg-4 col-5-8 btn btn-primary' value='true'>Need to Assess</button>
//                     <button ref={noNeed} type="submit" className='col-lg-4 col-5-8 btn btn-danger' value='false'>No Need to Assess</button>
//                 </form>
//             </div>
//         </section >
//     )
// }

// export default Dropdown;