import { Alert, AlertIcon, AlertTitle, Box, Button, Flex, Text, useToast, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { axiosInstance } from "../api"
import CartItems from "../component/CartItems"
import { fillCart } from "../redux/features/cartSlice"
import { fillTransaction } from "../redux/features/transactionSlice"
import Home from "./Home"

const CartPage = () => {
    const dispatch = useDispatch()
    const cartSelector = useSelector((state) => state.cart)
    const toast = useToast()

    // const [cartCheck, setCartCheck] = useState(false)

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

    // const [items, setItems] = useState([
    //     {
    //         CartId: 0,
    //         quantity: 1
    //     }
    // ])

    const checkOutBtnHandler = async () => {
        const checkOutItem = cartSelector.data.map((val) => {
            return {
                CartId: val.id,
                // BookId: val.BookId,
                quantity: 1
            }
        })
        console.log(checkOutItem)
        try {
            let checkOutCart = {
                items: [...checkOutItem]
            }

            await axiosInstance.post("/carts/checkOut", checkOutCart)

            console.log(checkOutCart)
            fetchCart()

            toast({
                title: "Cart Checked out",
                status: "success"
            })

        } catch (err) {
            console.log(err)
        }
    }

    const deleteBtnHandler = async (id) => {
        try {
            await axiosInstance.delete(`/carts/${id}`)

            fetchCart()

            toast({
                title: "Item Deleted",
                status: "info",
            })
        } catch (err) {
            console.log(err)
        }
    }

    const renderCartItems = () => {
        return cartSelector.data.map((val) => {
            return (
                <CartItems
                    key={val.id.toString()}
                    image={val.Book.image_url}
                    title={val.Book.title}
                    author={val.Book.author}
                    releasedYear={val.Book.publish_date}
                    genre={val.Book.genre}
                    onDelete={() => deleteBtnHandler(val.id)}
                />
            )
        })
    }

    useEffect(() => {
        fetchCart()
        fetchTransaction()
    }, [])
    return (
        <Box
            bg={"lightgray"}
            pr={"40px"}
            pl={"40px"}
            pt={"10px"}
            pb={"40px"}
            boxSize={"100%"}
            mt={"60px"}
        >
            <Flex
                pl={"40px"}
                pr={"40px"}
                direction={"column"}
                bg={"white"}
                mt={"40px"}
            >
                <Box fontSize={"4xl"} fontWeight={"bold"} bg={"white"}>
                    <Text pl={"40px"} mt={"40px"}>
                        My Cart
                    </Text>
                    <Text
                        pl={"40px"}
                        fontSize={"20px"}
                        fontWeight={"bold"}
                        fontStyle={"italic"}
                    >
                        Total Items: {cartSelector.data.length}
                    </Text>
                </Box>
                {renderCartItems()}
                {!cartSelector.data.length ? (
                    <Box m={"20px 20px 20px 20px"}>
                        <Alert status="warning" borderRadius={"20px"}>
                            <AlertIcon />
                            <AlertTitle>No Item Found</AlertTitle>
                        </Alert>
                    </Box>
                ) : null}
                <Box
                    pl={"40px"}
                    pr={"40px"}
                    bg={"white"}
                    textAlign={"right"}
                    pt={"30px"}
                >
                    {cartSelector.data.length ? (
                        <Button
                            mb={"20px"}
                            bgColor={"#1b3c4b"}
                            color={"white"}
                            onClick={checkOutBtnHandler}
                        >
                            CheckOut
                        </Button>
                    ) : null}
                </Box>
            </Flex>
        </Box>
    )
}

export default CartPage