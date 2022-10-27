import Icon from '@mdi/react'
import { mdiChevronDown } from '@mdi/js';
import React from "react";

export default function Dropdown(props) {
    return (
        <div className='dropdownkeeper col-lg-3-8 col-3-8'>
            <div className='col-lg-12 col-12 dropdown_main'>
                <span className='col-lg-10 col-10'>
                    placeholder
                </span>
                <span className='col-lg-2 col-2'>
                    <Icon path={mdiChevronDown} size='20px' />
                </span>
            </div>
            <div className='col-lg-12 col-12 dropdown_menu' >
                <ul>
                    <li>
                        Select neyi secirsen...
                    </li>
                    {/* {distances.map(d => {
                            return <li
                                key={d.id}
                                onClick={() => handlePlaceholder(d.name)}
                            >
                                <input type="radio" name="dist" className='radio_inps' />
                                {d.name} m
                            </li>
                        })} */}
                </ul>
            </div>
        </div>
    );
}