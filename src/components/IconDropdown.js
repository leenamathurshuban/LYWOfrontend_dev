import React, { useState, useRef } from "react";
import "../dropdown.css";

const IconDropdown = () => {
    const [selected, setSelected] = useState({
        label: "Select an option",
        icon: null,
    });
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const options = [
        { value: "apple", label: "Apple", icon: "https://via.placeholder.com/20?text=A" },
        { value: "banana", label: "Banana", icon: "https://via.placeholder.com/20?text=B" },
        { value: "cherry", label: "Cherry", icon: "https://via.placeholder.com/20?text=C" },
    ];

    const handleSelect = (option) => {
        setSelected(option);
        setIsOpen(false);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className="dropdown-container" ref={dropdownRef}>
            <div
                className="dropdown-button"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {selected.icon && <img src={selected.icon} alt={selected.label} />}
                <span>{selected.label}</span>
            </div>
            {isOpen && (
                <div className="dropdown-list">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className="dropdown-item"
                            onClick={() => handleSelect(option)}
                        >
                            <img src={option.icon} alt={option.label} />
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default IconDropdown;
