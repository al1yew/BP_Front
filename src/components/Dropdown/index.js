import Icon from '@mdi/react'
import { mdiChevronDown } from '@mdi/js';
import React, { useEffect, useRef, useState } from "react";

export default function Dropdown(props) {

    const [dropdown, setDropdown] = useState({
        isOpen: false,
        placeholder: props.name
    });

    const refDropdown = useRef();

    function handleDropdown() {
        setDropdown(prevValue => {
            return {
                ...prevValue,
                isOpen: !prevValue.isOpen
            }
        });
    }

    function handlePlaceholder(elementName) {
        setDropdown(prevValue => {
            return {
                ...prevValue,
                placeholder: elementName,
                isOpen: !prevValue.isOpen
            }
        });
    }

    useEffect(() => {

        document.addEventListener("mousedown", handleOutsideClicks);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClicks);
        };

    }, [refDropdown]);

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

    return (
        <div ref={refDropdown} className='dropdownkeeper col-lg-3-8 col-3-8'>
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
                    <li onClick={() => handlePlaceholder(props.name)}>
                        {props.name}...
                    </li>
                    {props.query.map(element => {
                        return <li key={element.id} onClick={() => handlePlaceholder(element.name)}>
                            <input type="radio" name="dist" className='radio_inps' />
                            {element.name}
                        </li>
                    })}
                </ul>
            </div>
        </div>
    );
}