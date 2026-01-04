import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import React from "react"

export default function Layout() {

    const [isLogged, setIsLogged] = React.useState(false);

    React.useEffect(() => {
        if (localStorage.getItem('isLogged')) {
            setIsLogged(true);
        } else {
            setIsLogged(false);
        }
    }, [])

    const onLogOut = () => {
        localStorage.removeItem('isLogged')
        localStorage.removeItem('token')
        setIsLogged(false);
    }



    return (
        <>
            <div className="site-wrapper">
                <Header isLogged={isLogged} onLogOut={onLogOut} />

                <main className="site-main">
                    <Outlet context={{isLogged, setIsLogged}}/>
                </main>

                <Footer />
            </div>
        </>

    )
}