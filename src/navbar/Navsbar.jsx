import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router";
import { Navbar, Button, Text, Link,} from "@nextui-org/react";
import { NavLink, Outlet } from "react-router-dom";
import { getAuth, updateProfile, onAuthStateChanged,signOut } from "firebase/auth"
import app from '../service/firebase'
import { AcmeLogo } from "../pages/nextui/AcmeLogo"

export default function Navsbar() {
    const auth = getAuth(app)
    const navigate = useNavigate()
    const [isLogin, setisLogin] = useState(false)
    const [users, setUsers] = useState();

    useEffect(() => {
        let token = localStorage.getItem('token')
        if (token) {
            setisLogin(true)
        }
    }, [])

    useEffect(() => {
        onAuthStateChanged(auth, (data) => {
            setUsers(data)
        });
    }, [])

    function signout() {
        signOut(auth, {

        }).then(() => {
            alert('sign out success');
            localStorage.removeItem('token')
            navigate('/profile')
            navigate(0)

        }).catch((error) => {
            alert("something wrong");
        });
    };



    const collapseItems = [
        "Landing Page",
        "Home",
        "Games",
    ];
    return (
        <>
            {isLogin ?
                <Navbar isBordered variant="sticky" css={{ color: "gray" }} height="80px">

                    <Navbar.Brand>
                        <Navbar.Toggle showIn="xs" aria-label="toggle navigation" />
                        <AcmeLogo />
                        <Text b color="inherit" hideIn="xs">
                            <Link css={{ color: "gray" }} to="/" as={NavLink}>GameStation™</Link>
                        </Text>
                    </Navbar.Brand>

                    <Navbar.Content enableCursorHighlight hideIn="xs" variant="highlight-solid-rounded" activeColor="secondary">
                        <Navbar.Link as={NavLink} to="/home"> Home </Navbar.Link>
                        <Navbar.Link as={NavLink} to="/games"> Games</Navbar.Link>
                        <Navbar.Link as={NavLink} to="/profile"> Profile</Navbar.Link>
                    </Navbar.Content>
                    <Navbar.Content>
                        <Navbar.Item>
                            <>
                            <Text color="purple" auto flat>
                                Welcome &nbsp; 
                            </Text>
                            <Text color="purple" auto flat>
                               {users && <p>{users.displayName}</p>}
                            </Text>
                            </>
                        </Navbar.Item>
                        <Navbar.Item>
                            <Button shadow color="error" auto onPress={signout}>
                                Log Out
                            </Button>
                        </Navbar.Item>

                    </Navbar.Content>

                    <Navbar.Collapse showIn={"xs"}>
                        {collapseItems.map((item, index) => (
                            <Navbar.CollapseItem key={item}>
                                <Link as={NavLink}
                                    color="inherit"
                                    css={{
                                        minWidth: "100%",
                                    }}
                                    href="#"
                                >
                                    {item}
                                </Link>
                            </Navbar.CollapseItem>
                        ))}
                    </Navbar.Collapse>

                </Navbar>
                :
                <Navbar isBordered variant="sticky" css={{ color: "gray" }} height="80px">

                    <Navbar.Brand>
                        <Navbar.Toggle showIn="xs" aria-label="toggle navigation" />
                        <AcmeLogo />
                        <Text b color="inherit" hideIn="xs">
                            <Link css={{ color: "gray" }} to="/" as={NavLink}>GameStation™</Link>
                        </Text>
                    </Navbar.Brand>

                    <Navbar.Content enableCursorHighlight hideIn="xs" variant="highlight-solid-rounded" activeColor="secondary">
                        <Navbar.Link as={NavLink} to="/home"> Home </Navbar.Link>
                        <Navbar.Link as={NavLink} to="/games"> Games</Navbar.Link>
                    </Navbar.Content>
                    <Navbar.Content>
                        <Navbar.Link color="inherit" as={NavLink} to="/login">
                            Login
                        </Navbar.Link>
                        <Navbar.Item>
                            <Button color="secondary" auto flat as={NavLink} to="/register">
                                Sign Up
                            </Button>
                        </Navbar.Item>

                    </Navbar.Content>

                    <Navbar.Collapse showIn={"xs"}>
                        {collapseItems.map((item, index) => (
                            <Navbar.CollapseItem key={item}>
                                <Link as={NavLink}
                                    color="inherit"
                                    css={{
                                        minWidth: "100%",
                                    }}
                                    href="#"
                                >
                                    {item}
                                </Link>
                            </Navbar.CollapseItem>
                        ))}
                    </Navbar.Collapse>

                </Navbar>
            }
            <Outlet />

        </>


    )

}
