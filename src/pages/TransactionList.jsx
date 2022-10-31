import { Alert, AlertIcon, AlertTitle, Box, Flex, Grid, GridItem, HStack, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { axiosInstance } from "../api"
import Transaction from "../component/Transaction"
import { fillCart } from "../redux/features/cartSlice"
import { fillTransaction } from "../redux/features/transactionSlice"

const TransactionPage = () => {
    const dispatch = useDispatch()

    // const [transaction, setTransaction] = useState([])

    const transactionSelector = useSelector((state) => state.transaction)

    const fetchTransaction = async () => {
        try {
            const response = await axiosInstance.get('/transactions/me', {
                params: { _sortDir: "DESC" }
            })

            dispatch(fillTransaction(response.data.data))
            // setTransaction(response.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    const fetchCart = async () => {
        try {
            const response = await axiosInstance.get("/carts")

            dispatch(fillCart(response.data.data))
        } catch (err) {
            console.log(err)
        }
    }

    const renderTransaction = () => {
        return transactionSelector.data.map((val) => {
            return (
                <Transaction
                    key={val.id.toString()}
                    borrow_date={val.borrow_date}
                    due_date={val.due_date}
                    return_date={val.return_date}
                    loan_status={val.loan_status}
                    total_quantity={val.total_quantity}
                    total_penalty={val.total_penalty}
                    is_penalty={val.is_penalty}
                    TransactionItems={val.TransactionItems}
                    id={val.id}
                    fetchTransaction={fetchTransaction}
                />
            )
        })
    }
    useEffect(() => {
        fetchTransaction()
        fetchCart()
    }, [])
    return (
        <Box bg={"lightgray"} p={"40px"} boxSize={"100%"} mt={"60px"}>
            <Flex pl={"40px"} pt={"40px"} pr={"40px"} direction={"column"}>

                <Box fontSize={"4xl"} fontWeight={"bold"} bg={"white"} p={'20px'}>
                    <HStack>
                        <Box>
                            <Text pl={"40px"} mt={"40px"}>
                                Transaction List
                            </Text>
                        </Box>
                        {/* <Box
                            fontSize={"30px"}
                            backgroundColor={"#C2C2C2"}
                            borderRadius={"50%"}
                            px={'10px'}
                            mr={'10px'}

                        >
                            {transactionSelector.data.length}
                        </Box> */}
                    </HStack>
                    <Box m='20px'>
                        {renderTransaction()}
                        {!transactionSelector.data.length ? (
                            <Alert
                                status="warning"
                                // bgColor={"#43615f"}
                                // width="50%"
                                // justifyContent={"center"}
                                mx="auto"
                                // p="4"
                                borderRadius={"20px"}
                            >
                                <AlertIcon />
                                <AlertTitle
                                    // color={"white"}
                                    // fontWeight="light"
                                    fontSize={"18px"}
                                >
                                    No transaction found
                                </AlertTitle>
                            </Alert>
                        ) : null}

                    </Box>
                </Box>
            </Flex>
        </Box>
    )
}

export default TransactionPage