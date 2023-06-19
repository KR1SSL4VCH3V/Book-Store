import {Link} from "react-router-dom";


const Header = () => {



    return (

        <div className='app-header'>

            <Link to={"/"}>
                <button className="btn"><i className="fa fa-home"></i></button>
            </Link>
            <h1 className=" fancy-title">My Library &#x1F4DA;</h1>

            <div className='dropdown'>
                <div className='dropdown-menu'> &#x2630;</div>
                <div className="dropdown-content">

                        <div className="subtitle">
                            <Link to={'/api/:id/settings/'}>Settings</Link>

                        </div>


                    <Link className="subtitle" to={'/api/signin/'} >
                        SignOut
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default Header