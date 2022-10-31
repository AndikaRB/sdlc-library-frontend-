import { Box, Button, Checkbox, Flex, Image, Text, VStack } from "@chakra-ui/react"
import { AiFillDelete } from "react-icons/ai"


const CartItems = ({ image, title, author, genre, releasedYear, onDelete }) => {
    return (
        <Box
            pl={"40px"}
            pt={"10px"}
            pr={"40px"}
            bg={"white"}
            display={{ base: "none", md: "none", lg: "initial" }}
        >
            <VStack alignItems={"left"}>
                <Box bg={"lightgray"} borderRadius={"15px"}>
                    <Flex color="black" fontWeight={"bold"}>
                        <Box flex="0.5" ml={'10px'}>
                            <Checkbox>
                                <Image
                                    height={"140px"}
                                    width={"full"}
                                    objectFit={"cover"}
                                    src={
                                        image ||
                                        "https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                                    }
                                    padding={"10px"}
                                    borderRadius={"20px"}
                                    ml={"10px"}
                                />
                            </Checkbox>
                        </Box>
                        <Box flex="1">
                            <Text mt={"55px"} textAlign={"center"}>
                                {title || "title"}
                            </Text>
                        </Box>
                        <Box flex="1">
                            <Text textAlign={"left"} mt={"35px"} ml={"20px"}>
                                Genre: {genre || "genre"} <br />
                                Author: {author || "author"} <br />
                                Released Year: {releasedYear || "publish date"}
                            </Text>
                        </Box>
                        <Box flex="1">
                            <Text textAlign={"center"} mt={"55px"} >
                                <Button
                                    bgColor={"#1b3c4b"}
                                    fontSize={"2xl"}
                                    color={"white"}
                                    borderRadius={"full"}
                                    onClick={onDelete}
                                >
                                    <AiFillDelete />
                                    <Text fontSize={"15px"} ml={"5px"}>
                                        Delete
                                    </Text>
                                </Button>
                            </Text>
                        </Box>
                    </Flex>
                </Box>
            </VStack>
        </Box>
    )
}

export default CartItems