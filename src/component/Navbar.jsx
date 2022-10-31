import { Box, Button, Flex, Grid, GridItem, HStack, Image, Menu, MenuButton, MenuItem, MenuList, Popover, PopoverTrigger, Portal, Stack, Text, useToast } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillDatabase, AiOutlineShoppingCart } from "react-icons/ai";
import { logout } from "../redux/features/authSlice";
import { BiBookReader } from "react-icons/bi";
import { axiosInstance } from "../api";
import { fillTransaction } from "../redux/features/transactionSlice";
import { RiLogoutCircleLine } from "react-icons/ri"
import { fillCart } from "../redux/features/cartSlice";
import { useEffect } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Logo1 from "../assets/PLogo.png"
import { IoIosNotificationsOutline } from "react-icons/io"


const Navbar = () => {
    const authSelector = useSelector((state) => state.auth)
    const cartSelector = useSelector((state) => state.cart)
    const transactionSelector = useSelector((state) => state.transaction)

    const location = useLocation()
    const dispatch = useDispatch()
    const toast = useToast()
    const navigate = useNavigate()

    const logoutBtnHandler = () => {
        localStorage.removeItem("auth_token")
        dispatch(logout())
        toast({
            title: "User Logout",
            status: "info",
        })
        navigate("/")
    }

    const fetchCart = async () => {
        try {
            const response = await axiosInstance.get("/carts")

            dispatch(fillCart(response.data.data))
        } catch (err) {
            console.log(err)
        }
    }

    const fetchTransaction = async () => {
        try {
            const response = await axiosInstance.get('/transactions/me')

            dispatch(fillTransaction(response.data.data))
        } catch (err) {
            console.log(err)
        }
    }

    const renderPentung = () => {
        for (let i = 0; i < transactionSelector.data.length; i++) {
            if (transactionSelector.data[i].loan_status === "Waiting for return" || transactionSelector.data[i].loan_status === "You got penalty") {
                return (
                    <sup>
                        <Box
                            fontSize={"13px"}
                            backgroundColor={"#8C193A"}
                            borderRadius={"50%"}
                            mt={'3px'}
                            ml={"-11px"}
                            mr={'-8px'}
                            pt={"6px"}
                            pr={"7px"}
                            pb={"10px"}
                            pl={"7px"}
                        >
                            !
                        </Box>
                    </sup>
                )
            }
        }
    }

    useEffect(() => {
        fetchCart()
        fetchTransaction()
    }, [transactionSelector])


    return (
        <Box
            backgroundColor={"#442416"}
            backgroundImage={"https://png.pngtree.com/thumb_back/fh260/back_pic/04/30/50/43584125d416a63.jpg"}
            color="white"
            top={"0"}
            right={"0"}
            left="0"
            zIndex={"999"}
            position="fixed"
        >
            {/*menu bar diHP */}
            {/* <Flex flex={1}>
                <Box
                    flex={1}
                    display={{
                        lg: "none",
                    }}
                >
                    <Box textAlign={"left"} padding={"4"} fontSize={"2xl"}>
                        {authSelector.username ? (
                            <>
                                <Box display={'flex'}>
                                    <Text>Hi, {authSelector.username}</Text>
                                </Box>
                            </>
                        ) : (
                            <Link to="/">
                                <Text>ChumBucket</Text>
                            </Link>
                        )}
                    </Box>
                </Box>
                <Menu> */}
            {/* <MenuButton
                        display={{
                            lg: "none",
                        }}
                        padding={"4"}
                        fontSize={"4xl"}
                    > */}
            {/* <AiFillDataBase /> */}
            {/* </MenuButton> */}
            {/* <Portal> */}
            {/* <MenuList>
                        <Link to={"/"}>
                            <MenuItem>Home</MenuItem>
                        </Link>
                        {authSelector.username ? (
                            <MenuItem >Logout</MenuItem>
                        ) : location.pathname === "/login" ? (
                            <Link to={"/register"}>
                                <MenuItem>Register</MenuItem>
                            </Link>
                        ) : (
                            <Link to={"/login"}>
                                <MenuItem>Login</MenuItem>
                            </Link>
                        )}
                    </MenuList> */}
            {/* </Portal> */}
            {/* </Menu> */}
            {/* </Flex > */}

            {/* {menu bar di laptop} */}
            <Grid
                templateColumns="repeat(3, 1fr)"
                gap={6}
                display={{ base: "none", lg: "grid" }}
            >
                <GridItem display={"flex"} justifyContent={"center"} mr={'80px'}>
                    <Link to={'/'}>
                        <HStack>
                            <Image
                                height="60px"
                                width={"100%"}
                                objectFit="cover"
                                src={Logo1}
                            />
                            <Text fontSize={"4xl"} padding={"2"}>
                                KiraLibrary
                            </Text>
                        </HStack>
                    </Link>
                </GridItem>
                <GridItem display={"flex"} justifyContent={"center"}>
                </GridItem>
                <GridItem
                    display={"flex"}
                    justifyContent={"end"}
                    gap="4"
                    padding="2"
                    my={"auto"}
                >
                    {authSelector.username ? (
                        location.pathname === "/carts" ? null : (
                            <Link to="/carts">
                                <Box
                                >
                                    <Button
                                        ml={'20px'}
                                        bgColor={"#716468"}
                                        fontSize={"2xl"}
                                        _hover={{ bg: "#CCBFBF" }}
                                        _active={"none"}
                                        maxH={'100px'}
                                        Width={'10px'}
                                        pr={'17px'}
                                    >
                                        <AiOutlineShoppingCart />
                                        {cartSelector.data.length ? (
                                            <sup>
                                                <Box
                                                    fontSize={"11px"}
                                                    backgroundColor={"#8C193A"}
                                                    borderRadius={"50%"}
                                                    mt={'3px'}
                                                    ml={"-8px"}
                                                    mr={'-8px'}
                                                    pt={"8px"}
                                                    pr={"7px"}
                                                    pb={"10px"}
                                                    pl={"7px"}
                                                >
                                                    {cartSelector.data.length}
                                                </Box>
                                            </sup>
                                        ) : null}

                                    </Button>
                                </Box>
                            </Link>
                        )
                    ) : null}
                    {authSelector.username ? (
                        location.pathname === `/transactions` ? null : (
                            <Link to={'/transactions'}>
                                <Button
                                    bgColor={"#716468"}
                                    fontSize={"1.6rem"}
                                    _hover={{ bg: "#CCBFBF" }}
                                    _active={"none"}
                                    mr={'5px'}
                                    ml={'-6px'}
                                >
                                    <IoIosNotificationsOutline />
                                    {renderPentung()}
                                </Button>
                            </Link>
                        )
                    ) : null}

                    {authSelector.username ? (
                        <Box>
                            <Menu >
                                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} bgColor={'#A36F45'} _hover={"none"} mr={'27px'}>

                                    <Text fontSize={"2xl"} pr={'-50px'} >
                                        {authSelector.username ? `Hi, ${authSelector.username}!` : null}
                                    </Text>
                                </MenuButton>
                                <MenuList pl={'50px'} bgColor={'#edf2f7'}>
                                    <MenuItem icon={<RiLogoutCircleLine />} color="black" onClick={logoutBtnHandler} >
                                        <Stack
                                            _active={"none"}
                                            color={'black'}

                                        >
                                            <Text >
                                                Logout
                                            </Text>
                                        </Stack>
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </Box>
                    ) : location.pathname === "/login" ||
                        location.pathname === "/register" ? null : (
                        <HStack>
                            <Link to={'/login'}>
                                <Button
                                    _hover={"none"}
                                    bgColor={"#EAD6CA"}
                                    py={'-5px'}
                                    variant={'outline'}
                                    colorScheme={'orange'}
                                >
                                    <Text color={'#271c16'}>
                                        Login
                                    </Text>
                                </Button>

                            </Link>
                            <Link to={'/register'}>
                                <Button bgColor={'#65544B'} px={'5px'} mr={'20px'} variant={'outline'} colorScheme={'gray'} _hover={"none"}>
                                    <Text color={'#F5E7DF'}>
                                        Register
                                    </Text>
                                </Button>
                            </Link>
                        </HStack>
                    )}
                </GridItem>
            </Grid>
        </Box >
    )
}

export default Navbar