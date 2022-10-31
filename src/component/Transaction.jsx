import { Box, Button, Grid, GridItem, HStack, Text, useToast, VStack } from "@chakra-ui/react"
import { axiosInstance } from "../api"
import TransactionItem from "./TransactionItem"

const Transaction = ({ borrow_date, due_date, return_date, loan_status, TransactionItems, total_quantity, total_penalty, id, fetchTransaction, is_penalty }) => {

    const toast = useToast()

    const returnTransactionItem = async () => {
        try {
            const loanReturn = {
                loan_status: "Loan returned",
                is_penalty: "false",
                total_penalty: 0,
            }

            await axiosInstance.patch(`/transactions/returnStatus/${id}`, loanReturn)
            fetchTransaction()

            toast({
                title: "Loan Returned",
                status: "success",
            })
        } catch (err) {
            console.log(err)
            toast({
                title: "Return Error",
                status: "error",
            })
        }
    }

    const renderTransactionItem = () => {
        return TransactionItems.map((val) => {
            return (
                <TransactionItem
                    key={val.id.toString()}
                    title={val.Book.title}
                    author={val.Book.author}
                    genre={val.Book.genre}
                    publish_date={val.Book.publish_date}
                    image_url={val.Book.image_url}
                />
            )
        })
    }


    return (
        <Box bgColor={"white"} p={"4"} borderRadius="15px" mb="4" border={'10px #9C6334 double'}>
            <Grid
                templateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(1, 1fr)",
                    lg: "1fr 1fr 1fr 0.2fr",
                }}
                // templateRows={{
                //     lg: "repeat(1, 1fr)"
                // }}
                gap={4}
            >
                <GridItem width={"100%"}>
                    <Text ml={'13px'} mt={'3px'} fontSize={'30px'}>Transaction Item</Text>
                    {renderTransactionItem()}
                </GridItem>

                <GridItem
                    height={"auto"}
                    backgroundColor={"white"}
                    borderRadius="15px"
                    display={{ base: "block", md: "flex", lg: "flex" }}
                    p={"4"}
                    fontSize={"14px"}
                    ml={'40px'}
                >
                    <VStack>
                        <Box>
                            <Text mt={'-10px'} fontSize={'30px'} ml={'10px'}>Loan Date</Text>
                        </Box>
                        <Box pl={"50px"} my="auto">
                            <Text fontWeight={"light"} fontSize="19px" >
                                Borrow Date :
                            </Text>
                            <Text pb={'5px'}>{borrow_date}</Text>

                            <Text fontWeight={"light"} fontSize="19px">
                                Due Date :
                            </Text>
                            <Text pb={'5px'}>{due_date}</Text>
                            <Text fontWeight={"light"} fontSize="19px">
                                Return Date :
                            </Text>
                            {return_date ? (
                                <Text >{return_date}</Text>
                            ) : <Text fontSize={'14px'} color={'#DCD085'}>
                                (Loan not return yet)
                            </Text>
                            }
                        </Box>


                    </VStack>
                </GridItem>

                <GridItem ml={'70px'}>
                    <Text fontSize={'30px'} mt={'10px'}> Status</Text>
                    <Box
                        height={"auto"}
                        backgroundColor={"white"}
                        borderRadius="15px"
                        display={{ base: "block", md: "flex", lg: "flex" }}
                        // p={"4"}
                        mt={'5px'}
                        fontSize={"14px"}
                        pb={'5px'}
                    >
                        <Box my="auto" >
                            <Text fontWeight={"light"} fontSize="19px">
                                Loan Status :
                            </Text>
                            <Text fontSize={'14px'} pb={'5px'}>
                                {loan_status === "Loan returned" ? (
                                    <Text color={'green'}>(Loan returned)</Text>
                                ) : null}
                                {loan_status === "Waiting for return" ? (
                                    <Text color={'red'}>(Waiting for returned)</Text>
                                ) : null}
                                {loan_status === "You got penalty" ? (
                                    <Text color={'red'}>(You got penalty)</Text>
                                ) : null}
                            </Text>

                            <Text fontWeight={"light"} fontSize="19px" >
                                Total Quantity :
                            </Text>
                            <Text pl={'5px'} fontSize={'14px'} pb={'5px'}>
                                {total_quantity} {total_quantity > 1 ? "Books" : "Book"}
                            </Text>

                            {is_penalty ? (
                                <Box>
                                    <Text fontWeight={"light"} fontSize="19px">
                                        Total Penalty :
                                    </Text>
                                    <Text pl={'5px'} fontSize={'14px'}>
                                        Rp. {total_penalty.toLocaleString()}
                                    </Text>
                                </Box>
                            ) : null}
                        </Box>
                    </Box>
                </GridItem>
                <GridItem textAlign="right" my="auto">
                    {loan_status === "Loan returned" ? null : (
                        <Button
                            mr={'20px'}
                            bgColor={"#43615f"}
                            color="white"
                            value="Loan returned"
                            onClick={() => returnTransactionItem()}
                            variant={'outline'}
                            colorScheme={'teal'}
                        >
                            Return Loan
                        </Button>
                    )}
                </GridItem>
            </Grid>
        </Box >
    )
}

export default Transaction