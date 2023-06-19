import {Link} from "react-router-dom";
import {useState} from "react";

const AccountSettings = () => {
    const [isDarkMode, setIsDarkMode] = useState(false)

    const handleModeToggle = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    return (
        <div>
            <h1 className="subtitle">Account Settings:</h1>

            <div className={` ${isDarkMode ? 'dark' : 'light'}`}>
                <button onClick={handleModeToggle}>
                    Toggle {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                </button>


                <Link to={'/api/:id/update/'}>
                    <button className="button-settings">Update Account</button>
                </Link>

                <Link to={'/api/:id/delete/'}>
                    <button className="button-settings-delete">Delete Account</button>
                </Link>

            </div>

        </div>
    )

}

export default AccountSettings;

