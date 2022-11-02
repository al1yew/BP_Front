import Icon from '@mdi/react'
import { mdiChevronDown } from '@mdi/js';
import React, { useEffect, useRef, useState } from "react";

export default function Dropdown(props) {

    //#region explanation

    //1. State to control dropdown, open and close it and also set placeholder. props.name is sent byfrom parent component, Assessment.
    //2. reference is created because of getting some knowledge from stack over flow :DDD it handles points 6 and 7, that i got from source
    //3. open close dropdown
    //4. handling change that also calls two functions, first is setting placeholder, second is function that i got from parent component,
    //  i send there values that are necessary for POST. And yes, the way i made array.map() method in 8 point, the way i handled ul li, is not 
    // appropriate, but idk how to set first li inside map function. SO i send in first li 0 and empty string. Then I send to props.setValues 
    // id and entity name. 
    //5. calling handle placeholder. 
    //6 and 7 is for closing dropdown on click outside. 

    //#endregion explanation

    //1
    const [dropdown, setDropdown] = useState({
        isOpen: false,
        placeholder: props.name
    });

    //2
    const refDropdown = useRef();

    //3
    function handleDropdown() {
        setDropdown(prevValue => {
            return {
                ...prevValue,
                isOpen: !prevValue.isOpen
            }
        });
    }

    //4
    function handleChange(forPlaceholder, id, entity) {
        handlePlaceholder(forPlaceholder);
        props.setValues(id, entity);
    }

    //5
    function handlePlaceholder(forPlaceholder) {
        setDropdown(prevValue => {
            return {
                ...prevValue,
                placeholder: forPlaceholder,
                isOpen: !prevValue.isOpen
            }
        });
    }

    //6
    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClicks);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClicks);
        };

    }, [refDropdown]);

    //7
    const handleOutsideClicks = (e) => {
        if (!dropdown.isOpen && refDropdown.current && !refDropdown.current.contains(e.target)) {
            setDropdown(prevValue => {
                return {
                    ...prevValue,
                    isOpen: false
                }
            });
        };
    };

    //8
    return (
        <div ref={refDropdown} className='dropdownkeeper col-lg-12 col-12'>
            <div className='col-lg-12 col-12 dropdown_main' onClick={handleDropdown}>
                <span className='col-lg-10 col-10'>
                    {dropdown.placeholder}
                </span>
                <span className='col-lg-2 col-2'>
                    <Icon path={mdiChevronDown} size='20px' />
                </span>
            </div>
            <div className={`col-lg-12 col-12 dropdown_menu ${dropdown.isOpen && "show_dropdown"}`} >
                <ul>
                    <li id='0' onClick={() => handleChange(props.name, 0, props.name)}>
                        {props.name}
                    </li>
                    {props.query.map((element, index) => {
                        return (
                            <li key={index} id={element.id} onClick={() => handleChange(element.name, element.id, props.name)} >
                                {element.name}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    );
}