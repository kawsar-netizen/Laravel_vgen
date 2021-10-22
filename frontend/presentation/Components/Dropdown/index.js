import React from 'react';
import propTypes from 'prop-types'
import styles from './dropdown.module.css'
const Dropdown = ({value, data, placeholder, onChange, name, style}) => {
    
    return(
        <div className={styles.dropDown}>
            <select value={value} name={name} className={styles.dropDownMenu} style={style} onChange={onChange}>
                <option value="">{placeholder}</option>
                {data.map((item, key) => (
                    <option key={key} value={item.value}>{item.label}</option>
                ))}
            </select>
        </div>
    )
};

Dropdown.propTypes ={
    value: propTypes.string,
    data:propTypes.array.isRequired,
    placeholder: propTypes.string,
    onChange: propTypes.func.isRequired,
    name: propTypes.string
}

Dropdown.defaultProps = {
    value: '',
    placeholder: ''
}

export default Dropdown;